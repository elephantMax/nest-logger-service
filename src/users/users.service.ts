import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: createUserDto.login,
      },
    });

    if (user) {
      // TODO: return specific error
      throw new BadRequestException('user already exists');
    }

    return this.prisma.user.create({
      data: {
        login: createUserDto.login,
        name: createUserDto.name,
        password: createUserDto.password,
      },
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    return user ?? null;
  }
}
