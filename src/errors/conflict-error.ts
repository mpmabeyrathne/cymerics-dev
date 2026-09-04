import { AppError } from "./app-error.js";

export class ConflictError extends AppError{
   constructor(
    message: string
   ){
    super(
        'CONFLICT_ERROR',
        409,
        message
    )

    this.name = 'ConflictError ';
   }
}
