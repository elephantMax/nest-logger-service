import { z } from 'nestjs-zod/z';
import { authTokensDTO } from 'src/tokens/dto';

export const refreshResponseDTO = z.object({
  tokens: authTokensDTO,
});

export type RefreshResponseDTO = z.infer<typeof refreshResponseDTO>;
