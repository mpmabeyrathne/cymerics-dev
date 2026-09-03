
import { buildApp } from './app.js';
import { ENV_CONFIG } from './configuration/index.js';

const server = buildApp();

const start = async () =>{
    try{
        await server.listen({
            port: ENV_CONFIG.PORT,
            host: ENV_CONFIG.HOST
        });
    }catch(error){
        server.log.error(error);
        process.exit(1);
    }
 
};

const shutdown = async (signal: string) => {
    server.log.info(`Received ${signal}. Shutting down...`);

    try {
        await server.close();
        process.exit(0);
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();