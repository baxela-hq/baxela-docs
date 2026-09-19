---
sidebar_position: 1
---

# Order flow

Order placement is driven by the Cart module's checkout: it validates the
cart, then creates the order and decrements stock inside a single
database transaction.

```mermaid
flowchart TD
    A[Storefront: POST /cart/user/checkout] --> B[Cart Module: CheckoutAction]

    B --> C[Validate address & country]
    C -->|Invalid| C1[Return validation error]

    C -->|Valid| D[Check per-item stock via Inventory gateway]
    D -->|Out of stock| D1[Return out-of-stock error]

    D -->|Available| E[Quote shipping & snapshot currency]
    E --> F["One transaction:
        create order (pending/unpaid, price+currency+shipping snapshots, order_code)
        decrement stock per item
        destroy the cart"]

    F --> G[Dispatch OrderCreatedEvent]
    F --> H[Dispatch CartCheckedOutEvent]

    G --> I[Notification listeners: order confirmation to user + admins]
```

The fresh order is `pending` / `unpaid` with a public `order_code` and an
`expires_at` deadline (30 minutes). From there:

- **Payment** — the storefront starts a payment against the `order_code`;
  settlement marks the order `paid` (see
  [payment flow](/architecture/flows/payment-flow)).
- **Expiry** — a scheduled command (`order:cancel-expired`) cancels
  expired unpaid orders and dispatches `OrderCancelledEvent`, so the
  customer and admins are notified.
- **Fulfilment** — admins move the order through the
  [state machine](/architecture/flows/order-state-machine); shipment
  updates in the Shipping module mirror `shipped`/`delivered` onto the
  order automatically.
