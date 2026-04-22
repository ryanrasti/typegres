# Typegres Architecture

Typegres is a Postgres-first ORM that treats the database as the single source
of truth. The type system is generated from pg's catalogs; the query API is a
thin layer over composable SQL fragments; mutations, transactions, and row
materialization all compose through the same abstractions.

## Vision

Core tenets:

1. Database as single source of truth.
2. API exposed directly as an *abstract data type* on top of the database —
   decoupled from the raw schema.
3. Clients query the data type by composing methods.

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

### `Driver` vs `Database`

- `Driver` is the low-level connection layer (`PgDriver`, `PgliteDriver`).
  It exposes `execute(sql)`, `runInSingleConnection(fn)`, `close()`.
- `Database` is the typed query surface on top — what user code interacts
  with. It holds a `Driver` and a query/hydrate/transaction API.

### Single-class Database, two states

A `Database` is either **pool-backed** (every execute routes through the
driver's pool) or **transaction-bound** (carries a single-connection
`ExecuteFn`). Both are instances of the same class. `transaction(fn)` hands
the callback a transaction-bound `Database`:

```ts
await db.transaction(async (tx) => {
    await tx.execute(User.insert(...));
    await User.from().execute(tx); // fluent form
});
```

There is no `AsyncLocalStorage` threading ambient context — the `tx` is
passed explicitly. Nested calls flatten because `Transaction.transaction(fn) =
fn(this)`, so callees that accept a `Database` don't have to know whether
they're getting the pool or a txn.

Transactions use pg's default isolation. No stricter level is imposed by the
framework.

### Query builders and terminators

- `QueryBuilder`, `InsertBuilder`, `UpdateBuilder`, `DeleteBuilder` are
  immutable. Every method returns a new instance.
- `.execute(db)`, `.hydrate(db)`, `.one(db)`, `.maybeOne(db)` are fluent
  terminators that accept any `Database` (pool or tx).
- `db.execute(...)` / `db.hydrate(...)` are the non-fluent equivalents.

`hydrate` materializes rows as class instances — each column field is an
`Any` wrapping a `CAST(param)` of the value, so methods on the class
(relations, derived columns, mutations) compose into follow-up queries.

## Type system

All Postgres types are represented as TS classes. Functions are methods on
those classes. Nullability is tracked in the `N extends number` type
parameter (`0 = null`, `1 = non-null`, `0 | 1 = maybe null`).

Full hierarchy: `Any` → `Anycompatible` → `Anyelement` → `Anynonarray` →
concrete types. Generic container types (`Anyarray<T>`, `Anyrange<T>`) wire
through `.of()`.

## Codegen

Types under `src/types/generated/` are generated from the pg catalog
(`pg_type`, `pg_proc`, `pg_operator`) via pglite introspection:

```
npm run codegen
```

The generated files are committed. `npm run codegen:check` regenerates into
a temp dir and diffs against the committed copies — CI runs this to catch
drift between the pg version and the checked-in output.

Table codegen is separate: `npx tg generate` introspects a user's schema and
writes typed Table files into their project (uses `typegres.config.ts`).

## Raw SQL

`sql` is the escape hatch — a tagged template returning an immutable `Sql`
builder. Supports `sql.param`, `sql.raw`, `sql.ident`, `sql.join`. Fragments
compose via template nesting. Compiles to pg (`$1`) or sqlite (`?`) style.

## Development environment

The `nix develop` shell is the source of truth for tool versions:
`nodejs_22`, `postgresql_17`, `act` for local GHA runs. It also exports
`DATABASE_URL` pointing at the socket provisioned by `bin/startpg`, so tests
and codegen connect without any per-developer setup.

## Target users

1. Traditional app builders: single source of BE truth, full pg power,
   minimal boilerplate. FE has the tools to compose queries directly.
2. "Vibe-coders": entire backend can be a single file; FE is decoupled.
3. Future shapes:
   - Core system-of-record where clients integrate directly.
   - Agents constructing UIs on demand, rooted in the typed API.
