import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendOtp(email: string, otp: string, purpose: string) {
        this.logger.log(`OTP for ${purpose} sent to ${email}: ${otp}`);
    }
}
