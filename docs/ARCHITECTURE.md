# Typegres Architecture

Typegres exposes SQL semantics to clients through a typed API: clients get
the full query language; the underlying schema stays an internal detail.
The type system is generated from pg's catalogs; the query API is a thin
layer over composable SQL fragments; mutations, transactions, and row
materialization all compose through the same abstractions.

## Vision

Core tenets:

1. Expose SQL semantics directly to clients through a typed API — full query
   power for clients, schema decoupled from the interface they see.
2. The API is an *abstract data type* on top of the database: logic,
   permissions, and state transitions live alongside the data.
3. Clients query that data type by composing methods.

Example:

```typescript
class User {
    static forToken(token: string) {
        const user_id = validate(token);
        return User.from().where((u) => u.id.eq(user_id));
    }

    @expose
    id = (Int8<1>).column({ generated: true });

    @expose
    todos() {
        return Todo.from().where((t) => t.user_id.eq(this.id));
    }

    @expose
    name = (Text<1>).column();
}

class Todo {
    @expose([z.string(), z.string()])
    update(name: string, content: string) {
        return super.update(...);
    }
}
```

Columns expose full Postgres types, including nullability. Every
non-side-effecting Postgres function is a method on the corresponding type. A
capability-based RPC endpoint exposes a subset of JS with the top-level class
(`User`) as the entry point; `@expose` methods are chainable and discoverable
by clients. The result: data, permissions, and state transitions live in one
place, in one language.

## Runtime architecture

### `Driver` vs `Database` vs `Connection`

- `Driver` is the low-level connection layer (`PgDriver`, `PgliteDriver`,
  `SqliteDriver`, `DoSqliteDriver`). It exposes `execute(sql)`,
  `runInSingleConnection(fn)`, `close()`, and a `dialect`. Each lives at its
  own entry point (`typegres/drivers/*`) so a bundle only ever resolves the
  optional peer it actually imports.
- `Database` is the schema handle: provenance identity and the `Table`
  factory, no driver of its own. `typegres()` constructs one synchronously,
  so table classes can be declared at module load without a top-level await.
- `Connection` is the runtime handle — a `Database` plus a `Driver`, with
  the execute/hydrate/transaction/live API. `db.connect(driver)` mints one.

`connect` is synchronous for every driver but PGlite, whose `create()` boots
WASM and is awaited by the caller. Multiple `connect` calls are allowed (test
+ prod, worker pools, read replicas, database-per-tenant); they share the
schema provenance but talk to independent drivers.

The dialect belongs to the driver, not the schema. `db.dialect` is a
passthrough to the first driver ever connected — reading it before any
`connect` throws rather than defaulting, since the dialect gates SQL
rendering and builder-time checks. A later `connect` whose driver disagrees
is rejected: the schema classes compiled against one dialect.

With exactly one pool-backed connection (the Durable Object model),
`db.defaultConnection` makes it implicit — terminators like `.execute()` and
`.live()` take no argument. Zero or several attached is ambiguous and throws,
so a `Connection` must be passed explicitly.

### Single-class Connection, two states

A `Connection` is either **pool-backed** (every execute routes through the
driver's pool) or **transaction-bound** (carries a single-connection
`ExecuteFn` and no bus of its own). Both are instances of the same class.
`transaction(fn)` hands the callback a transaction-bound `Connection`:

```ts
await conn.transaction(async (tx) => {
    await tx.execute(User.insert(...));
    await User.from().execute(tx); // fluent form
});
```

There is no `AsyncLocalStorage` threading ambient context — the `tx` is
passed explicitly. Nested calls flatten because `transaction(fn) = fn(this)`,
so callees that accept a `Connection` don't have to know whether they're
getting the pool or a txn.

