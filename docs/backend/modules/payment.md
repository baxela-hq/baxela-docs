---
sidebar_position: 12
---

# Payment

Responsible for payments. The end-to-end payment sequence is documented in
[Payment flow](/docs/architecture/flows/payment-flow).

## Tables

| Table              | Description |
| ------------------ | ----------- |
| `payment_payments` | Payments    |

## Events emitted

| Event                   | When                   |
| ----------------------- | ---------------------- |
| `PaymentInitiatedEvent` | A payment is initiated |
| `PaymentSucceededEvent` | A payment succeeds     |
| `PaymentFailedEvent`    | A payment fails        |

## Dependencies

None.
