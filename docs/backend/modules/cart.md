---
sidebar_position: 2
---

# Cart

Responsible for shopping carts and their items.

## Tables

| Table             | Description              |
| ----------------- | ------------------------ |
| `cart_cart`       | Carts                    |
| `cart_cart_items` | Line items within a cart |

## Events emitted

| Event                  | When                  |
| ---------------------- | --------------------- |
| `CartCreatedEvent`     | A cart is created     |
| `CartItemAddedEvent`   | An item is added      |
| `CartItemRemovedEvent` | An item is removed    |
| `CartCheckedOutEvent`  | A cart is checked out |

## Dependencies

| Module    | Reason                            |
| --------- | --------------------------------- |
| Inventory | Stock availability checks         |
| Order     | Creates the new order on checkout |
| User      | Customer context                  |
