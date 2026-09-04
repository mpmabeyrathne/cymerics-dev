import { AppError } from "./app-error.js";

export class ValidationError extends AppError{
   constructor(
    message: string
   ){
    super(
        'VALIDATION_ERROR',
        400,
        message
    )

    this.name = 'ValidationError';
   }
}

