import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type {
    AuthGrpcService,
    RegisterResponse,
    RequestLoginOtpResponse,
    VerifyOtpResponse,
} from './interface/auth-service.interface';

@Injectable()
export class AuthService implements OnModuleInit {
    private authService!: AuthGrpcService;

    constructor(
        @Inject('USER_SERVICE')
        private readonly client: ClientGrpc,
    ) {}

    onModuleInit() {
        this.authService = this.client.getService<AuthGrpcService>('UserService');
    }

    registerCustomer(data: { name: string; email: string; mobile: string; address?: string }): Promise<RegisterResponse> {
        return firstValueFrom(this.authService.registerCustomer(data));
    }

    registerDriver(data: { name: string; email: string; mobile: string; address?: string }): Promise<RegisterResponse> {
        return firstValueFrom(this.authService.registerDriver(data));
    }

    requestLoginOtp(data: { mobile: string }): Promise<RequestLoginOtpResponse> {
        return firstValueFrom(this.authService.requestLoginOtp(data));
    }

    verifyOtp(data: { mobile: string; otp: string }): Promise<VerifyOtpResponse> {
        return firstValueFrom(this.authService.verifyOtp(data));
    }
}
