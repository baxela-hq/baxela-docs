---
sidebar_position: 1
---

# Modular monolith

The Baxela backend is a **modular monolith**: a single Laravel deployment
whose codebase is partitioned into bounded, self-contained modules managed
with [nwidart/laravel-modules](https://github.com/nwidart/laravel-modules).

You get microservice-style separation — each module owns its domain logic,
database tables, routes, and events — without distributed-systems overhead.
Modules live in `apps/backend/Modules/`, one folder per module.

## Modules at a glance

| Module                                             | Responsibility                                           |
| -------------------------------------------------- | -------------------------------------------------------- |
| [Auth](/backend/modules/auth)                 | Authentication and authorization                         |
| [Cart](/backend/modules/cart)                 | Shopping carts and cart items                            |
| [Catalog](/backend/modules/catalog)           | Products, variants, options, images, categories          |
| [Contact](/backend/modules/contact)           | Storefront contact-form messages and admin inbox         |
| [Content](/backend/modules/content)           | CMS pages                                                |
| [Core](/backend/modules/core)                 | Shared contracts, gateways, DTOs, countries, idempotency |
| [Inventory](/backend/modules/inventory)       | Product stock levels                                     |
| [Media](/backend/modules/media)               | Media uploads                                            |
| [Menu](/backend/modules/menu)                 | Navigation menus and nested links                        |
| [Notification](/backend/modules/notification) | Email notifications (e.g. admins on contact submissions) |
| [Order](/backend/modules/order)               | Orders, order items, order addresses                     |
| [Payment](/backend/modules/payment)           | Payments                                                 |
| [Setting](/backend/modules/setting)           | System settings                                          |
| [Shipping](/backend/shipping)                 | Shipping methods, zones, rates, shipments                |
| [User](/backend/modules/user)                 | Customers/users                                          |

See [Backend / Modules](/backend/modules/auth) for the per-module
reference: tables, emitted/listened events, and dependencies.

## How modules interact

- **Events** — the primary coupling point. A module publishes domain events
  (for example `OrderCreatedEvent`) and other modules react through
  listeners. See [Events](/architecture/events).
- **Gateways & contracts** — the **Core** module hosts shared interfaces,
  events, gateway contracts, and DTOs. A module consumes another module's
  data only through a gateway defined in Core (e.g. Shipping calls
  `OrderGatewayInterface::markAsShipped`), never by reaching into another
  module's internals.
- **Table prefixes** — each module's tables are prefixed with the module
  name (`catalog_products`, `order_orders`, `shipping_rates`, …), keeping
  the single database physically partitioned by module.

## Extending the platform

Baxela is built to be extended via:

1. **Events & listeners** — subscribe to existing domain events.
2. **Module overrides** — replace module behavior where the module system
   allows it.
3. **Custom modules** — add your own module with its own tables and events;
   nothing in the core assumes it exists.
