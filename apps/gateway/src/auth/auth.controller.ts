import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class RegisterCustomerDto {
    @ApiProperty({ example: 'John Doe' })
    name!: string;

    @ApiProperty({ example: 'john@example.com' })
    email!: string;

    @ApiProperty({ example: '9876543210' })
    mobile!: string;

    @ApiProperty({ example: '12, MG Road, Bangalore', required: false })
    address?: string;
}

class RegisterDriverDto {
    @ApiProperty({ example: 'Ravi Kumar' })
    name!: string;

    @ApiProperty({ example: 'ravi@example.com' })
    email!: string;

    @ApiProperty({ example: '9123456780' })
    mobile!: string;

    @ApiProperty({ example: '15, Whitefield, Bangalore', required: false })
    address?: string;
}

class RequestLoginOtpDto {
    @ApiProperty({ example: '9876543210' })
    mobile!: string;
}

class VerifyOtpDto {
    @ApiProperty({ example: '9876543210' })
    mobile!: string;

    @ApiProperty({ example: '123456' })
    otp!: string;
}

@ApiTags('Auth')
@ApiExtraModels(RegisterCustomerDto, RegisterDriverDto, RequestLoginOtpDto, VerifyOtpDto)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register/customer')
    @ApiOperation({ summary: 'Register a customer' })
    @ApiBody({ type: RegisterCustomerDto })
    registerCustomer(@Body() body: RegisterCustomerDto) {
        return this.authService.registerCustomer(body);
    }

    @Post('register/driver')
    @ApiOperation({ summary: 'Register a driver' })
    @ApiBody({ type: RegisterDriverDto })
    registerDriver(@Body() body: RegisterDriverDto) {
        return this.authService.registerDriver(body);
    }

    @Post('login/request-otp')
    @ApiOperation({ summary: 'Request login OTP using mobile number' })
    @ApiBody({ type: RequestLoginOtpDto })
    requestLoginOtp(@Body() body: RequestLoginOtpDto) {
        return this.authService.requestLoginOtp(body);
    }

    @Post('login/verify-otp')
    @ApiOperation({ summary: 'Verify OTP and receive JWT token' })
    @ApiBody({ type: VerifyOtpDto })
    verifyOtp(@Body() body: VerifyOtpDto) {
        return this.authService.verifyOtp(body);
    }
}
