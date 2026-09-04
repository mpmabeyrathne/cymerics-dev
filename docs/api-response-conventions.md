# API Response Conventions

## 1. Overview

Cymerics APIs use consistent response structures for successful and failed requests.

The purpose of these conventions is to ensure that all API consumers receive predictable and consistent responses regardless of which endpoint they interact with.

API responses are divided into two main categories:

* Success responses
* Error responses

A response must contain either `data` or `error`, but not both.

---

## 2. Response Structure

Cymerics follows the following high-level response structure:

```text
API Response
│
├── Success
│   ├── data
│   └── meta (optional)
│
└── Error
    └── error
        ├── code
        ├── message
        └── requestId
```

---

## 3. Success Responses

Successful API responses use a top-level `data` property.

### 3.1 Single Resource

For an endpoint returning a single resource:

```json
{
  "data": {
    "id": 123,
    "name": "Pasindu"
  }
}
```

The `data` property contains the requested resource.

---

### 3.2 Collection

For an endpoint returning multiple resources:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Pasindu"
    },
    {
      "id": 2,
      "name": "Kamal"
    }
  ]
}
```

The `data` property contains an array of resources.

---

### 3.3 Empty Success Response

For operations that do not need to return a resource, the API may return an empty response using HTTP `204 No Content`.

```http
HTTP/1.1 204 No Content
```

A `204` response must not contain a response body.

---

## 4. Response Metadata

Additional information about a response should be provided through an optional top-level `meta` property.

Example:

```json
{
  "data": [],
  "meta": {
    "timestamp": "2026-09-04T10:00:00Z"
  }
}
```

The `meta` property must not contain the primary resource data.

It is intended for information such as:

* Pagination information
* Response metadata
* Processing information
* Other non-resource information required by API consumers

The `meta` property is optional and should only be included when additional metadata is required.

---

## 5. Error Responses

All application errors use a consistent top-level `error` property.

Example:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "requestId": "req-123"
  }
}
```

Error responses must not contain a `data` property.

---

## 6. Error Fields

### 6.1 `code`

The `code` field contains an application-specific error code.

Example:

```json
{
  "code": "VALIDATION_ERROR"
}
```

Error codes provide a stable value that API consumers can use to identify the type of error.

Examples:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
NOT_FOUND
CONFLICT
INTERNAL_SERVER_ERROR
```

---

### 6.2 `message`

The `message` field provides a human-readable description of the error.

Example:

```json
{
  "message": "Resource not found"
}
```

Error messages should be safe for API consumers.

Internal implementation details must not be exposed through error messages.

---

### 6.3 `requestId`

The `requestId` identifies the request that generated the error.

Example:

```json
{
  "requestId": "req-123"
}
```

The request ID allows an API consumer to associate an error with the corresponding server-side logs.

---

## 7. Validation Errors

Invalid client input must use the standard error response structure.

Example:

```http
HTTP/1.1 400 Bad Request
```

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "requestId": "req-123"
  }
}
```

Validation errors may occur when:

* Request body is invalid
* Query parameters are invalid
* Path parameters are invalid
* Required headers are missing or invalid

Validation should happen before business logic is executed.

---

## 8. Authentication Errors

Authentication failures use HTTP `401 Unauthorized`.

Example:

```json
{
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Authentication required",
    "requestId": "req-123"
  }
}
```

---

## 9. Authorization Errors

Authorization failures use HTTP `403 Forbidden`.

Example:

```json
{
  "error": {
    "code": "AUTHORIZATION_ERROR",
    "message": "You do not have permission to perform this action",
    "requestId": "req-123"
  }
}
```

---

## 10. Not Found Errors

When a requested resource does not exist, the API returns HTTP `404 Not Found`.

Example:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "requestId": "req-123"
  }
}
```

---

## 11. Conflict Errors

When a request conflicts with the current state of a resource, the API returns HTTP `409 Conflict`.

Example:

```json
{
  "error": {
    "code": "CONFLICT",
    "message": "Resource already exists",
    "requestId": "req-123"
  }
}
```

---

## 12. Internal Server Errors

Unexpected server-side failures use HTTP `500 Internal Server Error`.

Example:

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "req-123"
  }
}
```

Internal error details must not be exposed to API consumers.

The following information must never be returned in production error responses:

* Stack traces
* Database queries
* Database credentials
* API keys
* Access tokens
* Passwords
* File system paths
* Internal service URLs
* Internal implementation details

Detailed information should only be available through server-side logs.

---

# 13. HTTP Status Code Conventions

Cymerics uses standard HTTP status codes to describe the result of an API request.

