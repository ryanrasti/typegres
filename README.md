# Typegres

A Postgres-first TypeScript library where the database is the single source of
truth — and your application's public API is exposed directly on top of it,
reactively.

> **Status:** clean rewrite in progress. Core architecture is settled. See
> [AGENTS.md](./AGENTS.md) for conventions and project plan.

## Tenets

1. **Database as the single source of truth.**
   Schema, logic, permissions, and state transitions all live in Postgres.
   No duplication between app code and database.

2. **Your API is an abstract data type on top of the database.**
   Wrap tables in TypeScript classes. Expose methods — plain SQL expressions,
   aggregates, subqueries, whatever — as your public interface. Clients query
   the interface, not the schema. You refactor tables freely without breaking
   anyone.

3. **Queries are reactive by default.**
   `db.live(query)` yields the current result set, then re-yields whenever a
   commit touches the predicates the query depends on. The live-query engine
   extracts a predicate DAG from the query AST, compares it against an event
   log written by wrapped mutations, and invalidates only the subscriptions
   that could have changed.

4. **Every Postgres capability, as a typed TS method.**
   All 77 pg base types, every operator, every function — codegen'd from the
   catalog with full overload preservation and compile-time null tracking.
   `Int4<1>["+"](Int4<0|1>)` returns `Int4<0|1>`; pg's strictness rules are
   captured in the types.

## Example

```typescript
class Users extends db.Table("users") {
  id = Int8<1>.column({ nonNull: true, generated: true });
  first_name = Text<1>.column({ nonNull: true });
  last_name = Text<1>.column({ nonNull: true });
  created_at = Timestamptz<1>.column({ nonNull: true });

  // Derived column — part of the public interface, not in the schema.
  fullName() {
    return this.first_name["||"](sql` `)["||"](this.last_name);
  }

  // Related query — composable, chainable, typed end-to-end.
  todos() {
    return Todos.from().where((t) => t.user_id["="](this.id));
  }
}

// Subscribe to a live result set.
for await (const rows of db.live(Users.from().orderBy((u) => u.created_at))) {
  render(rows);
}
```

## Architecture sketch

- **Types codegen'd from the Postgres catalog.** 77 base types, full
  method/operator coverage, nullability tracked at the type level.
- **SQL builder** — a tiny core: five `BoundSql` atoms compiled by one
  stack-based pass. Every builder (`QueryBuilder`, `Insert/Update/Delete`,
  `Values`, `PgSrf`) is a macro that rewrites itself via `bind()`.
- **Live queries** — per-query predicate DAGs, a wrapped-mutation event log,
  REPEATABLE READ snapshots. Subscriptions re-fire only when relevant.
- **Callback-based query construction.** `where`, `select`, `on`, etc. are
  closures evaluated at `bind()` time against a fresh namespace — aliases are
  ephemeral to compilation, never stored on classes.

Deeper dive in [AGENTS.md](./AGENTS.md); code is annotated throughout.

## Status

- [x] Full pg type system + operator/function codegen
- [x] Query builder (SELECT + JOIN + WHERE + GROUP BY + HAVING + ORDER BY + LIMIT)
- [x] Mutations (INSERT / UPDATE / DELETE / RETURNING)
- [x] Subqueries, scalar/array aggregation
- [x] Live queries (predicate extraction + event-log invalidation)
- [x] Table codegen from live schema

## Planned

- SQLite backend (sql-builder is dialect-aware; adapter is stubbed)
- DDL (`CREATE TABLE` from a TS class definition)
- ON CONFLICT
- Migrations DSL (until then: bring [kysely](https://kysely.dev/))
- Capability-exposed RPC endpoint (thin layer on top of the table classes)

## Quick start

```bash
npm install typegres pg
```

```typescript
import { Database, PgExecutor, sql } from "typegres";

const exec = await PgExecutor.create(process.env.DATABASE_URL!);
const db = new Database(exec);

const rows = await db.execute(sql`SELECT 1 + 1 AS sum`);
```

For a working scaffold with migrations + codegen, see
[`examples/basic`](./examples/basic).

## Development

```bash
./bin/startpg             # one-time dev Postgres socket
npm install
npm run check             # lint + typecheck + tests
./bin/tg generate         # table codegen (reads typegres.config.ts)
```

## License

MIT — see [LICENSE](./LICENSE).
