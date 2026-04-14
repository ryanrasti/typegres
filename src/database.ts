import { Executor } from "./executor";
import { aliasRowType, QueryBuilder, RowType, RowTypeToTsType } from "./query-builder";
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
      from: vals,
      executor: this.executor,
      alias: "q",
    });
  }

  public Table = <Name extends string>(name: Name): typeof TableBase => {
    const executor = this.executor;
    const obj = {
      [name]: class extends TableBase {
        static tableName = name;
        static alias = name;
        static executor = executor;
      },
    };
    return obj[name];
  };
}
