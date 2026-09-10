---
sidebar_position: 1
---

# Auth

Responsible for authentication and authorization.

## Tables

| Table             | Description                                 |
| ----------------- | ------------------------------------------- |
| `users_users`     | User accounts                               |
| `users_otp_codes` | One-time passcodes for passwordless sign-in |

## Events emitted

| Event                    | When                       |
| ------------------------ | -------------------------- |
| `UserSignedUpEvent`      | A user signs up            |
| `UserSignedInEvent`      | A user signs in            |
| `UserEmailVerifiedEvent` | A user's email is verified |
| `UserDeactivatedEvent`   | A user is deactivated      |

## Dependencies

None.
