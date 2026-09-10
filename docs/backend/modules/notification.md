---
sidebar_position: 10
---

# Notification

Sends email notifications on behalf of other modules.

Today its listeners notify admins by email when a contact message is
submitted (the listener for `ContactMessageCreatedEvent` lives here).

## Events listened to

| Event                        | Reaction                                       |
| ---------------------------- | ---------------------------------------------- |
| `ContactMessageCreatedEvent` | Email the admins about the new contact message |

## Dependencies

None.
