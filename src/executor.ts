import { compile, type CompiledSql, type Sql } from "./builder/sql";
import type { Connection, Database } from "./database";
import type { QueryResult } from "./drivers/types";
import type { QueryBuilder, RowType, RowTypeToTsType } from "./builder/query";
import { InsertBuilder } from "./builder/insert";
import { UpdateBuilder } from "./builder/update";
import { DeleteBuilder } from "./builder/delete";
import type { PredicateSet } from "./live/extractor";
import type { Cursor } from "./live/snapshot";

export type MutationOp = "insert" | "update" | "delete";
export type MutationBuilder =
  | InsertBuilder<any, any, any>
  | UpdateBuilder<any, any, any>
  | DeleteBuilder<any, any, any>;

const mutationOp = (query: Sql): MutationOp | undefined =>
  query instanceof InsertBuilder ? "insert"
  : query instanceof UpdateBuilder ? "update"
  : query instanceof DeleteBuilder ? "delete"
  : undefined;

// Has the mutation's target table opted into live capture (`{ live: true }`)?
export const isLiveMutation = (builder: MutationBuilder): boolean => builder.table.live;

export type LiveIterationResult<O extends RowType> = {
  rows: RowTypeToTsType<O>[];
  // Ready to hand straight to bus.subscribe(). pg: the parsed
  // pg_current_snapshot(); sqlite: the driver's seq embedded in the same
  // Cursor shape.
  cursor: Cursor;
  // Closed set of watched values per (table, col) — propagated across
  // equality classes.
  predicateSet: PredicateSet;
};

// A Connection's execution context: one concrete executor per dialect
// (live/pg/executor.ts, live/sqlite/executor.ts), constructed in pooled
// or transaction-bound mode. run() detects mutation builders and routes
// them to runMutation (the per-dialect capture hook); everything bottoms
// out in runStatement (compile + exec).
export abstract class Executor {
  constructor(
    readonly database: Database,
    // True for transaction-bound executors — drives Connection's "not
    // inside a transaction" guards and transaction() flattening.
    readonly bound: boolean = false,
  ) {}

  protected abstract exec(compiled: CompiledSql): Promise<QueryResult>;

  run(query: Sql): Promise<QueryResult> {
    const op = mutationOp(query);
    return op ? this.runMutation(op, query as MutationBuilder) : this.runStatement(query);
  }

  protected runStatement(query: Sql): Promise<QueryResult> {
    return this.exec(compile(query, { database: this.database }));
  }

  // Default: mutations are just statements. Dialect executors override
  // with their capture behavior.
  protected runMutation(_op: MutationOp, builder: MutationBuilder): Promise<QueryResult> {
    return this.runStatement(builder);
  }

  // One iteration of the live loop: capture a cursor "before" the query's
  // view of the data, compute the watched predicate set, run the query.
  // Takes the Connection because pg wraps this in conn.transaction().
  abstract runLiveIteration<Q extends QueryBuilder<any, any, any, any>>(
    conn: Connection<any>,
    query: Q,
  ): Promise<
    Q extends QueryBuilder<any, infer O extends RowType, any, any>
      ? LiveIterationResult<O>
      : never
  >;

  // Fired by Connection.transaction() after COMMIT/ROLLBACK. No-ops
  // unless a variant holds deferred work (sqlite's event buffer).
  onCommit(): void {}
  onRollback(): void {}
}
