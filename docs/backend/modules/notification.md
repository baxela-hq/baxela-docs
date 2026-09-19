---
sidebar_position: 10
---

# Notification

Delivers notifications on behalf of other modules over two channels:
**database** (an inbox readable through the API — rendered by the admin
panel's and storefront's notification bells) and **email**. Which
channels each notification uses is mapped in the module's
`config/notifications.php`; messages are rendered from per-locale Blade
templates (`en`/`fa` today).

Notifications are queued on the database queue, so a queue worker must be
running (the develop and production compose stacks both ship one).

## Events listened to

| Event                        | Recipients   | Channels                                 |
| ---------------------------- | ------------ | ---------------------------------------- |
| `OtpRequestedEvent`          | user         | email                                    |
| `UserSignedInEvent`          | user, admins | user: database + email; admins: database |
| `ContactMessageCreatedEvent` | admins       | email                                    |
| `OrderCreatedEvent`          | user, admins | database + email                         |
| `OrderPaidEvent`             | user         | database + email                         |
| `OrderShippedEvent`          | user         | database + email                         |
| `OrderCompletedEvent`        | user         | database                                 |
| `OrderCancelledEvent`        | user         | database + email                         |
| `PaymentSucceededEvent`      | admins       | database                                 |
| `PaymentFailedEvent`         | user, admins | database                                 |

Admin recipients: emails go to `ADMIN_NOTIFICATION_EMAILS` (falling back
to the mail sender address); database notifications fan out to all active
staff by default, or to `ADMIN_NOTIFICATION_USER_IDS` when set.

## Tables

| Table                        | Description                           |
| ---------------------------- | ------------------------------------- |
| `notification_notifications` | Stored database-channel notifications |

## Endpoints

Identical read APIs for both audiences (auth: Sanctum; the admin set
additionally requires permissions):

| Endpoint                                             | Audience | Purpose                   |
| ---------------------------------------------------- | -------- | ------------------------- |
| `GET /notification/user/notifications`               | User     | Paginated inbox (15/page) |
| `GET /notification/user/notifications/unread-count`  | User     | Unread badge count        |
| `PATCH /notification/user/notifications/{id}/read`   | User     | Mark one as read          |
| `PATCH /notification/user/notifications/read-all`    | User     | Mark all as read          |
| `GET /notification/admin/notifications`              | Admin    | Paginated inbox (15/page) |
| `GET /notification/admin/notifications/unread-count` | Admin    | Unread badge count        |
| `PATCH /notification/admin/notifications/{id}/read`  | Admin    | Mark one as read          |
| `PATCH /notification/admin/notifications/read-all`   | Admin    | Mark all as read          |

## Dependencies

| Module | Reason                                             |
| ------ | -------------------------------------------------- |
| Core   | Event contracts, recipient/user resolution support |
| Auth   | Staff resolution for admin recipients              |
