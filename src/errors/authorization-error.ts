import { AppError } from "./index.js";

export class authorizationError extends AppError{
   constructor(
    message: string
   ){
    super(
        'AUTHORIZATION_ERROR',
        403,
        message
    )

    this.name = 'authorizationError';
   }
}
