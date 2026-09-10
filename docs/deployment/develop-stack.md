---
sidebar_position: 1
---

# Develop stack

The develop stack is `docker-compose.yml` at the monorepo root — the
default compose file. It runs php-fpm + nginx + MySQL + Redis with the
backend source bind-mounted from `apps/backend` (no host PHP required),
plus the admin and storefront dev servers behind the `frontend` profile.

```bash
cp .env.example .env
docker compose up -d
```

First-time Laravel setup (composer install, key generation, migrations)
runs automatically on boot.

## Services

| Service      | Image                       | Port   | Notes                                    |
| ------------ | --------------------------- | ------ | ---------------------------------------- |
| `app`        | `baxela/backend:develop`    | —      | php-fpm; backend source bind-mounted     |
| `web`        | `nginx:stable-bookworm`     | `8085` | Serves the API; health-checked via `/up` |
| `admin`      | `baxela/admin:develop`      | `5173` | Vite dev server (`frontend` profile)     |
| `storefront` | `baxela/storefront:develop` | `3000` | Next.js dev server (`frontend` profile)  |
| `mysql`      | `mysql:8-debian`            | `3308` | Database with healthcheck                |
| `redis`      | `redis:7-bookworm`          | `6378` | Cache/queues with healthcheck            |
| `mail`       | `axllent/mailpit`           | `8025` | Catch-all mail UI (`mail` profile)       |

## Profiles

- `frontend` (on by default via `COMPOSE_PROFILES` in `.env.example`) —
  starts the admin and storefront dev servers. Set `COMPOSE_PROFILES=`
  (empty) for a backend-only stack.
- `mail` — starts Mailpit so every outgoing email is catchable at
  `http://localhost:8025`.

## Backend-only mode

Handy when working on the API without the frontends:

```bash
COMPOSE_PROFILES= docker compose up -d
```

## Health

The nginx service healthcheck curls `/up`, which passes through php-fpm
into Laravel — a healthy `web` service means the whole request path works.

All host ports are overridable through the root `.env` (see
[Configuration](/docs/guide/configuration)).
