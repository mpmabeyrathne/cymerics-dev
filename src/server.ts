import { buildApp } from './app.js';
import { ENV_CONFIG } from './configuration/index.js';

const server = buildApp();

const start = async () => {
    try {
        server.log.info('Starting application');

        await server.listen({
            port: ENV_CONFIG.PORT,
            host: ENV_CONFIG.HOST,
        });
    } catch (error) {
        server.log.error(error, 'Application startup failed');
        process.exit(1);
    }
};

const shutdown = async (signal: string) => {
    server.log.info(
        { signal },
        'Application shutdown initiated',
    );

    try {
        await server.close();

        server.log.info('Application shutdown completed');

        process.exit(0);
    } catch (error) {
        server.log.error(
            { error },
            'Application shutdown failed',
        );

        process.exit(1);
    }
};

process.once('SIGINT', () => {
    void shutdown('SIGINT');
});

process.once('SIGTERM', () => {
    void shutdown('SIGTERM');
});

void start();