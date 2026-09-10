---
sidebar_position: 2
---

# Development setup

## Clone and boot

```bash
git clone https://github.com/baxela/baxela.git
cd baxela
cp .env.example .env
docker compose up -d
```

The first start bootstraps the backend automatically (composer install,
key generation, migrations). See
[Installation](/docs/guide/installation) for the full walkthrough and
[Develop stack](/docs/deployment/develop-stack) for the services and
profiles.

## Backend work

Shell into the `app` container for artisan and composer:

```bash
docker compose exec app bash

# or one-off commands:
docker compose exec app php artisan test
docker compose exec app composer install
```

## Frontend work

The admin and storefront dev servers run in the `frontend` compose
profile (on by default). To run them on the host instead, see
[Admin — Getting started](/docs/admin/getting-started) and
[Storefront — Getting started](/docs/storefront/getting-started).

## Conventions

Each app documents its own conventions in its `AGENTS.md` (repo root and
`apps/backend`, `apps/admin`, `apps/storefront`). Read the relevant one
before touching an app — they cover module structure, Action/Controller
patterns, feature anatomy, i18n rules, and known gotchas.

Commits follow the
[commit convention](/docs/contributing/commit-convention):
`<type>(<scope>): <subject>` with a mandatory scope.

## This documentation site

The docs site lives in its own repository. Run it locally with:

```bash
pnpm install
pnpm start
```
