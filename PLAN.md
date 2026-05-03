# Demo App Plan: SMB Ops Cockpit on Hono + Fly + Neon

## Stack

Hono server on Fly.io + Neon Postgres. Long-lived HTTP for live (SSE via Hono's `streamSSE`).

## Architecture

```
examples/ops-demo/
├── package.json             (deps: pg, typegres, hono, @hono/node-server, react, vite)
├── tsconfig.json
├── fly.toml                 (Fly app config — region, machine size, http service, healthcheck)
├── Dockerfile               (Node base image, Vite build, server entry)
├── src/
│   ├── server/
│   │   ├── index.ts         (Hono app — RPC endpoint + live SSE + static assets)
│   │   └── api.ts           (typegres API class exposed via exoeval @tool)
│   ├── schema/
│   │   ├── customers.ts
│   │   ├── orders.ts
│   │   ├── order-lines.ts
│   │   ├── inventory-positions.ts
│   │   ├── shipments.ts
│   │   └── locations.ts
│   ├── seed.ts              (dev seed data — runs against local PG or Neon)
│   └── client/              (React SPA — Vite build, served by the Node server)
│       ├── index.html
│       ├── main.tsx
│       ├── pages/
│       │   ├── Landing.tsx
│       │   ├── Dashboard.tsx
│       │   ├── Orders.tsx
│       │   ├── Inventory.tsx
│       │   ├── Shipments.tsx
│       │   ├── WidgetBuilder.tsx
│       │   └── PromptWidget.tsx (bonus)
│       └── components/
│           ├── Widget.tsx
│           ├── WidgetControls.tsx
│           └── LiveIndicator.tsx
```

## Steps

### 1. Scaffold the project

- Manual `package.json` + `tsconfig.json` under `examples/ops-demo/`
- typegres as `file:../..` dep (same pattern as `examples/basic`)
- Hono + `@hono/node-server` for the HTTP layer; `hono/streaming` for SSE
- Vite for the client build, served as static assets by the Hono server (`serveStatic`)
- `fly.toml` + `Dockerfile` checked in; pick Fly region matching the Neon region

### 2. Schema + typegres classes

- 6 tables: customers, orders, order_lines, inventory_positions, shipments, locations
- Relations: orders → customers, order_lines → orders + inventory_positions, shipments → orders, inventory_positions → locations
- State transitions on Order (draft → confirmed → picking → packed → shipped → delivered)
- Plain Table classes with `@tool` methods for capability-bounded operations

### 3. Seed data

- Script that populates ~50 orders, ~10 customers, ~100 SKUs, ~5 locations
- Variety so widgets are interesting (some at-risk, some late, some low-stock)
- Local PG for dev, Neon for the deployed demo

### 4. HTTP server — RPC + live

- Single Hono app, single Node process:
  - Connects to Postgres via `pg` Pool (direct connection to Neon)
  - Calls `db.startLive()` once at boot
  - `app.post('/rpc', ...)` — exoeval RPC endpoint
  - `app.get('/live', c => streamSSE(c, async (stream) => { for await (const rows of db.live(query)) await stream.writeSSE({ data: serialize(rows) }) }))` — live endpoint
  - `serveStatic` for Vite-built client assets
- API class wraps schema with `@tool`-decorated methods

### 5. Client — Dashboard with configurable widgets

- React SPA (Vite build)
- RpcClient talks to `/rpc`
- Widget component takes: entity, filters, groupBy, metric, sort, live toggle
- Widget controls alter the query expression sent over RPC
- Dashboard page first — 3-4 widgets showing different compositions

### 6. Live queries

- Live widgets open an `EventSource('/live?...')` to the server
- At least one widget on the Shipments/cutoffs page with `.live()` toggle
- Show a clearly custom live query, not a generic feed
- Disconnect → server-side `for await` throws → `live()`'s finally unsubscribes; clean lifecycle

### 7. Widget builder page

- Form: entity, filters, groupBy, metric, sort, live
- Preview panel renders result via the same widget component
- Proves: no backend change needed for a new view

### 8. Prompt-to-widget (bonus)

- Text input → LLM generates typegres query expression
- Evaluate via exoeval → render as widget
- Same widget model as manual builder

## Dev workflow

- Local: PGlite or local Postgres, `npm run dev` runs Vite + the Hono server (concurrently)
- Deploy: `fly deploy` for the server, Neon (free tier) for PG, regions matched (e.g. both in `iad`)

## Operational notes for live over HTTP

- **Fly proxy idle timeout is 60s.** Heartbeat is mandatory: `stream.writeSSE({ data: '', event: 'ping' })` every 20-30s, or just `await stream.write(':\n\n')` for a comment-frame keepalive. Hono's `streamSSE` handles the framing.
- **Hono `streamSSE` already sets the right headers** (`Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`) and handles client-disconnect cleanup — the `for await` throws cleanly when the client closes, triggering `live()`'s finally to unsubscribe.
- **No reverse proxy buffering to worry about on Fly** (Fly's proxy doesn't buffer streamed responses). If anything is ever put in front (Cloudflare, nginx), set `X-Accel-Buffering: no` on `/live` responses.
- **One Bus per process.** `db.startLive()` once at boot, shared across all `/live` connections. The Bus's reverse index handles many concurrent subs efficiently.
- **Pool sizing.** The Bus shares the `pg` Pool with request-path queries. Verify pool size is >= peak concurrent live iterations (each `runLiveIteration` opens a brief REPEATABLE READ txn) + request concurrency. For a demo, a pool of 10 is more than enough.
- **Single Fly machine for the demo.** Multiple machines = multiple Bus instances = N× polling. Fine for a demo (one machine), but if scaling later, the Bus needs to move to a singleton (one dedicated process or a leader-elected setup).

## Open questions

- Vite dev-server proxying `/rpc` and `/live` to the Hono server, or single-port serve in dev?
- Do we need a migration step or just a seed script that runs CREATE TABLE? (Seed-only is fine for a demo.)
- LLM provider for the bonus prompt-to-widget page (Anthropic SDK is the natural pick).
- Neon region — pick first, then match Fly region (`iad`, `sfo`, etc.).
