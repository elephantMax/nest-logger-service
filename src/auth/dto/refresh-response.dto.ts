import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { authTokensDTO } from 'src/tokens/dto';

export const refreshResponseDTO = z.object({
  tokens: authTokensDTO,
});

export class RefreshResponseDTO extends createZodDto(refreshResponseDTO) {}
