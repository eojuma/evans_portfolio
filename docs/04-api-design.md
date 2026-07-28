# API Design Specification

**Document Information**

| Field        | Value                    |
| ------------ | ------------------------ |
| Project      | Evans Portfolio          |
| Document     | API Design Specification |
| Document ID  | DOC-004                  |
| Version      | 1.0                      |
| Status       | Draft                    |
| Owner        | Evans Juma               |
| Last Updated | 2026-07-28               |

---

# 1. Purpose

This document defines the REST API specification for the Evans Portfolio application.

The API serves as the communication layer between the frontend and backend, providing access to portfolio content, project information, technical articles, and contact functionality.

This specification acts as the contract that both frontend and backend implementations will follow.

---

# 2. API Design Principles

The API follows these principles:

* RESTful resource-oriented design.
* Consistent request and response structures.
* Predictable HTTP status codes.
* Stateless communication.
* JSON as the primary data format.
* Clear and descriptive endpoint naming.
* Versioned API endpoints.

---

# 3. Base URL

Development

```text
http://localhost:8080/api/v1
```

Production

```text
https://api.evansportfolio.com/api/v1
```

The production URL is a placeholder and will be updated during deployment.

---

# 4. Resources

Version 1 of the API exposes the following resources:

* Projects
* Articles
* Skills
* Contact
* Health

Future resources may include:

* Authentication
* Dashboard
* Analytics

---

# 5. Endpoint Overview

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/projects`        | Retrieve all projects     |
| GET    | `/projects/{slug}` | Retrieve a single project |
| GET    | `/articles`        | Retrieve all articles     |
| GET    | `/articles/{slug}` | Retrieve a single article |
| GET    | `/skills`          | Retrieve technical skills |
| POST   | `/contact`         | Submit a contact request  |
| GET    | `/health`          | API health check          |

---

# 6. Resource Models

## Project

```json
{
  "id": 1,
  "title": "Fintech Labs",
  "slug": "fintech-labs",
  "description": "Banking application built with Go.",
  "technologies": [
    "Go",
    "PostgreSQL",
    "Docker"
  ],
  "githubUrl": "https://github.com/eojuma/fintech-labs",
  "liveUrl": null,
  "featured": true
}
```

---

## Article

```json
{
  "id": 1,
  "title": "Understanding DNS Lookup",
  "slug": "understanding-dns-lookup",
  "summary": "A deep dive into how DNS resolution works.",
  "publishedAt": "2026-07-10"
}
```

---

## Skill

```json
{
  "name": "Go",
  "category": "Backend",
  "level": "Intermediate"
}
```

---

# 7. Request and Response Standards

Successful requests should return:

| Status Code | Meaning          |
| ----------- | ---------------- |
| 200         | Success          |
| 201         | Resource created |

Client errors should return:

| Status Code | Meaning            |
| ----------- | ------------------ |
| 400         | Bad Request        |
| 401         | Unauthorized       |
| 404         | Resource Not Found |
| 422         | Validation Error   |

Server errors should return:

| Status Code | Meaning               |
| ----------- | --------------------- |
| 500         | Internal Server Error |

---

# 8. Error Response Format

All errors should follow a consistent structure.

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Requested project does not exist."
  }
}
```

---

# 9. Pagination Strategy

Endpoints returning collections should support pagination.

Recommended query parameters:

* `page`
* `limit`

Example:

```text
GET /projects?page=1&limit=10
```

Future enhancements may include sorting and filtering.

---

# 10. Filtering and Searching

Collection endpoints may support optional query parameters.

Examples:

```text
GET /projects?featured=true

GET /articles?tag=networking

GET /projects?technology=go
```

---

# 11. Versioning Strategy

The API uses URI versioning.

Example:

```text
/api/v1/projects
```

Future versions should introduce `/api/v2` without breaking existing clients.

---

# 12. Security Considerations

Version 1 is intentionally public for portfolio content.

Future versions may introduce:

* JWT authentication
* Role-based authorization
* Rate limiting
* Input validation
* CORS configuration

---

# 13. Future Enhancements

Potential API additions include:

* Authentication endpoints
* Administrative content management
* File upload support
* Search API
* Analytics API

---

# 14. Related Documents

* README.md
* DOC-001 — Project Overview
* DOC-002 — Software Architecture
* DOC-003 — Design System
* DOC-005 — Development Guide
* DOC-006 — Deployment Guide
