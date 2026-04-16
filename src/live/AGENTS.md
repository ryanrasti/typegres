# Live Queries

## Overview

`.live()` on a query returns an async iterator that yields the current result set and re-yields it whenever the underlying data could have changed. No WAL, no logical replication. Shared event bus + snapshot-based cursor + in-memory predicate matching.

```typescript
for await (const rows of Dogs.where(d => d.owner_id.eq(5)).live()) {
  render(rows);
}
```

## Semantics

Each iteration of the loop runs one `REPEATABLE READ` transaction that:

1. Captures `pg_current_snapshot()` as the cursor.
2. Runs the dependency-extraction query to get resolved predicate values.
3. Runs the main query to get the data.
4. Commits.
5. Yields the data.
6. Waits for the bus to report a potentially-affecting mutation.

The cursor is new every iteration. Mutations that commit before the cursor are already reflected in the yielded data; mutations that commit after the cursor are compared against the subscription's predicate expression to decide whether a refresh is needed.

## Supported Surface

Queries accepted by `.live()`:

**Anchoring requirement** — for every table in the query, the predicates filtering that table must include at least one equality predicate (top-level conjunct, or at least one equality inside every `OR` branch) that either:
- Is `col = literal` (literal anchor), or
- Is `col = other_table.col` to a table that is itself anchored (parent edge).

This is the only hard restriction on predicate shape. Anything else — ranges, `LIKE`, `BETWEEN`, inequalities, `IS NULL`, computed expressions on columns, `OR` compositions, nested boolean structure — is accepted. These non-equality predicates become additional `WHERE` clauses on the extractor's CTEs and additional leaves in the matching expression; they just can't substitute for the equality anchor.

Explicitly rejected at `.live()` construction time (throws):
- **Aggregates**, `HAVING`, `GROUP BY`, window functions. These change result semantics in ways the "re-run the query on a matching event" model can't handle precisely. A separate `.liveAggregate()` primitive with a different (likely IVM-based) engine is the right answer for these.
- **`DISTINCT` ON joined rows** (ordinary `SELECT DISTINCT` on a single projection is fine).
- **Any table not reachable via equality propagation from a literal anchor.** Raised with a clear error naming the offending table.

## Architecture

### Mutation path

Every INSERT/UPDATE/DELETE is wrapped by the event store to emit an event in the same transaction as the mutation. The event carries:

- `xid` = `pg_current_xact_id()` (same-tx, monotonic in assignment order).
- `table` = target table name.
- `before` = values of watched columns pre-mutation (null on INSERT).
- `after` = values of watched columns post-mutation (null on DELETE).

For PG shadow-table impl, the mutation becomes a CTE chain:

```sql
-- UPDATE example
WITH
  old AS (SELECT <cols> FROM t WHERE <where> FOR UPDATE),
  upd AS (UPDATE t SET <set> WHERE <where> RETURNING <cols>),
  evt AS (INSERT INTO _live_events (xid, table, before, after)
          SELECT pg_current_xact_id(), 't',
                 jsonb_build_object('col', old.col, ...),
                 jsonb_build_object('col', upd.col, ...)
          FROM old JOIN upd USING (<pk>))
SELECT * FROM upd;  -- passthrough for RETURNING
```

The store provides this wrapping via `wrap(mutationDescriptor) → Sql`.

### Bus

Long-lived shared component (one per process). Responsibilities:

1. Ingest events from the PG shadow table (polling for v1; later: LISTEN/NOTIFY wake + SELECT).
2. Maintain a retention window — a ring of recent events, bounded by time or count.
3. Track `F` = lowest xid guaranteed retained. Bump `F` on eviction: `F ← max(F, evicted_xid + 1)`.
4. Serve subscription `waitNext(preds, cursor)` calls.

### Subscription

One call per iteration:

```typescript
await sub.waitNext(preds, cursor);
```

First step is **admission**: if `xmin(cursor) < F`, throw `CursorTooOldError`. Caller catches and restarts `.live()` (new query, new cursor).

Subsequent calls also atomically swap the subscription's `(preds, cursor)` pair and re-filter the buffered events with the new pair.

Resolves when a buffered OR live event:
- Has `pg_visible_in_snapshot(event.xid, cursor) = false` (committed after the cursor).
- Matches the predicate expression under 3-valued logic (see Matching below).

## Dependency Extraction

The goal: produce the set of values on each watched column that could affect the query's result, and the predicate expression that determines matching.

### Equality-propagation DAG

1. Walk the query AST. Each (aliased) table becomes a DAG node.
2. For each predicate filtering a table, partition into:
   - **Anchor equalities**: `col = literal` (literal anchor) or `t1.col = t2.col` (parent edge). These drive DAG structure.
   - **Other constraints**: everything else — ranges, `LIKE`, inequalities, computed expressions, `OR` branches without equality. These don't affect the DAG; they flow through to the CTE `WHERE` and to the matching expression.
3. Direction of anchor edges comes from query **structure**, not from the predicate itself (equality is symmetric):
   - **JOIN**: the table declared in `.join(T, pred)` depends on every prior-declared table referenced in `pred` (this includes self-joins)
   - **Subselect**: the inner query depends on whatever variables from the enclosing scope its predicates capture.
