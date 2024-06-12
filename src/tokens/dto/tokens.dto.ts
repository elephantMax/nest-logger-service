import { z } from 'nestjs-zod/z';

export const authTokensDTO = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthTokensDTO = z.infer<typeof authTokensDTO>;
