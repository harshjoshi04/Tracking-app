import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { ConfigModule } from 'libs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule { }
