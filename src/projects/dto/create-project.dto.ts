import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProjectSchema = z.object({
  name: z.string().min(3),
  system: z.boolean().optional().default(false),
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}
