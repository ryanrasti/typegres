import { Sql, sql, Alias, compile, type CompileContext } from "./sql";
import type { BoundSql } from "./sql";
import type { RowType, RowTypeToTsType } from "./query";
import { compileSelectList, isRowType, mergeReturning, reAlias } from "./query";
import type { TableBase } from "../table";
import { Connection } from "../database";
import { getColumn, SqlValue } from "../types/sql-value";
import { meta } from "../types/sql-value";
import { fn, expose } from "../exoeval/tool";
import z from "zod";

type Namespace<Name extends string, T> = { [K in Name]: T };

type InsertOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  columnNames: string[];
  rows: [{ [key: string]: unknown }, ...{ [key: string]: unknown }[]];
  returning?: (ns: Namespace<Name, T>) => R;
};

type FinalizedInsertOpts<Name extends string, T extends TableBase, R extends RowType> = {
  tableName: Name;
  alias: Alias;
  instance: T;
  columnNames: string[];
  rows: [{ [key: string]: unknown }, ...{ [key: string]: unknown }[]];
  returning?: R;
};

export class FinalizedInsert<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  readonly opts: FinalizedInsertOpts<Name, T, R>;

  constructor(opts: FinalizedInsertOpts<Name, T, R>) {
    super();
    this.opts = opts;
  }

  bind(): BoundSql {
    const { tableName, alias, columnNames, rows, returning, instance } = this.opts;
    const tableCls = instance.constructor;
    // Columns no row provides are omitted from the column list entirely,
    // so the DB applies its own semantics (identity/rowid autoincrement,
    // declared DEFAULTs, NULL) — what a hand-written INSERT would do.
    // `column()` keeps no runtime opts, so this is also the only way to
    // defer to per-column defaults without knowing them.
    const usedColumns = columnNames.filter((k) => rows.some((row) => row[k] !== undefined));
    const rowSqls = rows.map((row) => {
      const vals = usedColumns.map((k) => {
        const v = row[k];
        if (v === undefined) {
          // Some other row provides this column, this one doesn't.
          // Only PG is known to spell that `DEFAULT`; for any other
          // dialect (SQLite has no per-row spelling for it), silently
          // inserting NULL would diverge from what omitting the column
          // means (rowid auto-fill, declared DEFAULT) — make the
          // caller decide.
          if (tableCls.database.dialect === "postgres") {
            return sql`DEFAULT`;
          }
          throw new Error(
            `Insert into '${tableName}': column '${k}' is set in some rows but not others. ` +
            `The '${tableCls.database.dialect}' dialect cannot express "use the column default" per row — ` +
            `provide '${k}' in every row or in none.`,
          );
        }
        if (v instanceof SqlValue) {
          // Already a typegres expression (e.g. a hydrated column from
          // another row) — embed it directly, don't re-wrap as a param.
          return v.toSql();
        }
        const col = getColumn(instance, k);
        return col[meta].__class.from(v).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });
    // Zero provided columns can't be spelled `(cols) VALUES (...)`;
    // both dialects use `DEFAULT VALUES`, which is single-row only.
    let body: Sql;
    if (usedColumns.length === 0) {
      if (rows.length > 1) {
        throw new Error(
          `Insert into '${tableName}': multi-row insert with no columns provided. ` +
          `Use one .insert({}) call per row for all-default rows.`,
        );
      }
      body = sql`DEFAULT VALUES`;
    } else {
      const columns = usedColumns.map((k) => tableCls.database.scopedIdent(k));
      body = sql`(${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`;
    }
    const inner = sql.join([
      sql`INSERT INTO ${tableCls.ident(tableName)} AS ${alias} ${body}`,
      returning && sql`RETURNING ${compileSelectList(returning)}`,
    ], sql` `);
    return sql.withScope([alias], inner);
  }
}

export class InsertBuilder<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  #opts: InsertOpts<Name, T, R>;

  constructor(opts: InsertOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  // The target table class — finalize-free access to its statics
  // (tableName, database, live).
  get table() {
    return this.#opts.instance.constructor;
  }

  @expose(fn.returns(z.custom<any>((v) => isRowType(v))))
  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): InsertBuilder<Name, T, R2> {
    return new InsertBuilder({ ...this.#opts, returning: fn });
  }

  // Like .returning() but merges with whatever was already there. Throws
  // on key conflict.
  returningMerge<R2 extends RowType>(
    fn: (ns: Namespace<Name, T>) => R2,
  ): InsertBuilder<Name, T, R & R2> {
    return new InsertBuilder({
      ...this.#opts,
      returning: mergeReturning(this.#opts.returning, fn),
    }) as InsertBuilder<Name, T, R & R2>;
  }

  // Shape of RETURNING rows, for deserialization. The Any instances in
  // the output carry sql.unbound() as their SQL — harmless since rowType
  // is never compiled, only its [meta].__class is read for deserialize.
  rowType(): R | undefined {
    return this.#opts.returning?.({ [this.table.tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  finalize(): FinalizedInsert<Name, T, R> {
    const tableName = this.table.tableName as Name;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;
    const returning = this.#opts.returning?.(ns);
    return new FinalizedInsert<Name, T, R>({
      tableName,
      alias,
      instance,
      columnNames: this.#opts.columnNames,
      rows: this.#opts.rows,
      ...(returning !== undefined ? { returning } : {}),
    });
  }

  bind(ctx: CompileContext): BoundSql {
    // Widen to Sql so ctx forwards: the Finalized* form declares zero-arg
    // bind() today, but dispatching through the base signature keeps ctx
    // flowing if it ever starts accepting one.
    return (this.finalize() as Sql).bind(ctx);
  }

  override children() {
    return [this.finalize()];
  }

  @expose(z.lazy(() => z.instanceof(Connection)).optional())
  override async execute(conn?: Connection<any>): Promise<RowTypeToTsType<R>[]> {
    return (conn ?? this.table.database.defaultConnection).execute(this);
  }

  @expose(z.lazy(() => z.instanceof(Connection)).optional())
  async hydrate(conn?: Connection<any>): Promise<R[]> {
    return (conn ?? this.table.database.defaultConnection).hydrate<any, any, R>(this);
  }

  @expose()
  debug(): this {
    const compiled = compile(this, { database: this.table.database });
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}
