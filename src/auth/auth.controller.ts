import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, UserDTO } from 'src/shared/dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { RefreshResponseDTO } from './dto/refresh-response.dto';
import { AuthGuard } from 'src/shared/guards/at.guard';
import { GetCurrentUser } from 'src/shared/decorators/get-current-user.decorator';
import { AuthJwtPayloadDTO } from 'src/tokens/dto/authJwtPayload.dto';

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

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@GetCurrentUser() user: AuthJwtPayloadDTO): Promise<UserDTO> {
    return this.authService.getAuthorizedUser(user.login);
  }
}
