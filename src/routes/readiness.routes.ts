import type { FastifyInstance } from 'fastify';

export async function readinessRoutes(app: FastifyInstance) {
    app.get('/ready', async () => {
        return {
            status: 'ready',
        };
    });
}