---
sidebar_position: 3
---

# Catalog

Responsible for products and all related entities: variants, options,
images, categories, and the attribute system behind product
specifications.

## Tables

| Table                               | Description                                  |
| ----------------------------------- | -------------------------------------------- |
| `catalog_products`                  | Products                                     |
| `catalog_variants`                  | Product variants                             |
| `catalog_options`                   | Product options (e.g. size, colour)          |
| `catalog_option_values`             | Values per option                            |
| `catalog_variant_option_values`     | Option-value combinations per variant        |
| `catalog_categories`                | Categories                                   |
| `catalog_images`                    | Product images                               |
| `catalog_attribute_groups`          | Attribute groups (organisation for specs)    |
| `catalog_attributes`                | Attribute definitions (code, type, position) |
| `catalog_attribute_values`          | Values per attribute                         |
| `catalog_category_attribute`        | Attributes attached to categories            |
| `catalog_product_attribute_values`  | Attribute values filled in per product       |
| `catalog_attribute_templates`       | Reusable attribute sets                      |
| `catalog_attribute_template_groups` | Groups per attribute template                |
| `catalog_product_seo_translations`  | Per-language SEO metadata for products       |
| `catalog_product_shipping`          | Per-product shipping overrides               |
| `catalog_product_comments`          | Product comments/reviews                     |

The public product endpoint serialises the product's attributes (id,
code, title, value per row, ordered by attribute position) localised in
the request language with fallback — the storefront renders them as the
product page's Specifications tab.

## Events emitted

| Event                        | When                |
| ---------------------------- | ------------------- |
| `ProductCreatedEvent`        | Product created     |
| `ProductUpdatedEvent`        | Product updated     |
| `ProductDeletedEvent`        | Product deleted     |
| `ProductActivatedEvent`      | Product activated   |
| `ProductDeactivatedEvent`    | Product deactivated |
| `ProductCommentCreatedEvent` | Product commented   |

## Dependencies

| Module | Reason        |
| ------ | ------------- |
| Media  | Image uploads |
