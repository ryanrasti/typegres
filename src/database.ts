import { AsyncLocalStorage } from "node:async_hooks";
import type { ExecuteFn, Executor, QueryResult } from "./executor";
import type { Fromable, RowType, RowTypeToTsType, RowTypeOfFromable } from "./builder/query";
import { aliasRowType, QueryBuilder, getRowType, deserializeRows } from "./builder/query";
import { sql, Sql } from "./builder/sql";
import { TableBase } from "./table";
import { Values } from "./builder/values";
import { InsertBuilder } from "./builder/insert";
import { UpdateBuilder } from "./builder/update";
import { DeleteBuilder } from "./builder/delete";
import type { LiveBus } from "./live/bus";
import { SubscriptionClosedError } from "./live/bus";
import { buildExtractor } from "./live/extractor";
import { LiveQueryError } from "./live/types";

export class Database {
  #context = new AsyncLocalStorage<{ execute: ExecuteFn; inTransaction: boolean }>();
  #liveBus: LiveBus | undefined;

  constructor(private executor: Executor) {}

  // Attach a LiveBus so db.live(query) can serve subscriptions.
  // Called once at startup by an application wiring live queries.
  enableLive(bus: LiveBus): void { this.#liveBus = bus; }

  async execute(query: Sql): Promise<QueryResult>;
  async execute<O extends RowType, GB extends any[], Card extends "one" | "maybe" | "many">(
    query: QueryBuilder<any, O, GB, Card>,
  ): Promise<RowTypeToTsType<O>[]>;
  async execute<Name extends string, T extends { [key: string]: any }, R extends RowType>(
    query: InsertBuilder<Name, T, R>,
  ): Promise<RowTypeToTsType<R>[]>;
  async execute<Name extends string, T extends { [key: string]: any }, R extends RowType>(
    query: UpdateBuilder<Name, T, R>,
  ): Promise<RowTypeToTsType<R>[]>;
  async execute<Name extends string, T extends { [key: string]: any }, R extends RowType>(
    query: DeleteBuilder<Name, T, R>,
  ): Promise<RowTypeToTsType<R>[]>;
  async execute(query: Sql): Promise<any> {
    const result = await (this.#context.getStore()?.execute ?? this.executor.execute.bind(this.executor))(query);
    if (query instanceof QueryBuilder) {
      return deserializeRows(result.rows as { [key: string]: string }[], query.rowType as { [key: string]: unknown });
    }
    if (query instanceof InsertBuilder || query instanceof UpdateBuilder || query instanceof DeleteBuilder) {
      const returning = query.returningRowType;
      if (!returning) {
        return [];
      }
      return deserializeRows(result.rows as { [key: string]: string }[], returning as { [key: string]: unknown });
    }
    return result;
  }

  async transaction<T>(fn: () => Promise<T>): Promise<T> {
    const current = this.#context.getStore();
    if (current?.inTransaction) {
      return fn();
    }

    return this.executor.runInSingleConnection(async (execute: ExecuteFn) => {
      return this.#context.run({ execute, inTransaction: true }, async () => {
        await execute(sql`BEGIN`);
        await execute(sql`SET TRANSACTION ISOLATION LEVEL REPEATABLE READ`);
        try {
          const result = await fn();
          await execute(sql`COMMIT`);
          return result;
        } catch (e) {
          await execute(sql`ROLLBACK`);
          throw e;
        }
      });
    });
  }

  public from<F extends Fromable>(
    fromable: F,
  ): QueryBuilder<{ [K in F["tsAlias"]]: RowTypeOfFromable<F> }, RowTypeOfFromable<F>, []> {
    const rowType = getRowType(fromable) as RowTypeOfFromable<F>;
    const [aliased, tableAlias] = aliasRowType(rowType, fromable.tsAlias) as [RowTypeOfFromable<F>, any];
    return new QueryBuilder({
      namespace: { [fromable.tsAlias]: aliased } as any,
      output: aliased,
      from: { source: fromable as any, tableAlias },
      tsAlias: fromable.tsAlias,
    });
  }

  public values<R extends RowType>(
    vals0: R,
    ...valsRest: (NoInfer<R> | RowTypeToTsType<NoInfer<R>>)[]
  ): QueryBuilder<{ values: R }, R, []> {
    const vals = new Values(vals0, ...valsRest);
    const [aliased, tableAlias] = aliasRowType(vals0, "values") as [R, any];
    return new QueryBuilder<{ values: R }, R, []>({
      namespace: { values: aliased } as { values: R },
      output: aliased,
      from: { source: vals as any, tableAlias },
      tsAlias: "q",
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
        const { data, cursor, preds } = await this.transaction(async () => {
          const cursorResult = await this.execute(sql`SELECT pg_current_snapshot()::text AS s`);
          const cursor = (cursorResult.rows as { s: string }[])[0]!.s;
          const extractorRows = (await this.execute(extractor.sql)).rows as {
            tbl: string;
            col: string;
            value: string;
          }[];
          const preds = extractor.materialize(extractorRows);
          const data = await this.execute(query) as unknown as RowTypeToTsType<O>[];
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

  public Table = <Name extends string>(name: Name) => {
    const obj = {
      [name]: class extends TableBase {
        static tableName = name;
        static tsAlias: Name = name;

        static as<T extends typeof TableBase, A extends string>(
          this: T,
          alias: A,
        ) {
          return class extends (this as any) {
            static tsAlias: A = alias;
          } as unknown as Omit<T, 'tsAlias'> & { new (): InstanceType<T>; tsAlias: A };
        }
      },
    };
    type Obj = typeof obj;
    return obj[name] as NonNullable<Obj[Name]>;
  };
}
