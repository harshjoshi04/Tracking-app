import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @GrpcMethod('UserService', 'RegisterCustomer')
    registerCustomer(data: { name: string; email: string; mobile: string; address?: string }) {
        return this.authService.registerCustomer(data);
    }

    @GrpcMethod('UserService', 'RegisterDriver')
    registerDriver(data: { name: string; email: string; mobile: string; address?: string }) {
        return this.authService.registerDriver(data);
    }

    @GrpcMethod('UserService', 'RequestLoginOtp')
    requestLoginOtp(data: { mobile: string }) {
        return this.authService.requestLoginOtp(data);
    }

    @GrpcMethod('UserService', 'VerifyOtp')
    verifyOtp(data: { mobile: string; otp: string }) {
        return this.authService.verifyOtp(data);
    }
}
