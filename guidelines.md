# typegres guidelines (for LLMs and humans)

How to use typegres correctly. Prefer these patterns over inventing wrappers,
REST façades, or hand-rolled SQL string builders.

## What typegres is

- A **typed SQL builder + runtime** for Postgres and SQLite.
- Tables are **classes** bound to a `Database` (dialect + provenance).
- Queries are **values** you compose in TypeScript, then `.execute(conn)`.
- Over Cap'n Web / exoeval, **`@expose` is the capability boundary**: only
  decorated members are reachable remotely. Authorization = what caps you hand
  out, not ad-hoc checks scattered in handlers.

## Core objects

| Object | Role |
|--------|------|
| `Database` | Immutable schema/provenance handle. No I/O. `new Database({ dialect })`. |
| `Connection` | Runtime handle with a `Driver`. Obtained via `db.attach(driver)`. |
| `Driver` | Executes compiled SQL (`PgDriver`, `PgliteDriver`, `SqliteDriver`, `DoSqliteDriver`). |
| `db.Table("name")` | Base for a table class. Columns are typed fields; relations are methods. |
| `QueryBuilder` | Fluent select/where/join/…; terminate with `.execute(conn)` / `.hydrate(conn)`. |
| `@expose` | Marks members callable over RPC / sandboxed eval. |

**Do not** conflate `Database` and `Connection`. Define tables on `db` at module
load; attach a driver when the process/DO starts.

```ts
export const db = new Database({ dialect: "sqlite" });
// later, once per DO / process:
const conn = db.attach(new DoSqliteDriver(ctx.storage.sql));
```

## Package entry points

| Import | Use when |
|--------|----------|
| `typegres` | Node apps, scripts, playground. May pull optional driver peers. |
| `typegres/core` | Schema, `sql`, `@expose`, `Database`/`Connection` **without** node drivers. Prefer in Cloudflare Workers / Durable Objects. |
| `typegres/do-sqlite` | `DoSqliteDriver` + `SqlStorageLike` only. |
| `typegres/sqlite` / `typegres/postgres` | Column type classes (`Integer`, `Text`, `Int8`, …). |
| `typegres/capnweb` | `toRpc`, `doRpc`, `ShimStub` for Cap'n Web. |
| `typegres/exoeval` | Sandboxed eval RPC (non-capnweb). |

**Workers rule:** never import the root `typegres` entry from worker/DO code if
it can be avoided. Use `typegres/core` + `typegres/do-sqlite` so bundlers do not
resolve `pg` / `better-sqlite3` / `@electric-sql/pglite`.

Optional peers (install only what you need):

- `pg` — `PgDriver`
- `@electric-sql/pglite` — `PgliteDriver`
- `better-sqlite3` — `SqliteDriver` and `tg generate` (sqlite)

## Schema workflow

1. **DDL is source of truth** (migrations or `migrate()`).
2. Apply DDL to a real DB (Postgres URL or a sqlite file).
3. Run **`tg generate`** (`typegres.config.ts` → table files with
   `@generated-start` / `@generated-end`). Generated files import runtime
   helpers from **`typegres/core`** (not the root barrel).
4. Edit only **outside** markers (or re-apply intentional renames after generate).
5. Prefer FK columns named `*_id` (e.g. `created_by_user_id`) so the derived
   relation name (`created_by_user`) does not collide with the column.

```ts
// typegres.config.ts
export default {
  dialect: "sqlite",
  db: "./dev.db",
  tables: "src/tables",
  dbImport: "../db",
} satisfies Config;
```

For Durable Objects: apply the same DDL to a **temp better-sqlite3 file**, then
`tg generate` — do not depend on wrangler’s internal DO sqlite path.

**Do not** hand-maintain column lists in parallel with DDL without generate.
**Do not** strip `@generated-start`/`@generated-end` markers.

## Writing queries

Prefer the builder over string SQL:

```ts
const rows = await Rooms.from()
  .where(({ rooms }) => rooms.id.eq(id))
  .select(({ rooms }) => ({ id: rooms.id, name: rooms.name }))
  .orderBy(({ rooms }) => rooms.id)
  .execute(conn);
```

- Use `.insert` / `.update` / `.delete` builders for mutations.
- Use `sql\`...\`` for DDL and rare dialect-specific fragments.
- SQLite: booleans compile to BigInt `0n`/`1n`; `DoSqliteDriver` converts for
  SqlStorage. Prefer generated ids that fit JS `number` on DOs (SqlStorage
  returns INTEGER as number; >2^53 is lossy).

## Capabilities and Cap'n Web (the intended app shape)

### Session root

Expose a **small root API**, not a pre-authenticated user:

```ts
class ChatApi {
  @expose(z.string().min(1))
  async userByName(name: string): Promise<User> { /* auth → User cap */ }
}
// DO fetch:
return newWorkersWebSocketRpcResponse(req, toRpc(new ChatApi(conn)));
```