Transactions default to the session's ambient isolation. `transaction({
isolation }, fn)` picks a level explicitly (pg only — sqlite transactions are
serializable by nature). Since pg can't promote isolation after the first
query, a nested request stronger than the active level throws rather than
silently downgrading, and any explicit level nested inside an ambient txn
throws too — we can't prove what the outer one got.

### Query builders and terminators

The query API is object-capability shaped: clients can only reach what
the BE author exposed, and the builder primitives enforce that at the
type level.

- `QueryBuilder`, `InsertBuilder`, `UpdateBuilder`, `DeleteBuilder` are
  immutable. Every method returns a new instance — no mutable state to
  smuggle references through.
- `where`, `select`, `on`, etc. are callbacks evaluated against a fresh
  scope minted by `bind()`. Aliases are ephemeral to compilation, never
  stored on classes, so client code can't fabricate references to tables
  or rows outside the scope it was handed.
- `.execute(conn)`, `.hydrate(conn)`, `.one(conn)`, `.maybeOne(conn)`,
  `.live(conn)` are fluent terminators that accept any `Connection` (pool or
  tx), or none at all to use `db.defaultConnection`; `conn.execute(...)` /
  `conn.hydrate(...)` are the non-fluent equivalents.

`hydrate` materializes rows as class instances — each column field is an
`Any` wrapping a `CAST(param)` of the value, so methods on the class
(relations, derived columns, mutations) compose into follow-up queries
without breaking the capability chain.

## Type system

Each dialect's types are represented as TS classes. Functions are methods on
those classes. Nullability is tracked in the `N extends number` type
parameter (`0 = null`, `1 = non-null`, `0 | 1 = maybe null`).

The Postgres hierarchy: `Any` → `Anycompatible` → `Anyelement` →
`Anynonarray` → concrete types. Generic container types (`Anyarray<T>`,
`Anyrange<T>`) wire through `.of()`. SQLite has the same shape over its six
storage classes (`Any`, `Integer`, `Real`, `Text`, `Blob`, `Bool`).

## Codegen

Both dialects emit through the same emitter (`src/types/emission/`); they
differ only in where the facts come from:

- `src/types/postgres/generated/` — introspected from the pg catalog
  (`pg_type`, `pg_proc`, `pg_operator`) via pglite.
- `src/types/sqlite/generated/` — derived from committed per-page facts
  extracted from the SQLite docs, since SQLite has no catalog to query.
  `signatures.verify.test.ts` checks every claim against the real engine and
  gates on completeness: each `pragma_function_list` entry is either covered
  by the facts or explicitly excluded.

```
npm run codegen
```

The generated files are committed. `npm run codegen:check` regenerates both
trees into a temp dir and diffs against the committed copies — CI runs this
to catch drift between the engines and the checked-in output.

Table codegen is separate: `npx tg generate` introspects a user's schema and
writes typed Table files into their project (uses `typegres.config.ts`).

## Raw SQL

`sql` is the escape hatch — a tagged template returning an immutable `Sql`
builder. Supports `sql.param`, `sql.raw`, `sql.join`. Fragments compose via
template nesting. Compiles to pg (`$1`) or sqlite (`?`) style.

Schema-referencing identifiers go through `db.scopedIdent(name)` rather than
a bare `sql.ident` helper: an `Ident` must carry its `Database` to survive the
compile-time provenance check. The `Ident` class is exported for
library-internal callers that construct untagged identifiers inline (CTE
aliases, output column labels).

## Development environment

The `nix develop` shell is the source of truth for tool versions:
`nodejs_22`, `postgresql_17`, `act` for local GHA runs. It also exports
`DATABASE_URL` pointing at the socket provisioned by `bin/startpg`, so tests
and codegen connect without any per-developer setup.

## Target users

1. Traditional app builders: one BE layer, full pg power, minimal
   boilerplate. FE has the tools to compose queries directly.
2. "Vibe-coders": entire backend can be a single file; FE is decoupled.
3. Future shapes:
   - Core system-of-record where clients integrate directly.
   - Agents constructing UIs on demand, rooted in the typed API.
