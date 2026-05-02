import { Sql, sql, Alias, compile } from "./sql";
import type { BoundSql } from "./sql";
import type { RowType, RowTypeToTsType } from "./query";
import { compileSelectList, isRowType, mergeReturning, reAlias } from "./query";
import type { TableBase } from "../table";
import { Database } from "../database";
import { getColumn } from "../types/overrides/any";
import { meta } from "../types/runtime";
import { fn, tool } from "../exoeval/tool";
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
    const columns = columnNames.map((k) => sql.ident(k));
    const rowSqls = rows.map((row) => {
      const vals = columnNames.map((k) => {
        const v = row[k];
        if (v === undefined) { return sql`DEFAULT`; }
        const col = getColumn(instance, k);
        return col[meta].__class.from(v).toSql();
      });
      return sql`(${sql.join(vals)})`;
    });
    const inner = sql.join([
      sql`INSERT INTO ${sql.ident(tableName)} AS ${alias} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`,
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

  get tableName(): Name {
    return this.#opts.instance.constructor.tableName as Name;
  }

  @tool(fn.returns(z.custom<any>((v) => isRowType(v))))
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
    return this.#opts.returning?.({ [this.tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  finalize(): FinalizedInsert<Name, T, R> {
    const tableName = this.tableName;
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

  bind(): BoundSql {
    const t = this.#opts.instance.constructor.transformer?.insert;
    return (t ? t(this) : this.finalize()).bind();
  }

  override children() {
    return [this.finalize()];
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  override async execute(db: Database): Promise<RowTypeToTsType<R>[]> {
    return db.execute(this);
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  async hydrate(db: Database): Promise<R[]> {
    return db.hydrate<any, any, R>(this);
  }

  @tool()
  debug(): this {
    const compiled = compile(this, "pg");
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}
