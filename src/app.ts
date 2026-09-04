import Fastify from "fastify";
import { APP_CONFIG, ENV_CONFIG } from "./configuration/index.js";
import { registerErrorHandler, AppError } from "./errors/index.js";

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
    app.get('/', async () =>{
        return {
            message : `${APP_CONFIG.name} backend is running`
        }
    })

    app.get('/test-error', async () => {
        throw new AppError(
            'TEST_ERROR',
            400,
            'This is a test error',
        );
    });

    app.get('/test-request-error', async () => {
        throw new AppError(
            'TEST_ERROR',
            400,
            'Request ID test error',
        );
    });
    return app;
}