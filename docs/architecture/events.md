---
sidebar_position: 2
---

# Events

Baxela is event-driven: significant things that happen emit a domain event,
and any module — including yours — can react with a listener. The **Core**
module also observes every dispatched event (e.g. for persistence in the
event store).

## Event catalog

### Auth

| Event                    | When                       |
| ------------------------ | -------------------------- |
| `UserSignedUpEvent`      | A user signs up            |
| `UserSignedInEvent`      | A user signs in            |
| `UserEmailVerifiedEvent` | A user's email is verified |
| `UserDeactivatedEvent`   | A user is deactivated      |

### Cart

| Event                  | When                           |
| ---------------------- | ------------------------------ |
| `CartCreatedEvent`     | A cart is created              |
| `CartItemAddedEvent`   | An item is added to a cart     |
| `CartItemRemovedEvent` | An item is removed from a cart |
| `CartCheckedOutEvent`  | A cart is checked out          |

### Catalog

| Event                     | When                     |
| ------------------------- | ------------------------ |
| `ProductCreatedEvent`     | A product is created     |
| `ProductUpdatedEvent`     | A product is updated     |
| `ProductDeletedEvent`     | A product is deleted     |
| `ProductActivatedEvent`   | A product is activated   |
| `ProductDeactivatedEvent` | A product is deactivated |

### Contact

| Event                              | When                                                          |
| ---------------------------------- | ------------------------------------------------------------- |
| `ContactMessageCreatedEvent`       | Public contact-form submission stored (per-IP rate limited)   |
| `ContactMessageStatusUpdatedEvent` | Admin changed a message status (unread/read/replied/archived) |
| `ContactMessageDeletedEvent`       | Admin deleted a message                                       |

### Content

| Event                  | When                      |
| ---------------------- | ------------------------- |
| `PagePublishedEvent`   | A CMS page is published   |
| `PageUnpublishedEvent` | A CMS page is unpublished |

### Inventory

| Event                 | When               |
| --------------------- | ------------------ |
| `StockIncreasedEvent` | Stock is increased |
| `StockDecreasedEvent` | Stock is decreased |
| `StockDepletedEvent`  | Stock reaches zero |

### Media

| Event               | When              |
| ------------------- | ----------------- |
| `MediaCreatedEvent` | Media is uploaded |
| `MediaDeletedEvent` | Media is deleted  |

### Menu

| Event                                                                    | When                                                                                                       |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `MenuCreatedEvent` / `MenuUpdatedEvent` / `MenuDeletedEvent`             | Menu lifecycle                                                                                             |
| `MenuLinkCreatedEvent` / `MenuLinkUpdatedEvent` / `MenuLinkDeletedEvent` | Menu-link lifecycle (updates include reparenting with a circular-move guard; deletion removes the subtree) |

### Order

| Event                 | When                       |
| --------------------- | -------------------------- |
| `OrderPendingEvent`   | Order enters pending state |
| `OrderCreatedEvent`   | Order is created           |
| `OrderPaidEvent`      | Order is paid              |
| `OrderShippedEvent`   | Order is shipped           |
| `OrderCompletedEvent` | Order is completed         |
| `OrderCancelledEvent` | Order is cancelled         |

### Payment

| Event                   | When                   |
| ----------------------- | ---------------------- |
| `PaymentInitiatedEvent` | A payment is initiated |
| `PaymentSucceededEvent` | A payment succeeds     |
| `PaymentFailedEvent`    | A payment fails        |

### Setting

| Event                 | When                 |
| --------------------- | -------------------- |
| `SettingUpdatedEvent` | A setting is updated |

### Shipping

| Event                    | When                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| `ShipmentCreatedEvent`   | A shipment is created for an order                                     |
| `ShipmentShippedEvent`   | Shipment transitions to shipped (also mirrors `OrderShippedEvent`)     |
| `ShipmentDeliveredEvent` | Shipment transitions to delivered (also mirrors `OrderCompletedEvent`) |

### User

| Event                     | When                      |
| ------------------------- | ------------------------- |
| `UserProfileUpdatedEvent` | A user profile is updated |

## Subscribing

Register listeners in your module's event service provider as you would in
any Laravel application. The per-module reference pages list which events
each module emits and listens to today — use them as the contract when
adding your own reactions.
