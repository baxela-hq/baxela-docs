---
sidebar_position: 1
---

# Getting started

The storefront is the customer-facing app of the platform — a Next.js App
Router application that consumes the Baxela Laravel API for catalog
browsing, product pages (with a specifications tab from the catalog
attribute system), cart, checkout, payments, and customer accounts.

Multilingual by default: English and Farsi (RTL) via `next-intl`, with
locale routing under `app/[locale]/`.

Checkout offers the payment methods returned by
`GET /payment/user/methods` — hosted drivers like Stripe redirect to the
gateway and land back on the `/payment/return` page, which polls the
order's payment status. Signed-in customers also get notifications: a
header bell with unread badge and an inbox under
`/profile/notifications`.

## Tech stack

| Concern | Choice                                               |
| ------- | ---------------------------------------------------- |
| Runtime | Next.js (App Router), React 19, TypeScript           |
| Styling | Tailwind CSS v4                                      |
| i18n    | next-intl (`en` / `fa`, RTL-ready)                   |
| API     | fetch wrapper in `lib/api` (server + client helpers) |

## Running it

The storefront runs as part of the monorepo develop stack:

```bash
# from the repo root
cp .env.example .env
docker compose up -d
# → http://localhost:3000 (storefront), :5173 (admin), :8085 (API)
```

No host Node needed; the container installs dependencies on first start.
To run on the host instead:

```bash
pnpm install
cp .env.example .env.local   # then adjust the API URL
pnpm dev
```

### Environment variables

| Variable                   | Description                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Browser-facing API base URL (e.g. `http://localhost:8085/api/v1`)                                          |
| `SERVER_API_BASE_URL`      | Optional override for server-side (SSR) fetches — used inside the compose networks to reach nginx directly |

## Commands

```bash
pnpm dev      # start the dev server (HMR)
pnpm build    # production build (.next/standalone — used by the prod Docker image)
pnpm start    # serve the production build
pnpm lint     # ESLint
```

## Project structure

```text
app/[locale]/        # locale-scoped routes (shop pages, auth, account)
lib/api/             # fetch wrapper + server-side helpers, shared types
```

Full conventions — route organization, API layer patterns, i18n rules —
are documented in the app's `AGENTS.md`. Read it before contributing.

## Deployment

The production image (`infrastructure/docker/production/storefront/` in
the monorepo) builds the standalone server and runs `server.js` behind the
port published by `docker-compose.prod.yml`.
`NEXT_PUBLIC_API_BASE_URL` is baked in at build time;
`SERVER_API_BASE_URL` is provided at runtime. See
[Production stack](/deployment/production-stack).
