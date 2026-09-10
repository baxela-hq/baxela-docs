---
sidebar_position: 7
---

# Inventory

Responsible for tracking product stock levels.

## Tables

| Table                        | Description                      |
| ---------------------------- | -------------------------------- |
| `inventory_inventory_stocks` | Stock levels per product/variant |

## Events emitted

| Event                 | When               |
| --------------------- | ------------------ |
| `StockIncreasedEvent` | Stock is increased |
| `StockDecreasedEvent` | Stock is decreased |
| `StockDepletedEvent`  | Stock reaches zero |

## Dependencies

None.
