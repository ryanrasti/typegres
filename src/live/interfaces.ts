import type { Sql } from "../builder/sql";

// ---------------------------------------------------------------------------
// Event shape
// ---------------------------------------------------------------------------

// A single mutation event. The store uses `xid` to test visibility against
// a subscriber's cursor; subscribers themselves never see xid/events directly
// (they only await wake-ups).
export interface LiveEvent {
  xid: bigint; // pg xid8
  table: string;
  // Values of watched predicate columns before the mutation (null on INSERT).
  before: Record<string, unknown> | null;
  // Values of watched predicate columns after the mutation (null on DELETE).
  after: Record<string, unknown> | null;
}

// ---------------------------------------------------------------------------
// Cursor
// ---------------------------------------------------------------------------

// Serialized pg_current_snapshot(), e.g. "10:20:14,16".
// New on every .live() iteration — the store compares event.xid against it
// internally using pg_visible_in_snapshot(xid, cursor).
export type Cursor = string;

// ---------------------------------------------------------------------------
// Predicates
// ---------------------------------------------------------------------------

// Equality predicates extracted from a live query. Per-table, per-column:
// the set of values that, if matched by a mutation's before or after row,
// could affect the query result.
//
// Includes literal-source preds (e.g. WHERE name='Alice' → {owners: {name: {'Alice'}}})
// AND resolved value preds (e.g. joins against current data → {dogs: {owner_id: {5,7}}}).
// Only equality is supported; any other predicate shape in the source query
// is rejected at extraction time.
export type PredicateSet = Map<string, Map<string, Set<unknown>>>;

// Per-query machinery that extracts preds at a given snapshot.
export interface PredicateExtractor {
  // SQL run in the same tx as the main query. Throws at construction time
  // if the source query contains any non-equality predicate.
  sql: Sql;
  materialize(rows: Record<string, string>[]): PredicateSet;
}

// ---------------------------------------------------------------------------
// Subscription
// ---------------------------------------------------------------------------

export interface Subscription {
  // One call per iteration of the .live() loop. Replaces the sub's preds+cursor
  // with the new ones, admits against the bus's retention floor, and resolves
  // when a mutation event that is not visible in `cursor` and matches `preds`
  // exists — either already buffered or newly arriving.
  //
  // First call: admission check (throws CursorTooOldError if xmin(cursor) < F).
  // Subsequent calls: atomic preds+cursor swap, filter buffer with the new
  // pair, resolve if anything qualifies or wait for the next matching event.
  waitNext(preds: PredicateSet, cursor: Cursor): Promise<void>;

  close(): Promise<void>;
}

export class CursorTooOldError extends Error {
  constructor(readonly cursor: Cursor, readonly retentionFloor: bigint) {
    super(`Cursor ${cursor} older than retention floor xmin=${retentionFloor}`);
  }
}

// ---------------------------------------------------------------------------
// The bus
// ---------------------------------------------------------------------------

export interface LiveEventStore {
  // Open a new subscription handle. No admission happens here — that's on the
  // first waitNext() call, since that's when the cursor is first provided.
  subscribe(subId: string): Subscription;

  // Mutation integration — see "Mutation wrapping" below.
  wrap(mutation: MutationDescriptor): Sql;
}

// ---------------------------------------------------------------------------
// Mutation wrapping
// ---------------------------------------------------------------------------
//
// appendSql(event) doesn't work: the event's `before` values aren't knowable
// before the mutation runs (UPDATE/DELETE need to capture the old row). The
// store instead receives the mutation description upfront and returns SQL
// that executes the mutation AND emits events atomically in the same tx.
//
// Concretely, for a PG shadow-table impl, `wrap` produces something like:
//
//   UPDATE:
//     WITH
//       old AS (SELECT cols FROM t WHERE <where> FOR UPDATE),
//       upd AS (UPDATE t SET <set> WHERE <where> RETURNING cols),
//       evt AS (INSERT INTO _live_events (xid, table, before, after)
//               SELECT pg_current_xact_id(), 't',
//                      jsonb_build_object('col', old.col, ...),
//                      jsonb_build_object('col', upd.col, ...)
//               FROM old JOIN upd USING (<pk>))
//     SELECT * FROM upd; -- for RETURNING passthrough

export type MutationDescriptor =
  | {
      kind: "insert";
      table: string;
      // Columns the store should capture into `after` on each inserted row.
      // Typically the union of columns referenced by any live subscription's
      // preds on this table; for v0 can be "all columns" as a safe overshoot.
      watchedColumns: string[];
      // The user-level INSERT as a SQL fragment with a RETURNING clause that
      // exposes watchedColumns. Store composes its CTEs around this.
      core: Sql;
    }
  | {
      kind: "update";
      table: string;
      watchedColumns: string[];
      // The UPDATE's WHERE predicate, reused by the store to build the
      // "old values" capture: SELECT watchedColumns FROM t WHERE <where>
      // FOR UPDATE (same tx sees both).
      where: Sql;
      // The mutation itself (UPDATE ... SET ... WHERE ... RETURNING watchedColumns).
      core: Sql;
    }
  | {
      kind: "delete";
      table: string;
      watchedColumns: string[];
      // The DELETE (DELETE FROM ... WHERE ... RETURNING watchedColumns).
      core: Sql;
    };

// ---------------------------------------------------------------------------
// Query-side entry point
// ---------------------------------------------------------------------------

// .live() on QueryBuilder yields the current result set each iteration.
// Loop shape per iteration:
//   1. Open REPEATABLE READ tx.
//   2. cursor = pg_current_snapshot().
//   3. preds  = PredicateExtractor.sql + materialize.
//   4. data   = main query.
//   5. Commit.
//   6. yield data.
//   7. await sub.waitNext(preds, cursor).
export type LiveResult<Row> = AsyncIterable<Row[]>;

// ---------------------------------------------------------------------------
// OPEN QUESTIONS — flagging for review
// ---------------------------------------------------------------------------
//
// 1. watchedColumns per mutation. For the mutation to emit correct events,
//    the store needs to know which columns matter. Options:
//      (a) Capture all columns of the row (safest, largest event payload).
//      (b) Capture union of columns referenced by any live subscription's
//          preds on that table (requires the store to advertise this set
//          to mutation builders, and to invalidate/pause mutations briefly
//          when a new sub widens the column set — race-prone).
//      (c) Declare watched columns at schema/codegen time based on FK
//          relationships + literal-filtered columns the app uses.
//    I leaned (a) for v0 in the descriptor's shape. Reasonable?
//
// 2. MutationDescriptor vs. a lower-level Sql-composition API. I modeled it
//    as a tagged union of insert/update/delete because that matches the three
//    mutation builders cleanly. An alternative is a single primitive like
//    `eventEmissionCte(table, cols, oldRef, newRef): Sql` that each builder
//    composes itself. Descriptor is more prescriptive (store owns the CTE
//    shape); primitive is more flexible. Preference?
//
// 3. How mutation builders reach the store. Currently they get an Executor
//    in opts. Two shapes:
//      (a) Executor grows an optional `events?: LiveEventStore` field;
//          builders null-check and route.
//      (b) Database owns both; mutation builders receive both via opts.
//    Either is fine; matters for how the executor abstraction is shaped.
