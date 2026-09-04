import { AppError } from "./index.js";

export class internalError extends AppError{
   constructor(
    message: string
   ){
    super(
        'INTERNAL_ERROR',
        500,
        message
    )

    this.name = 'internalError';
   }
}
