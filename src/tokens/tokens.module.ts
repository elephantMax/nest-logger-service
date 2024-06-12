import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { EnvService } from 'src/env/env.service';

@Module({
  providers: [TokensService, JwtService, PrismaService, EnvService],
})
export class TokensModule {}
