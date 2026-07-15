import type { ExecuteFn, Driver, QueryResult } from "./driver-shared";
import type { Fromable, RowType, RowTypeToTsType } from "./builder/query";
import { QueryBuilder, hydrateRows } from "./builder/query";
import { deserializeRows } from "./util";
import type { Sql } from "./builder/sql";
import { compile, sql, Ident } from "./builder/sql";
import { Table, type TableBase, type TableOptions } from "./table";
import { Values } from "./builder/values";
import { InsertBuilder } from "./builder/insert";
import { UpdateBuilder } from "./builder/update";
import { DeleteBuilder } from "./builder/delete";
import { Bus, type Subscription, type BusOptions } from "./live/bus";
import { eventsTableSqlStatements } from "./live/events-ddl";
import { runLiveIteration } from "./live/extractor";
import { parseSnapshot } from "./live/snapshot";
import type { DialectName } from "./builder/sql";

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

// Immutable metadata handle: dialect + provenance identity, no driver.
// Construction is synchronous and module-load-safe; call
// `db.attach(driver)` to get a runtime `Connection`.
//
// `C` is the per-app context (principal) type, threaded onto every
// `db.Table(name)` and readable via `Table.scope(ctx)` / `contextOf(row)`.
// Default `any` so a bare `Database` used purely as a provenance handle
// accepts any concrete `Database<C>`; callers that care about `C`
// write it explicitly (see `typegres<C>()` in index.ts).
export class Database<C = any> {
  readonly name?: string;
  readonly dialect: DialectName;

  constructor(opts: { dialect: DialectName; name?: string }) {
    this.dialect = opts.dialect;
    if (opts.name) { this.name = opts.name; }
  }

  // Provenance-tagged identifier factory. The only way to construct a
  // schema-referencing Ident that survives the compile-time provenance
  // check. Prefer over raw `sql.ident(name)` (which leaves the Ident
  // unattributed) for anything the RPC boundary might touch.
  scopedIdent(name: string): Ident {
    return new Ident(name, this);
  }

  // Forwarded to codegen'd `Table(name, opts, database)` — attaches
  // `this` as the class's `.database` static, so every Ident it emits
  // carries this Database's id. The optional `LocalC` type parameter
  // lets a class-def override the app-wide context type (used by scope
  // tests where each test has its own Principal shape).
  public Table = <Name extends string, LocalC = C>(name: Name, opts: TableOptions = {}) =>
    Table<Name, LocalC>(name, opts, this);

  // Attach a driver → get a runtime Connection. Multiple `attach` calls
  // are allowed (test + prod, worker pools, replicas) — Connections
  // share the schema provenance but talk to independent drivers.
  attach(driver: Driver): Connection<C> {
    if (driver.dialect !== this.dialect) {
      throw new Error(
        `Driver dialect '${driver.dialect}' does not match Database dialect '${this.dialect}'.`,
      );
    }
    return new Connection<C>(this, driver);
  }

  // Entry point for non-Table Fromables (SRFs, Values, subqueries).
  // Table classes have their own static `.from()`.
  from<R extends RowType, A extends string>(
    from: Fromable<R, A>,
  ): QueryBuilder<{ [K in A]: R }, R, []> {
    return new QueryBuilder({
      database: this,
      tsAlias: from.tsAlias,
      tables: [{ type: "from", source: from }],
    });
  }

  values<R extends RowType>(
    vals0: R,
    ...valsRest: (NoInfer<R> | RowTypeToTsType<NoInfer<R>>)[]
  ): QueryBuilder<{ values: R }, R, []> {
    const vals = new Values(vals0, ...valsRest);
    return new QueryBuilder<{ values: R }, R, []>({
      database: this,
      tsAlias: "values",
      tables: [{ type: "from", source: vals }],
    });
  }
}

// Runtime handle: has a driver, executes queries. Constructed via
// `db.attach(driver)`. `.transaction()` mints a txn-bound Connection
// sharing the same driver + Database. `.close()` closes the driver.
export class Connection<C = undefined> {
  #boundExecute?: ExecuteFn;
  // Active isolation on a txn-bound Connection. `undefined` means either
  // pool-backed (no active txn) or ambient (txn opened without an
  // explicit level — we deferred to pg's session default, which we
  // can't introspect cheaply, so we don't claim a specific level).
  #isolation?: TransactionIsolation;

