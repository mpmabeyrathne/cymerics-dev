import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import { ENV_CONFIG } from './configuration/index.js';
import { registerErrorHandler } from './errors/index.js';
import { healthRoutes } from './routes/health.routes.js';
import { readinessRoutes } from './routes/readiness.routes.js';

export function buildApp() {
    const app = Fastify({
        logger: {
            level: ENV_CONFIG.LOG_LEVEL,
        },
        requestIdHeader: 'x-request-id',
        bodyLimit: 1048576,
    });

    app.addHook('onSend', async (request, reply) => {
        reply.header('X-Request-ID', request.id);
    });

    // Register plugins
    app.register(helmet);

    app.register(cors, {
        origin: ENV_CONFIG.CORS_ORIGIN,
    });

    // Register error handler
    registerErrorHandler(app);

    // Register routes
    app.register(healthRoutes);
    app.register(readinessRoutes);

    return app;
}
