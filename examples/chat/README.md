# typegres chat — Durable Object + Cap'n Web

A chat app whose entire data layer is [typegres](../../) running **inside a
Cloudflare Durable Object's SQLite**. The browser authors typegres queries that
replay server-side over [Cap'n Web](https://github.com/cloudflare/capnweb) RPC —
there is no REST anywhere.

```
Browser (React)  ──WebSocket / Cap'n Web──▶  Worker ──▶  Durable Object
   connect() → ChatApi                              typegres/core + DoSqliteDriver
   doRpc(api => api.userByName(name))               → ctx.storage.sql
   doRpc(user => user.rooms()
      .select(...).execute(user.conn))
```

- **`typegres/do-sqlite`** — `DoSqliteDriver` over Cloudflare `SqlStorage`.
- **`typegres/core`** — schema/SQL/@expose without node driver peers (so the
  worker never resolves `pg` / `better-sqlite3` / pglite).
- **`src/tables/`** — generated table classes (`npm run generate`).
- **`src/migrate.ts`** — DDL applied once per DO on init (and by generate).
- **`src/capabilities.ts`** — `@expose` graph: `ChatApi` → `User` → `Room`.
  Reads return query builders the client refines; mutations run server-side.
  `@expose` gating is authorization: you only get a `Room` cap when you're a
  member.
- **`src/index.ts`** — Worker + Durable Object; serves Cap'n Web on `/ws` and
  the React client as static assets.
- **`client/`** — React UI. `api.ts` is transport only (`connect`); the UI
  authors queries inline via `doRpc`.

## Develop

```sh
npm install
npm run generate   # migrate DDL → temp sqlite → tg generate → src/tables
npm run dev        # vite (client, watched) + wrangler dev (worker + DO)
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
- Auth is PoC find-or-create via `ChatApi.userByName(name)`. A real app verifies
  a token in that method and never creates users on login.
