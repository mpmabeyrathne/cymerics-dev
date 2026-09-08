import { z } from 'zod';

export const createUserBodySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
});

export const listUsersQuerySchema = z
    .object({
        page: z.coerce.number().int().positive().default(1),

        limit: z.coerce.number().int().min(1).max(100).default(20),
    })
    .strict();

export const userParamsSchema = z.object({
    id: z.string().min(1, 'User ID is required'),
});

export const apiHeadersSchema = z
    .object({
        'x-api-key': z.string().min(1, 'API key is required'),
    })
    .loose();
