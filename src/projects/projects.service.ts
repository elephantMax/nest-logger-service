import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProjectDto, userId: string) {
    return this.prismaService.project.create({
      data: {
        name: dto.name,
        userId,
        system: dto.system,
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
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserProjectById(userId: string, projectId: string) {
    return this.prismaService.project.findFirst({
      where: { userId: userId, id: projectId },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
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

  async getSystemProject(adminId: string): Promise<Project | null> {
    const project = await this.prismaService.project.findFirst({
      where: {
        system: true,
        userId: adminId,
      },
    });

    return project ?? null;
  }
}
