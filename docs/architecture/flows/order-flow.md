---
sidebar_position: 1
---

# Order flow

Order placement crosses several modules: the Order module coordinates, and
Inventory (stock reservation) reacts to the events it dispatches.

```mermaid
flowchart TD
    A[API: POST /orders] --> B[Order Module]

    B --> C[Validate Cart & Customer]
    C -->|Invalid| C1[Return Validation Error]

    C -->|Valid| D[Create Order Aggregate]
    D --> E[Persist Order Draft]

    E --> F[Dispatch Domain Event: OrderCreated]

    F --> G[Inventory Module Listener]
    G -->|Insufficient Stock| G1[Dispatch OrderRejected]
    G -->|Stock Reserved| H[Dispatch StockReserved]

    H --> I[Pricing Module Listener]
    I --> J[Calculate Totals & Taxes]

    J --> K[Dispatch OrderReadyForPayment]
```

The order then waits for payment — see the
[order state machine](/architecture/flows/order-state-machine) for the
possible transitions and the [payment flow](/architecture/flows/payment-flow)
for how the order becomes paid.
