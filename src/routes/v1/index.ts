import { FastifyInstance } from 'fastify';

import { usersRoutes } from './users.routes.js';

export function registerV1Routes(app: FastifyInstance): void {
    app.register(usersRoutes);
}
