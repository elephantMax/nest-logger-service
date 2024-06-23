import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { userDTO } from 'src/shared/dto';
import { authTokensDTO } from 'src/tokens/dto';

export const loginResponseDTO = z.object({
  user: userDTO,
  tokens: authTokensDTO,
});

export class LoginResponseDTO extends createZodDto(loginResponseDTO) {}
