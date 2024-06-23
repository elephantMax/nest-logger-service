import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { loginDto } from './login.dto';

const CreateUserSchema = z
  .object({
    name: z.string(),
  })
  .merge(loginDto);

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