  constructor(
    readonly database: Database<C>,
    private driver: Driver,
    boundExecute?: ExecuteFn,
    isolation?: TransactionIsolation,
  ) {
    if (boundExecute) { this.#boundExecute = boundExecute; }
    if (isolation) { this.#isolation = isolation; }
  }

  get dialect() { return this.driver.dialect; }

  #exec(query: Sql): Promise<QueryResult> {
    const compiled = compile(query, { database: this.database });
    return (this.#boundExecute ?? this.driver.execute.bind(this.driver))(compiled);
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
      return deserializeRows(result.rows as { [key: string]: string }[], query.rowType());
    }
    if (query instanceof InsertBuilder || query instanceof UpdateBuilder || query instanceof DeleteBuilder) {
      const returning = query.rowType();
      if (!returning) {
        return [];
      }
      return deserializeRows(result.rows as { [key: string]: string }[], returning);
    }
    return result;
  }

  // Materialize rows as class instances. See original doc on the
  // hydrate method for the design rationale.
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
      throw new Error("conn.hydrate requires a QueryBuilder or mutation with RETURNING");
    }
    return hydrateRows(result.rows as { [key: string]: string }[], shape);
  }

  async transaction<T>(fn: (tx: Connection<C>) => Promise<T>): Promise<T>;
  async transaction<T>(opts: TransactionOptions, fn: (tx: Connection<C>) => Promise<T>): Promise<T>;
  async transaction<T>(
    optsOrFn: TransactionOptions | ((tx: Connection<C>) => Promise<T>),
    maybeFn?: (tx: Connection<C>) => Promise<T>,
  ): Promise<T> {
    const opts = typeof optsOrFn === "function" ? undefined : optsOrFn;
    const fn = typeof optsOrFn === "function" ? optsOrFn : maybeFn;
    if (!fn) {
      throw new Error("transaction() requires a callback");
    }
    if (this.#boundExecute) {
      // Already in a txn — flatten, but reject silent isolation downgrades.
      if (opts?.isolation) {
        const active = this.#isolation;
        if (active === undefined) {
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
      const tx = new Connection<C>(this.database, this.driver, execute, opts?.isolation);
      const runSql = async (s: Sql) => execute(compile(s, { database: this.database }));
      await runSql(opts?.isolation ? ISOLATION[opts.isolation].begin : sql`BEGIN`);
      try {
        const result = await fn(tx);
        await runSql(sql`COMMIT`);
        return result;
      } catch (e) {
        try {
          await runSql(sql`ROLLBACK`);
        } catch (rollbackErr) {
          console.error("ROLLBACK failed after transaction error:", rollbackErr);
        }
        throw e;
      }
    });
  }

  async close(): Promise<void> {
    if (this.#boundExecute) {
      throw new Error("close() must be called on a pool-backed Connection, not inside a transaction");
    }
    await this.driver.close();
  }

  // --- Live queries ---
  #bus: Bus | undefined;

  async installLiveEvents(): Promise<void> {
    for (const stmt of eventsTableSqlStatements(this.database)) {
      await this.driver.execute(compile(stmt, { database: this.database }));
    }
  }

  async startLive(opts: BusOptions = {}): Promise<void> {
    if (this.#boundExecute) {
      throw new Error("startLive() must be called on a pool-backed Connection, not inside a transaction");
    }
    if (this.#bus) { throw new Error("Live bus already started"); }
    this.#bus = new Bus(this, opts);
    await this.#bus.start();
  }

  async stopLive(): Promise<void> {
    const bus = this.#bus;
    this.#bus = undefined;
    await bus?.stop();
  }

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
    if (!bus) { throw new Error("Live bus not started — call conn.startLive() first"); }

    let currentSub: Subscription | undefined;
    try {
      while (true) {
        const { rows, cursor, predicateSet } = await runLiveIteration(this, query);
        currentSub = bus.subscribe(parseSnapshot(cursor), predicateSet);
        yield rows as any;
        if (currentSub) {
          try {
            await currentSub.wait;
          } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") {return;}
            throw e;
          }
          currentSub = undefined;
        }
      }
    } finally {
      currentSub?.unsubscribe();
    }
  }
}
