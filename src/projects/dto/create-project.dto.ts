import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProjectSchema = z.object({
  name: z.string().min(3),
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}
