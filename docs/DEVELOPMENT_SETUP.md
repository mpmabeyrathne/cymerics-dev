# Development Setup

This document explains how to set up and run Cymerics locally for development.

## Requirements

Before starting, install:

* Node.js 20 or later
* npm
* Git
* Docker (optional, for containerized development)

Check the installed versions:

```bash
node --version
npm --version
git --version
docker --version
```

## Clone the Repository

Clone the repository and enter the project directory:

```bash
git clone https://github.com/mpmabeyrathne/cymerics-dev.git
cd cymerics-dev
```

## Install Dependencies

Install the project dependencies:

```bash
npm ci
```

## Environment Configuration

Create a `.env` file in the project root.

Configure the required environment variables:

```env
NODE_ENV=development
PORT=3000
HOST=localhost

GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-github-owner
GITHUB_REPO=your-github-repository
GITHUB_PROJECT_TOKEN=your-github-project-token
GITHUB_PROJECT_NUMBER=1

LOG_LEVEL=info
CORS_ORIGIN=http://localhost:3000
```

Do not commit `.env` files or secrets to Git.

## Development

Start the development server:

```bash
npm run dev
```

The application runs on:

```text
http://localhost:3000
```

## Health Check

Check whether the application is running:

```bash
curl http://localhost:3000/health
```

## Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Code Quality Checks

Run type checking:

```bash
npm run typecheck
```

Run linting:

```bash
npm run lint
```

Check formatting:

```bash
npm run format:check
```

Run all checks:

```bash
npm run check
```

## Build

Build the application:

```bash
npm run build
```

Start the production build:

```bash
npm start
```

## Docker

Build and start the application using Docker Compose:

```bash
docker compose up --build
```

Run in the background:

```bash
docker compose up -d --build
```

View container logs:

```bash
docker compose logs -f
```

Stop the containers:

```bash
docker compose down
```

## Troubleshooting

### Port Already in Use

If port `3000` is already being used, stop the process using the port or configure another port in the environment configuration.

### Dependencies Are Not Working

Remove the installed dependencies and reinstall:

```bash
rm -rf node_modules
npm ci
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

### Environment Validation Error

Check that all required environment variables are configured correctly in `.env`.

### Docker Container Is Not Starting

Check the container logs:

```bash
docker compose logs
```

Rebuild the containers:

```bash
docker compose down
docker compose up --build
```

## Development Workflow

For normal development:

```text
Clone Repository
      ↓
Install Dependencies
      ↓
Configure Environment
      ↓
Start Development Server
      ↓
Make Changes
      ↓
Run Tests
      ↓
Run Quality Checks
      ↓
Create Pull Request
```

All changes should follow the project's branch, commit, and pull request conventions.
