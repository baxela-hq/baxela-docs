---
sidebar_position: 15
---

# Support

Responsible for customer support tickets. A signed-in customer opens a
ticket — optionally tied to one of their orders by `order_code` — and the
thread alternates between customer and staff messages until the ticket is
closed. The storefront exposes it under the account area
(`/profile/tickets`); the admin panel manages it under Support → Tickets.

## Tables

| Table                     | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `support_tickets`         | Tickets (subject, status, optional `order_code` link, `last_message_at`) |
| `support_ticket_messages` | Thread messages (`sender` is `customer` or `admin`)                      |

## Statuses

| Status     | Meaning                                      |
| ---------- | -------------------------------------------- |
| `open`     | Created, or reopened by a new customer reply |
| `answered` | An admin replied — the last word is staff's  |
| `closed`   | Closed by the customer or by an admin        |

An admin reply moves the ticket to `answered`; a customer reply forces it
back to `open` (reopening closed tickets). Customers may only set
`open`/`closed` on their own tickets; admins may set any status.

## Endpoints

All endpoints require Sanctum authentication. Customer endpoints are
ownership-scoped (a global query scope hides other customers' tickets);
admin endpoints require per-route permissions (`support.admin.*`).

| Endpoint                                    | Audience | Purpose                                                          |
| ------------------------------------------- | -------- | ---------------------------------------------------------------- |
| `GET /support/user/tickets`                 | User     | List own tickets (filter by `status`)                            |
| `POST /support/user/tickets`                | User     | Create a ticket (`subject`, `body`, optional `order_code`)       |
| `GET /support/user/tickets/{id}`            | User     | Show a ticket with its message thread                            |
| `PATCH /support/user/tickets/{id}/status`   | User     | Open/close an own ticket                                         |
| `POST /support/user/tickets/{id}/messages`  | User     | Reply                                                            |
| `GET /support/admin/tickets`                | Admin    | List tickets (filters: status, `user_id`, subject, `order_code`) |
| `GET /support/admin/tickets/{id}`           | Admin    | Show with messages — authors resolved to name/email              |
| `PATCH /support/admin/tickets/{id}/status`  | Admin    | Set any status                                                   |
| `POST /support/admin/tickets/{id}/messages` | Admin    | Reply as staff                                                   |
| `DELETE /support/admin/tickets/{id}`        | Admin    | Delete a ticket                                                  |

Ticket creation validates that a given `order_code` belongs to the
customer. Payload limits: `subject` ≤ 255 chars, message `body` ≤ 5000.
Creation and replies are rate limited per user (10/min and 30/min by
default).

## Events emitted

| Event                       | When                            |
| --------------------------- | ------------------------------- |
| `TicketCreatedEvent`        | A ticket is created             |
| `TicketMessageCreatedEvent` | A customer or admin reply lands |
| `TicketStatusUpdatedEvent`  | A ticket's status changes       |
| `TicketDeletedEvent`        | A ticket is deleted by an admin |

The Notification module listens to these: staff receive database + email
notifications on new tickets and customer replies; the customer is
notified (database + email + web push) when staff answer. Admin
notifications carry `ticket_id` in their meta, which the admin panel's
bell uses to deep-link straight to the ticket.

## Dependencies

| Module | Reason                                      |
| ------ | ------------------------------------------- |
| Core   | Event contracts, user/order access gateways |
