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

export class Database {
  #context = new AsyncLocalStorage<{ execute: ExecuteFn; inTransaction: boolean }>();

  constructor(private executor: Executor) {}

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
