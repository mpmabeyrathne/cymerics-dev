import { ZodError, type ZodType } from 'zod';
import { ValidationError } from '../errors/index.js';

export function validate<T>(
    schema: ZodType<T>,
    data: unknown,
): T {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ValidationError('Request validation failed');
        }

        throw error;
    }
}