import { AppError } from "./index.js";

export class authenticationError extends AppError{
   constructor(
    message: string
   ){
    super(
        'AUTHENTICATION_ERROR',
        401,
        message
    )

    this.name = 'authenticationError';
   }
}
