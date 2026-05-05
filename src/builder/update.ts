import { Sql, sql, Alias, compile } from "./sql";
import type { BoundSql } from "./sql";
import { Bool } from "../types";
import type { SetRow } from "../types/runtime";
import { isSetRow } from "../types/runtime";
import { meta } from "../types/runtime";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, isRowType, mergeReturning, reAlias } from "./query";
import type { TableBase } from "../table";
import { Database } from "../database";
import { Any, getColumn } from "../types/overrides/any";
import { fn, tool } from "../exoeval/tool";
import z from "zod";

type Namespace<Name extends string, T> = { [K in Name]: T };

type UpdateOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  where?: (ns: Namespace<Name, T>) => Bool<any>;
  set?: (ns: Namespace<Name, T>) => SetRow<T>;
  returning?: (ns: Namespace<Name, T>) => R;
};

type FinalizedUpdateOpts<Name extends string, T extends TableBase, R extends RowType> = {
  tableName: Name;
  alias: Alias;
  // Re-aliased instance — used to evaluate where/set/returning callbacks
  // and for getColumn() lookups when coercing SET values.
  instance: T;
  where: Bool<any>;
  setRow: SetRow<T>;
  returning?: R;
};

export class FinalizedUpdate<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  readonly opts: FinalizedUpdateOpts<Name, T, R>;

  constructor(opts: FinalizedUpdateOpts<Name, T, R>) {
    super();
    this.opts = opts;
  }

  bind(): BoundSql {
    const { tableName, alias, where, setRow, returning, instance } = this.opts;
    const inner = sql.join([
      sql`UPDATE ${sql.ident(tableName)} AS ${alias} SET ${sql.join(compileSetClauses(instance, setRow))}`,
      sql`WHERE ${where.toSql()}`,
      returning && sql`RETURNING ${compileSelectList(returning)}`,
    ], sql` `);
    return sql.withScope([alias], inner);
  }
}

// Compile a SET row into `col = value, …` SQL fragments by coercing each
// value through the column's typegres class.
export const compileSetClauses = <T extends TableBase>(
  instance: T,
  setRow: SetRow<T>,
): Sql[] =>
  Object.entries(setRow as { [key: string]: unknown }).map(([k, v]) => {
    if (v instanceof Any) {
      return sql`${sql.ident(k)} = ${v.toSql()}`;
    }
    const col = getColumn(instance, k);
    return sql`${sql.ident(k)} = ${col[meta].__class.from(v).toSql()}`;
  });

export class UpdateBuilder<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  #opts: UpdateOpts<Name, T, R>;

  constructor(opts: UpdateOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  get tableName(): Name {
    return this.#opts.instance.constructor.tableName as Name;
  }

  // Multiple where() calls are combined with AND. .where(true) matches all rows.
  @tool(z.union([z.literal(true), fn.returns(z.lazy(() => z.instanceof(Bool)))]))
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): UpdateBuilder<Name, T, R> {
    const wrapped: (ns: Namespace<Name, T>) => Bool<any> =
      fn === true ? () => Bool.from(sql`TRUE`) as Bool<any> : fn;
    return new UpdateBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, wrapped),
    });
  }

  @tool(fn.returns(z.custom<any>((v) => isSetRow(v))))
  set(fn: (ns: Namespace<Name, T>) => SetRow<T>): UpdateBuilder<Name, T, R> {
    return new UpdateBuilder({ ...this.#opts, set: fn });
  }

  @tool(fn.returns(z.custom<any>((v) => isRowType(v))))
  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): UpdateBuilder<Name, T, R2> {
    return new UpdateBuilder({ ...this.#opts, returning: fn });
  }

  // Merge with whatever was already returned. Throws on key conflict.
  // Used by mutation transformers to add bookkeeping columns without
  // silently shadowing user columns.
  returningMerge<R2 extends RowType>(
    fn: (ns: Namespace<Name, T>) => R2,
  ): UpdateBuilder<Name, T, R & R2> {
    return new UpdateBuilder({
      ...this.#opts,
      returning: mergeReturning(this.#opts.returning, fn),
    }) as UpdateBuilder<Name, T, R & R2>;
  }

  rowType(): R | undefined {
    return this.#opts.returning?.({ [this.tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  finalize(): FinalizedUpdate<Name, T, R> {
    if (!this.#opts.where) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#opts.set) {
      throw new Error("update() requires .set()");
    }
    const tableName = this.tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;
    const setRow = this.#opts.set(ns);
    const where = this.#opts.where(ns);
    const returning = this.#opts.returning?.(ns);
    return new FinalizedUpdate<Name, T, R>({
      tableName,
      alias,
      instance,
      where,
      setRow,
      ...(returning !== undefined ? { returning } : {}),
    });
  }

  bind(): BoundSql {
    const t = this.#opts.instance.constructor.transformer?.update;
    return (t ? t(this) : this.finalize()).bind();
  }

  override children() {
    return [this.finalize()];
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  override async execute(db: Database<any>): Promise<RowTypeToTsType<R>[]> {
    return db.execute(this);
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  async hydrate(db: Database<any>): Promise<R[]> {
    return db.hydrate<any, any, R>(this);
  }

  @tool()
  debug(): this {
    const compiled = compile(this, "pg");
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}
