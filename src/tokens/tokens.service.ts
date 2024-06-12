import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokensDTO, authTokensDTO } from './dto';
import { AuthJwtPayloadDTO, authJwtPayloadDTO } from './dto/authJwtPayload.dto';
import { EnvService } from 'src/env/env.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    private envService: EnvService,
    private jwtService: JwtService,
  ) {}

  async generateAuthToken(payload: AuthJwtPayloadDTO): Promise<AuthTokensDTO> {
    const parsedPayload = authJwtPayloadDTO.parse(payload);

    const atSecret = this.envService.get('JWT_AT_SECRET');
    const atExpiresIn = this.envService.get('JWT_AT_EXPIRES_IN');

    const rtSecret = this.envService.get('JWT_RT_SECRET');
    const rtExpiresIn = this.envService.get('JWT_RT_EXPIRES_IN');

    const accessToken = await this.jwtService.signAsync(parsedPayload, {
      secret: atSecret,
      expiresIn: atExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(parsedPayload, {
      secret: rtSecret,
      expiresIn: rtExpiresIn,
    });

    return authTokensDTO.parse({ accessToken, refreshToken });
  }

  async verifyRefreshToken(refreshToken: string): Promise<AuthJwtPayloadDTO> {
    try {
      const rtSecret = this.envService.get('JWT_RT_SECRET');

      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: rtSecret,
      });

      if (!payload) {
        throw new UnauthorizedException('refresh token has been expired');
      }

      return authJwtPayloadDTO.parse(payload);
    } catch (error) {
      throw new UnauthorizedException('invalid refresh token');
    }
  }

  async verifyAccessToken(accessToken: string): Promise<AuthJwtPayloadDTO> {
    try {
      const atSecret = this.envService.get('JWT_AT_SECRET');

      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: atSecret,
      });

      if (!payload) {
        throw new UnauthorizedException('refresh token has been expired');
      }

      return authJwtPayloadDTO.parse(payload);
    } catch (error) {
      throw new UnauthorizedException('invalid refresh token');
    }
  }
}
