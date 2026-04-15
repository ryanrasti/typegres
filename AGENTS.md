# Typegres

## Conventions

- Always do top-level imports (unless there is a real performance or correctness reason)

## Vision

Core tenets:

1. Database as single source of truth.
2. API exposed directly as an *abstract data type* on top of database.
  * The API is decoupled from the schema
3. Clients query the data type directly, through composing methods.

Example:

```typescript
class User {
    static forToken(token: string) {
        const user_id = validate(token)
        return User.where((u) => u.id.eq(user_id))
    }

    @expose
    id = column(pg.BigInt, { generated: true })

    // v1
    @expose
    todos() {
        return Todo.where((t) => t.user_id.eq(this.id))
    }

    // v2 (denormalized)
    @expose
    todos() {
        return this.todos.unnest()
    }

    // v1
    @expose
    name = column(pg.Text)

    // v2
    @expose
    get name() {
        return this.first_name.concat(' ', this.last_name)
    }
}

class Todo {
    @expose([z.string(), z.string()])
    update(name: string, content: string) {
        return this.update(...)
    }
}
```

Field can expose any Postgres types, with null typing including. All safe Postgres functions are exposed as methods on the type.

A capability-based RPC endpoint essentially exposes a subset of JS with `User` rooted
as a top-level object. All `@expose` methods are chainable/discoverable by clients.

This means that we define our logic (data, permissions, state transitions) in a single place with a single language (Postgres DSL).

## Core Features

### 1. Type System — ✅ DONE

All Postgres types represented as TS classes. Functions are represented as methods on the types.

- [x] 77 types codegen'd from pg catalog via pglite introspection
- [x] Full type hierarchy: Any → Anycompatible → Anyelement → Anynonarray → concrete types
- [x] Generic container types: Anyarray<T>, Anyrange<T>, Anymultirange<T>
- [x] Operator overloads with all pg overloads preserved
- [x] Compile-time nullability tracking (StrictNull, MaybeNull, NullOf)
- [x] TS primitive acceptance on args (number, string, boolean, bigint)
- [x] Auto-casting constructors: `new Int4(5)` → `CAST($1 AS int4)`
- [x] Runtime type resolution: pgType, pgElement, __class
- [x] Deserialize registry: single source of truth for type mappings
- [x] Container .of() for element type wiring

### 2. Query Builder

- [x] `select` (computed columns, identity passthrough)
- [ ] `select` with subselect/correlated subqueries — needs subquery as Fromable
- [x] `where`
- [x] `join` (inner, left)
      * right join doesn't play well with ocap (can use it to read rows otherwise
         wouldn't have access to)
      * cross join seems like a DoS nightmare
- [x] `groupBy` (with tuple inference, numeric index access)
- [x] `having`
- [x] `orderBy` (single, tuple, array forms; stacking)
- [x] `limit` / `offset`
- [x] `values` (typed rows, primitive second+ rows, column references)
- [ ] `with` (CTE) — next up
- [ ] aggregates (`count`, `sum`, `avg` — need prokind='a' in codegen) — next up
- [ ] TODO: after groupBy, namespace should transform to aggregate types

### 3. Codegen — ✅ DONE

- [x] Introspects pg_type, pg_proc, pg_operator via pglite
- [x] Excludes: volatile fns, operator implementations, index support fns, internal types
- [x] Generates typed classes with methods, operator overloads, nullability, TsTypeOf
- [x] Override system: overrides/ extend generated/ classes
- [x] Barrel (index.ts) auto-generated with override detection
- [x] Table codegen CLI (`tg generate`): introspects pg, generates typed table files with @generated markers
- [x] `typegres.config.ts` with Config type for db url, tables dir, db import path

### 4. Mutations — ✅ DONE

