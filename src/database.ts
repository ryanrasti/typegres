import type { Executor, IsolationLevel } from "./executor";
import type { Fromable, RowType, RowTypeToTsType, RowTypeOfFromable } from "./builder/query";
import { aliasRowType, QueryBuilder, getRowType } from "./builder/query";
import { sql } from "./builder/sql";
import { TableBase } from "./table";
import { Values } from "./builder/values";

export class Database {
  constructor(private executor: Executor) {}

  async transaction<T>(fn: (tx: Database) => Promise<T>): Promise<T>;
  async transaction<T>(isolation: IsolationLevel, fn: (tx: Database) => Promise<T>): Promise<T>;
  async transaction<T>(
    isolationOrFn: IsolationLevel | ((tx: Database) => Promise<T>),
    maybeFn?: (tx: Database) => Promise<T>,
  ): Promise<T> {
    const isolation = typeof isolationOrFn === "function" ? "repeatable read" : isolationOrFn;
    const fn = typeof isolationOrFn === "function" ? isolationOrFn : maybeFn;
    if (!fn) {
      throw new Error("transaction() requires a callback");
    }

    if (this.executor.transaction) {
      return this.executor.transaction(isolation, async () => fn(this));
    }

    await this.executor.execute(sql`BEGIN`);
    await this.executor.execute(sql.raw(`SET TRANSACTION ISOLATION LEVEL ${isolation.toUpperCase()}`));
    try {
      const result = await fn(this);
      await this.executor.execute(sql`COMMIT`);
      return result;
    } catch (e) {
      await this.executor.execute(sql`ROLLBACK`);
      throw e;
    }
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
      executor: this.executor,
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
      executor: this.executor,
      tsAlias: "q",
    });
  }

  public Table = <Name extends string>(name: Name) => {
    const executor = this.executor;
    const obj = {
      [name]: class extends TableBase {
        static tableName = name;
        static tsAlias: Name = name;
        static executor = executor;

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
