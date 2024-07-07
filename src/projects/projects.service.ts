import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProjectDto, userId: string) {
    return this.prismaService.project.create({
      data: {
        name: dto.name,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            name: true,
          },
        },
      },
    });
  }

  async getAllByUserId(userId: string) {
    return this.prismaService.project.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            name: true,
          },
        },
      },
    });
  }
}
