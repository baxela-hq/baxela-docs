---
sidebar_position: 3
---

# Directory structure

Baxela is a monorepo bundling the backend, admin panel, and storefront
frontends plus shared API collections and infrastructure:

```text
baxela/
├── apps/
│   ├── backend/          # API / backend (Laravel)
│   ├── admin/            # Admin panel (React + Vite)
│   └── storefront/       # Next.js storefront
├── api/
│   └── bruno/            # Bruno API collections
├── docs/                 # Cross-project documentation
├── infrastructure/
│   ├── docker/           # Docker build assets per environment (Dockerfiles, nginx, php.ini)
│   └── sharedhosting/    # Shared-hosting deploy tool (deploy.sh, post-deploy runner)
├── .github/              # CI / PR templates
├── docker-compose.yml    # Develop stack (default): docker compose up -d
├── docker-compose.prod.yml # Production stack (single-server deploy)
└── README.md
```

## Layout rules

- Each app owns its code, config, and its own `.env`.
- Compose entrypoints live at the repo root — `docker-compose.yml` for
  development (the default), `docker-compose.prod.yml` for production.
  Their build assets (Dockerfiles, nginx configs, php.ini) live in
  `infrastructure/docker/<environment>/`.
- The shared-hosting deploy tool and its `env.app.example` live in
  `infrastructure/sharedhosting/` (see
  [Shared hosting](/deployment/shared-hosting)); its connection settings
  come from `.env.sharedhosting` at the repo root.
- Cross-project documentation lives in `docs/`; per-app developer
  conventions live in each app's `AGENTS.md`.
