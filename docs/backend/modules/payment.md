---
sidebar_position: 13
---

# Payment

Responsible for payments. Payment methods are a driver registry —
`PaymentMethodEnum` × `config('payment.drivers')` — with eight drivers
today: `manual`, `stripe`, `paypal`, `adyen`, `mercadopago`,
`nowpayments` (crypto), `checkoutcom`, and `razorpay`. The end-to-end
payment sequence is documented in
[Payment flow](/architecture/flows/payment-flow).

## Tables

| Table              | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `payment_payments` | Payments (amount and currency snapshotted from the order)                   |
| `payment_methods`  | Per-method admin state (`is_active`, `sort_order`); credentials stay in env |

A method is offered to customers only when its driver is registered,
its credentials are configured, **and** an admin has activated it —
`GET /payment/user/methods` returns exactly that set and the choice is
re-checked when a payment starts. New gateways appear in the admin list
disabled until switched on.

## Endpoints

| Endpoint                             | Audience | Purpose                                                              |
| ------------------------------------ | -------- | -------------------------------------------------------------------- |
| `GET /payment/user/methods`          | User     | Offerable payment methods (registered, configured **and** active)    |
| `POST /payment/user/process`         | User     | Start a payment for an `order_code`                                  |
| `POST /payment/webhook/{driver}`     | Webhook  | Gateway callback; signature-verified, idempotent settlement          |
| `GET /payment/admin/methods`         | Admin    | List methods with computed `is_configured` / `is_registered`         |
| `PATCH /payment/admin/methods/{id}`  | Admin    | Activate/deactivate a method and set its `sort_order`                |
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
