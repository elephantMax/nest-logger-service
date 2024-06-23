import { createZodValidationPipe } from 'nestjs-zod';
import { ValidationException } from '../exceptions/validaton.exception';
import { ZodError } from 'zod';

export const ValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    return new ValidationException(error);
  },
});
