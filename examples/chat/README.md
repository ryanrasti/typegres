# typegres chat — Durable Object + Cap'n Web

A chat app whose entire data layer is [typegres](../../) running **inside a
Cloudflare Durable Object's SQLite**. The browser authors typegres queries that
replay server-side over [Cap'n Web](https://github.com/cloudflare/capnweb) RPC —
there is no REST anywhere.

```
Browser (React)  ──WebSocket / Cap'n Web──▶  Worker ──▶  Durable Object
   authors queries as closures                            typegres → DoSqliteDriver
   doRpc(user => user.rooms()                             → ctx.storage.sql
      .select(...).execute(user.conn))
```

- **`src/do-sqlite-driver.ts`** — a typegres `Driver` over Cloudflare's
  `SqlStorage`.
- **`src/schema.ts`** — the tables (users, rooms, room_members, messages).
- **`src/capabilities.ts`** — the `@expose` capability graph (`User` → `Room`).
  `@expose` gating is the authorization: you only reach a `Room` you're a member
  of, enforced at grant time. A hostile client can't forge a capability.
  `allRooms()` lists the public directory (any room is joinable), while a `Room`
  *capability* is still only handed out once you're a member.
- **`src/index.ts`** — the Worker + Durable Object; serves the cap graph over a
  WebSocket and the React client as static assets.
- **`client/`** — the React UI (`api.ts` is the framework-agnostic Cap'n Web glue).

## Develop

```sh
npm install
npm run dev      # vite (client, watched) + wrangler dev (worker + DO) 
```

Open the printed `wrangler dev` URL, pick a name, create a room, chat.

## Deploy

```sh
npm run deploy   # vite build + wrangler deploy
```

Requires a Cloudflare account (`wrangler login`). SQLite-backed Durable Objects
are available on the Workers paid plan.

## Test

```sh
npm test         # vitest in real workerd (@cloudflare/vitest-pool-workers)
```

The tests run against a real Durable Object in local workerd — including the
`SqlStorage` contract, the driver, the capability graph, and the full Cap'n Web
round trip over a WebSocket.

## Notes

- `SqlStorage` rejects `BigInt` bindings and marshals `INTEGER` results to JS
  `number` (lossy above 2^53) — see `test/sqlstorage.probe.test.ts`. Fine for
  chat-scale ids; the driver down-converts typegres's boolean `0n/1n`.
- The node-only typegres drivers (pg / better-sqlite3 / pglite) are aliased to an
  empty stub in `wrangler.jsonc` — the DO only uses `DoSqliteDriver`.
