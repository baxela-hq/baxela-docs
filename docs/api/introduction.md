---
sidebar_position: 1
---

# API introduction

:::caution Work in progress
Endpoint-by-endpoint reference is on its way — generated from the backend's
OpenAPI document. The overview below covers what is stable today: base
URL, authentication, and request conventions.
:::

Baxela is headless: everything the admin panel and storefront do goes
through the same public REST API.

## Base URL

All API routes are versioned under `/api/v1`, served by nginx + php-fpm:

```text
http://localhost:8085/api/v1
```

## Authentication

The API uses **Laravel Sanctum** tokens, and customer flows support
passwordless OTP sign-in (see
[Authentication](/backend/authentication)). Send the token as a
bearer header:

```http
Authorization: Bearer <token>
```

## Conventions

- **Filtering** — list endpoints accept `filter[field]` query parameters
  (powered by spatie/laravel-query-builder), alongside sorting and
  pagination parameters. The admin's server-driven tables are plain
  renderings of this contract.
- **Validation errors** — standard Laravel validation error responses.
- **Rate limiting** — public endpoints (such as the contact form) are
  per-IP rate limited.

## Tooling

- **Bruno collections** — ready-to-run requests for every flow live in
  `api/bruno/` in the monorepo. Open them with
  [Bruno](https://www.usebruno.com/) and point them at your local stack.
- **OpenAPI** — the backend generates its OpenAPI document automatically
  with [Scramble](https://scramble.dedoc.co/) (`dedoc/scramble`), so the
  specification is always derived from the actual code.
