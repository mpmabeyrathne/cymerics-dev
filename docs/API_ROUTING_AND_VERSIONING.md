# API Routing and Versioning

## Overview

Cymerics uses a modular REST API routing structure with URL-based API versioning.

Business APIs are versioned under `/api/v1`, while infrastructure endpoints such as health and readiness checks remain unversioned.

## Route Structure

```text
src/
└── routes/
    ├── health.routes.ts
    ├── readiness.routes.ts
    └── v1/
        ├── index.ts
        ├── users.routes.ts
        ├── agents.routes.ts
        ├── projects.routes.ts
        └── executions.routes.ts
```

## API Versioning

Business APIs use URL-based versioning.

Example:

```text
/api/v1/users
/api/v1/agents
/api/v1/projects
```

Future breaking API changes can introduce a new version:

```text
/api/v2/users
```

Versioning allows existing clients to continue using the previous API contract while newer clients migrate to the new version.

## Infrastructure Endpoints

Health and readiness endpoints are not versioned because they are infrastructure-level endpoints rather than business APIs.

```text
GET /health
GET /readiness
```

## Route Registration

The `v1/index.ts` module acts as the composition point for all version 1 routes.

Conceptually:

```text
app.ts
  ↓
/api/v1
  ↓
v1/index.ts
  ↓
Feature route modules
```

Each feature owns its own route definitions.

For example:

```text
v1/
├── users.routes.ts
├── agents.routes.ts
└── projects.routes.ts
```

## Route Responsibilities

Route modules are responsible for defining HTTP routes and connecting them to the appropriate controllers.

Routes should not contain business logic or database operations.

The expected request flow is:

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

## Routing Principles

- Business APIs must be placed under `/api/v1`.
- Infrastructure endpoints remain unversioned.
- Routes are organized by feature.
- Route modules should remain focused on HTTP routing.
- Business logic belongs in services.
- Database access belongs in repositories.
- Controllers handle HTTP request/response concerns.
- API versions must remain independently maintainable.
- New breaking API contracts should use a new API version rather than silently changing an existing contract.

## Current API Version

The current business API version is:

```text
v1
```

Base path:

```text
/api/v1
```

## Future Versioning

When a breaking API change is required, a new version can be introduced:

```text
/api/v1/...
/api/v2/...
```

Non-breaking changes should generally remain within the existing API version.

## Architectural Decision

Cymerics uses:

- URL-based API versioning
- Feature-based route organization
- Modular route registration
- Unversioned infrastructure endpoints
- Separation between routes, controllers, services, and repositories

This structure provides a clear foundation for future REST API development and allows the API to evolve without unnecessarily breaking existing clients.
