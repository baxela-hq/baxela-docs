---
sidebar_position: 6
---

# Core

The shared module every other module builds on: cross-module contracts
(events, gateways, DTOs), country data, and idempotency support.

## Tables

| Table                   | Description                               |
| ----------------------- | ----------------------------------------- |
| `core_idempotency_keys` | Idempotency keys for safe request retries |

## Events

Core emits no domain events of its own, but it **listens to all dispatched
events** (persisting the event stream).

## Dependencies

None — Core is the dependency.
