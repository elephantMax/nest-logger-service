import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, UserDTO } from 'src/shared/dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserDTO> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDTO> {
    return this.authService.login(body);
  }
}