- [x] `insert` (with returning, InsertRow required field typing via [meta].__required)
- [x] `update` (UpdateBuilder: .where().set().returning().execute())
- [x] `delete` (DeleteBuilder: .where().returning().execute())
- [x] transactions (`db.transaction(async (tx) => { ... })` — auto commit/rollback)
- [x] All mutation builders: immutable opts, compile(), debug(), execute()
- [x] Runtime safety: update/delete require .where() — use .where(true) for full-table ops

### 5. Raw SQL Fallback — ✅ DONE

- [x] `sql` tagged template with parameterization
- [x] `sql.param`, `sql.raw`, `sql.ident`, `sql.join`
- [x] Compiles to pg ($1) or sqlite (?) style
- [x] Immutable Sql builder
- [x] Expressions compose via tagged template nesting

### 6. RPC & DoS protection

We will use `exoeval` (a minimal JS subset built for executing untrusted code against capabilities), as the mechanism to send capability-based RPCs to the BE. Wire format is JavaScript itself, allowing for easy debugging.

For DoS protection there are two layers:

1. `exoeval`: need to add "gas"/"memory" constraints in the evaluator.
2. Postgres -- ideas:

- Query timeout (crude)
- Internal analysis on the query ast before we send it
  - e.g., joins must have index condition
  - e.g., non unique key join 5x's the query cost (perhaps we can sync prod stats db here)
  - e.g., limit/offset required
- Send `analyze` before sending query
  - Perhaps can do this standalone with a histogram snapshot instead of doing it against live DB.

### 7. `.live()`

We are in a unique position:
1. See all queries in our DSL
1. We directly serve clients

We can upgrade connection/implement a long-poll, so clients can request updates to their queries. Simplest for v1 to limit scope to the common case:

1. Every table must have a simple predicate
2. Instead of any incremental maintenance, just re-run the query when we detect a change.

Implementation:

1. Keep list of tables & predicates that each query produces (will require changing that actual query that runs to extract this information)
2. Whenever we see a change that matches the predicate, re-run query for the client -- perhaps using a debounce.
3. `exoeval` RPC will be extended to support either:
   a. sending a subscription notification function
   b. (perhaps more simple) keep a long-lived HTTP connection and "yield"-ing results
   c. passing a uuid in the response to long-poll the `live` result

Notes: Requires WAL access -- and old tuple access (replica identity full/default) or storing the old tuples rows (just the conditions) ourselves

Scaling: 
1. we store tables (in mem or pg) of predicates on tables matching current live queries. Each WAL
entry is matched against that to determine which queries need to update. Gas per client includes the extra
compute needed here.
2. if need more scaling, will probably need a dedicated runtime to satisfy `.live()`, but that depends on what we see practice.

## Known Issues & TODOs

### Critical

1. **TsTypeOf doesn't recursively unwrap Record** — Nested relations via `scalar()` return `{name: Text<1>}` instead of `{name: string}` in TS. Runtime is correct.
2. **Record override DTS mismatch** — `@ts-expect-error` stripped by DTS generation. Emitted `.d.ts` has `deserialize` return type conflict.
3. **Stock TypeScript stack overflow** — Recursive type hierarchy causes stock `tsc` to stack overflow. Requires `tsgo`.
4. **column() returns a descriptor, not a real instance** — Plain object `{ __column, __class, ...opts }` leaks through builders.

### Non-critical

5. **Operators always parenthesize** — Could use operator precedence via `Op` node.
6. **ROW/array_agg/COALESCE are raw SQL** — `scalar()` should use `Func`/`Op` nodes.
7. **Relation naming** — No singularization. Self-referential FKs get awkward names.
8. **groupBy non-aggregated column enforcement** — pg catches at runtime, no type-level enforcement.

## Target users

1. Traditional app builders: single source of BE truth, full PG power, no boilerplate. FE has all the tools to compose queries
2. Vibe-coders: for same reason as above, entire BE can be a single file. FE is decoupled
3. Future types of apps:

- core system of record, allowing clients to vibe-code integrations directly
- agents constructing FEs/interfaces on-demand
