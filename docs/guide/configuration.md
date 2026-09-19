---
sidebar_position: 2
---

# Configuration

Baxela is configured through environment variables at three layers: the
compose stack at the repo root, and one `.env` per app.

## Root compose environment (`.env`)

These variables drive `docker-compose.yml` — ports, database credentials,
and which profiles start.

| Variable              | Default          | Description                                                |
| --------------------- | ---------------- | ---------------------------------------------------------- |
| `COMPOSE_PROFILES`    | `frontend`       | Compose profiles to enable; empty for a backend-only stack |
| `BACKEND_APP_PORT`    | `8085`           | Host port for the backend (nginx)                          |
| `ADMIN_DEV_PORT`      | `5173`           | Host port for the admin dev server                         |
| `STOREFRONT_DEV_PORT` | `3000`           | Host port for the storefront dev server                    |
| `BACKEND_MYSQL_PORT`  | `3308`           | Host port for MySQL                                        |
| `BACKEND_REDIS_PORT`  | `6378`           | Host port for Redis                                        |
| `MAILPIT_PORT`        | `8025`           | Host port for Mailpit (`mail` profile)                     |
| `DEV_DB_DATABASE`     | `baxela_backend` | Develop database name                                      |
| `DEV_DB_USERNAME`     | `baxela`         | Develop database user                                      |
| `DEV_DB_PASSWORD`     | `password`       | Develop database password                                  |
| `MYSQL_ROOT_PASSWORD` | `password`       | MySQL root password                                        |

## Admin panel (`apps/admin/.env`)

| Variable               | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `VITE_API_BASE_URL`    | Base URL of the Baxela API, e.g. `http://localhost:8085/api/v1` |
| `VITE_STORE_FRONT_URL` | Storefront base URL, used for product/page preview links        |

## Storefront (`apps/storefront/.env.local`)

| Variable                   | Description                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Browser-facing API base URL, e.g. `http://localhost:8085/api/v1`                                                                  |
| `SERVER_API_BASE_URL`      | Optional override for server-side (SSR) fetches — inside the compose network this reaches nginx directly (`http://web:80/api/v1`) |

## Backend (`apps/backend/.env`)

The Laravel application keeps its own `.env` (database, Redis, mail,
Sanctum stateful domains, and so on) exactly like any Laravel app. The
develop stack bind-mounts `apps/backend` into the container, so editing it
on the host applies to the running stack.

Notable backend-specific variables:

| Variable                      | Description                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `STRIPE_SECRET`               | Stripe API secret key; the `stripe` payment method is only offered when it is set |
| `STRIPE_WEBHOOK_SECRET`       | Signing secret for `POST /api/v1/payment/webhook/stripe`                          |
| `STRIPE_SUCCESS_URL`          | Storefront return page after hosted checkout (`{order_code}` templated)           |
| `STRIPE_CANCEL_URL`           | Storefront return page for cancelled checkouts                                    |
| `ADMIN_NOTIFICATION_EMAILS`   | Comma-separated admin recipients for email notifications (default: mail sender)   |
| `ADMIN_NOTIFICATION_USER_IDS` | Restrict database admin notifications to fixed user ids (default: all staff)      |

See [Payment flow](/architecture/flows/payment-flow) for how the Stripe
variables are used. The shared-hosting deploy tool keeps its connection
settings in `.env.sharedhosting` at the repo root (see
[Shared hosting](/deployment/shared-hosting)).
