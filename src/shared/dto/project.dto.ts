import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { userDTO } from './user.dto';

export const projectDTO = z.object({
  id: z.string(),
  name: z.string(),
  user: userDTO,
});

export class ProjectDTO extends createZodDto(projectDTO) {}
