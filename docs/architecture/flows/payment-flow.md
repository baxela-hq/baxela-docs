---
sidebar_position: 3
---

# Payment flow

Payments are **synchronous by default and async-capable**: the storefront
initiates a payment, receives a payment URL/token, completes it at the
provider, and the resulting event updates the order through the event bus.

```mermaid
sequenceDiagram
    participant Frontstore
    participant API
    participant OrderModule
    participant PaymentModule
    participant EventBus

    Frontstore->>API: POST /payments/init
    API->>OrderModule: Load Order
    OrderModule->>PaymentModule: Create Payment Intent

    PaymentModule-->>Frontstore: Payment URL / Token

    Frontstore->>PaymentModule: Complete Payment
    PaymentModule->>EventBus: PaymentSucceeded

    EventBus->>OrderModule: OnPaymentSucceeded
    OrderModule->>OrderModule: Mark Order as PAID
```
