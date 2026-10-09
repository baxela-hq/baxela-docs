---
sidebar_position: 1
---

# Getting started

The admin panel is a React SPA that consumes the Baxela Laravel API to
manage catalog, content, discounts, support, media, orders, users and
system settings. It is built on top of
[shadcn-admin](https://github.com/satnaing/shadcn-admin).

Multilingual and RTL-ready by design: the UI ships Farsi (`fa`) and
English (`en`) today, and content entities carry per-language translations
driven by the backend language list — more locales can be added without
structural changes. The UI language and its RTL/LTR direction follow the
**store's default language** (fetched at sign-in and after settings
changes); the config-drawer toggle acts as a cookie-persisted manual
override.

## Features

- **Dashboard** — live stats from the API: revenue with month-over-month
  change, 12-month/30-day series, order-status breakdown, top products,
  recent orders, and customer growth.
- **Catalog** — products (with variants, options, images and a photo per
  variant), categories with cover images, the featured-curation page for
  home-page products/categories, product SEO (with Google SERP preview),
  CSV product import (single- and multi-variant) and whole-catalog JSON
  import/export — every import audited.
- **Content** — CMS pages with rich-text editing (Tiptap), plus the
  blog: posts (per-language content, SEO tab with SERP preview,
  scheduled publishing, related products), post categories, and comment
  moderation.
- **Discounts** — coupon management (codes, windows, usage limits) and
  automatic promotions (product/category scoped, priority, price
  preview).
- **Support** — customer support tickets: threaded messages with author
  names resolved, status management, and notification deep links from
  the bell straight to a ticket.
- **Media library** — folders, uploads and a reusable media picker
  (including the CSV/JSON files used by imports).
- **Orders** — order management with status updates; amounts shown in
  each order's snapshotted currency, coupon and per-item promotion
  discounts on the detail page.
- **Payments** — payment-method management (activate/deactivate and
  reorder gateway methods) plus the payments list (filters by status,
  method, order, transaction) with confirm/fail settle actions for
  pending payments — the pathway for `manual` payments.
- **Notifications** — realtime header bell (Laravel Reverb) with unread
  badge and an inbox for order/payment/ticket events (mark read / mark
  all read), optionally delivered as OS-level browser notifications
  (web push).
- **Users & Settings** — admin users, device-session management with
  real sign-out, and system settings including the storefront theme
  selector.
- Server-driven data tables (pagination, sorting, `filter[field]` filters —
  all synced to the URL).
- Light/dark mode, layout variants, font options (per-language UI fonts,
  Vazirmatn for Farsi), LTR/RTL direction.
- Responsive, accessible, global search (Ctrl/Cmd+K).

## Tech stack

| Concern      | Choice                                                    |
| ------------ | --------------------------------------------------------- |
| Runtime      | React 19, Vite 7 (SWC), TypeScript (strict)               |
| Routing      | TanStack Router (file-based)                              |
| Server state | TanStack Query                                            |
| Tables       | TanStack Table (server-side pagination/sorting/filtering) |
| UI           | Tailwind CSS v4, shadcn/ui (new-york), Radix UI           |
| Forms        | react-hook-form + zod                                     |
| HTTP         | axios                                                     |
| i18n         | i18next (`public/locales/{lang}/*.json`)                  |
| State        | zustand (auth) + React context (theme/dir/font/layout)    |

## Prerequisites

- **Node.js** ≥ 20.19 (or ≥ 22.12) — required by Vite 7
- **pnpm** (`corepack enable` or `npm i -g pnpm`)
- A running **Baxela backend** the panel can talk to

## Running it

```bash
# 1. install dependencies
pnpm install

# 2. configure environment
cp .env.example .env
#    then edit .env (see the table below)

# 3. start the dev server
pnpm dev
```

Prefer Docker? The
[develop compose stack](/deployment/develop-stack) runs this dev
server in a container together with the rest of the platform
(`docker compose up -d` from the repo root) — no host Node needed.

### Environment variables

| Variable               | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `VITE_API_BASE_URL`    | Base URL of the Baxela Laravel API (e.g. `http://localhost:8085/api/v1`) |
| `VITE_STORE_FRONT_URL` | Storefront base URL, used for product/page preview links                 |

## Commands

```bash
pnpm dev             # start Vite dev server (HMR)
pnpm build           # TYPE-CHECK (tsc -b) + production build → dist/
pnpm preview         # preview the production build locally

pnpm lint            # ESLint — catches syntax/lint errors and bad practices
pnpm lint --fix      # ESLint with auto-fix
pnpm format          # Prettier — rewrite all files with the project style
pnpm format:check    # Prettier — check only, no writes
pnpm knip            # detect unused files, exports and dependencies
```

`no-console` is an ESLint **error** in this repo, and the build fails on
unused variables/imports — so run `pnpm lint` and `pnpm build` before
committing. There is no test suite yet.

## Project structure

```text
src/
├── routes/              # TanStack Router file tree (thin wrappers around features)
├── features/            # all page code, grouped by domain (catalog, content, media, …)
│   └── <domain>/<entity>/{api,components,data}/
├── components/          # ui primitives, shared data-table parts, layout, tiptap
├── shared/              # API client, error types, locale/tree utils, shared types
├── hooks/               # useAppTranslation, useTableUrlState, useDialogState, …
├── stores/              # zustand auth store
├── context/             # theme / direction / font / layout providers
├── i18n/                # i18next setup (fa default, en fallback)
└── styles/              # Tailwind CSS v4 theme
public/locales/{lang}/   # translation files per locale
```

Full conventions — feature-module anatomy, API layer patterns, naming
rules, i18n guidelines and known gotchas — are documented in the app's
`AGENTS.md`. Read it before contributing.

## Deployment

Any static host works — the app is a pure SPA with an `/* → /index.html`
fallback. Build with `pnpm build` and serve `dist/`, providing the env
vars at build time. The production compose stack builds and serves it
automatically (see [Production stack](/deployment/production-stack)).
