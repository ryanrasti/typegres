import { Executor } from "./executor";
import { aliasRowType, QueryBuilder, RowType, RowTypeToTsType } from "./builder/query";
import { TableBase } from "./table";
import { Values } from "./values";

export class Database {
  constructor(private executor: Executor) {}

  public values<R extends RowType>(
    vals0: R,
    ...valsRest: (NoInfer<R> | RowTypeToTsType<NoInfer<R>>)[]
  ): QueryBuilder<{ values: R }, R, []> {
    const vals = new Values(vals0, ...valsRest);
    const aliased = aliasRowType(vals0, "values") as R;
    return new QueryBuilder<{ values: R }, R, []>({
      namespace: { values: aliased } as { values: R },
      output: aliased,
      from: vals as any,
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
