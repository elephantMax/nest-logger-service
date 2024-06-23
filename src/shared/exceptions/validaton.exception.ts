import { HttpException, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

export class ValidationException extends HttpException {
  constructor(private error: ZodError) {
    super(error.name, HttpStatus.BAD_REQUEST);
  }

  getResponse(): string | object {
    const errors = this.error.flatten((issue) => ({
      message: issue.message,
      errorCode: issue.code,
    }));

    return {
      name: this.name,
      status: this.getStatus(),
      data: {
        code: this.error.name,
        errors: Object.keys(errors.fieldErrors).reduce((acc, key) => {
          const [firstError] = errors.fieldErrors[key];
          acc[key] = firstError.errorCode;
          return acc;
        }, {}),
      },
    };
  }
}
