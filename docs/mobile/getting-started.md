---
sidebar_position: 1
---

# Getting started

The mobile app is a second storefront for the platform — an
Expo (React Native) application that consumes the same Baxela Laravel
API (`/api/v1`) and treats the monorepo's Bruno collection
(`api/bruno`) as the API source of truth. It lives in its own
repository, `baxela-mobile`, alongside the platform monorepo.

**Status: Phase 1 — shopping flows.** Auth forms (sign-up, OTP,
forgot-password), home, catalog and product detail, guest-to-account
cart merge, checkout with addresses/shipping/coupons, hosted-payment
return polling, and the orders list/detail. Phase 2 (profile area,
wishlist, notifications + Reverb realtime, product comments) comes next;
Phase 0 delivered the foundation (scaffold, design tokens, API client,
auth bootstrap, deep-link map, testing, EAS profiles).

## Tech stack

| Concern      | Choice                                                |
| ------------ | ----------------------------------------------------- |
| Runtime      | Expo SDK 57, React Native, TypeScript                 |
| Routing      | expo-router (typed routes, `baxela://` deep links)    |
| Styling      | NativeWind v4 (Tailwind 3) on design tokens           |
| Server state | TanStack Query v5                                     |
| Client state | Zustand (auth, locale)                                |
| Auth storage | expo-secure-store (localStorage fallback on web)      |
| i18n         | i18next (`en`/`fa`, RTL; per-locale fonts, Vazirmatn) |

## Talking to the API

Laravel Sanctum bearer tokens (stored in SecureStore) authenticate
requests; guest carts ride an `X-Cart-Token` header and merge into the
account on sign-in, which also sends a stable `device_name` for
[device sessions](/backend/modules/auth). The `Accept-Language` header
follows the in-app locale, and backend media URLs are rebased onto the
configured API origin. The API client ports its behavior from the
storefront's client — single-flight 401 handling included.

## Running it

Prerequisites: Node 22+, pnpm 10, and the platform develop stack
running (`docker compose up -d` in the `baxela` monorepo).

```bash
pnpm install
cp .env.example .env   # set your dev machine's LAN IP
pnpm start             # press i (iOS) or a (Android)
```

Physical devices cannot reach `localhost` — point
`EXPO_PUBLIC_API_BASE_URL` at the dev machine's LAN IP. Realtime
notification env vars (`EXPO_PUBLIC_REVERB_*`) are prepared for Phase 2.

| Variable                   | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| `EXPO_PUBLIC_API_BASE_URL` | Base URL of the Baxela API (e.g. `http://192.168.1.10:8085/api/v1`) |
| `EXPO_PUBLIC_REVERB_*`     | Reverb websocket config for Phase 2 realtime                        |

## App structure

Shop tabs (Home, Catalog, Cart with live badge, Account) plus stack
routes for product detail, order detail, the hosted-payment return page,
and notifications; auth screens (sign-in, sign-up, OTP,
forgot-password) live in their own group. Deep links follow the
`baxela://` scheme (`baxela://product/{slugOrId}`, `baxela://order/{code}`,
…). A language picker on the account screen switches locale — including
the font family and RTL direction.

## Testing & building

```bash
pnpm test                       # Jest (jest-expo): client, stores, flows
pnpm exec eas build --profile development --platform android
```

E2E smoke flows run through Maestro (`e2e/smoke.yaml`) against a
development/preview build. Full conventions are documented in the app's
`AGENTS.md` — read it before contributing.
