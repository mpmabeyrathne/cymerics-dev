import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        env: {
            NODE_ENV: 'test',
            PORT: '3000',
            HOST: '127.0.0.1',
            GITHUB_TOKEN: 'test-token',
            GITHUB_OWNER: 'test-owner',
            GITHUB_REPO: 'test-repo',
            GITHUB_PROJECT_TOKEN: 'test-project-token',
            GITHUB_PROJECT_NUMBER: '1',
            LOG_LEVEL: 'error',
            CORS_ORIGIN: 'http://localhost:3000',
        },
    },
});
