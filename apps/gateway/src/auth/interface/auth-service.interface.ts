import { Observable } from 'rxjs';

export interface RegisterResponse {
    success: boolean;
    message: string;
    userId: string;
}

export interface RequestLoginOtpResponse {
    success: boolean;
    message: string;
    requestId: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string;
    userId: string;
    email: string;
    token: string;
}

export interface AuthGrpcService {
    registerCustomer(data: { name: string; email: string; mobile: string; address?: string }): Observable<RegisterResponse>;
    registerDriver(data: { name: string; email: string; mobile: string; address?: string }): Observable<RegisterResponse>;
    requestLoginOtp(data: { mobile: string }): Observable<RequestLoginOtpResponse>;
    verifyOtp(data: { mobile: string; otp: string }): Observable<VerifyOtpResponse>;
}
