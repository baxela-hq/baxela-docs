---
sidebar_position: 1
---

# Introduction

Baxela is a developer-first, modular, headless e-commerce platform. The
backend is an API-only Laravel application, consumed by a React admin panel
and a Next.js storefront — all developed together in a single monorepo.

## Highlights

- **Modular monolith** — the backend is split into bounded modules
  (Catalog, Orders, Payments, Shipping, …) via
  [nwidart/laravel-modules](https://github.com/nwidart/laravel-modules), not
  a distributed microservice sprawl.
- **Event-driven** — modules communicate through domain events and listener
  reactions, keeping them loosely coupled.
- **Headless / API-first** — the storefront and admin are plain clients of
  the versioned REST API.
- **Shared-hosting friendly** — a conventional PHP stack (no exotic runtime
  requirements) that also runs great in Docker.
- **Fully documented** — API (OpenAPI via Scramble), flows, and module
  references.
- **SOLID & Open/Closed compliant** — extend through events, listeners,
  module overrides, and custom modules rather than core edits.

## The three apps

| App          | Stack                                                | Purpose                                                              |
| ------------ | ---------------------------------------------------- | -------------------------------------------------------------------- |
| `backend`    | Laravel (PHP ≥ 8.3), MySQL, Redis                    | REST API, modular monolith                                           |
| `admin`      | React 19, Vite 7, TypeScript, Tailwind v4, shadcn/ui | Back-office panel (catalog, content, media, orders, users, settings) |
| `storefront` | Next.js (App Router), React 19, TypeScript           | Customer-facing shop with built-in English + Farsi (RTL) locales     |

## Where to go next

- **[Installation](/docs/guide/installation)** — get the whole platform
  running with one `docker compose up -d`.
- **[Architecture](/docs/architecture/modular-monolith)** — how the modular
  monolith and its modules fit together.
- **[API](/docs/api/introduction)** — authentication, conventions, and the
  OpenAPI/Bruno tooling.
- **[Deployment](/docs/deployment/develop-stack)** — develop and production
  stacks.
