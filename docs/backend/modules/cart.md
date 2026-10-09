---
sidebar_position: 2
---

# Cart

Responsible for shopping carts and their items. Cart prices are
promotion-aware: every read refreshes line prices to the current
effective price (see [Discount](/backend/modules/discount)), and one
coupon can ride along on the cart until checkout redeems it.

## Tables

| Table             | Description                                     |
| ----------------- | ----------------------------------------------- |
| `cart_cart`       | Carts (plus the optional applied `coupon_code`) |
| `cart_cart_items` | Line items within a cart                        |

## Coupon endpoints

| Endpoint                        | Audience | Purpose                                   |
| ------------------------------- | -------- | ----------------------------------------- |
| `GET /cart/user/cart/coupon`    | User     | Show the applied coupon + discount amount |
| `POST /cart/user/cart/coupon`   | User     | Apply a code to the cart (`{code}`)       |
| `DELETE /cart/user/cart/coupon` | User     | Remove the applied coupon                 |

Evaluation rules and the transactional redemption gateway are documented
in [Discount](/backend/modules/discount); checkout re-evaluates the
stored code inside its transaction and aborts with an invalid-coupon
error if it no longer qualifies.

## Events emitted

| Event                  | When                  |
| ---------------------- | --------------------- |
| `CartCreatedEvent`     | A cart is created     |
| `CartItemAddedEvent`   | An item is added      |
| `CartItemRemovedEvent` | An item is removed    |
| `CartCheckedOutEvent`  | A cart is checked out |

## Dependencies

| Module    | Reason                                       |
| --------- | -------------------------------------------- |
| Inventory | Stock availability checks                    |
| Order     | Creates the new order on checkout            |
| User      | Customer context                             |
| Catalog   | Variant summaries / promoted prices          |
| Discount  | Coupon evaluation and redemption at checkout |
