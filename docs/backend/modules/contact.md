---
sidebar_position: 4
---

# Contact

Stores messages submitted through the storefront contact-us form and
manages them in the admin inbox.

## Tables

| Table              | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `contact_messages` | Contact form submissions (name, email, phone, subject, content, status, ip_address) |

## Events emitted

| Event                              | When                                                                         |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `ContactMessageCreatedEvent`       | Public contact form submission stored (public endpoint, per-IP rate limited) |
| `ContactMessageStatusUpdatedEvent` | Admin changed a message status (unread/read/replied/archived)                |
| `ContactMessageDeletedEvent`       | Admin deleted a message                                                      |

## Dependencies

| Module       | Reason                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| Notification | Notifies admins by email when a contact message is submitted (the listener lives in the Notification module) |
