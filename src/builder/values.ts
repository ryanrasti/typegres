import { sql, Sql, BoundSql, Alias } from "./sql";
import { Any } from "../types";
import { meta } from "../types/runtime";
import { type RowType, type RowTypeToTsType, type Fromable } from "./query";

export class Values<R extends RowType> extends Sql implements Fromable<R> {
  readonly tsAlias = "values";
  // VALUES emits `AS q(col1, col2, ...)` — column names go into the AS clause.
  readonly emitColumnNamesWithAlias = true;
  private vals0: R;
  private valsRest: (R | RowTypeToTsType<R>)[];

  constructor(vals0: R, ...valsRest: (R | RowTypeToTsType<R>)[]) {
    super();
    this.vals0 = vals0;
    this.valsRest = valsRest;
  }

  // Mint a fresh ghost alias per call — QB's reAlias replaces it.
  rowType(): R {
    const alias = new Alias(this.tsAlias);
    return Object.fromEntries(
      Object.entries(this.vals0 as { [k: string]: unknown }).map(([k, v]) => {
        if (!(v instanceof Any)) {
          throw new Error(
            `db.values({ ${k}: ... }) — values column '${k}' must be a typed pg expression (e.g. Int4.from(5)), got ${typeof v}.`,
          );
        }
        return [k, (v[meta].__class as typeof Any).from(sql.column(alias, k))];
      }),
    ) as R;
  }

  // Return the pre-AS VALUES fragment. QB appends `AS q(col1, col2, ...)`.
  bind(): BoundSql {
    const columnNames = Object.keys(this.vals0);
    const rowSqls = [this.vals0, ...this.valsRest].map((row) => {
      const vals = columnNames.map((k) => {
        let v = (row as { [key: string]: unknown })[k];
        if (!(v instanceof Any)) {
          const type = this.vals0[k as keyof R];
          if (!(type instanceof Any)) {
            throw new Error(
              `db.values(): column '${k}' in the first row must be a typed pg expression so subsequent rows can coerce against it.`,
            );
          }
          v = (type[meta].__class as typeof Any).from(v);
        }
        return (v as Any<any>).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });
    return sql`(VALUES ${sql.join(rowSqls)})`;
  }
}
