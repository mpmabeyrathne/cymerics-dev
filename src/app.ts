import Fastify from "fastify";
import { APP_CONFIG, ENV_CONFIG } from "./configuration/index.js";
import { registerErrorHandler, AppError } from "./errors/index.js";
import { healthRoutes } from "./routes/health.routes.js";
import { readinessRoutes } from "./routes/readiness.routes.js";

export function buildApp(){
    const app = Fastify({
        logger : {
            level: ENV_CONFIG.LOG_LEVEL,
        },
        requestIdHeader: 'x-request-id',
    });

    app.addHook('onSend', async (request, reply) => {
        reply.header('X-Request-ID', request.id);
    });

     // Register plugins
     registerErrorHandler(app);

    // Register routes
    app.register(healthRoutes);
    app.register(readinessRoutes);
    
    return app;
}