import type { ExecuteFn, Driver, QueryResult } from "./driver";
import type { Fromable, RowType, RowTypeToTsType } from "./builder/query";
import { QueryBuilder, deserializeRows, hydrateRows } from "./builder/query";
import type { Sql } from "./builder/sql";
import { sql } from "./builder/sql";
import { Table, type TableBase } from "./table";
import { Values } from "./builder/values";
import { InsertBuilder } from "./builder/insert";
import { UpdateBuilder } from "./builder/update";
import { DeleteBuilder } from "./builder/delete";
import type { LiveBus } from "./live/bus";
import { SubscriptionClosedError } from "./live/bus";
import { buildExtractor } from "./live/extractor";
import { LiveQueryError } from "./live/types";

export class Database {
  #liveBus: LiveBus | undefined;
  #boundExecute?: ExecuteFn;

  // A pool-backed Database (`new Database(driver)`) routes each query
  // through the driver's pool. A transaction-bound Database (constructed
  // internally via .transaction()) carries a single-connection ExecuteFn
  // so every query inside the txn callback lands on the same connection.
  constructor(private driver: Driver, boundExecute?: ExecuteFn) {
    if (boundExecute) { this.#boundExecute = boundExecute; }
  }

  // Attach a LiveBus so db.live(query) can serve subscriptions.
  // Called once at startup by an application wiring live queries.
  enableLive(bus: LiveBus): void { this.#liveBus = bus; }

  #exec(query: Sql): Promise<QueryResult> {
    return (this.#boundExecute ?? this.driver.execute.bind(this.driver))(query);
  }

  // Overload resolution matches top-to-bottom and stops on the first
  // match — list specific builders before the general `Sql` fallback, or
  // every QueryBuilder/Insert/... call resolves as `Sql` → QueryResult.
  async execute<O extends RowType>(query: QueryBuilder<any, O, any, any>): Promise<RowTypeToTsType<O>[]>;
  async execute<R extends RowType>(query: InsertBuilder<any, any, R>): Promise<RowTypeToTsType<R>[]>;
  async execute<R extends RowType>(query: UpdateBuilder<any, any, R>): Promise<RowTypeToTsType<R>[]>;
  async execute<R extends RowType>(query: DeleteBuilder<any, any, R>): Promise<RowTypeToTsType<R>[]>;
  async execute(query: Sql): Promise<QueryResult>;
  async execute(query: Sql): Promise<any> {
    const result = await this.#exec(query);
    if (query instanceof QueryBuilder) {
      return deserializeRows(result.rows as { [key: string]: string }[], query.rowType() as { [key: string]: unknown });
    }
    if (query instanceof InsertBuilder || query instanceof UpdateBuilder || query instanceof DeleteBuilder) {
      const returning = query.rowType();
      if (!returning) {
        return [];
      }
      return deserializeRows(result.rows as { [key: string]: string }[], returning as { [key: string]: unknown });
    }
    return result;
  }

  // Materialize rows as class instances. Each column field is an Any
  // wrapping a CAST(param) of the row's value, so methods on the class
  // (relations, mutations, derived columns) compose into follow-up
  // queries naturally: `const [user] = await db.hydrate(User.from()...);
  // await db.execute(user.todos());`.
  //
  // For queries whose output shape is a plain object (e.g. `.select(ns =>
  // ({a: ns.x.foo}))`), hydrate returns plain objects with each field an
  // Any-wrapped value — the prototype-preservation is a no-op.
  async hydrate<O extends RowType, GB extends any[], Card extends "one" | "maybe" | "many">(
    query: QueryBuilder<any, O, GB, Card>,
  ): Promise<O[]>;
  async hydrate<Name extends string, T extends TableBase, R extends RowType>(
    query: InsertBuilder<Name, T, R>,
  ): Promise<R[]>;
  async hydrate<Name extends string, T extends TableBase, R extends RowType>(
    query: UpdateBuilder<Name, T, R>,
  ): Promise<R[]>;
  async hydrate<Name extends string, T extends TableBase, R extends RowType>(
    query: DeleteBuilder<Name, T, R>,
  ): Promise<R[]>;
  async hydrate(query: Sql): Promise<any> {
    const result = await this.#exec(query);
    let shape: { [k: string]: unknown } | undefined;
    if (query instanceof QueryBuilder) {
      shape = query.rowType() as { [k: string]: unknown };
    } else if (query instanceof InsertBuilder || query instanceof UpdateBuilder || query instanceof DeleteBuilder) {
      const r = query.rowType();
      if (!r) { return []; }
      shape = r as { [k: string]: unknown };
    } else {
      throw new Error("db.hydrate requires a QueryBuilder or mutation with RETURNING");
    }
    return hydrateRows(result.rows as { [key: string]: string }[], shape);
  }

  // Run `fn` inside a transaction (pg default isolation). The `tx` Database
  // passed to fn is bound to a single connection; every execute/hydrate on it
  // goes through that connection. Nested calls flatten: `tx.transaction(fn)`
  // just invokes fn(tx) without opening a new BEGIN/COMMIT.
  async transaction<T>(fn: (tx: Database) => Promise<T>): Promise<T> {
    if (this.#boundExecute) {
      // Already in a txn — flatten.
      return fn(this);
    }
    return this.driver.runInSingleConnection(async (execute) => {
      const tx = new Database(this.driver, execute);
      tx.#liveBus = this.#liveBus;
      await execute(sql`BEGIN`);
      try {
        const result = await fn(tx);
        await execute(sql`COMMIT`);
        return result;
      } catch (e) {
        await execute(sql`ROLLBACK`);
        throw e;
      }
    });
  }

  // Entry point for non-Table Fromables (SRFs, Values, subqueries) —
  // Table classes have their own static `.from()`.
  public From<R extends RowType, A extends string>(
    from: Fromable<R, A>,
  ): QueryBuilder<{ [K in A]: R }, R, []> {
    return new QueryBuilder({
      tsAlias: from.tsAlias,
      tables: [{ type: "from", source: from }],
    });
  }

  public values<R extends RowType>(
    vals0: R,
    ...valsRest: (NoInfer<R> | RowTypeToTsType<NoInfer<R>>)[]
  ): QueryBuilder<{ values: R }, R, []> {
    const vals = new Values(vals0, ...valsRest);
    return new QueryBuilder<{ values: R }, R, []>({
      tsAlias: "values",
      tables: [{ type: "from", source: vals }],
    });
  }

  // Subscribe to a query's live result set. Yields an array of rows on each
  // iteration — initial state, then re-yields whenever the bus detects a
  // mutation that could affect the result.
  //
  // Each iteration opens a REPEATABLE READ transaction that captures a
  // snapshot cursor and runs both the predicate extractor and the main query
  // against the same snapshot; events committed after that snapshot are
  // compared against the extracted predicates to decide when to re-yield.
  async *live<O extends RowType>(
    query: QueryBuilder<any, O, any, any>,
  ): AsyncGenerator<RowTypeToTsType<O>[]> {
    if (!this.#liveBus) {
      throw new LiveQueryError(
        "db.live() requires a LiveBus — call db.enableLive(bus) during startup",
      );
    }
    const extractor = buildExtractor(query);
    const sub = this.#liveBus.subscribe();
    try {
      while (true) {
        const { data, cursor, preds } = await this.transaction(async (tx) => {
          // Pin the extractor and main query to the same snapshot so
          // post-snapshot events compare against consistent predicates.
          await tx.execute(sql`SET TRANSACTION ISOLATION LEVEL REPEATABLE READ`);
          const cursorResult = await tx.execute(sql`SELECT pg_current_snapshot()::text AS s`);
          const cursor = (cursorResult.rows as { s: string }[])[0]!.s;
          const extractorRows = (await tx.execute(extractor.sql)).rows as {
            tbl: string;
            col: string;
            value: string;
          }[];
          const preds = extractor.materialize(extractorRows);
          const data = await tx.execute(query) as unknown as RowTypeToTsType<O>[];
          return { data, cursor, preds };
        });
        yield data;
        try {
          await sub.waitNext(preds, cursor);
        } catch (e) {
          if (e instanceof SubscriptionClosedError) { return; }
          throw e;
        }
      }
    } finally {
      sub.close();
    }
  }

  public Table = Table;
}
