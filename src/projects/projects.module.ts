import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma.service';
import { TokensService } from 'src/tokens/tokens.service';
import { EnvService } from 'src/env/env.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    PrismaService,
    TokensService,
    EnvService,
    JwtService,
    UsersService,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
