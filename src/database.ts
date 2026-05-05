import type { ExecuteFn, Driver, QueryResult } from "./driver";
import type { Fromable, RowType, RowTypeToTsType } from "./builder/query";
import { QueryBuilder, deserializeRows, hydrateRows } from "./builder/query";
import type { Sql } from "./builder/sql";
import { sql } from "./builder/sql";
import { Table, type TableBase, type TableOptions } from "./table";
import { Values } from "./builder/values";
import { InsertBuilder } from "./builder/insert";
import { UpdateBuilder } from "./builder/update";
import { DeleteBuilder } from "./builder/delete";
import { Bus, type Subscription, type BusOptions } from "./live/bus";
import { eventsTableSqlStatements } from "./live/events-ddl";
import { runLiveIteration } from "./live/extractor";
import { parseSnapshot } from "./live/snapshot";

export type TransactionIsolation = "read committed" | "repeatable read" | "serializable";
export type TransactionOptions = {
  isolation?: TransactionIsolation;
};

// Postgres isolation levels are totally ordered. A nested call asking for
// weaker-or-equal isolation than the active txn flattens harmlessly (caller
// gets at least what they asked for); a stronger request can't be honored
// (pg can't promote isolation after the first query) and must throw.
//
// `undefined` means "ambient" — caller passed no explicit level, so the
// outer BEGIN defers to the session/db/role default (configurable via
// `default_transaction_isolation`). We can't prove what level we got, so
// any *explicit* nested request inside an ambient txn must throw — the
// alternative would silently downgrade the caller's expectation.
const ISOLATION: { [K in TransactionIsolation]: { rank: number; begin: Sql } } = {
  "read committed": { rank: 0, begin: sql`BEGIN ISOLATION LEVEL READ COMMITTED` },
  "repeatable read": { rank: 1, begin: sql`BEGIN ISOLATION LEVEL REPEATABLE READ` },
  "serializable":    { rank: 2, begin: sql`BEGIN ISOLATION LEVEL SERIALIZABLE` },
};

// `C` is the per-app context (principal) type. Forwarded to every
// `db.Table(name)` so every codegen-emitted class picks up the same C
// without changing the generator. Default `undefined` matches the
// pre-context behavior.
export class Database<C = undefined> {
  #boundExecute?: ExecuteFn;
  // Active isolation on a txn-bound Database. `undefined` means either
  // pool-backed (no active txn) or ambient (txn opened without an
  // explicit level — we deferred to pg's session default, which we
  // can't introspect cheaply, so we don't claim a specific level).
  #isolation?: TransactionIsolation;

