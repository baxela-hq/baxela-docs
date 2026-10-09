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
| `OtpRequestedEvent`      | A customer requests an OTP |
| `UserEmailVerifiedEvent` | A user's email is verified |
| `UserActivatedEvent`     | A user is activated        |
| `UserDeactivatedEvent`   | A user is deactivated      |

### Cart

| Event                  | When                           |
| ---------------------- | ------------------------------ |
| `CartCreatedEvent`     | A cart is created              |
| `CartItemAddedEvent`   | An item is added to a cart     |
| `CartItemRemovedEvent` | An item is removed from a cart |
| `CartCheckedOutEvent`  | A cart is checked out          |

### Catalog

| Event                        | When                        |
| ---------------------------- | --------------------------- |
| `ProductCreatedEvent`        | A product is created        |
| `ProductUpdatedEvent`        | A product is updated        |
| `ProductDeletedEvent`        | A product is deleted        |
| `ProductActivatedEvent`      | A product is activated      |
| `ProductDeactivatedEvent`    | A product is deactivated    |
| `ProductCommentCreatedEvent` | A product comment is posted |

### Contact

| Event                              | When                                                          |
| ---------------------------------- | ------------------------------------------------------------- |
| `ContactMessageCreatedEvent`       | Public contact-form submission stored (per-IP rate limited)   |
| `ContactMessageStatusUpdatedEvent` | Admin changed a message status (unread/read/replied/archived) |
| `ContactMessageDeletedEvent`       | Admin deleted a message                                       |

### Content

| Event                     | When                          |
| ------------------------- | ----------------------------- |
| `PagePublishedEvent`      | A CMS page is published       |
| `PageUnpublishedEvent`    | A CMS page is unpublished     |
| `PostCommentCreatedEvent` | A customer comments on a post |

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

| Event                 | When                                                                        |
| --------------------- | --------------------------------------------------------------------------- |
| `OrderCreatedEvent`   | Checkout creates the order (in `pending`/`unpaid`)                          |
| `OrderPaidEvent`      | A settled payment marks the order `paid`                                    |
| `OrderShippedEvent`   | The order is marked `shipped`                                               |
| `OrderCompletedEvent` | The order is marked `completed`                                             |
| `OrderCancelledEvent` | The order is cancelled — by the customer or by the scheduled expiry command |
| `OrderRefundedEvent`  | The order's payment status moves to `refunded`                              |
| `OrderPendingEvent`   | Reserved contract — not dispatched yet                                      |

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

| Event                    | When                                                                  |
| ------------------------ | --------------------------------------------------------------------- |
| `ShipmentCreatedEvent`   | A shipment is created for an order                                    |
| `ShipmentShippedEvent`   | Shipment transitions to shipped (the order is marked shipped too)     |
| `ShipmentDeliveredEvent` | Shipment transitions to delivered (the order is marked completed too) |

### Support

| Event                       | When                            |
| --------------------------- | ------------------------------- |
| `TicketCreatedEvent`        | A support ticket is created     |
| `TicketMessageCreatedEvent` | A customer or admin reply lands |
| `TicketStatusUpdatedEvent`  | A ticket's status changes       |
| `TicketDeletedEvent`        | A ticket is deleted             |

### User

| Event                     | When                      |
| ------------------------- | ------------------------- |
| `UserProfileUpdatedEvent` | A user profile is updated |

## Subscribing

Register listeners in your module's event service provider as you would in
any Laravel application. The per-module reference pages list which events
each module emits and listens to today — use them as the contract when
adding your own reactions. The **Notification** module is the canonical
example: it subscribes to order, payment, and contact events and delivers
them over database/email channels.
