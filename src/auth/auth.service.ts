import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from 'src/shared/dto';
import { CreateUserDto } from 'src/shared/dto';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { LoginResponseDTO, loginResponseDTO } from './dto';
import { AuthJwtPayloadDTO } from 'src/tokens/dto/authJwtPayload.dto';
import { EnvService } from 'src/env/env.service';
import { RefreshResponseDTO, refreshResponseDTO } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
    private envService: EnvService,
  ) {}

  async login(dto: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userService.findByLogin(dto.login);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('user not found');
    }

    const payload: AuthJwtPayloadDTO = {
      sub: user.id,
      login: user.login,
      name: user.name,
    };

    const tokens = await this.tokensService.generateAuthToken(payload);

    return loginResponseDTO.parse({
      tokens,
      user: user,
    });
  }

  async register(dto: CreateUserDto): Promise<User> {
    const salt = this.envService.get('PASSWORD_SALT');
    const password = await bcrypt.hash(dto.password, salt);

    return this.userService.create({
      login: dto.login,
      name: dto.name,
      password,
    });
  }

  async refresh(refreshToken: string): Promise<RefreshResponseDTO> {
    const payload = await this.tokensService.verifyRefreshToken(refreshToken);

    const tokens = await this.tokensService.generateAuthToken(payload);

    return refreshResponseDTO.parse({
      tokens,
    });
  }

  async getAuthorizedUser(login: string): Promise<User> {
    return this.userService.findByLogin(login);
  }

  async initAdmin() {
    const adminLogin = this.envService.get('ADMIN_LOGIN');
    const adminPassword = this.envService.get('ADMIN_PASSWORD');

    const adminDto: CreateUserDto = {
      login: adminLogin,
      password: adminPassword,
      name: 'admin',
    };

    return this.register(adminDto);
  }
}
