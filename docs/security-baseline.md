# Security Baseline

## Purpose

Cymerics implements a basic HTTP security baseline to provide secure defaults for the application.

This baseline focuses on:

- Security-related HTTP headers
- Request size limits
- CORS configuration
- Content type handling
- Information leakage prevention
- Secure application defaults

## Security Headers

The application uses `@fastify/helmet` to configure common HTTP security headers.

Helmet helps protect the application against common browser-based security risks by adding appropriate security-related response headers.

Security headers are applied globally to HTTP responses.

## Request Size Limit

The application limits the maximum HTTP request body size to **1 MB**.

Requests exceeding the configured limit are rejected.

This prevents unnecessarily large request payloads from consuming excessive application resources.

```text
Maximum request body: 1 MB
```

## CORS

Cross-Origin Resource Sharing (CORS) is explicitly configured using `@fastify/cors`.

CORS origins are controlled through application configuration rather than allowing arbitrary origins.

### Development

The development frontend origin can be explicitly configured, for example:

```text
http://localhost:3000
```

### Production

Production environments should specify the trusted frontend origin through environment configuration.

Arbitrary origins should not be allowed by default.

## Content-Type Handling

The application uses Fastify's built-in content type handling.

JSON API requests are expected to use:

```text
Content-Type: application/json
```

Invalid JSON payloads and unsupported request formats are rejected by the framework.

Request validation is handled separately by the application's request validation layer.

## Information Leakage

Internal application details must not be exposed to clients.

The application must not return:

- Stack traces
- Database errors
- Internal file paths
- Credentials
- API keys
- Tokens
- Other internal implementation details

Unexpected application errors return a safe generic response while detailed error information is logged server-side.

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

## Secure Defaults

The application follows secure-by-default principles:

- Request bodies have a defined size limit.
- Security headers are enabled through Helmet.
- CORS origins are explicitly configured.
- Internal error details are not exposed to clients.
- Sensitive credentials and tokens must not be logged or returned in responses.

## Scope

This security baseline provides foundational HTTP protections.

Authentication, authorization, rate limiting, advanced API security, and other application-level security controls are handled by separate features and phases.
