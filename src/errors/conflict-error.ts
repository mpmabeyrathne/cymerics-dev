import { AppError } from "./index.js";

export class confictError extends AppError{
   constructor(
    message: string
   ){
    super(
        'CONFLICT_ERROR',
        409,
        message
    )

    this.name = 'confictError';
   }
}
