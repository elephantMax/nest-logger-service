import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  name: z.string(),
  login: z.string(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
