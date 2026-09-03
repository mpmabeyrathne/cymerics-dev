import { ENV_CONFIG } from './config/env.js';
import { buildApp } from './app.js';

const server = buildApp();

const start = async () =>{
    try{
        await server.listen({
            port: ENV_CONFIG.PORT,
            host: '0.0.0.0'
        });
    }catch(error){
        server.log.error(error);
        process.exit(1);
    }
 
};

start();