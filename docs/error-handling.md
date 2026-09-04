# Error Handling

All backend errors use a consistent response structure.

## Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}