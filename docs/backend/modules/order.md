---
sidebar_position: 11
---

# Order

Responsible for orders: the aggregate, its line items, and address
snapshots. The order state machine and placement flow are documented in
[Flows](/architecture/flows/order-flow).

## Tables

| Table                   | Description                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `order_orders`          | Orders — public `order_code`, status + payment status, `currency_id` and shipping snapshots, `expires_at` |
| `order_order_items`     | Order line items with per-item price snapshots                                                            |
| `order_order_addresses` | Billing/shipping address snapshots per order                                                              |

## Events emitted

| Event                 | When                                                                |
| --------------------- | ------------------------------------------------------------------- |
| `OrderCreatedEvent`   | Checkout creates the order (dispatched with the request locale)     |
| `OrderPaidEvent`      | A settled payment marks the order paid                              |
| `OrderShippedEvent`   | The order is marked shipped (directly or via the Shipping mirror)   |
| `OrderCompletedEvent` | The order is marked completed (directly or via the Shipping mirror) |
| `OrderCancelledEvent` | Cancelled by the customer or by the scheduled expiry command        |
| `OrderRefundedEvent`  | The payment status moves to refunded                                |
| `OrderPendingEvent`   | Reserved contract — not dispatched yet                              |

## Scheduled work

`order:cancel-expired` (registered on the scheduler) cancels pending,
unpaid orders past their `expires_at` and dispatches
`OrderCancelledEvent`. Deployments without a worker-based scheduler need
a cron entry — see [Shared hosting](/deployment/shared-hosting).

## Dependencies

None — the Order module is a leaf. Other modules (Cart, Payment,
Shipping) call it through its Core gateway (`OrderGatewayInterface`):
`createFromCart`, `markAsPaid`, `markAsShipped`, `markAsDelivered`.
