import { describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app.js';

describe('Application bootstrap', () => {
    it('creates the application successfully', async () => {
        const app = buildApp();

        await app.ready();

        expect(app).toBeDefined();

        await app.close();
    });

    it('responds to the health endpoint', async () => {
        const app = buildApp();

        const response = await app.inject({
            method: 'GET',
            url: '/health',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: 'ok',
        });

        await app.close();
    });
});
