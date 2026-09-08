import { FastifyRequest } from 'fastify';
import { z } from 'zod';

import { validate } from '../validation/validate.js';

interface ValidationSchemas {
    body?: z.ZodType;
    query?: z.ZodType;
    params?: z.ZodType;
    headers?: z.ZodType;
}

export function validateRequest(schemas: ValidationSchemas) {
    return async function (request: FastifyRequest): Promise<void> {
        if (schemas.body) {
            request.body = validate(schemas.body, request.body);
        }

        if (schemas.query) {
            request.query = validate(schemas.query, request.query);
        }

        if (schemas.params) {
            request.params = validate(schemas.params, request.params);
        }

        if (schemas.headers) {
            request.params = validate(schemas.headers, request.headers);
        }
    };
}
