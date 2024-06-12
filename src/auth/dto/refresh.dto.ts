import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RefreshSchema = z.object({
  refreshToken: z.string(),
});

export class RefreshDTO extends createZodDto(RefreshSchema) {}
