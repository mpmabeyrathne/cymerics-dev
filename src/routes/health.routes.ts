import { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance){
    app.get('/health', ()=> {
        return {
            status: 'ok',
        };
    })
}