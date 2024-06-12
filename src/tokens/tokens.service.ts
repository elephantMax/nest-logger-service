import { Injectable } from '@nestjs/common';
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
}
