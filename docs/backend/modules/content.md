---
sidebar_position: 5
---

# Content

Responsible for providing content, such as CMS pages.

## Tables

| Table           | Description |
| --------------- | ----------- |
| `content_pages` | CMS pages   |

## Events emitted

| Event                  | When                  |
| ---------------------- | --------------------- |
| `PagePublishedEvent`   | A page is published   |
| `PageUnpublishedEvent` | A page is unpublished |

## Dependencies

| Module       | Reason                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| Notification | Notifies admins by email when a contact message is submitted (the listener lives in the Notification module) |
