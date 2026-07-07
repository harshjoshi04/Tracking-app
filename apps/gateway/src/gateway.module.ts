import { Module } from '@nestjs/common';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { DatabaseModule } from 'app/persistence';
import { AppConfigModule } from 'libs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from 'libs/redis/src';
import { QueueModule } from 'libs/queue/src';

@Module({
  imports: [
    AppConfigModule,
    RedisModule,
    QueueModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
