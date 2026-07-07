import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { and, desc, eq, or } from 'drizzle-orm';
import { randomInt, createHmac } from 'crypto';
import * as bcrypt from 'bcrypt';
import { DatabaseService, users, roles, authOtps } from 'app/persistence';
import { JWT_SUBJECT, OTP_PURPOSE, USER_ROLES } from './auth.constants';
import type {
    RegisterCustomerDto,
    RegisterDriverDto,
    RequestLoginOtpDto,
    VerifyOtpDto,
} from './auth.types';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly database: DatabaseService,
        private readonly emailService: EmailService,
    ) {}

    private async getRoleId(name: string) {
        const existing = await this.database.db.select().from(roles).where(eq(roles.name, name)).limit(1);
        if (existing[0]) {
            return existing[0].id;
        }

        const created = await this.database.db.insert(roles).values({ name }).returning({ id: roles.id });
        return created[0].id;
    }

    private async getUserByMobile(mobile: string) {
        const rows = await this.database.db
            .select()
            .from(users)
            .where(and(eq(users.mobile, mobile), eq(users.isDeleted, false)))
            .limit(1);

        return rows[0];
    }

    private generateOtp() {
        return String(randomInt(100000, 999999));
    }

    private createJwt(payload: Record<string, unknown>) {
        const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
        const body = Buffer.from(JSON.stringify({
            iss: JWT_SUBJECT,
            iat: Math.floor(Date.now() / 1000),
            ...payload,
        })).toString('base64url');
        const secret = process.env.JWT_SECRET ?? 'dev-secret';
        const signature = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
        return `${header}.${body}.${signature}`;
    }

    private async registerUser(dto: RegisterCustomerDto | RegisterDriverDto, roleName: string) {
        const email = dto.email.trim().toLowerCase();
        const mobile = dto.mobile.trim();

        const existing = await this.database.db
            .select()
            .from(users)
            .where(or(eq(users.email, email), eq(users.mobile, mobile)))
            .limit(1);

        if (existing[0]) {
            throw new BadRequestException('User already exists');
        }

        const roleId = await this.getRoleId(roleName);
        const created = await this.database.db
            .insert(users)
            .values({
                roleId,
                name: dto.name.trim(),
                email,
                mobile,
                address: dto.address?.trim(),
            })
            .returning({ id: users.id });

        return {
            success: true,
            message: `${roleName} registered successfully`,
            userId: created[0].id,
        };
    }

    async registerCustomer(dto: RegisterCustomerDto) {
        return this.registerUser(dto, USER_ROLES.CUSTOMER);
    }

    async registerDriver(dto: RegisterDriverDto) {
        return this.registerUser(dto, USER_ROLES.DRIVER);
    }

    async requestLoginOtp(dto: RequestLoginOtpDto) {
        const mobile = dto.mobile.trim();
        const user = await this.getUserByMobile(mobile);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (!user.email) {
            throw new BadRequestException('Email is required for OTP login');
        }

        const otp = this.generateOtp();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const inserted = await this.database.db.insert(authOtps).values({
            email: user.email,
            mobile,
            purpose: OTP_PURPOSE.LOGIN,
            otpHash,
            expiresAt,
        }).returning({ id: authOtps.id });

        await this.emailService.sendOtp(user.email, otp, OTP_PURPOSE.LOGIN);

        return {
            success: true,
            message: 'OTP sent successfully',
            requestId: inserted[0].id,
        };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        const mobile = dto.mobile.trim();
        const user = await this.getUserByMobile(mobile);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const records = await this.database.db
            .select()
            .from(authOtps)
            .where(and(
                eq(authOtps.mobile, mobile),
                eq(authOtps.email, user.email),
                eq(authOtps.purpose, OTP_PURPOSE.LOGIN),
                eq(authOtps.isDeleted, false),
                eq(authOtps.isActive, true),
            ))
            .orderBy(desc(authOtps.createdAt))
            .limit(1);

        const otpRecord = records[0];
        if (!otpRecord) {
            throw new BadRequestException('OTP not found');
        }

        if (otpRecord.consumedAt) {
            throw new BadRequestException('OTP already used');
        }

        if (otpRecord.expiresAt.getTime() < Date.now()) {
            throw new BadRequestException('OTP expired');
        }

        const isValid = await bcrypt.compare(dto.otp, otpRecord.otpHash);
        if (!isValid) {
            throw new UnauthorizedException('Invalid OTP');
        }

        await this.database.db
            .update(authOtps)
            .set({
                consumedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(authOtps.id, otpRecord.id));

        const token = this.createJwt({
            sub: user.id,
            email: user.email,
            mobile: user.mobile,
            roleId: user.roleId,
        });

        return {
            success: true,
            message: 'OTP verified successfully',
            userId: user.id,
            email: user.email,
            token,
        };
    }
}
