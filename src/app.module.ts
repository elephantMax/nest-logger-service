import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { TokensModule } from './tokens/tokens.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        return envSchema.parse(config);
      },
      validationOptions: {
        abortEarly: true,
      },
    }),
    EnvModule,
    AuthModule,
    TokensModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
