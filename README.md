# Typegres

![Typegres playground demo](./assets/demo.gif)

- **Methods on your tables = your API.** No routes. No GraphQL. No auto-CRUD.
- **Every Postgres/SQLite function, fully typed.** All base types, every operator,
  nullability tracked at the type level.
- **Clients compose typed SQL across the wire.** Server validates the surface
  area you expose.
- **Live by default.** `.live()` re-queries when the underlying data changes — pushed directly to clients.

> [typegres.com/play](https://typegres.com/play) · [demo.mp4](./assets/demo.mp4) · [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Usage

> **Developer preview** — surface is settled, edges still being filed. Not
> yet recommended for production.

```bash
npm install typegres better-sqlite3 zod
```

```typescript
import { typegres, expose, sql, Relation } from "typegres";
import { doRpc, toRpc, newMessagePortRpcSession, type ShimStub } from "typegres/capnweb";
import { SqliteDriver } from "typegres/drivers/sqlite";
import { Integer, Text } from "typegres/sqlite";
import z from "zod";

const db = typegres();
db.connect(SqliteDriver.create());

await db.defaultConnection.execute(sql`CREATE TABLE users (
  id         INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  team_token TEXT NOT NULL
)`);
await db.defaultConnection.execute(sql`CREATE TABLE posts (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  body    TEXT NOT NULL
)`);

class Posts extends db.Table("posts") {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() user_id = Integer.column({ nonNull: true });
  @expose() body = Text.column({ nonNull: true });
}

class Users extends db.Table("users") {
  // 1. Exposed columns: a client may select, filter and order by these.
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() first_name = Text.column({ nonNull: true });
  @expose() last_name = Text.column({ nonNull: true });

  // 2. No decorator: invisible. The server scopes on it below, and no
  //    client query can select it, filter by it, or learn it exists.
  team_token = Text.column({ nonNull: true });

  // 3. A "derived column": composes back into the typed query API, so a
  //    client can group and order by it as if it were stored.
  //    (Note, "derived columns" are just methods that return SQL fragments
  //     that can reference `this`, the current row).
  //    Compiles to: "users"."first_name" || ' ' || "users"."last_name"
  @expose() fullName() {
    return this.first_name["||"](" ")["||"](this.last_name);
  }

  // 4. Relation: a reachability edge. Reaching a Users row reaches that
  //    user's posts, and nothing else. (Note, relations are just methods
  //    that return query builders referencing `this`)
  @expose() posts() {
    return Relation.has(this, Posts, { user_id: this.id });
  }
}

await Users.insert(
  { first_name: "Alice", last_name: "Smith", team_token: "t-acme" },
  { first_name: "Bob", last_name: "Jones", team_token: "t-acme" },
).execute();

// Query it directly on the server. `fullName()` works anywhere a column
// does — select, where, orderBy:
const names = await Users.from()
  .select(({ users }) => ({ name: users.fullName() }))
  .execute();

console.log(names); // [ { name: 'Alice Smith' }, { name: 'Bob Jones' } ]

// ── Now the same data model, reached by a client over RPC ──────────────
// Nothing about the classes above changes. The `@expose` marks already
// are the contract; all that's left is to hand out a root capability.

// A third user, on a different team, plus some posts:
await Users.insert({
  first_name: "Carol",
  last_name: "Vance",
  team_token: "t-other",
}).execute();
await Posts.insert(
  { user_id: 1, body: "one" },
  { user_id: 1, body: "two" },
  { user_id: 2, body: "three" },
  { user_id: 3, body: "not yours" },
).execute();

// The capability root — the entire surface a client can reach.
class Api {
  // 5. Arguments are validated by a schema before the method ever runs.
  //
  // Hands back a builder over one team's posts, already joined to authors.
  // Everything the client writes is rooted here, so it can only narrow.
  @expose(z.string())
  feedFor(teamToken: string) {
    return Posts.from()
      .join(Users, ({ posts, users }) => posts.user_id.eq(users.id))
      .where(({ users }) => users.team_token.eq(teamToken));
  }

  @expose(z.string())
  team(teamToken: string) {
    return Users.from().where(({ users }) => users.team_token.eq(teamToken));
  }
}

// Server and client, joined here by a MessagePort so this runs in one
// process. `examples/chat` is the same two lines over a WebSocket.
const { port1, port2 } = new MessageChannel();
newMessagePortRpcSession(port1, toRpc(new Api()));
const api = newMessagePortRpcSession<Api>(port2) as unknown as ShimStub<Api>;

// "Top posters" — written on the client, evaluated on the server. There is
// no endpoint for this: the client composed the group-by, the aggregate and
// the ordering itself, and grouped by `fullName()` — a method, used exactly
// like a column. The team scoping is baked into the builder, so the
// refinement can only narrow it, and Carol's row never appears.
const top = await doRpc(api, (a) =>
  a
    .feedFor("t-acme")
    .groupBy(({ users }) => [users.fullName()])
    .select(({ users, posts }) => ({ author: users.fullName(), posts: posts.id.count() }))
    .orderBy(({ posts }) => [posts.id.count(), "desc"])
    .execute(),
);

console.log(top); // [ { author: 'Alice Smith', posts: 2 }, { author: 'Bob Jones', posts: 1 } ]

// Rows are capabilities too. `.hydrate()` returns row objects rather than
// plain data, and the relation is an edge you can walk from one — so
// reaching Alice reaches Alice's posts, without a second endpoint.
const [alice] = await doRpc(api, (a) =>
  a.team("t-acme").where(({ users }) => users.first_name.eq("Alice")).hydrate(),
);

const alicesPosts = await doRpc(alice, (u) =>
  u.posts().select(({ posts }) => ({ body: posts.body })).execute(),
);

console.log(alicesPosts); // [ { body: 'one' }, { body: 'two' } ]

port1.close();
port2.close();
await db.defaultConnection.close();
```

For a complete scaffold with migrations + codegen, see the
[examples](#examples). Or try it interactively at
[typegres.com/play](https://typegres.com/play).

## Clients compose the queries

The class surface is the contract. A client composes against `@expose`-marked
members, the closure is serialized, and the server evaluates it under a
constrained interpreter — so a client can write any query it likes, and still
reach only what you exposed.

The client-authored "top posters" query compiles to plain SQL, with
`fullName()` expanded in both the select list and the `GROUP BY` — which is
what "used exactly like a column" means in practice. The team scoping the
client never wrote is in the `WHERE`:

```sql
SELECT (("users"."first_name" || ?) || "users"."last_name") as "author",
       "count"("posts"."id") as "posts"
FROM "posts" AS "posts"
  JOIN "users" AS "users" ON ("posts"."user_id" = "users"."id")
WHERE ("users"."team_token" = ?)
GROUP BY (("users"."first_name" || ?) || "users"."last_name")
ORDER BY "count"("posts"."id") DESC
-- params: [" ", "t-acme", " "]
```

Note what the client never does: name a table. `Posts` and `Users` are
server-side identifiers, and a closure that references one won't serialize.
A client starts from a capability it was handed and narrows — which is why
`feedFor`'s join and its team scoping can't be composed away.

Swap the MessagePort for `newWebSocketRpcSession` / `newWorkersRpcResponse` and
the same code runs browser-to-server, with capabilities, promise pipelining,
and live subscriptions — see [`examples/chat`](./examples/chat).

## Backends

`typegres()` is a synchronous schema handle — no top-level await, so table
classes can be declared at module load. The backend arrives separately via
`db.connect(driver)`, and the same schema classes and query builder run
against any of them:

```typescript
import { PgDriver }       from "typegres/drivers/pg";      // node-postgres
import { PgliteDriver }   from "typegres/drivers/pglite";  // in-process WASM Postgres
import { SqliteDriver }   from "typegres/drivers/sqlite";  // better-sqlite3
import { DoSqliteDriver } from "typegres/drivers/do";      // Cloudflare Durable Object

const db = typegres();

// Pick the one you're running against — the driver names the backend, and
// `db` takes its dialect from it:
db.connect(PgDriver.create(process.env.DATABASE_URL!));
db.connect(await PgliteDriver.create());          // the one async driver: booting WASM is real I/O
db.connect(SqliteDriver.create("dev.db"));        // omit the filename for :memory:
db.connect(DoSqliteDriver.create(ctx.storage));   // in the DO constructor — no npm peer needed
```

Drivers are imported explicitly from `typegres/drivers/*` so optional peers
stay out of bundles that never use them — install only the one you need.

With exactly one connection (the Durable Object model), it's also the
default: `.execute()` / `.live()` take no argument, and you can ignore what
`connect` returns. Pass a `Connection` explicitly when you have several —
read replicas, database-per-tenant, or a transaction's `tx`. Several is fine
as long as they agree on dialect; the schema classes compiled against one.

## How it works

1. **Types codegen'd from the engine itself.** Postgres from its catalog,
   SQLite from its docs — all base types, full method/operator coverage,
   nullability tracked at the type level.
2. **Object-capability queries.** Clients can only reach what you've exposed
   as `@expose` methods — columns, relations, scoped reads, mutations. The class
   surface is the contract; the schema underneath is free to move.
3. **Object-capability RPC.** The query builder ships to a constrained
   interpreter on the server; only `@expose`-marked methods reach evaluation.
4. **Live queries.** Tables opt in with `db.Table("name", { live: true })`.
   `.live()` watches the predicates your query depends on and re-yields when
   committed mutations would change the result — via a polling bus on
   Postgres, and synchronous mutation capture on SQLite.

Deeper dive in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Examples

- [`examples/basic`](./examples/basic) — Postgres/PGLite scaffold:
  migrations, `tg generate` codegen, relations (`Relation.belongsTo` / `.has`).
- [`examples/sqlite`](./examples/sqlite) — the same scaffold on
  better-sqlite3.
- [`examples/chat`](./examples/chat) — full-stack chat on a Cloudflare
  Durable Object: SQLite storage, Cap'n Web RPC from the browser, live
  queries pushed to clients, and facet-based capability security (the whole
  server is the schema — there are no routes).

## Status

- [x] Full pg type system + operator/function codegen
- [x] SQLite dialect — typed function/operator surface from the same
      codegen; drivers for better-sqlite3 and Durable Objects
- [x] Query builder (`.select` + `.join` + `.where` + `.groupBy` + `.having` + `.orderBy` + `.limit`)
- [x] Mutations (`.insert` / `.update` / `.delete` / `.returning`)
- [x] Subqueries, scalar/array aggregation
- [x] Table codegen from live schema (`tg generate`, both dialects)
- [x] Live queries — `.live()` returns a `LiveQuery`: an async iterable you
      can also `.observe()` for push delivery (including over RPC)
- [x] Capability-rooted RPC — closures composed against `@expose`-marked
      classes/methods are serialized, evaluated server-side under a
      constrained interpreter, and streamed back
- [x] Cap'n Web transport (`typegres/capnweb`) — capabilities, promises, and
      live subscriptions over a single WebSocket

> **Import Cap'n Web from `typegres/capnweb`, not from `capnweb`.** It ships
> bundled until [cloudflare/capnweb#162](https://github.com/cloudflare/capnweb/pull/162)
> lands, so installing `capnweb` yourself gives you a second copy whose
> `RpcTarget`/`RpcStub` fail `instanceof` against the bundled one.

## Planned

- [ ] `pg_notify`-driven live updates (Postgres currently uses a single shared polling loop, not per-subscription)
- [ ] WAL-mode live updates for Postgres (currently uses an auxiliary table)
- [ ] Upstream the Cap'n Web integration (in-tree shim today;
      [cloudflare/capnweb#162](https://github.com/cloudflare/capnweb/pull/162))

## Development

> Recommended: [Nix the package manager](https://nixos.org/download/)
> + [direnv](https://direnv.net). The `.envrc` (`use flake`) auto-activates
> the pinned toolchain when you `cd` into the repo, and `bin/startpg`
> works out of the box. Without Nix, point `DATABASE_URL` at any local
> Postgres and skip `startpg`.

```bash
./bin/startpg             # one-time dev Postgres socket (Nix)
npm install
npm run check             # lint + typecheck + tests
```

## License

MIT — see [LICENSE](./LICENSE).
