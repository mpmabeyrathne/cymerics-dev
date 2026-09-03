import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum([
        'development',
        'test',
        'production'
    ]),

    PORT: z.coerce
        .number()
        .int()
        .min(1)
        .max(65535),

    HOST: z.string().min(1),

    GITHUB_TOKEN: z.string().min(1),
    GITHUB_OWNER: z.string().min(1),
    GITHUB_REPO: z.string().min(1),

    GITHUB_PROJECT_TOKEN: z.string().min(1),

    GITHUB_PROJECT_NUMBER: z.coerce
        .number()
        .int()
        .positive(),
});