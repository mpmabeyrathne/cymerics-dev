# Service Layer

## Overview

The service layer contains application and business logic.

Services act as the main application layer between controllers and repositories. Controllers handle HTTP concerns, while services handle application operations and business rules.

## Responsibilities

Services are responsible for:

- Implementing application and business logic
- Coordinating application operations
- Applying business rules
- Calling repositories when data access is required
- Transforming or coordinating data between application layers
- Propagating application errors
- Providing independently testable business operations

## What Services Should Not Do

Services should not:

- Handle HTTP requests or responses
- Access Fastify request or reply objects
- Define HTTP routes
- Execute database queries directly
- Manage database connections
- Depend on HTTP-specific concerns

Database operations should be delegated to repositories.

## Request Flow

The service layer follows this architecture:

```text
HTTP Request
    ↓
Route
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

The service layer is responsible for the application operation between the controller and repository layers.

## Controller-Service Interaction

Controllers delegate application operations to services.

```text
Controller
    ↓
Service
```

Controllers should remain focused on HTTP concerns, while services contain application and business logic.

## Business Logic Separation

Business rules should be implemented in services rather than controllers.

For example, when creating an agent, the controller may receive the request and pass the required data to the service.

```text
Controller
    ↓
AgentsService
    ↓
Business Rules
    ↓
Repository
```

This keeps controllers thin and makes business logic reusable from different entry points in the future.

## Service Structure

Services should be organized by feature or domain.

Example:

```text
src/
└── services/
    ├── users.service.ts
    ├── agents.service.ts
    ├── projects.service.ts
    └── executions.service.ts
```

Class naming follows the resource name:

```text
UsersService
AgentsService
ProjectsService
ExecutionsService
```

## Service-Repository Interaction

Services should use repositories for persistence operations.

```text
Service
    ↓
Repository
```

Services must not bypass the repository layer to access the database directly.

## Error Propagation

Services may throw or propagate application-level errors when business operations fail.

Errors should eventually be handled by the centralized error-handling system.

```text
Service
    ↓
Application Error
    ↓
Controller
    ↓
Central Error Handler
    ↓
HTTP Error Response
```

Services should not create HTTP-specific responses.

## Independent Testing

Services should be designed so their business logic can be tested independently from HTTP and database infrastructure.

Repository dependencies can be mocked during unit testing.

```text
UsersService
    ↓
Mock UsersRepository
```

This allows business logic to be tested without requiring a real database.

## Dependency Direction

The expected dependency direction is:

```text
Controller
    ↓
Service
    ↓
Repository
```

The service layer must not depend on controllers.

## Architectural Principle

> Services contain application and business logic. They do not handle HTTP concerns or direct database access.

This keeps business operations reusable, testable, and independent from the transport layer.
