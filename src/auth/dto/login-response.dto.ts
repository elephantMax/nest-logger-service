import { z } from 'nestjs-zod/z';
import { userDTO } from 'src/shared/dto';
import { authTokensDTO } from 'src/tokens/dto';

export const loginResponseDTO = z.object({
  user: userDTO,
  tokens: authTokensDTO,
});

export type LoginResponseDTO = z.infer<typeof loginResponseDTO>;
