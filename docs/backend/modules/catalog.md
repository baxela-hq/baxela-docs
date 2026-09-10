---
sidebar_position: 3
---

# Catalog

Responsible for products and all related entities: variants, options,
images, and categories.

## Tables

| Table                   | Description      |
| ----------------------- | ---------------- |
| `catalog_products`      | Products         |
| `catalog_variants`      | Product variants |
| `catalog_options`       | Product options  |
| `catalog_option_values` | Option values    |
| `catalog_categories`    | Categories       |
| `catalog_images`        | Product images   |

## Events emitted

| Event                     | When                |
| ------------------------- | ------------------- |
| `ProductCreatedEvent`     | Product created     |
| `ProductUpdatedEvent`     | Product updated     |
| `ProductDeletedEvent`     | Product deleted     |
| `ProductActivatedEvent`   | Product activated   |
| `ProductDeactivatedEvent` | Product deactivated |

## Dependencies

| Module | Reason        |
| ------ | ------------- |
| Media  | Image uploads |
