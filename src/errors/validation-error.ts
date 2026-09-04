import { AppError } from "./index.js";

export class validationError extends AppError{
   constructor(
    message: string
   ){
    super(
        'VALIDATION_ERROR',
        400,
        message
    )

    this.name = 'validationError';
   }
}