4. **Validation**:
   - Every node must be reachable from a node that has a literal-anchor pred. Otherwise throw:
     `live() query requires a literal equality filter on at least one table reachable from <table>`.
   - v1 does not support `OR` at the top level of a table's predicate — require top-level `AND`. See "Future enhancements" for the OR plan.

### CTE emission

Topo-sort the DAG. Each node becomes one `MATERIALIZED` CTE. Each CTE's `WHERE`:

- Literal preds on the node's table.
- One `<col> IN (SELECT <parent_col> FROM <parent_cte>)` per incoming edge.
- All other (non-anchor) predicates on the node's table — ranges, `LIKE`, inequalities, etc. They flow through as-is.

```sql
-- Example query:
--   users u JOIN dogs d ON d.user_id = u.id
--           JOIN toys t ON t.dog_id   = d.id
--   WHERE u.id = 5

WITH
  s_users AS MATERIALIZED (
    SELECT id FROM users WHERE id = 5
  ),
  s_dogs  AS MATERIALIZED (
    SELECT id, user_id FROM dogs
     WHERE user_id IN (SELECT id FROM s_users)
  ),
  s_toys  AS MATERIALIZED (
    SELECT dog_id FROM toys
     WHERE dog_id IN (SELECT id FROM s_dogs)
  )
SELECT tbl, col, val FROM (
  SELECT 'users' AS tbl, 'id'      AS col, id::text      AS val FROM s_users
  UNION ALL SELECT 'dogs',  'user_id',    user_id::text FROM s_dogs
  UNION ALL SELECT 'dogs',  'id',         id::text      FROM s_dogs
  UNION ALL SELECT 'toys',  'dog_id',     dog_id::text  FROM s_toys
) x
GROUP BY 1, 2, 3;
```

Output is flat `(table, column, value)` triples. No leaf ids — self-referencing queries (e.g. `users u JOIN users m ON u.manager_id = m.id`) just contribute additional triples under the same `(users, id)` key; the match side treats them as one set of watched values.

Literal-sourced values (e.g. `owners.name = 'Alice'`) are **not** in the emitted SQL — they're static from the AST, merged into the client-side `PredicateSet` directly.

### Type handling

All leaf values serialize as `::text` for a uniform output column type. Covers ~95% of PG types with no ambiguity (integers, uuid, text, bool, date, bytea, jsonb, inet, enums, arrays of these). Special cases:

- **`timestamptz`**: session TimeZone affects text output. Normalize at both emit and extract: `(col AT TIME ZONE 'UTC')::text` or `to_char(col, 'YYYY-MM-DD HH24:MI:SS.US+00')`.
- **`citext`**: native equality is case-insensitive. Either reject in `.live()` preds, or cast `lower(col)::text` at both sites.
- **`numeric` without fixed scale**: `1.0` and `1.00` differ as text. Use `trim_scale(col)::text` (PG 13+) or require declared scale.
- **`float4`/`float8`**: `-0.0` vs `0.0`, `NaN` behavior. Edge cases; unlikely in equality-predicate columns.

Codegen knows each column's PG type and picks the right cast per-column.

## Matching

v1 uses a flat predicate set — no expression tree, no boolean logic, no structural reasoning about the original query's predicates. The subscription holds:

```typescript
// table -> column -> set of watched values (as canonical text)
type PredicateSet = Map<string, Map<string, Set<string>>>;
```

Populated from two sources:
- **Resolved values** from the extraction query output (the `(table, column, value)` triples).
- **Literal values** from the query AST (e.g. `owners.name = 'Alice'` → `owners.name: {'Alice'}`).

For each incoming event on table `T` with `before` and `after` rows: fire if any watched `(T, col)` pair has a value in `PredicateSet[T][col]` matching `before[col]` OR `after[col]`.

That's it. Implicit OR across columns, tables, and within-set values. Match is `O(watched columns on T)` per event.

## Event visibility

Cursor is `pg_current_snapshot()` (text-serialized). Events carry xid. The comparator is `pg_visible_in_snapshot(event.xid, cursor)`:

- `false` → event committed after the cursor's snapshot → deliver.
- `true`  → already reflected in the cursor's data → skip.

This handles concurrent transactions correctly via the snapshot's `xip_list` (txs that were in-progress at cursor time but commit later are correctly treated as "after" the cursor).

## Retention and admission

Bus admission gate: `xmin(cursor) ≥ F`. If not, throw `CursorTooOldError`. Caller handles by re-running `.live()` to get a fresh cursor.

Retention policy (v0): time-window ring buffer, sized to comfortably exceed typical query-to-subscribe latency (seconds). Principled GC rule: drop events with `xid < min(xmin across all live subscriptions)`, mirroring PG's own `backend_xmin`-based vacuum logic.

## Design notes

Non-actionable context — explains *why* the v1 shape is what it is. Skip on first read.

### Why the CTE-materialized chain (vs a big join)

