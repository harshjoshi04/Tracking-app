import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { AppConfigService } from 'libs/config';
import { setupSwagger } from 'app/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const config = app.get(AppConfigService);
  setupSwagger(app);

  await app.listen(config.gateway.port);
}
void bootstrap();
