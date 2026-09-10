---
sidebar_position: 2
---

# Production stack

The production stack is `docker-compose.prod.yml` — a single-server deploy
with dedicated containers for each concern:

| Service         | Port   | Notes                                                                   |
| --------------- | ------ | ----------------------------------------------------------------------- |
| `backend`       | —      | php-fpm, production image                                               |
| `backend-nginx` | `8080` | Serves the API                                                          |
| `migrate`       | —      | One-shot `php artisan migrate --force`; fpm/queue/scheduler wait for it |
| `queue`         | —      | `php artisan queue:work`                                                |
| `scheduler`     | —      | `php artisan schedule:work`                                             |
| `admin`         | `8081` | Built admin SPA served as static files                                  |
| `storefront`    | `8082` | Next.js standalone server                                               |
| `mysql`         | —      | MySQL 8 with healthcheck; **no published port** by default              |
| `redis`         | —      | Redis 7 with AOF persistence                                            |

## Running it

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

:::warning
A bare `docker compose up -d` (without `-f`) starts the **development**
stack — always pass `--env-file` and `-f` in production.
:::

## Notes

- **Migrations are one-shot.** The `migrate` service runs to completion
  first; `backend`, `queue`, and `scheduler` wait for it, so they never
  race migrations against each other.
- **Images are self-contained.** Build contexts are the repo root, so both
  images are reusable as-is in Kubernetes later.
- **Frontend env vars are bake-time.** `NEXT_PUBLIC_API_BASE_URL` and the
  `VITE_*` variables are build arguments; `SERVER_API_BASE_URL` for the
  storefront is provided at runtime.
- **Database access.** Reach MySQL via the compose network, or publish a
  port explicitly if you need host access.
- Build assets (Dockerfiles, nginx configs, php.ini) live in
  `infrastructure/docker/production/` in the monorepo.
