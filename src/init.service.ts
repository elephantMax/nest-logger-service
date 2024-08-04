import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    try {
      await this.authService.initAdmin();
      this.logger.log('Admin was successfully created');
    } catch (error) {
      this.logger.error('failed to create Admin', error);
    }
  }
}
