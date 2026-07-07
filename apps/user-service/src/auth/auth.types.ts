export interface RegisterCustomerDto {
    name: string;
    email: string;
    mobile: string;
    address?: string;
}

export interface RegisterDriverDto {
    name: string;
    email: string;
    mobile: string;
    address?: string;
}

export interface RequestLoginOtpDto {
    mobile: string;
}

export interface VerifyOtpDto {
    mobile: string;
    otp: string;
}
