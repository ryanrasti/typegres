# Typegres

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

### Architecture

- **Alias collision in correlated subqueries**: When a relation references the same table (e.g., self-referential FK), the inner subquery uses the same alias as the outer query. Pg silently resolves to the innermost scope, producing wrong results. Need either:
  - Expressions carry their source alias (`__scope` on Any<N>), validated at query build time
  - Or auto-dedup aliases in `scalar()` / relation codegen (e.g., `Dogs.as("rival_dogs").from()`)
  - Immediate workaround: codegen should emit distinct aliases for self-referential relations

- **Sql has no scope tracking**: `Sql` is just fragments (params, raw, idents). It doesn't know which table aliases it references. This makes it impossible to detect alias collisions at build time. Long-term: Sql or expressions should carry namespace metadata.

### Query Builder

- **Method idempotency**: No documented behavior for calling methods more than once (e.g., `.where()` twice, `.select()` twice). Need to define: does it replace, AND, or error? Currently: last call wins for most, `orderBy` stacks.

- **groupBy namespace transform**: After `groupBy`, the namespace should restrict `select` to only group-by columns or aggregate functions. Currently no enforcement — user can select non-aggregated columns, producing invalid SQL at runtime.

- **ROW/array_agg/COALESCE are raw SQL**: `scalar()` emits these as raw SQL strings. Should be regular typed operations once aggregate support is built.

### Types

- **TsTypeOf doesn't recursively unwrap Record**: `TsTypeOf<Record<{name: Text<1>}, 1>>` returns `{name: Text<1>}` not `{name: string}`. The nested row type isn't mapped through TsTypeOf. Runtime deserialization is correct, only the type is wrong.

- **column() returns a descriptor, not a real instance**: `Any.column()` returns a plain object `{ __column, __class, ...opts }` cast as `InstanceType<T>`. Should return a real instance with a reference to the table's column metadata.

- **Constructors always return `Type<number>`**: `new Bool(true)` returns `Bool<number>` — the constructor can't infer nullability from a TS literal. Need static factory methods (e.g., `Bool.from(true): Bool<1>`) with overloads that narrow based on input type.

- **Operators always wrap in parentheses**: `a.and(b).or(c)` emits `((... AND ...) OR ...)`. Correct but verbose. A precedence system could omit redundant parens by tracking operator precedence on `Sql` fragments.

### Codegen

- **Relation naming**: Inbound relations use the source table name (e.g., `collars`, `microchips`). No singularization for `'one'`/`'maybe'` cardinality. Self-referential FKs can produce duplicate property names (disambiguated with suffix, but naming is awkward).

- **Relation alias collision**: Self-referential relations (e.g., `dogs.rival_id → dogs.id`) generate code that uses the same table alias for inner and outer query. Needs distinct alias.

### Remaining Features

- [ ] Aggregates (count, sum, avg — prokind='a' in codegen)
- [ ] CTE (`with`)
- [ ] Correlated subqueries (beyond scalar — as Fromable)
- [ ] `OR`/`AND` combinators for where clauses
- [ ] `DISTINCT` / `DISTINCT ON`
- [ ] `ON CONFLICT` (upsert)
- [ ] Real postgres executor (pg adapter, not just pglite)

## Target users

1. Traditional app builders: single source of BE truth, full PG power, no boilerplate. FE has all the tools to compose queries
2. Vibe-coders: for same reason as above, entire BE can be a single file. FE is decoupled
3. Future types of apps:

- core system of record, allowing clients to vibe-code integrations directly
- agents constructing FEs/interfaces on-demand
