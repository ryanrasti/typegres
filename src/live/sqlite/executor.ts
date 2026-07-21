import { compile, type CompiledSql, Ident, sql, type Sql } from "../../builder/sql";
import { canonicalText } from "../canonical";
import type { QueryBuilder, RowType } from "../../builder/query";
import type { Connection, Database } from "../../database";
import type { QueryResult, SyncDriver } from "../../drivers/types";
import type { InsertBuilder } from "../../builder/insert";
import type { UpdateBuilder } from "../../builder/update";
import {
  Executor,
  isLiveMutation,
  type LiveIterationResult,
  type MutationBuilder,
  type MutationOp,
} from "../../executor";
import { runExtraction } from "../extractor";
import { seqCursor } from "../snapshot";
import { type Bus, parseEventPairs } from "../bus";
import { SqlValue } from "../../types/sql-value";
import { Text } from "../../types/sqlite";

// Mutation-image capture for sqlite live. Mutations on `{ live: true }`
// tables get an image column merged into RETURNING at execute time — no
// shadow table (unlike pg, whose events table transports to other
// connections' pollers):
//
//   insert → after-image  (RETURNING sees the inserted row)
//   delete → before-image (RETURNING evaluates against the deleted row)
//   update → after-image; the before-image comes from a pre-SELECT
//            (sqlite RETURNING can't see OLD values)
//
// Values render through canonicalText — must stay aligned with the
// extractor's rendering (see ../canonical.ts).

// One column name serves before- and after-images alike: the matcher
// only consumes the union of (col, value) pairs.
const T_LIVE_IMAGE = "__typegres_live_image";

// A mutation's change events, unstamped — onCommit assigns xids from the
// driver's statement clock when it pushes them to the bus.
export type CapturedEvent = { table: string; pairs: [string, string][] };

// `json_object('col', <canonical text>, ...)` over every column field
// (SqlValue instances) of the row instance.
const buildImageJson = (tableInstance: { [c: string]: unknown }): Sql => {
  const args = Object.entries(tableInstance)
    .filter((e): e is [string, SqlValue<any>] => e[1] instanceof SqlValue)
    .flatMap(([c, v]) => [sql.param(c), canonicalText(v.toSql(), "sqlite")]);
  return sql`json_object(${sql.join(args)})`;
};

// returningMerge callback adding the image column; runMutation strips it
// from result rows before they reach deserializeRows.
const imageReturning =
  (tableName: string) =>
  (ns: object): RowType => {
    const tableInstance = (ns as { [k: string]: object })[tableName] as { [c: string]: unknown };
    return { [T_LIVE_IMAGE]: Text.from(buildImageJson(tableInstance)) };
  };

// The UPDATE before-image: select the image of every row the UPDATE's
// WHERE matches, run synchronously just before the UPDATE — same state,
// no transaction needed (single writer, no awaits between). `.where(true)`
// (matchAll) leaves `where` undefined; emit WHERE TRUE explicitly.
//
// Why two statements instead of a before-CTE on the UPDATE: verified on
// sqlite 3.50, a CTE referenced only from RETURNING evaluates lazily
// DURING the update scan and reads post-update values (MATERIALIZED or
// not). The one sound single-statement form (MATERIALIZED + FROM
// rowid-join + subquery RETURNING) silently degrades to post-images if
// any piece is dropped, and breaks on WITHOUT ROWID tables.
const buildUpdatePreImageSelect = (builder: UpdateBuilder<any, any, any>): Sql => {
  const finalized = builder.finalize();
  const { alias, where, instance } = finalized.opts;
  const database = builder.table.database;
  const whereClause = where ? where.toSql() : sql`TRUE`;
  return sql.withScope(
    [alias],
    sql`SELECT ${buildImageJson(instance as { [c: string]: unknown })} AS ${new Ident(T_LIVE_IMAGE)} FROM ${database.scopedIdent(builder.table.tableName)} AS ${alias} WHERE ${whereClause}`,
  );
};

// The sqlite live execution context (pooled and transaction-bound).
// Captured events buffer into #pending and flush at commit:
//   - unbound: sqlite is in autocommit — each statement is its own
//     transaction — so runMutation invokes onCommit itself, and events
//     reach the bus in the same tick as the mutation.
//   - bound: Connection.transaction() fires onCommit after COMMIT (or
//     onRollback, discarding) — the explicit version of the commit-time
//     event visibility pg gets from MVCC. Nested transaction() calls
//     flatten onto the same executor, so the buffer spans to the
//     outermost commit.
export class SqliteLiveExecutor extends Executor {
  #pending: CapturedEvent[] = [];

  constructor(
    database: Database,
    private driver: SyncDriver,
    private bus: Bus,
    bound = false,
  ) {
    super(database, bound);
  }

  protected exec(compiled: CompiledSql): Promise<QueryResult> {
    return Promise.resolve(this.driver.executeSync(compiled));
  }

  protected override runMutation(op: MutationOp, builder: MutationBuilder): Promise<QueryResult> {
    if (!isLiveMutation(builder)) {
      return this.runStatement(builder);
    }
    const { executeSync } = this.driver;
    const table = builder.table.tableName;
    // returningMerge has the same shape on all three builders.
    const merged = (builder as InsertBuilder<any, any, any>).returningMerge(imageReturning(table));
    const compiled = compile(merged, { database: this.database });
    const events: CapturedEvent[] = [];
    if (op === "update") {
      const preImage = compile(buildUpdatePreImageSelect(builder as UpdateBuilder<any, any, any>), { database: this.database });
      for (const row of executeSync(preImage).rows) {
        events.push({ table, pairs: parseEventPairs(row[T_LIVE_IMAGE] ?? null, null) });
      }
    }
    const result = executeSync(compiled);
    const rows = result.rows.map((row) => {
      const { [T_LIVE_IMAGE]: image, ...rest } = row;
      events.push({ table, pairs: parseEventPairs(image ?? null, null) });
      return rest;
    });
    this.#pending.push(...events);
    if (!this.bound) {
      // Autocommit: this statement IS its transaction.
      this.onCommit();
    }
    // INVARIANT: pre-image read → mutation → flush is one synchronous
    // frame. Keep this method await-free, or concurrent mutations could
    // interleave between statements and in #pending.
    return Promise.resolve({ rows });
  }

  // Stamp with the driver's statement clock — the tick of the statement
  // making the events visible (the mutation, or COMMIT), so a mutation's
  // (or whole transaction's) events share one xid, like pg's per-txn xids.
  override onCommit(): void {
    const pending = this.#pending;
    this.#pending = [];
    this.bus.ingest(pending.map((e) => ({ xid: this.driver.liveSeq, ...e })));
  }

  override onRollback(): void {
    this.#pending = [];
  }

  // No txn: readCursor runs BEFORE the queries, so any event stamped
  // while they run is "not yet seen" and trips the subscribe-time
  // backfill check.
  override async runLiveIteration<Q extends QueryBuilder<any, any, any, any>>(
    conn: Connection<any>,
    query: Q,
  ): Promise<
    Q extends QueryBuilder<any, infer O extends RowType, any, any>
      ? LiveIterationResult<O>
      : never
  > {
    const cursor = seqCursor(this.driver.liveSeq);
    const { rows, predicateSet } = await runExtraction(conn, query);
    return { rows, cursor, predicateSet } as any;
  }
}
