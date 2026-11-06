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
- **Headless / API-first** — the storefront, admin and mobile app are
  plain clients of the versioned REST API.
- **Shared-hosting friendly** — a conventional PHP stack (no exotic runtime
  requirements) that also runs great in Docker.
- **Fully documented** — API (OpenAPI via Scramble), flows, and module
  references.
- **SOLID & Open/Closed compliant** — extend through events, listeners,
  module overrides, and custom modules rather than core edits.

## The apps

| App          | Stack                                                | Purpose                                                                                         |
| ------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `backend`    | Laravel (PHP ≥ 8.3), MySQL, Redis                    | REST API, modular monolith                                                                      |
| `admin`      | React 19, Vite 7, TypeScript, Tailwind v4, shadcn/ui | Back-office panel (catalog, content, discounts, support, media, orders, users, settings)        |
| `storefront` | Next.js (App Router), React 19, TypeScript           | Customer-facing shop with built-in English + Farsi (RTL) locales                                |
| `mobile`     | Expo (React Native), expo-router, NativeWind         | Mobile storefront — separate `baxela-mobile` repository (see [Mobile](/mobile/getting-started)) |

## Where to go next

- **[Installation](/guide/installation)** — get the whole platform
  running with one `docker compose up -d`.
- **[Architecture](/architecture/modular-monolith)** — how the modular
  monolith and its modules fit together.
- **[Dependency graph](https://htmlpreview.github.io/?https://github.com/baxela-hq/baxela/blob/main/docs/module-dependency-graph.html)** —
  an interactive map of how the modules actually reference each other,
  regenerated after each release.
- **[Database ERD](/backend/erd)** — per-module schema diagrams: tables,
  keys, and relations, generated from the live database.
- **[API](/api/introduction)** — authentication, conventions, and the
  OpenAPI/Bruno tooling.
- **[Deployment](/deployment/develop-stack)** — develop and production
  stacks.
