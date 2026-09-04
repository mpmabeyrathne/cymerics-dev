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
        server.log.error(
            error,
            'Application startup failed',
        );

        process.exit(1);
    }
};

let isShuttingDown = false;

const shutdown = async (signal: string) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    server.log.info(
        { signal },
        'Application shutdown initiated',
    );

    const shutdownTimeout = setTimeout(() => {
        server.log.error(
            'Shutdown timeout exceeded',
        );

        process.exit(1);
    }, 10_000);

    try {
        await server.close();

        clearTimeout(shutdownTimeout);

        server.log.info(
            'Application shutdown completed',
        );

        process.exit(0);
    } catch (error) {
        clearTimeout(shutdownTimeout);

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