**Do not** authenticate in the HTTP handler and set main = `User` unless you
have a strong reason. Keep auth on the graph.

### Reads vs mutations

| Kind | Pattern |
|------|---------|
| **Read** | Return a **query builder** (or table-scoped builder). Client refines `.select` / `.where` / `.orderBy` and `.execute(user.conn)`. |
| **Mutation** | `@expose` method runs insert/update/delete **server-side**, validates args (zod on `@expose`), returns data or a new cap. |
| **Grant** | Method that checks authz then `return new Room(...)`. Client only holds caps it was given. |

```ts
// Good — client-refinable read
@expose() rooms() {
  return Rooms.from().join(...).where(...);
}

// Good — mutation
@expose(z.string().min(1))
async post(body: string) { ... }

// Bad — canned read that the client could have authored
@expose() async feed() {
  return Messages.from().join(Users, ...).select(...).execute(this.#conn);
}
```

### Client code

- Transport helper only: `connect()` → root stub.
- **Author queries at the call site** with `doRpc`:

```ts
const rooms = await doRpc(user, (u) =>
  u.rooms().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).execute(u.conn),
);
```

**Do not** build a REST-shaped `api.listRooms()` / `api.getFeed()` façade that
hides `doRpc` and the builder — that defeats the product demo and the security
model (the server should see client-authored query closures, not opaque named
RPCs for every read).

### Connection on the wire

Expose `conn` on the principal if clients must `.execute` builders:

```ts
@expose() get conn() { return this.#conn; }
```

Builders’ `.execute` is `@expose`d and accepts a `Connection`. This matches
typegres’s Cap'n Web tests. Do not invent a separate “runQuery” RPC.

### Holding caps

Prefer holding a returned `Room` stub for repeated work. Re-calling
`user.room(id)` every poll re-runs membership checks (fine for demos, wasteful
in production).

## Authorization checklist

1. Only `@expose` what remote callers may touch.
2. Hand out nested caps only after checks (`room(id)` verifies membership).
3. Scope builders to the cap (`messages` filtered by `this.#id`).
4. Never trust client-supplied user ids for mutations — use the principal on the
   cap (`this.#userId`).
5. Public directory vs private content: listing rows may be open; **content**
   still requires a Room cap.

## Drivers

| Driver | Environment |
|--------|-------------|
| `PgDriver.create(url)` | Node + Postgres |
| `PgliteDriver.create()` | In-process Postgres (tests, playground) |
| `SqliteDriver.create(path?)` | Node + better-sqlite3 |
| `DoSqliteDriver(sql)` | Cloudflare Durable Object `ctx.storage.sql` |

Implement `Driver` only if you need a new backend. Share sqlite helpers
(`stripMatchedOuterParens`, row stringification) — do not fork normalize logic
per example.

## Anti-patterns (do not do these)

1. **Wrapper APIs for every read** on client or server (“service layer” that only
   forwards to builders). Expose builders; let the client compose.
2. **Importing root `typegres` in Workers** and then aliasing `pg` to empty
   stubs. Use `typegres/core` + `typegres/do-sqlite` instead.
3. **Hand-written table classes that drift from DDL** when `tg generate` exists.
4. **Auth outside the capability graph** (`?user=` on the WebSocket URL as the
   long-term model).
5. **Using TS `Record<K,V>`** in this repo — use `{ [k: K]: V }` (project
   convention; typegres exports a `Record` class).
6. **Comments about deleted code** (“X removed…”). Describe present design only.
7. **React `setState(capnwebStub)`** without wrapping — stubs are callable
   Proxies; use `setState(() => stub)`.
8. **Assuming SqlStorage = better-sqlite3** — BigInt rejected; int64→number
   lossy; blobs are `ArrayBuffer`.

## Minimal Durable Object sketch

```ts
import { Database, expose, sql, type Connection } from "typegres/core";
import { DoSqliteDriver } from "typegres/do-sqlite";
import { toRpc } from "typegres/capnweb";

const db = new Database({ dialect: "sqlite" });

export class MyDo extends DurableObject {
  conn: Connection;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.conn = db.attach(new DoSqliteDriver(ctx.storage.sql));
    ctx.blockConcurrencyWhile(() => migrate(this.conn));
  }
  fetch(req: Request) {
    return newWorkersWebSocketRpcResponse(req, toRpc(new Api(this.conn)));
  }
}
```

## Testing

- Prefer real drivers (pglite, better-sqlite3, or workerd pool) over mocks.
- Cap'n Web: exercise **over the wire** (`doRpc` + WebSocket), not only
  in-process class calls.
- For DO examples: `@cloudflare/vitest-pool-workers` + unique DO ids per test
  when isolated storage is off.

## When unsure

1. Can this be a **client-authored builder** from an existing cap? → read path.
2. Does it change state or mint a cap? → `@expose` mutation/grant on the server.
3. Does the worker import a node peer? → switch to `typegres/core` /
   `typegres/do-sqlite`.
4. Is the table shape hand-copied from SQL? → `tg generate`.
