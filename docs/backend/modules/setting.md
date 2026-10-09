---
sidebar_position: 14
---

# Setting

Responsible for keeping system settings: website title/description, the
store's default language and currency, the announcement bar, and the
storefront theme.

## Tables

| Table              | Description |
| ------------------ | ----------- |
| `setting_settings` | Settings    |

## Storefront theme

The `storefront_theme` setting (group `theme`) names the brand palette
the storefront should render with — the storefront owns the theme
registry and falls back to its default for unknown values. It is exposed
on the public settings endpoint, and the admin settings page offers a
Theme tab with a selector kept in sync with the storefront's registry.
Shoppers independently pick light/dark/system via the storefront's
theme-mode toggle, which is a client-side cookie, not a setting.

## Events emitted

| Event                 | When                 |
| --------------------- | -------------------- |
| `SettingUpdatedEvent` | A setting is updated |

## Dependencies

None.
