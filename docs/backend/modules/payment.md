---
sidebar_position: 12
---

# Payment

Responsible for payments. Payment methods are a driver registry —
`PaymentMethodEnum` × `config('payment.drivers')` — with `manual` and
`stripe` drivers today. The end-to-end payment sequence is documented in
[Payment flow](/architecture/flows/payment-flow).

## Tables

| Table              | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `payment_payments` | Payments (amount and currency snapshotted from the order) |

## Endpoints

| Endpoint                             | Audience | Purpose                                                              |
| ------------------------------------ | -------- | -------------------------------------------------------------------- |
| `GET /payment/user/methods`          | User     | Offerable payment methods (registered **and** configured drivers)    |
| `POST /payment/user/process`         | User     | Start a payment for an `order_code`                                  |
| `POST /payment/webhook/{driver}`     | Webhook  | Gateway callback; signature-verified, idempotent settlement          |
| `GET /payment/admin/payments`        | Admin    | Filter (status/method/order/transaction) and sort the payments list  |
| `PATCH /payment/admin/payments/{id}` | Admin    | Settle a pending payment (confirm/fail) — the `manual` driver's path |

## Events emitted

| Event                   | When                   |
| ----------------------- | ---------------------- |
| `PaymentInitiatedEvent` | A payment is initiated |
| `PaymentSucceededEvent` | A payment succeeds     |
| `PaymentFailedEvent`    | A payment fails        |

## Dependencies

| Module | Reason                                      |
| ------ | ------------------------------------------- |
| Core   | Payment event contracts and currency facts  |
| Order  | Order lookup and `markAsPaid` on settlement |
