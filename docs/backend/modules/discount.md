---
sidebar_position: 7
---

# Discount

Responsible for two composing discount mechanisms:

- **Coupons** — order-level codes the customer applies to the cart at
  checkout (`discount.coupon.*`).
- **Promotions** — automatic, item-level price reductions that change a
  product's effective price before it enters the cart.

Both share UTC validity windows, an `is_active` toggle, the
percent/fixed `CouponTypeEnum`, and Core's minor-units money helper. Each
has its own gateway contract in Core (`DiscountGatewayInterface`,
`PromotionGatewayInterface`), its own tables, and its own admin CRUD.
Coupons anchor to the **promoted subtotal**, so the two compose.

## Tables

| Table                           | Description                                                       |
| ------------------------------- | ----------------------------------------------------------------- |
| `discount_coupons`              | Coupons (code, type, value, limits, window, `usage_count` mirror) |
| `discount_redemptions`          | One row per redeemed coupon-order pair (`order_id` unique)        |
| `discount_promotions`           | Promotions (scope, type, value, window, `priority`)               |
| `discount_promotion_products`   | Product ids attached to `scope=specific` promotions               |
| `discount_promotion_categories` | Category ids attached to `scope=specific` promotions              |

## Coupons

Codes are uppercase `A-Z0-9_-` (≤ 64 chars, unique); percent coupons may
carry a `max_discount_amount` cap, both types a `min_order_amount`
floor. The gateway separates evaluation from redemption:

- `evaluate(code, subtotal, user)` is advisory — a failure ladder
  (not found → inactive → window → global/per-user limit → minimum
  subtotal) plus the discount math.
- `recordRedemption(…)` is authoritative — requires an open database
  transaction, locks the coupon row, re-checks both usage limits, writes
  the redemption and increments `usage_count`. Checkout calls it as a
  savepoint, so order and redemption commit or roll back together.
- `releaseRedemption(orderId)` is the idempotent inverse (the redemption
  row is physically deleted, freeing capacity again).

The cart carries one coupon at a time (`carts.coupon_code`); checkout
re-evaluates it in-transaction against the freshly priced subtotal — the
HTTP request never carries discount data. Orders snapshot `coupon_id`,
`coupon_code` and `discount_amount`.

| Endpoint                             | Audience | Purpose                                                                                     |
| ------------------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| `GET /cart/user/cart/coupon`         | User     | Show the applied coupon + discount amount                                                   |
| `POST /cart/user/cart/coupon`        | User     | Apply a code to the cart (`{code}`)                                                         |
| `DELETE /cart/user/cart/coupon`      | User     | Remove the applied coupon                                                                   |
| `GET/POST /discount/admin/coupons` … | Admin    | Coupon CRUD (`/discount/admin/coupons/{id}`); deleting a coupon with redemptions is refused |

## Promotions

A promotion is store-wide (`scope=all`) or scoped to specific
products/categories (`scope=specific`, ids validated through the Catalog
gateway). Resolution picks **one winner per product** — specificity first
(product over category over store-wide), then `priority`, then the lower
id; there is no stacking. The winner's window (`starts_at`/`ends_at`,
inclusive, null = unbounded) must contain "now".

The effective price is applied in memory, never persisted: product and
variant responses keep flat `price`/`compare_price` fields (original base
moves to `compare_price`) and gain a `promotion` object
`{id, type, value, ends_at}` — null when no promotion applies. Cart lines
re-price on every read and once more at checkout; each promoted order
item snapshots `base_price`, `promotion_discount` and `promotion_id`, so
invoices stay self-contained after a promotion is deleted.

| Endpoint                                | Audience | Purpose                                                               |
| --------------------------------------- | -------- | --------------------------------------------------------------------- |
| `GET/POST /discount/admin/promotions` … | Admin    | Promotion CRUD (`/discount/admin/promotions/{id}`) with scope filters |

There are no public promotion endpoints — the storefront only sees the
injected `promotion` objects (and renders sale badges from the saving).

## Events emitted

None — the module's discounts are computed transactionally at cart read
and checkout rather than announced through events.

## Dependencies

| Module  | Reason                                           |
| ------- | ------------------------------------------------ |
| Core    | Gateway contracts, money helper                  |
| Catalog | Product/category id validation and category maps |
