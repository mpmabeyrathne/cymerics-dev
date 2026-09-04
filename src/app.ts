import Fastify from "fastify";
import { APP_CONFIG } from "./configuration/index.js";
import { registerErrorHandler, AppError } from "./errors/index.js";

export function buildApp(){
    const app = Fastify({
        logger : true
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

    app.get('/test-unknown-error', async () => {
        throw new Error('Something unexpected happened');
    });

    return app;
}