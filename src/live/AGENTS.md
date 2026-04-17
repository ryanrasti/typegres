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

Prerequisites already landed:

- Connection-pinned transactions with isolation-level control.
- `Database` owns executor and will own the live store.
- Structured SQL AST with `Op`, `Column`, `TableAlias`, etc. — enough to pattern-match equality predicates and alias identity inline during extractor traversal. No separate "AST helpers" layer needed; the extractor walks the tree and matches node shapes where it needs them.

### Phase 1 — extractor

**Conformance tests — write these first.** Each case is an input query and the expected extractor SQL + materialized `PredicateSet`. Validation errors are also expected outputs.

1. **Single table, literal anchor.** `FROM users WHERE id = 5`.
    ```sql
    WITH s_users AS MATERIALIZED (SELECT id FROM users WHERE id = 5)
    SELECT 'users' AS tbl, 'id' AS col, id::text AS value FROM s_users;
    ```
    PredicateSet: `{ users: { id: {"5"} } }`.

2. **Join chain, literal at root.** `FROM users u JOIN dogs d ON d.user_id = u.id WHERE u.id = 5`.
    ```sql
    WITH
      s_users AS MATERIALIZED (SELECT id FROM users WHERE id = 5),
      s_dogs  AS MATERIALIZED (SELECT user_id FROM dogs
                               WHERE user_id IN (SELECT id FROM s_users))
    SELECT 'users' AS tbl, 'id' AS col, id::text AS value FROM s_users
    UNION ALL SELECT 'dogs', 'user_id', user_id::text FROM s_dogs;
    ```
    PredicateSet: `{ users: { id: {"5"} }, dogs: { user_id: {"5"} } }`.

3. **Three-table chain.** `FROM users u JOIN dogs d ON d.user_id = u.id JOIN toys t ON t.dog_id = d.id WHERE u.id = 5`. Dogs CTE must project `id` too, since toys references `d.id`. PredicateSet includes `dogs.id` whose values are the user's dog ids.

4. **Self-join.** `FROM users u JOIN users m ON u.manager_id = m.id WHERE u.id = 5`. DAG: `u` (anchor) → `m`. Both CTEs scan the `users` table; extractor output flattens under one `users` key — `PredicateSet.users` has `id` (merged: `{"5", <manager_id>}`) and `manager_id` (`{<manager_id>}`).

5. **Multiple literal anchors on one table.** `FROM users WHERE id = 5 AND role = 'admin'`. CTE `WHERE id = 5 AND role = 'admin'`. PredicateSet: `{ users: { id: {"5"}, role: {"admin"} } }`.

6. **Unrooted query → reject.** `FROM users u JOIN dogs d ON d.user_id = u.id` (no literal). Throws at construction; error names both tables as unreachable from any literal anchor.

7. **Non-equality predicate → reject.** `WHERE id > 5`, `WHERE name LIKE 'A%'`, `WHERE id IS NULL`. Each throws with the offending predicate in the message.

8. **Top-level OR → reject.** `WHERE id = 5 OR name = 'Alice'`. Throws.

9. **Correlated subquery → reject.** Any `WHERE EXISTS (...)` or `WHERE col IN (SELECT ...)` with a cross-scope reference. Throws.

10. **Type canonicalization.** One case per landmine type:
     - `WHERE created_at = '2024-01-01T00:00:00Z'` on `timestamptz` → extractor casts via `AT TIME ZONE 'UTC'` so the extracted value is UTC-normalized text regardless of session `TimeZone`.
     - `WHERE name = 'Alice'` on `citext` → cast via `lower(...)` at the extraction site; PredicateSet stores `"alice"`.
     - `WHERE amount = 1.0` on `numeric(10,2)` → `trim_scale` applied; PredicateSet stores `"1.00"` or `"1"` canonically (pick one and stick with it).

**Implementation**:

1. Single AST walk that:
   - validates the v1 subset (top-level `AND`, `col = literal` or `col = other_table.col`, every table reachable from a literal anchor); throws clear errors otherwise.
   - builds the dependency DAG from the equalities found.
   - emits the extractor SQL (`MATERIALIZED` CTE per table in topo order, UNION ALL of `(tbl, col, value)` triples).
