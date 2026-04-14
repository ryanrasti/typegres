import { sql } from "./builder/sql";
import { Any } from "./types";
import { meta } from "./types/runtime";
import { sortRowColumns, type RowType, type RowTypeToTsType } from "./builder/query";


export class Values<R extends RowType> {
  public alias: string = "values";
  private vals0: R;
  private valsRest: (R | RowTypeToTsType<R>)[];

  constructor(vals0: R, ...valsRest: (R | RowTypeToTsType<R>)[]) {
    this.vals0 = vals0;
    this.valsRest = valsRest;
  }

  compile(isSubquery?: boolean) {
    // Stable column order from the first (typed) row
    const columnNames = Object.keys(sortRowColumns(this.vals0));

    // Compile each row into a VALUES tuple
    const rowSqls = [this.vals0, ...this.valsRest].map((row) => {
      const vals = columnNames.map((k) => {
        let v = (row as Record<string, unknown>)[k];
        if (!(v instanceof Any)) {
          // Primitive — wrap using the type from the first row
          const type = this.vals0[k as keyof R];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type`);
          }
          v = new (type[meta].__class as any)(v);
        }
        return (v as Any<any>).compile();
      });
      return sql`(${sql.join(vals)})`;
    });

    const columns = columnNames.map((k) => sql.ident(k));
    const valuesSql = sql`(VALUES ${sql.join(rowSqls)}) AS ${sql.ident(this.alias)}(${sql.join(columns)})`;

    if (isSubquery) {
      return valuesSql;
    }
    return valuesSql;
  }
}

