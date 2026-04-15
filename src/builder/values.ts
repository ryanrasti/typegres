import { sql } from "./sql";
import type { CompileContext, TableAlias } from "./sql";
import { Any } from "../types";
import { meta } from "../types/runtime";
import { sortRowColumns, type RowType, type RowTypeToTsType } from "./query";

export class Values<R extends RowType> {
  public tsAlias: string = "values";
  private vals0: R;
  private valsRest: (R | RowTypeToTsType<R>)[];

  constructor(vals0: R, ...valsRest: (R | RowTypeToTsType<R>)[]) {
    this.vals0 = vals0;
    this.valsRest = valsRest;
  }

  registerAndCompile(ctx: CompileContext, alias: TableAlias): string {
    const resolved = ctx.register(alias, alias.name);
    const columnNames = Object.keys(sortRowColumns(this.vals0));

    const rowSqls = [this.vals0, ...this.valsRest].map((row) => {
      const vals = columnNames.map((k) => {
        let v = (row as { [key: string]: unknown })[k];
        if (!(v instanceof Any)) {
          const type = this.vals0[k as keyof R];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type`);
          }
          v = (type[meta].__class as typeof Any).from(v);
        }
        return (v as Any<any>).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });

    const columns = columnNames.map((k) => sql.ident(k));
    return sql`(VALUES ${sql.join(rowSqls)}) AS ${sql.ident(resolved)}(${sql.join(columns)})`.emit(ctx);
  }
}
