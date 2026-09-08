# Repository Layer

## Overview

The repository layer provides an abstraction for database and persistence operations.

Repositories isolate data access from application and business logic. Services interact with repositories instead of directly communicating with the database.

## Responsibilities

Repositories are responsible for:

- Database access
- Data persistence
- Data retrieval
- Data updates
- Data deletion
- Encapsulating database queries
- Providing a consistent data-access interface to services

## What Repositories Should Not Do

Repositories should not:

- Contain business logic
- Handle HTTP requests or responses
- Access Fastify request or reply objects
- Define API routes
- Decide application-level business rules
- Return HTTP responses

Business decisions belong in the service layer.

## Request Flow

The repository layer is part of the following architecture:

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

The repository is the boundary between application logic and persistence infrastructure.

## Service-Repository Interaction

Services communicate with repositories for persistence operations.

```text
Service
    ↓
Repository
    ↓
Database
```

Services should not execute database queries directly.

## Repository Structure

Repositories should be organized by feature or domain.

Example:

```text
src/
└── repositories/
    ├── users.repository.ts
    ├── agents.repository.ts
    ├── projects.repository.ts
    └── executions.repository.ts
```

Class naming follows the resource name:

```text
UsersRepository
AgentsRepository
ProjectsRepository
ExecutionsRepository
```

## Repository Abstraction

Repositories should provide clear methods representing persistence operations.

For example, conceptually:

```text
UsersRepository
    ├── findById
    ├── findMany
    ├── create
    ├── update
    └── delete
```

The exact implementation will depend on the database technology used by Cymerics.

## Repository Interfaces

Repository interfaces may be introduced when they provide value for dependency inversion and testing.

Conceptually:

```text
UsersService
      ↓
UsersRepository Interface
      ↓
Concrete Repository
      ↓
PostgreSQL
```

This allows services to depend on an abstraction rather than a specific database implementation.

## Database Independence

The repository layer isolates database-specific implementation details.

The service layer should not need to know whether data is stored using PostgreSQL, another database, or another persistence mechanism.

```text
Service
   ↓
Repository Abstraction
   ↓
Database Implementation
```

This makes future infrastructure changes easier to manage.

## Error Handling

Repositories may propagate database or persistence errors to the service layer.

Repositories should not convert database errors into HTTP responses.

```text
Database Error
    ↓
Repository
    ↓
Service
    ↓
Application Error Handling
```

Database-specific error translation can be introduced where required by the application architecture.

## Testing

Repositories should be testable independently from services.

Repository integration tests can verify actual database behavior when PostgreSQL is introduced.

Services can use mocked repositories for unit testing.

```text
Unit Test:
Service → Mock Repository

Integration Test:
Repository → Test Database
```

## Future PostgreSQL Integration

Cymerics will use the repository layer as the boundary for future PostgreSQL integration.

The database implementation will be introduced without requiring controllers to communicate directly with PostgreSQL.

Future architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

## Architectural Principle

> Repositories handle persistence and data access. They do not contain business logic or HTTP concerns.

This separation keeps database-specific operations isolated from the application's business logic.
