import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto';
import { CreateUserDto, UserDTO, userDTO } from 'src/shared/dto';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { LoginResponseDTO, loginResponseDTO } from './dto/login-response.dto';
import { AuthJwtPayloadDTO } from 'src/tokens/dto/authJwtPayload.dto';
import { EnvService } from 'src/env/env.service';
import {
  RefreshResponseDTO,
  refreshResponseDTO,
} from './dto/refresh-response.dto';

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

  async register(dto: CreateUserDto): Promise<UserDTO> {
    const salt = this.envService.get('PASSWORD_SALT');
    const password = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.create({
      login: dto.login,
      name: dto.name,
      password,
    });

    return userDTO.parse(user);
  }

  async refresh(refreshToken: string): Promise<RefreshResponseDTO> {
    const payload = await this.tokensService.verifyRefreshToken(refreshToken);

    const tokens = await this.tokensService.generateAuthToken(payload);

    return refreshResponseDTO.parse({
      tokens,
    });
  }

  async getAuthorizedUser(login: string): Promise<UserDTO> {
    const user = await this.userService.findByLogin(login);

    return userDTO.parse(user);
  }
}
