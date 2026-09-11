---
sidebar_position: 11
---

# Order

Responsible for orders: the aggregate, its line items, and addresses. The
order state machine and placement flow are documented in
[Flows](/architecture/flows/order-flow).

## Tables

| Table                   | Description                                  |
| ----------------------- | -------------------------------------------- |
| `order_orders`          | Orders                                       |
| `order_order_items`     | Order line items                             |
| `order_order_addresses` | Billing/shipping address snapshots per order |

## Events emitted

| Event                 | When                                                 |
| --------------------- | ---------------------------------------------------- |
| `OrderPendingEvent`   | Order enters pending state                           |
| `OrderCreatedEvent`   | Order is created                                     |
| `OrderPaidEvent`      | Order is paid                                        |
| `OrderShippedEvent`   | Order is shipped (mirrored by the Shipping module)   |
| `OrderCompletedEvent` | Order is completed (mirrored by the Shipping module) |
| `OrderCancelledEvent` | Order is cancelled                                   |

## Dependencies

None.
