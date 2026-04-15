import type { Executor } from "./executor";
import type { Fromable, RowType, RowTypeToTsType, RowTypeOfFromable } from "./builder/query";
import { aliasRowType, QueryBuilder, getRowType } from "./builder/query";
import { sql } from "./builder/sql";
import { TableBase } from "./table";
import { Values } from "./builder/values";

export class Database {
  constructor(private executor: Executor) {}

  async transaction<T>(fn: (tx: Database) => Promise<T>): Promise<T> {
    await this.executor.execute(sql`BEGIN`);
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
  ): QueryBuilder<{ [K in F["alias"]]: RowTypeOfFromable<F> }, RowTypeOfFromable<F>, []> {
    const rowType = getRowType(fromable) as RowTypeOfFromable<F>;
    const [aliased, tableAlias] = aliasRowType(rowType, fromable.alias) as [RowTypeOfFromable<F>, any];
    return new QueryBuilder({
      namespace: { [fromable.alias]: aliased } as any,
      output: aliased,
      from: { source: fromable as any, tableAlias },
      executor: this.executor,
      alias: fromable.alias,
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
      alias: "q",
    });
  }

  public Table = <Name extends string>(name: Name) => {
    const executor = this.executor;
    const obj = {
      [name]: class extends TableBase {
        static tableName = name;
        static alias: Name = name;
        static executor = executor;

        static as<T extends typeof TableBase, A extends string>(
          this: T,
          alias: A,
        ) {
          return class extends (this as any) {
            static alias: A = alias;
          } as unknown as Omit<T, 'alias'> & { new (): InstanceType<T>; alias: A };
        }

      },
    };
    type Obj = typeof obj;
    return obj[name] as NonNullable<Obj[Name]>;
  };
}