| Status Code                 | Usage                                                              |
| --------------------------- | ------------------------------------------------------------------ |
| `200 OK`                    | Request completed successfully                                     |
| `201 Created`               | A new resource was successfully created                            |
| `204 No Content`            | Request completed successfully without a response body             |
| `400 Bad Request`           | Request is invalid or cannot be processed because of invalid input |
| `401 Unauthorized`          | Authentication is required or authentication failed                |
| `403 Forbidden`             | Client is authenticated but does not have permission               |
| `404 Not Found`             | Requested resource does not exist                                  |
| `409 Conflict`              | Request conflicts with the current state of a resource             |
| `429 Too Many Requests`     | Client exceeded the allowed request rate                           |
| `500 Internal Server Error` | Unexpected server-side failure                                     |
| `503 Service Unavailable`   | Service or required dependency is temporarily unavailable          |

### Status Code Categories

```text
2xx → Successful request

4xx → Client/request error

5xx → Server/infrastructure error
```

HTTP status codes should accurately represent the result of the request.

---

# 14. Pagination

Collection endpoints may support pagination when the amount of returned data can become large.

Pagination requests should use:

```text
?page=<page>&limit=<limit>
```

Example:

```http
GET /users?page=1&limit=20
```

Paginated responses should use the `meta.pagination` structure.

Example:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Pasindu"
    },
    {
      "id": 2,
      "name": "Kamal"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### Pagination Fields

| Field        | Description                                   |
| ------------ | --------------------------------------------- |
| `page`       | Current page number                           |
| `limit`      | Maximum number of resources returned per page |
| `total`      | Total number of available resources           |
| `totalPages` | Total number of available pages               |

Pagination implementation is introduced at the endpoint level when required.

This convention does not require every collection endpoint to implement pagination.

---

# 15. Request ID Convention

Every API request must have a request ID.

The request ID is used to correlate:

* Client requests
* API responses
* Application logs
* Errors
* Downstream operations

The request ID should be available through the `X-Request-ID` HTTP header.

Example:

```http
X-Request-ID: req-123
```

The same request ID should be returned in the response header:

```http
X-Request-ID: req-123
```

For error responses, the request ID should also be included in the response body:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "requestId": "req-123"
  }
}
```

This allows API consumers to provide the request ID when reporting a problem, while developers can use the same ID to locate the corresponding logs.

---

# 16. Request ID Lifecycle

The request ID follows the request throughout its lifecycle.

```text
Client
  │
  │ X-Request-ID: req-123
  ↓
API Server
  │
  ├── Route
  │
  ├── Controller
  │
  ├── Service
  │
  └── Repository
  │
  ↓
Application Logs
  │
  └── reqId: req-123
```

If a request ID is supplied by the client and accepted by the application, it should be preserved throughout the request lifecycle.

If no request ID is supplied, the application generates one.

---

# 17. Health and Readiness Endpoints

Health and readiness endpoints are infrastructure-oriented endpoints and may use simplified response structures.

### Health

```http
GET /health
```

Example:

```json
{
  "status": "ok"
}
```

### Readiness

```http
GET /ready
```

Example:

```json
{
  "status": "ready"
}
```

These endpoints are intended for load balancers, deployment platforms, and infrastructure monitoring and therefore do not need to follow the standard business-resource `data` envelope.

---

# 18. Response Consistency Rules

All Cymerics APIs should follow these rules:

1. Successful resource responses use the `data` property.
2. Collection responses use `data` as an array.
3. Additional response metadata uses the optional `meta` property.
4. Error responses use the `error` property.
5. A response must not contain both `data` and `error`.
6. Error responses must contain a stable application error `code`.
7. Error responses must contain a safe human-readable `message`.
8. Error responses should include the associated `requestId`.
9. HTTP status codes must accurately represent the result of the request.
10. `204 No Content` responses must not contain a response body.
11. Sensitive information must never be exposed through API responses.
12. Pagination metadata should only be included when pagination is used.
13. Request IDs must be available for request tracing.
14. Health and readiness endpoints may use simplified infrastructure-specific responses.

---

# 19. Example Response Patterns

## Successful GET

```http
GET /users/123
```

```http
200 OK
```

```json
{
  "data": {
    "id": 123,
    "name": "Pasindu"
  }
}
```

---

## Successful POST

```http
POST /users
```

```http
201 Created
```

```json
{
  "data": {
    "id": 123,
    "name": "Pasindu"
  }
}
```

---

## Successful DELETE

```http
DELETE /users/123
```

```http
204 No Content
```

No response body is returned.

---

## Validation Failure

```http
400 Bad Request
```

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "requestId": "req-123"
  }
}
```

---

## Resource Not Found

```http
404 Not Found
```

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "requestId": "req-123"
  }
}
```

---

## Unexpected Server Error

```http
500 Internal Server Error
```

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "req-123"
  }
}
```

---

# 20. Summary

Cymerics uses a consistent API response convention:

```text
Success
{
  "data": {},
  "meta": {}
}
```

and:

```text
Error
{
  "error": {
    "code": "...",
    "message": "...",
    "requestId": "..."
  }
}
```

These conventions provide a predictable API contract for clients while supporting error handling, request tracing, pagination, and future API growth.
