---
sidebar_position: 3
---

# Catalog

Responsible for products and all related entities: variants, options,
images, categories, the attribute system behind product specifications,
featured curation, and whole-catalog data import/export.

## Tables

| Table                               | Description                                        |
| ----------------------------------- | -------------------------------------------------- |
| `catalog_products`                  | Products                                           |
| `catalog_variants`                  | Product variants                                   |
| `catalog_options`                   | Product options (e.g. size, colour)                |
| `catalog_option_values`             | Values per option                                  |
| `catalog_variant_option_values`     | Option-value combinations per variant              |
| `catalog_categories`                | Categories (with optional cover image)             |
| `catalog_images`                    | Product images (one may be attached per variant)   |
| `catalog_featured_items`            | Curated featured products/categories with position |
| `catalog_attribute_groups`          | Attribute groups (organisation for specs)          |
| `catalog_attributes`                | Attribute definitions (code, type, position)       |
| `catalog_attribute_values`          | Values per attribute                               |
| `catalog_category_attribute`        | Attributes attached to categories                  |
| `catalog_product_attribute_values`  | Attribute values filled in per product             |
| `catalog_attribute_templates`       | Reusable attribute sets                            |
| `catalog_attribute_template_groups` | Groups per attribute template                      |
| `catalog_product_seo_translations`  | Per-language SEO metadata for products             |
| `catalog_product_shipping`          | Per-product shipping overrides                     |
| `catalog_product_comments`          | Product comments/reviews                           |
| `catalog_imports`                   | Audit of every catalog/product import run          |

The public product endpoint serialises the product's attributes (id,
code, title, value per row, ordered by attribute position) localised in
the request language with fallback — the storefront renders them as the
product page's Specifications tab.

## Pricing and variants

Product prices are promotion-aware: public list/detail responses (and
cart lines) keep flat `price`/`compare_price` fields and add a
`promotion` object when an automatic promotion applies — see
[Discount](/backend/modules/discount). Variants carry at most one image
(`variants.*.image` — `{media_id, url}` — in the admin payloads;
`image_url` on public variants).

## Featured curation

Featured products and categories are a curated, positioned list rather
than per-row flags:

| Endpoint                                       | Audience | Purpose                                                                |
| ---------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `GET /catalog/admin/featured`                  | Admin    | Curated products and categories, ordered by position                   |
| `PUT /catalog/admin/featured`                  | Admin    | Full sync — `{product_ids, category_ids}`; array order is the position |
| `GET /catalog/public/products?featured=true`   | Public   | Featured products (default sort by position)                           |
| `GET /catalog/public/categories?featured=true` | Public   | Featured categories                                                    |

The storefront's home page consumes the two `featured=true` lists.

## Data import / export

Two admin pathways share the `catalog_imports` audit table (row counts,
per-section rollups, capped errors, dry-run support):

- **Catalog JSON** — `GET /catalog/admin/data/export` streams the whole
  module (attribute groups → values, options, categories, products,
  featured items) as a `baxela.module-export` document whose payloads
  are the exact admin create/update JSON; `POST
/catalog/admin/data/import[/preview]` replays it with `on_duplicate`
  `update|skip`, remapping source-store ids and language codes. A sample
  lives in the monorepo's `docs/catalog-export-sample.json`.
- **Product CSV** — `POST /catalog/admin/products/import[/preview]`
  (plus `GET …/import/template`) with a Shopify-style column layout
  (`variant.sku`, `variant.price`, `title.{lang}`, …). Rows sharing a
  `handle` group into one multi-variant product — `option1..3.name` /
  `.value` columns resolve (or create, opt-in) the catalog's options and
  values. Duplicate SKUs match existing products per the chosen
  strategy. A sample lives in `docs/product-import-sample.csv`.

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

| Module   | Reason                                         |
| -------- | ---------------------------------------------- |
| Media    | Image uploads (incl. CSV/JSON import files)    |
| Discount | Promoted prices injected into public responses |
