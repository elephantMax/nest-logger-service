import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LoginSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export class LoginDTO extends createZodDto(LoginSchema) {}
