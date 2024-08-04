import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { EnvService } from './env/env.service';
import { CreateUserDto } from './shared/dto';
import { ProjectsService } from './projects/projects.service';
import { CreateProjectDto } from './projects/dto';
import { UsersService } from './users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly projectService: ProjectsService,
    private readonly envService: EnvService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    try {
      const admin = await this.initAdmin();
      await this.initSystemProject(admin.id);
    } catch (error) {
      this.logger.error('failed to initialize app', error);
    }
  }

  private async initAdmin(): Promise<User> {
    this.logger.log('initializing admin');
    const adminLogin = this.envService.get('ADMIN_LOGIN');
    const adminPassword = this.envService.get('ADMIN_PASSWORD');

    const existingAdmin = await this.userService.findByLogin(adminLogin);

    if (existingAdmin) {
      this.logger.log('Admin already exists, initializing not needed');
      return existingAdmin;
    }

    const adminDto: CreateUserDto = {
      login: adminLogin,
      password: adminPassword,
      name: 'admin',
    };

    const admin = await this.authService.register(adminDto);
    this.logger.log('admin successfully initialized');
    return admin;
  }

  private async initSystemProject(adminId: string): Promise<void> {
    this.logger.log('initializing system project');
    const systemProject = await this.projectService.getSystemProject(adminId);

    if (systemProject) {
      this.logger.log('system project already exists, initializing not needed');
      return;
    }

    const projectDto: CreateProjectDto = {
      name: 'System project',
      system: true,
    };

    await this.projectService.create(projectDto, adminId);
    this.logger.log('system project successfully was initialized');
  }
}
