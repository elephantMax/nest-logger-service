import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

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

  async removeById(projectId: string, userId: string): Promise<void> {
    try {
      await this.prismaService.project.delete({
        where: { userId, id: projectId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Project not found');
        }
      }
    }
  }
}
