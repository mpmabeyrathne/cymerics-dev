# REST API Standards

## 1. Purpose

This document defines the REST API standards for the Cymerics backend.

The goal is to ensure that all API endpoints follow consistent conventions for routing, HTTP methods, resources, requests, responses, and query parameters.

All future REST API features should follow these standards.

---

## 2. API Base URL

All REST API endpoints should use the following structure:

```text
/api/v1
```

Example:

```text
/api/v1/users
/api/v1/projects
/api/v1/agents
```

The `/v1` prefix allows future API versions to be introduced without breaking existing clients.

---

## 3. HTTP Methods

HTTP methods should represent the operation being performed on a resource.

| Method | Purpose                               |
| ------ | ------------------------------------- |
| GET    | Retrieve resources                    |
| POST   | Create a new resource                 |
| PUT    | Replace an existing resource          |
| PATCH  | Partially update an existing resource |
| DELETE | Delete a resource                     |

Examples:

```text
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

The HTTP method should describe the operation. The URL should identify the resource.

---

## 4. Resource Naming

REST API resources should use nouns rather than actions.

### Recommended

```text
/users
/projects
/agents
/tasks
```

### Avoid

```text
/getUsers
/createUser
/deleteUser
/getProjects
```

Resource names should use plural nouns for collection endpoints.

Individual resources should use the resource identifier:

```text
/users/:id
/projects/:id
/agents/:id
```

---

## 5. URL Structure

API URLs should follow a predictable structure:

```text
/api/v1/{resource}
```

For a specific resource:

```text
/api/v1/{resource}/{id}
```

Examples:

```text
/api/v1/users
/api/v1/users/123

/api/v1/projects
/api/v1/projects/456
```

Nested resources may be used when there is a clear parent-child relationship.

Example:

```text
/api/v1/projects/123/tasks
```

URLs should use lowercase characters and hyphens when multiple words are required.

Example:

```text
/api/v1/api-keys
```

---

## 6. JSON Format

REST API request and response bodies should use JSON.

Example request:

```json
{
    "name": "Example Agent",
    "description": "An AI agent"
}
```

Successful responses should follow a consistent structure.

Example:

```json
{
    "data": {
        "id": "123",
        "name": "Example Agent"
    }
}
```

Collection responses should use the same response convention.

Example:

```json
{
    "data": [
        {
            "id": "123",
            "name": "Agent One"
        },
        {
            "id": "456",
            "name": "Agent Two"
        }
    ]
}
```

The API should not use different response property names such as `result`, `payload`, or `items` for the same purpose.

---

## 7. Content Type

JSON requests should use:

```text
Content-Type: application/json
```

Clients should send the appropriate `Accept` header when required.

Example:

```text
Accept: application/json
```

---

## 8. Query Parameters

Query parameters should be used for operations such as:

- Pagination
- Filtering
- Searching
- Sorting

Example:

```text
/api/v1/users?page=1&limit=20
```

Filtering:

```text
/api/v1/users?status=active
```

Searching:

```text
/api/v1/users?search=pasindu
```

Sorting:

```text
/api/v1/users?sort=createdAt
```

Query parameter names should remain consistent across endpoints.

---

## 9. Pagination Convention

Collection endpoints that can return large amounts of data should support pagination.

The standard parameters are:

```text
page
limit
```

Example:

```text
GET /api/v1/users?page=1&limit=20
```

Pagination will be implemented and standardized further in `PH02-010`.

---

## 10. Filtering Convention

Filtering should be performed using query parameters.

Example:

```text
GET /api/v1/agents?status=active
```

Multiple filters may be provided when required:

```text
GET /api/v1/agents?status=active&type=autonomous
```

Filtering rules should be defined per resource while maintaining consistent query parameter naming.

Filtering will be implemented further in `PH02-011`.

---

## 11. Resource Relationships

When resources have a clear relationship, nested routes may be used.

Example:

```text
GET /api/v1/projects/:projectId/tasks
```

This represents tasks belonging to a specific project.

Nested routes should not be used excessively. If a resource can be independently addressed, a top-level resource may be more appropriate.

---

## 12. API Versioning

The initial API version will use:

```text
/api/v1
```

Example:

```text
/api/v1/users
```

Breaking API changes should result in a new API version when required.

Example:

```text
/api/v1/users
/api/v2/users
```

Existing API versions should remain stable for their supported clients.

The detailed routing and versioning strategy will be defined in `PH02-002`.

---

## 13. General REST Principles

Cymerics REST APIs should follow these principles:

1. URLs represent resources.
2. HTTP methods represent operations.
3. Requests and responses use JSON.
4. API behavior should be predictable and consistent.
5. Business logic should not be implemented inside route definitions.
6. Request validation should be performed before business logic execution.
7. API errors should use a consistent structure.
8. HTTP status codes should accurately represent the result of an operation.
9. Collection endpoints should support pagination when appropriate.
10. Query parameters should follow consistent naming conventions.

---

## 14. Example API Design

A future Agents API may follow this structure:

```text
GET    /api/v1/agents
POST   /api/v1/agents
GET    /api/v1/agents/:id
PATCH  /api/v1/agents/:id
DELETE /api/v1/agents/:id
```

With pagination:

```text
GET /api/v1/agents?page=1&limit=20
```

With filtering:

```text
GET /api/v1/agents?status=active
```

With a related resource:

```text
GET /api/v1/agents/:id/executions
```

---

## 15. Future Standards

The following areas will be defined in subsequent Phase 02 tasks:

- API routing and versioning
- Controller architecture
- Service architecture
- Repository architecture
- Request validation
- Response conventions
- Error handling
- HTTP status codes
- Pagination
- Filtering
- REST API testing
- API documentation

This document provides the foundational REST API rules that those components should follow.
