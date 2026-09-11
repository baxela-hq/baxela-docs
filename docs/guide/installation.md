---
sidebar_position: 1
---

# Installation

## Requirements

- **Docker** and **Docker Compose** — the default develop stack needs
  nothing else on your host.
- Optional, for running the frontends on the host instead of in Docker:
  **Node.js ≥ 20.19** and **pnpm**.

## Quick start (Docker)

From the monorepo root:

```bash
git clone https://github.com/baxela/baxela.git
cd baxela
cp .env.example .env
docker compose up -d
```

That is the whole setup. On first start the backend container bootstraps
itself automatically — `composer install`, application key generation, and
migrations all run without manual steps.

| Service                | URL                                                              |
| ---------------------- | ---------------------------------------------------------------- |
| Backend API            | `http://localhost:8085`                                          |
| Admin panel            | `http://localhost:5173`                                          |
| Storefront             | `http://localhost:3000`                                          |
| MySQL                  | `localhost:3308` (user `baxela`, password `password` by default) |
| Redis                  | `localhost:6378`                                                 |
| Mailpit (mail profile) | `http://localhost:8025`                                          |

The admin and storefront dev servers run under the `frontend` compose
profile, which is enabled by default. For a backend-only stack set
`COMPOSE_PROFILES=` (empty) in `.env` before starting.

:::tip Manual bootstrap
The first-run bootstrap is automatic, but the equivalent manual steps are:

```bash
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

:::

## Running the frontends on the host

Each frontend app can also run on the host with its own dev server — see
[Admin — Getting started](/admin/getting-started) and
[Storefront — Getting started](/storefront/getting-started).

## Verifying the install

```bash
curl http://localhost:8085/up
```

The `/up` route goes through nginx and php-fpm into Laravel, so a `200`
response means the entire request path is healthy.

## What's next

Read [Configuration](/guide/configuration) for the available
environment variables, or [Deployment](/deployment/develop-stack) for
a tour of the develop stack and its profiles.
