import { type CompiledSql, sql, type Sql } from "../../builder/sql";
import type { Connection, Database } from "../../database";
import type { AnyExecuteFn, QueryResult } from "../../drivers/types";
import type { QueryBuilder, RowType } from "../../builder/query";
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
import { parseSnapshot } from "../snapshot";
import { wrapInsertOrDelete, wrapUpdate } from "./events";

// Postgres execution context: mutations on `{ live: true }` tables are
// wrapped in the events-CTE chain (./events.ts) so they log to the shadow
// events table in the same statement — unconditionally, since that table
// transports to pollers on other connections. One class serves pooled
// and tx contexts (pg's MVCC already gives events commit-time visibility).
export class PgExecutor extends Executor {
  constructor(
    database: Database,
    private execFn: AnyExecuteFn,
    bound = false,
  ) {
    super(database, bound);
  }
  protected exec(compiled: CompiledSql): Promise<QueryResult> {
    return Promise.resolve(this.execFn(compiled));
  }
  protected override runMutation(op: MutationOp, builder: MutationBuilder): Promise<QueryResult> {
    if (!isLiveMutation(builder)) {
      return this.runStatement(builder);
    }
    const wrapped: Sql =
      op === "update"
        ? wrapUpdate(builder as UpdateBuilder<any, any, any>)
        : wrapInsertOrDelete(builder as InsertBuilder<any, any, any>, op === "insert" ? "after" : "before");
    return this.runStatement(wrapped);
  }
  // Open a REPEATABLE READ txn, snapshot the cursor INSIDE it, run the
  // extractor + user query — one consistent picture. Goes through
  // conn.transaction() (not this executor's exec fn) for the bound context.
  override runLiveIteration<Q extends QueryBuilder<any, any, any, any>>(
    conn: Connection<any>,
    query: Q,
  ): Promise<
    Q extends QueryBuilder<any, infer O extends RowType, any, any>
      ? LiveIterationResult<O>
      : never
  > {
    return conn.transaction({ isolation: "repeatable read" }, async (tx) => {
      const cursorResult = await tx.execute(
        sql`SELECT pg_current_snapshot()::text AS cursor`,
      );
      const cursor = parseSnapshot((cursorResult.rows as { cursor: string }[])[0]!.cursor);
      const { rows, predicateSet } = await runExtraction(tx, query);
      return { rows, cursor, predicateSet };
    }) as any;
  }
}
