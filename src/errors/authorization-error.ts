import { AppError } from "./app-error.js";

export class AuthorizationError extends AppError{
   constructor(
    message: string
   ){
    super(
        'AUTHORIZATION_ERROR',
        403,
        message
    )

    this.name = 'AuthorizationError';
   }
}
