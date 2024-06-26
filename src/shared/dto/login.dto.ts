import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const loginDto = z.object({
  login: z.string().min(5).max(30),
  password: z.string().min(6).max(30),
});

export class LoginDTO extends createZodDto(loginDto) {}