2. Canonicalize extracted values by pg column type (timestamptz → UTC, citext → lower, numeric → trim_scale, the rest → `::text`).
3. Materialize rows into `PredicateSet` on the client side, merging in literal-sourced values from the AST.

### Phase 2 — mutation events

**Conformance tests — write first.** Each case is a mutation run against a fixture table; assertions are on the `_live_events` rows produced.

1. **Insert emits one event per row.** `INSERT INTO dogs (id, user_id, name) VALUES (1, 5, 'Rex'), (2, 5, 'Max')` → two rows in `_live_events`, each with `xid = pg_current_xact_id()` at commit, `table = 'dogs'`, `before = NULL`, `after = {id, user_id, name}` as jsonb.

2. **Update emits before AND after.** `UPDATE dogs SET name = 'Buddy' WHERE id = 1` → one event row, `before.name = 'Rex'`, `after.name = 'Buddy'`, xid matches the mutation tx.

3. **Delete emits before only.** `DELETE FROM dogs WHERE id = 2` → one event, `before = {id: 2, ...}`, `after = NULL`.

4. **Rollback emits nothing.** `BEGIN; INSERT ...; ROLLBACK;` → zero rows in `_live_events` (shadow insert is in the same tx, so it rolls back too).

5. **Multi-row update pairs correctly.** `UPDATE dogs SET user_id = 7 WHERE user_id = 5` affecting 3 rows → three event rows, each with correct before/after for its specific row (pairing via PK). None crossed.

6. **xid is shared within a tx.** Two mutations in the same tx produce events with the same xid.

7. **Missing PK on updated/deleted table → reject.** Table without a PK is rejected at mutation-builder construction when live wrapping is enabled.

### Phase 3 — bus + subscription

**Conformance tests — write first.**

1. **Admit, deliver on match.** Sub with `preds = { dogs: { user_id: {"5"} } }` and a valid cursor. After subscribe, insert dog with `user_id = 5` → `waitNext` resolves.

2. **Admit, skip on no match.** Same sub. Insert dog with `user_id = 9` → `waitNext` does not resolve.

3. **Already-committed event visible in cursor is skipped.** Insert dog before subscribing; capture cursor after the insert; subscribe. The event's xid is visible in cursor → not delivered (already reflected in yielded rows).

4. **Already-committed event NOT visible in cursor is delivered.** Capture cursor first; commit insert; subscribe. xid not visible → delivered via backfill.

5. **CursorTooOldError when `xmin(cursor) < F`.** Force the bus to evict past the cursor's xmin (fill ring or advance time). Next `waitNext` throws `CursorTooOldError` with the retention floor in the message.

6. **Preds/cursor swap on second call.** First `waitNext(preds1, cursor1)` resolves; loop runs new tx producing `cursor2` and `preds2`. `waitNext(preds2, cursor2)` filters the buffered + live events against the new pair, not the old.

7. **Match on `before` OR `after`.** Update dog from `user_id=5` to `user_id=9`. Sub with `preds = { dogs: { user_id: {"5"} } }` fires (before matches). Sub with `{ dogs: { user_id: {"9"} } }` also fires (after matches).

### Phase 4 — first shipped live

**Conformance tests — end-to-end.**

1. **Single-table live.** `db.live(Dogs.where(d => d.user_id.eq(5)))`. Initial yield = current matching rows. Insert a matching dog → second yield includes the new row. Insert a non-matching dog → no re-yield. Update a matching dog → re-yield with updated row. Delete a matching dog → re-yield without it.

2. **Join live.** `db.live(Dogs.join(Users).where(u.id.eq(5)))`. Mutations on either table that affect the join result trigger re-yields.

3. **Idempotent restart.** Consumer breaks out of the `for await` loop and re-enters with a fresh `db.live(query)`. No events lost; initial yield reflects current state.

4. **CursorTooOldError → restart.** Force retention exhaustion. Consumer catches and restarts; no spurious duplicate yields, no missed updates.

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
