import { z } from 'nestjs-zod/z';
import { userDTO } from 'src/shared/dto';

export const authJwtPayloadDTO = z
  .object({
    sub: z.string(),
  })
  .merge(userDTO)
  .omit({ id: true });

export type AuthJwtPayloadDTO = z.infer<typeof authJwtPayloadDTO>;
