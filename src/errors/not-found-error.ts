import { AppError } from "./index.js";

export class notFoundError extends AppError{
   constructor(
    message: string
   ){
    super(
        'NOT_FOUND_ERROR',
        404,
        message
    )

    this.name = 'notFoundError';
   }
}

