# Live Queries

## Goal

Provide `.live()` for queries:

```typescript
for await (const rows of db.live(Dogs.where((d) => d.owner_id.eq(5)))) {
  render(rows);
}
```

Semantics: yield the current result set, then re-yield whenever a committed mutation *might* have changed that result. v1 should prioritize:

1. Correctness
2. Simple restart semantics
3. Small implementation surface
4. Planner-stable extraction queries

This document is the implementation plan, not the long-term dream.

## Important architectural prerequisite

Before live work, fix transactions.

Current `Database.transaction()` issues `BEGIN` / `COMMIT`, but the pg executor uses `Pool.query()` per statement, so queries are not guaranteed to run on the same backend connection. That means we do **not** currently have a real transaction boundary for pg.

Live queries require:

- `REPEATABLE READ`
- `pg_current_snapshot()`
- extractor query + main query in the same transaction
- mutation wrapping in the same transaction as the user mutation

So step 0 is a real connection-pinned transaction API.

## Recommended surface

Prefer database-owned live execution:

```typescript
db.live(query)
```

over query-owned execution:

```typescript
query.live()
```

Reason: live execution needs more than a query executor. It needs:

- transaction control
- snapshot capture
- access to the live event store / bus
- retention / restart handling

A query is just a compiled plan; live is runtime behavior.

`query.live()` can remain as sugar later if the builder carries a reference to its `Database`.

## v1 scope

Supported:

- `FROM` + `JOIN` + `LEFT JOIN`
- top-level `WHERE` made of `AND`
- equality predicates only for matching / extraction:
  - `col = literal`
  - `col = other_table.col`
- queries where every table is reachable from at least one literal equality anchor
- simple rerun-on-match invalidation

Rejected in v1:

- top-level `OR`
- non-equality predicates (`<`, `>`, `LIKE`, `BETWEEN`, `IS NULL`, computed predicates)
- `GROUP BY`, `HAVING`, aggregates, windows
- `DISTINCT ON`
- subqueries/correlated subqueries

This is intentionally narrower than some earlier ideas. The narrower shape matches the current codebase and is much more likely to ship cleanly.

## Semantics

Each loop iteration:

1. Open a `REPEATABLE READ` transaction.
2. Capture `pg_current_snapshot()` as `cursor`.
3. Run dependency extraction in that transaction.
4. Run the main query in that transaction.
5. Commit.
6. Yield rows.
7. Wait until an event after `cursor` matches the extracted predicates.
8. Repeat.

If the bus no longer retains enough history to compare against `cursor`, throw / handle `CursorTooOldError` by restarting with a fresh iteration.

## Core idea

### 1. Extract watched equality values

From the query AST, build a per-table/per-column watched set:

```typescript
type PredicateSet = Map<string, Map<string, Set<string>>>;
```

Example:

```sql
SELECT *
FROM users u
JOIN dogs d ON d.user_id = u.id
WHERE u.id = 5
```

Extracts roughly:

```typescript
{
  users: { id: Set(["5"]) },
  dogs: { user_id: Set(["5"]) },
}
```

### 2. Emit mutation events

Every insert/update/delete emits an event in the same transaction:

```typescript
interface LiveEvent {
  xid: bigint;
  table: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
}
```

For v1, capture **all columns** in `before` / `after`. This is simpler and safer than trying to optimize watched columns early.

### 3. Match events in memory

For an event on table `T`, rerun if any watched `(T, col)` value matches `before[col]` or `after[col]`.

This is intentionally an over-approximation only in the sense that multi-column conjunctions are treated as independent watched sets. That is acceptable in v1 because spurious reruns are fine; missed reruns are not.

## Why we need a real expression AST first

The extractor must inspect predicates structurally:

- split top-level `AND`
- detect `col = literal`
- detect `col = other_table.col`
- attribute predicates to specific tables
- reject unsupported forms with clear errors

The current codebase composes a lot of expressions as generic SQL fragments. That is good for compilation, but not rich enough for reliable `.live()` extraction.

### Required refactor

Preserve predicate structure as inspectable nodes.

At minimum, retain:

- boolean `and` / `or` / `not`
- binary operators, especially `=`
- column refs
- params / literals
- table alias identity

We do **not** need a perfect general-purpose SQL AST. We just need enough structure to validate and extract the supported live subset.

## Query validation / extraction model

Treat the query as a DAG of aliased tables.

