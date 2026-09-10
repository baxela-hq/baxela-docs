---
sidebar_position: 1
---

# Getting started

The Baxela backend is the Laravel application in `apps/backend/` — an
API-only modular monolith. It is the single source of truth for the
platform; the admin panel and storefront are its clients.

## Stack

- **PHP ≥ 8.3, Laravel** — API-only (no server-rendered views)
- **nwidart/laravel-modules** — modular monolith structure
- **Laravel Sanctum** — API authentication
- **spatie/laravel-query-builder** — convention-driven filtering/sorting of
  API resources
- **dedoc/scramble** — automatic OpenAPI generation
- **Pest** — the test framework
- **MySQL 8 + Redis 7** — persistence and queues/cache

## Running it

The backend runs as part of the monorepo develop stack (see
[Installation](/docs/guide/installation)):

```bash
cp .env.example .env
docker compose up -d
# API is served by nginx + php-fpm on http://localhost:8085
```

Inside the stack the app container is named `app`; shell into it for
artisan/composer commands:

```bash
docker compose exec app bash
```

## Testing

```bash
docker compose exec app php artisan test
```

## Extending the platform

The platform is built to be extended via:

1. **Events & listeners** — react to existing domain events (see
   [Events](/docs/architecture/events)).
2. **Module overrides** — override behavior where the module system allows.
3. **Custom modules** — create new modules with their own tables, routes
   and events.

Read [Architecture](/docs/architecture/modular-monolith) for how modules
communicate through Core contracts and gateways.
