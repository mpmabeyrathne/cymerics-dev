# Controller Layer

## Overview

The controller layer is responsible for handling HTTP requests and responses.

Controllers act as the boundary between the HTTP layer and the application's business logic. They receive requests from routes, delegate business operations to services, and return appropriate HTTP responses.

Controllers must not contain business logic or direct database access.

## Responsibilities

Controllers are responsible for:

- Handling HTTP requests
- Extracting request parameters, query parameters, and request bodies
- Calling the appropriate service methods
- Handling service results
- Returning HTTP responses
- Setting appropriate HTTP status codes
- Passing errors to the centralized error-handling system

## What Controllers Should Not Do

Controllers should not:

- Contain business logic
- Execute database queries
- Access repositories directly
- Manage database connections
- Implement complex business rules
- Perform unrelated application operations

Business logic belongs in the service layer, while database access belongs in the repository layer.

## Request Flow

Cymerics follows the following request flow:

```text
Client
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

The response follows the reverse direction:

```text
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

## Controller-Service Interaction

Controllers delegate business operations to services.

```text
Controller
    ↓
Service
```

The controller should not implement the business operation itself.

For example, when retrieving users:

```text
GET /api/v1/users
        ↓
UsersController
        ↓
UsersService
```

The controller is responsible for HTTP handling, while the service is responsible for the actual application operation.

## Request Handling

Controllers may extract data from:

- URL parameters
- Query parameters
- Request body
- Request headers

Example request:

```text
GET /api/v1/users/123
```

The controller can extract the user ID from the route parameters and pass it to the service.

```text
HTTP Request
      ↓
Controller
      ↓
Extract user ID
      ↓
UsersService
```

Request validation should be performed using the application's validation layer before business operations are executed.

## Response Handling

Controllers are responsible for converting service results into HTTP responses.

A controller should:

- Return the appropriate response data
- Use consistent response structures
- Set appropriate HTTP status codes
- Avoid exposing internal implementation details

Example:

```text
Service Result
      ↓
Controller
      ↓
HTTP Response
```

Response formatting should follow the API response conventions defined for Cymerics.

## Error Handling

Controllers should not implement complex error-handling logic.

Application and business errors should be propagated to the centralized error-handling system.

```text
Controller
    ↓
Service
    ↓
Error
    ↓
Central Error Handler
    ↓
HTTP Error Response
```

Controllers may allow known application errors to propagate rather than manually creating error responses for every case.

## Naming Convention

Controllers should use the following naming convention:

```text
<resource>.controller.ts
```

Examples:

```text
users.controller.ts
agents.controller.ts
projects.controller.ts
executions.controller.ts
```

Class names should follow:

```text
UsersController
AgentsController
ProjectsController
ExecutionsController
```

## Controller Structure

Controllers should be organized by resource or feature.

Example:

```text
src/
└── controllers/
    ├── users.controller.ts
    ├── agents.controller.ts
    ├── projects.controller.ts
    └── executions.controller.ts
```

As the application grows, related controllers can be grouped into feature-specific directories if necessary.

## Dependency Direction

The controller layer depends on the service layer.

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
```

Controllers should not bypass the service layer to access repositories directly.

This keeps business logic centralized in services and prevents HTTP concerns from leaking into lower application layers.

## Separation of Concerns

Each layer has a specific responsibility:

| Layer        | Responsibility                     |
| ------------ | ---------------------------------- |
| Routes       | Define HTTP routes                 |
| Controllers  | Handle HTTP requests and responses |
| Services     | Implement business logic           |
| Repositories | Handle data access                 |
| Database     | Persist application data           |

This separation makes the application easier to maintain, test, and extend.

## Future API Implementation

When implementing an actual feature, the complete request flow will use all required layers together.

For example:

```text
GET /api/v1/users
        ↓
users.routes.ts
        ↓
UsersController
        ↓
UsersService
        ↓
UsersRepository
        ↓
PostgreSQL
```

The controller, service, and repository will therefore be implemented together when an actual API feature requires them.

## Architectural Principle

The controller layer should remain thin.

> Controllers handle HTTP concerns. Services handle business logic. Repositories handle data access.

This principle should be followed throughout the Cymerics backend.
