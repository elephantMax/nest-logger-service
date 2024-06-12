import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  authJwtPayloadDTO,
  AuthJwtPayloadDTO,
} from 'src/tokens/dto/authJwtPayload.dto';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): AuthJwtPayloadDTO => {
    const request = context.switchToHttp().getRequest();
    return authJwtPayloadDTO.parse(request.user);
  },
);
