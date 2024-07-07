import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProjectSchema = z.object({
  name: z.string(),
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}
