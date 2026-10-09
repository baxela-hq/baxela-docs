---
sidebar_position: 1
---

# Auth

Responsible for authentication and authorization: Sanctum token
issuance, passwordless OTP sign-in, role/permission checks behind the
admin API, and device sessions.

## Tables

| Table             | Description                                 |
| ----------------- | ------------------------------------------- |
| `users_users`     | User accounts                               |
| `users_otp_codes` | One-time passcodes for passwordless sign-in |

## Device sessions

Tokens are Sanctum personal access tokens named after the device the
customer signed in from (`device_name` on sign-in, falling back to the
user agent). Signing in replaces only that device's previous token, so
sessions from other devices survive. Tokens expire after
`AUTH_TOKEN_TTL_DAYS` (default 7) — or `AUTH_TOKEN_SHORT_TTL_DAYS`
(default 1) when the client sends `remember: false` — and expired tokens
are pruned daily with a 48-hour grace window.

| Endpoint                                  | Audience | Purpose                                                  |
| ----------------------------------------- | -------- | -------------------------------------------------------- |
| `POST /auth/user/account/sign-out`        | User     | Revoke the current token (real sign-out)                 |
| `GET /auth/user/account/sessions`         | User     | List own sessions (device, `last_used_at`, `is_current`) |
| `DELETE /auth/user/account/sessions/{id}` | User     | Revoke one own session                                   |
| `DELETE /auth/user/account/sessions`      | User     | Sign out everywhere (revoke all tokens)                  |

The same endpoints serve the storefront and the admin panel (both are
Sanctum clients). Admin routes additionally gate on permissions derived
from route names and seeded via `auth:sync-permissions`.

## Admin stats

`GET /auth/admin/stats` returns customer counts for the dashboard:
total customers, new this month, and the month-over-month change.

## Events emitted

| Event                    | When                       |
| ------------------------ | -------------------------- |
| `UserSignedUpEvent`      | A user signs up            |
| `UserSignedInEvent`      | A user signs in            |
| `UserEmailVerifiedEvent` | A user's email is verified |
| `UserActivatedEvent`     | A user is activated        |
| `UserDeactivatedEvent`   | A user is deactivated      |

## Dependencies

None.
