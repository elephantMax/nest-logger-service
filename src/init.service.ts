import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { EnvService } from './env/env.service';
import { CreateUserDto } from './shared/dto';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly envService: EnvService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    try {
      await this.initAdmin();
      this.logger.log('Admin was successfully created');
    } catch (error) {
      this.logger.error('failed to create Admin', error);
    }
  }

  private async initAdmin() {
    const adminLogin = this.envService.get('ADMIN_LOGIN');
    const adminPassword = this.envService.get('ADMIN_PASSWORD');

    const adminDto: CreateUserDto = {
      login: adminLogin,
      password: adminPassword,
      name: 'admin',
    };

    return this.authService.register(adminDto);
  }
}
