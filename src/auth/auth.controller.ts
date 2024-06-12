import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, UserDTO } from 'src/shared/dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { RefreshResponseDTO } from './dto/refresh-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserDTO> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(body);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshDTO): Promise<RefreshResponseDTO> {
    return this.authService.refresh(body.refreshToken);
  }
}
