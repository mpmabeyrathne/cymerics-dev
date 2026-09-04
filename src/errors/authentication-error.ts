import { AppError } from "./app-error.js";

export class AuthenticationError extends AppError{
   constructor(
    message: string
   ){
    super(
        'AUTHENTICATION_ERROR',
        401,
        message
    )

    this.name = 'AuthenticationError';
   }
}