For each table:

- incoming literal anchors: `table.col = literal`
- incoming parent edges: `table.col = parent.col`

Validation rules:

1. Query must have at least one literal anchor.
2. Every table must be reachable from some literal-anchored table via equality edges.
3. Every predicate in v1 must be a top-level equality conjunct.

If not, throw at `.live()` construction time with a message naming the unsupported predicate or unreachable table.

## Extraction SQL shape

Use one `MATERIALIZED` CTE per table in dependency order.

Example:

```sql
WITH
  s_users AS MATERIALIZED (
    SELECT id
    FROM users
    WHERE id = 5
  ),
  s_dogs AS MATERIALIZED (
    SELECT user_id
    FROM dogs
    WHERE user_id IN (SELECT id FROM s_users)
  )
SELECT 'users' AS tbl, 'id' AS col, id::text AS value FROM s_users
UNION ALL
SELECT 'dogs', 'user_id', user_id::text FROM s_dogs;
```

Why this shape:

- planner-stable
- index-friendly
- easy to reason about
- does not require rewriting the user query itself

Implementation note: extracted equality values must be serialized canonically. In particular, do not forget `timestamptz` timezone normalization, `citext` case-insensitive equality, and `numeric` scale normalization. Those are correctness issues, not optimizations.

## Mutation integration

Keep the `MutationDescriptor` direction. The event store should own wrapping SQL shape.

For v1, require live-enabled tables to have a primary key for update/delete event pairing.

That avoids ambiguous old/new row matching logic.

## Bus / retention

One shared bus per process:

- ingests committed events from the pg shadow table by polling in v1
- keeps a ring buffer of recent events
- tracks a retention floor `F`
- serves `waitNext(preds, cursor)`

Admission rule:

- if `xmin(cursor) < F`, subscription is too old and must restart

Visibility rule:

- use `pg_visible_in_snapshot(event.xid, cursor)`
- if visible, the event is already reflected in yielded rows
- if not visible and predicate matches, rerun

Idle subscriptions can still age past retention even if no matching event arrives. v1 can handle this lazily via `CursorTooOldError` on the next wait; proactive refresh / keepalive behavior is deferred.

## Action plan

### Phase 0 — prerequisites

1. Fix pg transaction semantics with connection pinning.
2. Add isolation-level support to transactions.
3. Implement `Database` ownership of executor + live store.

### Phase 1 — AST support

1. Preserve predicate structure in emitted expressions.
2. Add helpers to inspect:
   - top-level `AND`
   - equality predicates
   - column-vs-literal
   - column-vs-column
3. Keep alias identity available through extraction.

### Phase 2 — minimal extraction

1. Validate only the narrow v1 subset.
2. Build dependency DAG from joins + where equalities.
3. Emit extractor SQL returning `(tbl, col, value)` triples.
4. Materialize into `PredicateSet`.
5. Canonicalize extracted equality values by pg type.

### Phase 3 — mutation events

1. Add pg shadow event table.
2. Wrap insert/update/delete to emit `LiveEvent` rows atomically.
3. Start with “capture all columns”.
4. Require primary key on live-enabled update/delete tables.

### Phase 4 — bus + subscription

1. Poll event table into an in-memory ring buffer.
2. Implement retention floor.
3. Implement `waitNext(preds, cursor)`.
4. Add restart on `CursorTooOldError`.

### Phase 5 — first shipped live

Ship only:

- one-table literal equality queries
- then simple equality joins

Do **not** broaden supported predicates until this path works end-to-end.

## Deferred

These are good ideas, but not part of the first implementation.

- non-equality predicate support with over-approximate matching
- top-level `OR`
- precise boolean-expression matching
- alias-sensitive self-join precision
- narrower watched-column capture
- LISTEN/NOTIFY wakeups
- logical replication / WAL ingestion
- SQLite backend
- `.liveAggregate()` / IVM-backed aggregation
- cross-cluster / cross-region semantics

## Notes

### Why trim scope this aggressively?

Because live queries touch every layer:

- executor / transactions
- query AST
- mutation builders
- database runtime
- background event processing

The smallest credible version is still fairly deep. A narrow, equality-only v1 gets us a real system sooner and gives us a clean base to extend later.

### What matters most

If forced to choose, prioritize these in order:

1. real transactions
2. inspectable predicate AST
3. end-to-end correctness for equality-only live queries
4. only then broader predicate support
