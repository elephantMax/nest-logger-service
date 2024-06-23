import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // TODO: apply ZodSerializer
  @Get()
  async getAll() {
    return this.userService.getAll();
  }
}
