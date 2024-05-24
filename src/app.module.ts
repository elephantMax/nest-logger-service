import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [UsersModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
