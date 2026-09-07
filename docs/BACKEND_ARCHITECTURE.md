# Backend Architecture

## Overview

Cymerics is a production-oriented Node.js backend application built with TypeScript and Fastify.

The application follows a layered architecture to keep responsibilities separated and make the codebase easier to maintain, test, and extend.

## Folder Structure

```text
src/
├── configuration/
├── controllers/
├── errors/
├── middleware/
├── plugins/
├── repositories/
├── routes/
├── services/
├── types/
├── utilities/
├── validation/
├── app.ts
└── server.ts
```

### Folder Responsibilities

| Folder           | Responsibility                                      |
| ---------------- | --------------------------------------------------- |
| `configuration/` | Environment variables and application configuration |
| `controllers/`   | Handle HTTP requests and responses                  |
| `errors/`        | Application error classes and error handling        |
| `middleware/`    | Request/response processing logic                   |
| `plugins/`       | Fastify plugins and integrations                    |
| `repositories/`  | Database access                                     |
| `routes/`        | API route definitions                               |
| `services/`      | Business logic                                      |
| `types/`         | Shared TypeScript types                             |
| `utilities/`     | Reusable helper functions                           |
| `validation/`    | Request and input validation                        |
| `app.ts`         | Creates and configures the Fastify application      |
| `server.ts`      | Starts the server and handles shutdown              |

## Application Layers

The backend uses separate layers for different responsibilities.

```text
Routes
  ↓
Validation
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Database
```

### Routes

Routes define API endpoints and connect HTTP requests to controllers.

### Validation

Validation verifies incoming data before it reaches the application logic.

Zod is used for schema validation.

### Controllers

Controllers handle HTTP-specific responsibilities such as reading request data and returning responses.

Controllers should not contain complex business logic.

### Services

Services contain the main business logic of the application.

Services should be independent from HTTP-specific details where possible.

### Repositories

Repositories are responsible for communicating with the database.

This keeps database access separate from business logic.

## Request Lifecycle

A typical request follows this flow:

```text
Client
  ↓
Fastify
  ↓
Route
  ↓
Validation
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
  ↓
Repository
  ↓
Service
  ↓
Controller
  ↓
HTTP Response
```

This separation makes each part of the application easier to understand and test.

## Error Handling

Cymerics uses centralized error handling.

Application-specific errors extend the base `AppError` class.

Examples include:

* `ValidationError`
* `AuthenticationError`
* `AuthorizationError`
* `ConflictError`
* `NotFoundError`
* `InternalError`

Errors are handled by the global error handler and converted into appropriate HTTP responses.

Application code should use appropriate application errors instead of returning inconsistent error responses.

## Configuration

Environment variables are loaded using `dotenv`.

Configuration is validated using Zod before the application starts.

```text
Environment Variables
        ↓
      dotenv
        ↓
   Zod Validation
        ↓
Application Configuration
```

Invalid configuration should prevent the application from starting.

Sensitive values such as tokens and credentials must not be committed to the repository.

## Logging

Fastify's built-in logger is used for application logging.

Logging should provide useful information for:

* Application startup
* Server shutdown
* HTTP requests
* Errors
* Important application events

Logs should not contain sensitive information such as passwords, tokens, or secrets.

## Testing Strategy

The project uses Vitest for automated testing.

Testing is organized around application behavior and individual components.

The CI pipeline runs:

```text
Type Check
    ↓
Lint
    ↓
Test
    ↓
Build
```

All required checks should pass before changes are merged into `main`.

## Architectural Principles

The backend follows these principles:

1. Keep responsibilities separated.
2. Keep business logic inside services.
3. Keep database access inside repositories.
4. Validate external input before processing it.
5. Use centralized error handling.
6. Keep configuration separate from application logic.
7. Write testable and maintainable code.
8. Avoid unnecessary coupling between layers.

## Adding New Features

New backend features should follow the existing architecture.

A typical feature should use:

```text
Route
  ↓
Validation
  ↓
Controller
  ↓
Service
  ↓
Repository
```

Not every feature requires every layer. Simple features may omit unnecessary layers when there is no business or database logic.

## Architectural Decisions

Current architectural decisions include:

* Node.js is used as the backend runtime.
* TypeScript is used with strict type checking.
* Fastify is used as the HTTP framework.
* ESM is used for JavaScript modules.
* Zod is used for validation.
* Vitest is used for testing.
* Configuration is validated during application startup.
* Application errors are handled centrally.
* The application and server startup are separated between `app.ts` and `server.ts`.

Architectural decisions should be updated when major changes are introduced.
