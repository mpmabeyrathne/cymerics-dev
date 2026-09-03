import Fastify from "fastify";
import { APP_CONFIG } from "./configuration/constants.js";

export function buildApp(){
    const app = Fastify({
        logger : true
    });

     // Register plugins
    // app.register(...)

    // Register routes
    app.get('/', async () =>{
        return {
            message : `${APP_CONFIG.name} backend is running`
        }
    })

    return app;
}