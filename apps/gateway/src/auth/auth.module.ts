import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PROTO_PATH } from 'app/proto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.GRPC,
                options: {
                    package: 'user',
                    protoPath: USER_PROTO_PATH,
                    url: `${process.env.USER_GRPC_HOST}:${process.env.USER_GRPC_PORT}`,
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
