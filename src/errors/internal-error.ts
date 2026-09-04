import { AppError } from "./app-error.js";

export class InternalError extends AppError{
   constructor(
    message: string
   ){
    super(
        'INTERNAL_SERVER_ERROR',
        500,
        message
    )

    this.name = 'InternalError';
   }
}
