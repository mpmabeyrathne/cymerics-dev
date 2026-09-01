import Fastify from 'fastify'
import { APP_CONFIG } from './config/constants.js';
import 'dotenv/config';

const PORT = Number(process.env.PORT ?? 3999);
if (!Number.isFinite(PORT)) throw new Error(`Invalid PORT: ${process.env.PORT}`);
const server = Fastify({logger: true});

server.get('/', async () => {
    return {
        message : `${APP_CONFIG.name} backend is running`
    }
});

const start = async () =>{
    try{
        await server.listen({
            port: PORT,
            host: '0.0.0.0'
        });
    }catch(error){
        server.log.error(error);
        process.exit(1);
    }
 
};

start();