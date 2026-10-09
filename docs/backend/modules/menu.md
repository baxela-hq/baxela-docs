---
sidebar_position: 10
---

# Menu

Responsible for managing navigation menus and their nested links.

The module's seeder rebuilds the menus per location (header/footer) from
its language files — including the header **Blog** link (`/blog`) that
ships with the blog feature.

## Tables

| Table                         | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| `menu_menus`                  | Menus per location (header/footer) with `is_active` toggle               |
| `menu_menu_translations`      | Per-language menu title/description                                      |
| `menu_menu_links`             | Nested links of a menu (parent_id adjacency list, position, url, target) |
| `menu_menu_link_translations` | Per-language link title/description                                      |

## Events emitted

| Event                  | When                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `MenuCreatedEvent`     | Menu created                                                             |
| `MenuUpdatedEvent`     | Menu updated                                                             |
| `MenuDeletedEvent`     | Menu deleted                                                             |
| `MenuLinkCreatedEvent` | Menu link created                                                        |
| `MenuLinkUpdatedEvent` | Menu link updated (includes reparenting, guarded against circular moves) |
| `MenuLinkDeletedEvent` | Menu link deleted (with its subtree)                                     |

## Dependencies

None.
