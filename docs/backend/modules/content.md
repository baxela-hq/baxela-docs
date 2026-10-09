---
sidebar_position: 5
---

# Content

Responsible for storefront content: CMS pages and the blog — posts with
categories, moderated comments, per-language SEO metadata, scheduled
publishing, and related products.

## Tables

| Table                                | Description                                        |
| ------------------------------------ | -------------------------------------------------- |
| `content_pages`                      | CMS pages                                          |
| `content_posts`                      | Blog posts (`status`, nullable `published_at`)     |
| `content_post_translations`          | Per-language title/slug/content/description        |
| `content_post_seo_translations`      | Per-language meta + Open Graph fields              |
| `content_post_categories`            | Post categories (nested via `parent_id`)           |
| `content_post_category_translations` | Per-language category title/slug/description       |
| `content_post_category_post`         | Post ↔ category pivot                              |
| `content_post_comments`              | Comments (threaded one level, `status` moderation) |
| `content_post_product`               | Post ↔ related-product pivot                       |

## Blog endpoints

| Endpoint                                                      | Audience | Purpose                                                   |
| ------------------------------------------------------------- | -------- | --------------------------------------------------------- |
| `GET /content/public/posts`                                   | Public   | List published posts (filter by `category` slug)          |
| `GET /content/public/posts/{idOrSlug}`                        | Public   | Show a published post (with related products)             |
| `GET /content/public/posts/{id}/comments`                     | Public   | Approved comment thread                                   |
| `POST /content/user/posts/{id}/comments`                      | User     | Submit a comment (`body`, optional one-level `parent_id`) |
| `GET /content/public/post-categories`                         | Public   | List categories                                           |
| `GET /content/public/post-categories/{idOrSlug}`              | Public   | Show a category                                           |
| `GET/POST /content/admin/posts` (+ `GET/PATCH/DELETE …/{id}`) | Admin    | Post CRUD                                                 |
| `GET/POST /content/admin/post-categories` (+ `…/{id}`)        | Admin    | Category CRUD                                             |
| `GET/POST /content/admin/post-comments` (+ `…/{id}`)          | Admin    | Comment moderation (approve/reject)                       |

## Publishing schedule

Scheduling is query-time, not scheduler-driven: the public endpoints only
return posts with `status=published` **and** (`published_at` is null or in
the past). A future `published_at` hides the post from lists and direct
lookups alike; admin endpoints are unrestricted. The admin post form's
publish tab pairs the status select with a `published_at` datetime picker.

## Comments and SEO

Customer-submitted comments are created `pending` and only appear once an
admin approves them (`pending`/`approved`/`rejected`); admin replies are
created directly as `approved`. The public thread shows approved top-level
comments with their approved replies, author names resolved through the
User gateway.

Post SEO is translated per language (`meta_title`, `meta_description`,
`open_graph_title`, `open_graph_description`) and admin-only — the
storefront derives public page metadata from the post translation. The
admin SEO tab renders a Google SERP preview (shared with the product SEO
tab) against the storefront URL.

Related products ride on the `content_post_product` pivot: product ids are
validated through the Catalog gateway on write and enriched with product
summaries on read; the public post page only includes published products.

## Events emitted

| Event                     | When                          |
| ------------------------- | ----------------------------- |
| `PagePublishedEvent`      | A page is published           |
| `PageUnpublishedEvent`    | A page is unpublished         |
| `PostCommentCreatedEvent` | A customer comments on a post |

## Dependencies

| Module  | Reason                                             |
| ------- | -------------------------------------------------- |
| Catalog | Related-product validation and summaries (gateway) |
| User    | Comment author names (gateway)                     |
