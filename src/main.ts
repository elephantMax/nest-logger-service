import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // TODO: get from env
    },
  });
  const configService = app.get(EnvService);

  app.setGlobalPrefix('api');

  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
