import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const userDTO = z.object({
  id: z.string(),
  name: z.string(),
  login: z.string(),
});

export class UserDTO extends createZodDto(userDTO) {}
