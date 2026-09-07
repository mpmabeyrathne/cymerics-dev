# Docker Development Environment

This document describes how to build, run, test, and manage the Cymerics development environment using Docker and Docker Compose.

## Overview

Cymerics uses Docker to provide a consistent and reproducible development environment.

The current Docker setup runs the Node.js API inside a container and provides a foundation for adding infrastructure services such as PostgreSQL and Redis in future development phases.

## Prerequisites

The following tools are required:

* Docker
* Docker Compose

Verify the installation:

```bash
docker --version
docker compose version
```

## Docker Files

The Docker development environment consists of the following files:

```text
cymerics-dev/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── DOCKER_DEVELOPMENT.md
```

### Dockerfile

The `Dockerfile` defines how the Cymerics application image is built.

The image:

1. Uses Node.js 20.
2. Sets `/app` as the working directory.
3. Copies `package.json` and `package-lock.json`.
4. Installs dependencies using `npm ci`.
5. Copies the application source code.
6. Builds the TypeScript application.
7. Exposes port `3000`.
8. Starts the application using `npm start`.

### Docker Compose

Docker Compose manages the local Cymerics API container.

The current Compose configuration provides:

```text
Docker Compose
      |
      v
+----------------------+
|    cymerics-api      |
|                      |
|    Node.js API       |
|    Port: 3000        |
+----------------------+
```

The Compose configuration is designed to be extended with PostgreSQL and Redis in future phases.

### .dockerignore

The `.dockerignore` file prevents unnecessary files from being copied into the Docker build context.

The following are excluded:

* `node_modules`
* `dist`
* `coverage`
* Environment files
* Git metadata
* GitHub workflow files
* npm debug logs

This keeps the Docker build context smaller and prevents local secrets and unnecessary files from being included in the image.

## Starting the Application

Build the Docker image and start the application:

```bash
docker compose up --build
```

The `--build` option rebuilds the image before starting the container.

The API will be available at:

```text
http://localhost:3000
```

## Running in Detached Mode

To run the application in the background:

```bash
docker compose up --build -d
```

The terminal can then be used for other commands.

## Checking Services

Check the current Compose service status:

```bash
docker compose ps
```

Example:

```text
NAME            SERVICE   STATUS
cymerics-api    api       running
```

## Application Logs

View the API logs:

```bash
docker compose logs -f api
```

Press `Ctrl+C` to stop following the logs.

## Health Check

The Cymerics API provides a health endpoint:

```text
GET /health
```

Open:

```text
http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

The endpoint can also be tested using `curl`:

```bash
curl http://localhost:3000/health
```

## Port Mapping

The application listens on port `3000` inside the container.

Docker maps the container port to the host machine:

```text
Host                         Container

localhost:3000  ---------->  3000
```

Therefore, the application can be accessed from the host using:

```text
http://localhost:3000
```

## Stopping the Application

Stop the running services:

```bash
docker compose stop
```

This stops the containers without removing them.

To stop and remove the containers:

```bash
docker compose down
```

## Rebuilding the Application

When the Dockerfile or dependencies change, rebuild the image:

```bash
docker compose up --build
```

To rebuild without using the Docker build cache:

```bash
docker compose build --no-cache
```

Then start the services:

```bash
docker compose up
```

## Environment Variables

The application uses environment variables for configuration.

The Docker Compose configuration provides development values for the container.

Real credentials and secrets must not be committed to the repository.

Sensitive values include:

* `GITHUB_TOKEN`
* `GITHUB_PROJECT_TOKEN`

Use appropriate environment-specific configuration or secret management when working with real credentials.

## Development Workflow

The recommended Docker development workflow is:

```text
Clone Repository
       |
       v
Install Docker
       |
       v
docker compose up --build
       |
       v
Application Starts
       |
       v
http://localhost:3000
       |
       v
GET /health
       |
       v
Develop / Test
       |
       v
docker compose down
```

### Typical Commands

Start the environment:

```bash
docker compose up --build
```

Start in the background:

```bash
docker compose up -d
```

Check services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f api
```

Stop services:

```bash
docker compose stop
```

Remove services:

```bash
docker compose down
```

Rebuild the image:

```bash
docker compose build
```

## Future Infrastructure

The current Docker environment contains the Cymerics API only.

Future development phases will introduce additional infrastructure services.

The planned local architecture is:

```text
                    +----------------+
                    |  Cymerics API  |
                    +-------+--------+
                            |
                 +----------+----------+
                 |                     |
                 v                     v
          +-------------+       +-------------+
          | PostgreSQL  |       |    Redis    |
          |  Database   |       |    Cache    |
          +-------------+       +-------------+
```

PostgreSQL and Redis will be added when required by their respective development phases.

## Production Considerations

This Docker configuration is intended for development.

Production-specific Docker optimization will be addressed separately.

Future production improvements may include:

* Multi-stage Docker builds
* Production-only dependencies
* Smaller runtime images
* Non-root container execution
* Container health checks
* Resource limits
* Production environment configuration
* Container security hardening

These concerns are intentionally outside the current development Docker setup.

## Summary

The Docker development environment provides:

* Reproducible application builds
* Consistent Node.js runtime
* Containerized application execution
* Docker Compose service management
* Development environment configuration
* A foundation for PostgreSQL and Redis integration

Docker is currently used as the local development environment for the Cymerics backend.