  // A pool-backed Database (`new Database(driver)`) routes each query
  // through the driver's pool. A transaction-bound Database (constructed
  // internally via .transaction()) carries a single-connection ExecuteFn
  // so every query inside the txn callback lands on the same connection.
  constructor(private driver: Driver, boundExecute?: ExecuteFn, isolation?: TransactionIsolation) {
    if (boundExecute) { this.#boundExecute = boundExecute; }
    if (isolation) { this.#isolation = isolation; }
  }

  #exec(query: Sql): Promise<QueryResult> {
    return (this.#boundExecute ?? this.driver.execute.bind(this.driver))(query);
  }

  // Overload resolution matches top-to-bottom and stops on the first
  // match — list specific builders before the general `Sql` fallback, or
  // every QueryBuilder/Insert/... call resolves as `Sql` → QueryResult.
  async execute<Q extends QueryBuilder<any, any, any, any>>(
    query: Q,
  ): Promise<Q extends QueryBuilder<any, infer O, any, any> ? RowTypeToTsType<O>[] : never>;
  async execute<Q extends InsertBuilder<any, any, any>>(
    query: Q,
  ): Promise<Q extends InsertBuilder<any, any, infer R> ? RowTypeToTsType<R>[] : never>;
  async execute<Q extends UpdateBuilder<any, any, any>>(
    query: Q,
  ): Promise<Q extends UpdateBuilder<any, any, infer R> ? RowTypeToTsType<R>[] : never>;
  async execute<Q extends DeleteBuilder<any, any, any>>(
    query: Q,
  ): Promise<Q extends DeleteBuilder<any, any, infer R> ? RowTypeToTsType<R>[] : never>;
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

  // Run `fn` inside a transaction. The `tx` Database passed to fn is bound
  // to a single connection; every execute/hydrate on it goes through that
  // connection. Nested calls flatten: `tx.transaction(...)` just invokes the
  // callback without opening a new BEGIN/COMMIT.
  async transaction<T>(fn: (tx: Database<C>) => Promise<T>): Promise<T>;
  async transaction<T>(opts: TransactionOptions, fn: (tx: Database<C>) => Promise<T>): Promise<T>;
  async transaction<T>(
    optsOrFn: TransactionOptions | ((tx: Database<C>) => Promise<T>),
    maybeFn?: (tx: Database<C>) => Promise<T>,
  ): Promise<T> {
    const opts = typeof optsOrFn === "function" ? undefined : optsOrFn;
    const fn = typeof optsOrFn === "function" ? optsOrFn : maybeFn;
    if (!fn) {
      throw new Error("transaction() requires a callback");
    }
    if (this.#boundExecute) {
      // Already in a txn — flatten, but reject silent isolation downgrades.
      // Pg can't promote isolation after the first query, so an inner call
      // requesting more than the active txn provides is a bug.
      if (opts?.isolation) {
        const active = this.#isolation;
        if (active === undefined) {
          // Outer is ambient (deferred to session default) — we don't
          // know its actual level, so we can't safely promise the inner
          // is satisfied. Bail rather than silently flatten.
          throw new Error(
            `Cannot nest a '${opts.isolation}' transaction inside an ambient (no-isolation-specified) transaction — ` +
              `the outer's level depends on session config and can't be verified. Open the outer transaction at '${opts.isolation}' or stronger.`,
          );
        }
        if (ISOLATION[opts.isolation].rank > ISOLATION[active].rank) {
          throw new Error(
            `Cannot nest a '${opts.isolation}' transaction inside a '${active}' transaction — ` +
              `pg cannot promote isolation after the first query. Open the outer transaction at '${opts.isolation}' or stronger.`,
          );
        }
      }
      return fn(this);
    }
    return this.driver.runInSingleConnection(async (execute) => {
      const tx = new Database<C>(this.driver, execute, opts?.isolation);
      await execute(opts?.isolation ? ISOLATION[opts.isolation].begin : sql`BEGIN`);
      try {
        const result = await fn(tx);
        await execute(sql`COMMIT`);
        return result;
      } catch (e) {
        // Preserve the original error even if ROLLBACK itself fails
        // (connection lost, etc.). Log the rollback failure but rethrow
        // the user's exception — it's the one they care about.
        try {
          await execute(sql`ROLLBACK`);
        } catch (rollbackErr) {
          console.error("ROLLBACK failed after transaction error:", rollbackErr);
        }
        throw e;
      }
    });
  }

  // Entry point for non-Table Fromables (SRFs, Values, subqueries) —
  // Table classes have their own static `.from()`.
  public from<R extends RowType, A extends string>(
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

  // Forward the app-wide context type to every `db.Table(name)` so
  // codegen-emitted classes inherit it without changes to the
  // generator. `Table<Name, C>` constrains `scope()` to accept only
  // values assignable to C, and pins `contextOf()`'s return type.
  public Table = <Name extends string>(name: Name, opts: TableOptions = {}) =>
    Table<Name, C>(name, opts);

  // --- Live queries ---
  // Bus is per-Driver (per-pool); a tx-bound Database delegates to its
  // parent's bus. Lifecycle is explicit — startLive() must be called
  // before any live(). Live queries by definition cross commit boundaries
  // so calling .live() inside a transaction is rejected.
  #bus: Bus | undefined;

  async startLive(opts: BusOptions = {}): Promise<void> {
    if (this.#boundExecute) {
      throw new Error("startLive() must be called on a pool-backed Database, not inside a transaction");
    }
    if (this.#bus) { throw new Error("Live bus already started"); }
    // Idempotent: ensures `_typegres_live_events` exists before the bus
    // starts polling it. Tables that opt into events via the live
    // transformer write here on every mutation.
    //
    // Static import via the standalone DDL module — `events.ts` itself
    // sits in a cycle with `database.ts` through Table → insert
    // builders, which manifests as a TDZ in chunked prod bundles.
    for (const stmt of eventsTableSqlStatements()) {
      await this.driver.execute(stmt);
    }
    this.#bus = new Bus(this.driver, opts);
    await this.#bus.start();
  }

  async stopLive(): Promise<void> {
    const bus = this.#bus;
    this.#bus = undefined;
    await bus?.stop();
  }

  // Async iterable: yields the current row set, then re-yields whenever a
  // committed mutation might have changed that result. Each iteration
  // opens a REPEATABLE READ txn (via runLiveIteration), captures its
  // cursor, materializes a closed PredicateSet, and registers a
  // subscription with the bus. Wakes when the bus signals a match.
  async *live<Q extends QueryBuilder<any, any, any, any>>(
    query: Q,
  ): AsyncIterable<
    Q extends QueryBuilder<any, infer O extends RowType, any, any>
      ? RowTypeToTsType<O>[]
      : never
  > {
    if (this.#boundExecute) {
      throw new Error("live() can't be called inside a transaction");
    }
    const bus = this.#bus;
    if (!bus) { throw new Error("Live bus not started — call db.startLive() first"); }

    let currentSub: Subscription | undefined;
    try {
      while (true) {
        const { rows, cursor, predicateSet } = await runLiveIteration(this, query);
        // undefined → backfill already shows a mutation the cursor
        // missed; rerun immediately. Otherwise sub.wait resolves on the
        // next matching poll (signal auto-unsubscribes).
        currentSub = bus.subscribe(parseSnapshot(cursor), predicateSet);
        yield rows as any;
        if (currentSub) {
          try {
            await currentSub.wait;
          } catch (e) {
            // `await sub.wait` is a non-yield point; .return() on the
            // iterator can't interrupt it directly. The bus rejects
            // wait via sub.cancel() (e.g. on shutdown) so we wake up
            // here and exit cleanly through finally.
            if (e instanceof DOMException && e.name === "AbortError") return;
            throw e;
          }
          currentSub = undefined;
        }
      }
    } finally {
      // Consumer broke mid-wait — sub still indexed; clean up explicitly.
      // Idempotent if signal/cancel already unsubscribed.
      currentSub?.unsubscribe();
    }
  }
}
