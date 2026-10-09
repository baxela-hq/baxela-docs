---
sidebar_position: 2
---

# Authentication

:::caution Work in progress
This section is being written. The overview below describes the shipped
building blocks; endpoint-by-endpoint documentation is on its way.
:::

The API authenticates clients with **Laravel Sanctum**. Customer-facing
flows use **one-time passcodes (OTP)** — sign-in requests generate a
short-lived code (stored in the `users_otp_codes` table) that is exchanged
for an API token once verified. OTP handling is hardened: rate limited,
enumeration-safe, and never reveals whether an account exists. Tokens
are issued per device (see [Auth](/backend/modules/auth) for the
device-session model, TTLs, and the session management endpoints).

## Building blocks

| Piece          | Where             | Purpose                                                                                                          |
| -------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Sanctum tokens | `Auth` module     | API token issuance/verification, one per device                                                                  |
| OTP codes      | `users_otp_codes` | One-time passcodes for passwordless sign-in                                                                      |
| Auth events    | `Auth` module     | `UserSignedUpEvent`, `UserSignedInEvent`, `UserEmailVerifiedEvent`, `UserActivatedEvent`, `UserDeactivatedEvent` |

The storefront implements these flows end-to-end (login, signup, OTP,
forgot-password pages) against `/api/v1` — the
[Bruno collections](/api/introduction) in the monorepo contain the
ready-to-run requests for each, including sign-out and sessions.
