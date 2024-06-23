import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginDTO, UserDTO } from 'src/shared/dto';
import { AuthService } from './auth.service';
import { LoginResponseDTO, RefreshResponseDTO } from './dto';
import { RefreshDTO } from './dto';
import { AuthGuard } from 'src/shared/guards/at.guard';
import { GetCurrentUser } from 'src/shared/decorators/get-current-user.decorator';
import { AuthJwtPayloadDTO } from 'src/tokens/dto/authJwtPayload.dto';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ZodSerializerDto(UserDTO)
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @ZodSerializerDto(LoginResponseDTO)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @ZodSerializerDto(RefreshResponseDTO)
  @Post('refresh')
  async refresh(@Body() body: RefreshDTO) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(AuthGuard)
  @ZodSerializerDto(UserDTO)
  @Get('user')
  async getUser(@GetCurrentUser() user: AuthJwtPayloadDTO) {
    return this.authService.getAuthorizedUser(user.login);
  }
}
