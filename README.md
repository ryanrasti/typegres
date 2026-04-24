# Typegres

A Postgres-first TypeScript library where the database is the single source of
truth — and your application's public API is exposed directly on top of it.

> **Status:** clean rewrite in progress. Core architecture is settled. See
> [ARCHITECTURE.md](./ARCHITECTURE.md) for design notes.

## Tenets

1. **Expose SQL semantics directly to clients through a typed API.**
   Clients get the full query language; the underlying schema is yours to
   refactor without breaking them.

2. **Your API is an abstract data type on top of the database.**
   Wrap tables in TypeScript classes. Expose methods — plain SQL expressions,
   aggregates, subqueries, whatever — as your public interface. Logic,
   permissions, and state transitions live alongside the data, in one place.

3. **Every Postgres capability, as a typed TS method.**
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

const rows = await Users.from()
  .orderBy(({ users }) => users.created_at)
  .execute(db);
```

## Architecture sketch

- **Types codegen'd from the Postgres catalog.** 77 base types, full
  method/operator coverage, nullability tracked at the type level.
- **SQL builder** — a tiny core: five `BoundSql` atoms compiled by one
  stack-based pass. Every builder (`QueryBuilder`, `Insert/Update/Delete`,
  `Values`, `PgSrf`) is a macro that rewrites itself via `bind()`.
- **Callback-based query construction.** `where`, `select`, `on`, etc. are
  closures evaluated at `bind()` time against a fresh namespace — aliases are
  ephemeral to compilation, never stored on classes.

Deeper dive in [ARCHITECTURE.md](./ARCHITECTURE.md); code is annotated
throughout.

## Status

- [x] Full pg type system + operator/function codegen
- [x] Query builder (SELECT + JOIN + WHERE + GROUP BY + HAVING + ORDER BY + LIMIT)
- [x] Mutations (INSERT / UPDATE / DELETE / RETURNING)
- [x] Subqueries, scalar/array aggregation
- [x] Table codegen from live schema
- [ ] Live queries — previously prototyped under `src/live/`; pulled out for a
      design pass. See [ISSUES.md](./ISSUES.md).

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
import { Database, PgDriver, sql } from "typegres";

const driver = await PgDriver.create(process.env.DATABASE_URL!);
const db = new Database(driver);

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
