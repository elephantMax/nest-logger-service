import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'debug', 'error', 'fatal', 'log', 'verbose'],
  });
  const configService = app.get(EnvService);

  app.enableCors({
    origin: configService.get('FRONT_ORIGIN'),
  });

  app.setGlobalPrefix('api');

  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
