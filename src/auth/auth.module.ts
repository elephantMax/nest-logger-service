import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { TokensService } from 'src/tokens/tokens.service';
import { EnvService } from 'src/env/env.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    EnvService,
    UsersService,
    PrismaService,
    TokensService,
    JwtService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
