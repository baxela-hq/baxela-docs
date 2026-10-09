---
sidebar_position: 11
---

# Notification

Delivers notifications on behalf of other modules over three channels:
**database** (an inbox readable through the API — rendered by the admin
panel's and storefront's notification bells), **email**, and **web push**
(OS-level browser notifications via VAPID). Which channels each
notification uses is mapped in the module's `config/notifications.php`;
messages are rendered from per-locale Blade templates (`en`/`fa` today).

Notifications are queued on the database queue, so a queue worker must be
running (the develop and production compose stacks both ship one).

## Realtime delivery

Database notifications are also broadcast over **Laravel Reverb**: the
moment one is stored, a `notification.created` event is pushed to the
recipient's private channel — `notification.user.{id}` or
`notification.admin.{id}` — carrying the notification payload plus the
audience-scoped unread count, so the admin and storefront bells
(laravel-echo + pusher-js) update live instead of polling. Channel
authorization rides the API's Sanctum middleware
(`POST /notification/broadcasting/auth`). Both compose stacks run the
Reverb websocket service; without it, the bells fall back to fetching on
page load.

Web push is opt-in per browser: the SPAs register a service worker and
subscribe through the endpoints below. Generate the key pair once with
`php artisan notification:generate-vapid`; without keys the channel
no-ops safely.

## Events listened to

| Event                        | Recipients   | Channels                                                                                      |
| ---------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `OtpRequestedEvent`          | user         | email                                                                                         |
| `UserSignedInEvent`          | user, admins | user: database + email + web push; admins: database + web push                                |
| `ContactMessageCreatedEvent` | admins       | email                                                                                         |
| `OrderCreatedEvent`          | user, admins | database + email + web push                                                                   |
| `OrderPaidEvent`             | user         | database + email + web push                                                                   |
| `OrderShippedEvent`          | user         | database + email + web push                                                                   |
| `OrderCompletedEvent`        | user         | database + web push                                                                           |
| `OrderCancelledEvent`        | user         | database + email + web push                                                                   |
| `PaymentSucceededEvent`      | admins       | database + web push                                                                           |
| `PaymentFailedEvent`         | user, admins | database + web push                                                                           |
| `TicketCreatedEvent`         | admins       | database + email                                                                              |
| `TicketMessageCreatedEvent`  | admins, user | customer reply → admins (database + email); admin answer → user (database + email + web push) |

Admin recipients: emails go to `ADMIN_NOTIFICATION_EMAILS` (falling back
to the mail sender address); database notifications fan out to all active
staff by default, or to `ADMIN_NOTIFICATION_USER_IDS` when set.

Admin notifications for orders and support tickets carry `order_id` /
`ticket_id` in their meta — the admin panel's bell uses them to deep-link
straight to the order or ticket page.

## Tables

| Table                             | Description                           |
| --------------------------------- | ------------------------------------- |
| `notification_notifications`      | Stored database-channel notifications |
| `notification_push_subscriptions` | Browser web-push registrations        |

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

Push subscriptions exist for both audiences (keyed by endpoint; delete
takes it in the body), plus a public key discovery endpoint:

| Endpoint                                                 | Audience | Purpose                                                  |
| -------------------------------------------------------- | -------- | -------------------------------------------------------- |
| `GET /notification/webpush/vapid-public-key`             | Public   | The VAPID public key (null = web push unconfigured)      |
| `GET/POST/DELETE /notification/user/push-subscriptions`  | User     | List / register / remove the browser's push registration |
| `GET/POST/DELETE /notification/admin/push-subscriptions` | Admin    | Same trio for staff browsers                             |

## Dependencies

| Module | Reason                                             |
| ------ | -------------------------------------------------- |
| Core   | Event contracts, recipient/user resolution support |
| Auth   | Staff resolution for admin recipients              |