- **Each CTE is one indexed scan** over its table's filter column. Planner can't regress this into a bad join plan.
- **`MATERIALIZED` locks the plan** against PG 12+ inlining. Without it, the whole thing may get rewritten into a single join and replanned as stats drift. With it, every subscriber sees the same plan.
- **Tight intermediate cardinalities**: `s_users` has ~1 row (literal-anchored), `s_dogs` has the small set of that user's dogs, `s_toys` those dogs' toys. No ancestor replication (unlike a LEFT JOIN version, where `u.id=5` would be duplicated once per dog × toy row).
- **Robust to intermediate empties**: if `s_dogs` is empty, `s_toys` is trivially empty — but literal-anchored leaves still resolve from the AST, so the subscription stays correctly armed for a new dog insert.
- **Plan stability as a feature**: Typegres's take on the problem Convex solves by disallowing joins. Keep joins in the language, but express them operationally as a nested-loop-over-indices chain so the planner's unpredictability is out of the critical path for live queries.

### v1 match imprecision

The flat-set match is an over-approximation. Dogs filtered by `WHERE user_id=5 AND breed='Lab'` watch both `user_id: {5}` and `breed: {'Lab'}` as independent sets; a dog with `user_id=5, breed='Poodle'` fires (matches `user_id=5`), the refresh re-runs and finds no change. Spurious refreshes, never missed events. The cost is wasted re-runs; the benefit is a bunch of machinery we don't build yet (no expression tree, no 3-valued logic, no per-event tree walks, no rawRow evaluator). See Future enhancements for what tightens this.

## Future enhancements

Listed so the v1 scope is honest about the over-approximations it accepts and where fixes live.

1. **Non-equality matching (`rawRow` leaves).** In v1, non-equality predicates (`age > 3`, `status LIKE 'X%'`, `IS NULL`) participate only in the CTE filter, not in event matching. Any event that matches the equality anchor fires, even if the event's row would fail the non-equality pred. Over-approximation cost scales with pred selectivity — `WHERE user_id=5 AND status='archived'` where archived rows are 1% of the table fires ~100× more events than strictly necessary. Fix: extend the leaf representation to a tagged union:
    ```typescript
    type Leaf =
      | { kind: "eq"; expectedValues: Set<string> }
      | { kind: "rawRow"; evaluate: (row) => boolean | null }
      | ...;
    ```
    Each leaf knows how to answer "does this event's row match me?" Adding a kind is additive; the match loop dispatches on `kind`. Pair with a proper boolean expression tree and 3-valued logic.

2. **OR composition at the top level.** v1 rejects `WHERE a OR b`. Fix comes with the expression tree — each OR branch becomes a disjunct; each branch must itself have an anchor equality.

3. **Precise AND matching.** Expression-tree matching with per-leaf true/false/unknown evaluation closes the flat-set over-approximation. Biggest wins on queries with highly-selective secondary predicates.

4. **`.liveAggregate()` for aggregates / HAVING / GROUP BY / windows.** Out of `.live()`'s scope entirely. Needs IVM (either custom narrow-scope or Feldera-as-sidecar).

5. **Self-ref precision loss.** v1 treats self-referencing joins as adding more triples under the same `(table, column)` key — all values merge into one set regardless of alias. Usually fine; pathological cases (e.g. a query filters users via one self-join and excludes them via another) over-fire. Fix: preserve alias identity in the match index.

6. **Logical-replication-based event ingestion.** v1 uses a shadow table (~2× writes on mutated rows). For write-heavy workloads, a logical replication slot reading WAL avoids the write amplification. Same admission gate and xid/snapshot semantics; different pluggable event source.

7. **Narrower watched-columns per mutation.** v1 captures all columns of a mutated row into the event's `before`/`after`. Safe but wastes payload for tables with many columns that aren't referenced by any live subscription. Fix: union of columns referenced by currently-registered subscriptions' predicates, advertised by the bus to mutation wrappers. Harder than it sounds — needs an invalidation protocol so new subs that widen the set don't race with in-flight mutations. Defer until event payload size actually bites.

8. **SQLite backend.** v1 is PG-only. For SQLite the equivalent shape:
    - Event capture via `sqlite3_update_hook` (C API), accumulating a per-connection list of pending events; flush to an in-memory ring on `COMMIT`, discard on `ROLLBACK`.
    - No xid/snapshot — single-writer SQLite makes commit order = insertion order. Cursor becomes `max(rowid)` from the events ring.
    - Admission gate, retention floor, match logic all unchanged; just swap the cursor comparator from `pg_visible_in_snapshot(xid, snap)` to `event.rowid > cursor.rowid`.
    - Mutation `wrap` can be a no-op at the SQL level (update_hook captures automatically) — the wrapper just tags the in-progress event list with the right table name since `update_hook` doesn't carry it.

9. **Multi-cluster / cross-region PG.** xids don't cross cluster boundaries. Either per-cluster cursors (sub holds `N` snapshots, events tagged with cluster id) or switch to commit timestamps with `track_commit_timestamp = on` (globally comparable, clock-skew-bounded).
