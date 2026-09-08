import { FastifyInstance } from 'fastify';

import {
    apiHeadersSchema,
    createUserBodySchema,
    listUsersQuerySchema,
    userParamsSchema,
} from '../../validation/schemas/users.schema.js';

import { validateRequest } from '../../middleware/validate-request.js';

export async function usersRoutes(app: FastifyInstance): Promise<void> {
    app.get(
        '/users',
        {
            preHandler: validateRequest({
                headers: apiHeadersSchema,
                query: listUsersQuerySchema,
            }),
        },
        async () => {
            return {
                message: 'Users endpoint',
            };
        },
    );

    app.post(
        '/users',
        {
            preHandler: validateRequest({
                body: createUserBodySchema,
            }),
        },
        async () => {
            return {
                message: 'Users create endpoint',
            };
        },
    );

    app.get(
        '/users/:id',
        {
            preHandler: validateRequest({
                params: userParamsSchema,
            }),
        },
        async () => {
            return {
                message: 'User endpoint',
            };
        },
    );
}
