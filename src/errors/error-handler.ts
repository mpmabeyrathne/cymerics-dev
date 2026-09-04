import type { FastifyError, FastifyInstance } from "fastify";
import { AppError } from "./app-error.js";
import { request } from "http";
import { ZodError } from "zod";

export function registerErrorHandler(app: FastifyInstance){
    app.setErrorHandler((error: FastifyError, request, reply) =>{
        request.log.error(error);

        if (error instanceof AppError){
            return reply.status(error.statusCode).send({
                error:{
                    code: error.code,
                    message: error.message,
                },
            });
        }

        if(error instanceof ZodError){
            return reply.status(400).send({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Request validation failed',
                },
            });
        }

        if (error.statusCode) {
            return reply.status(error.statusCode).send({
                error: {
                    code: 'HTTP_ERROR',
                    message: 'Request could not be processed',
                },
            });
        }

        return reply.status(500).send({
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred',
            },
        })
    })
}