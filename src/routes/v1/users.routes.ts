import { FastifyInstance } from 'fastify';

export async function usersRoutes(app: FastifyInstance): Promise<void> {
    app.get('/users', async () => {
        return {
            message: 'Users endpoint',
        };
    });
}
