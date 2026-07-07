import { Module } from '@nestjs/common';
import { DatabaseModule } from 'app/persistence';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, EmailService],
})
export class AuthModule {}
