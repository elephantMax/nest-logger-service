import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvService);

  app.enableCors({
    origin: configService.get('FRONT_ORIGIN'),
  });

  app.setGlobalPrefix('api');

  const port = configService.get('PORT');

  app.use(logger);

  await app.listen(port);
}
bootstrap();
