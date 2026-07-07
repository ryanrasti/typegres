import { Sql, sql, Alias, compile, type CompileContext } from "./sql";
import type { BoundSql } from "./sql";
import { zBool, type Bool as Bool } from "../types/bool";
import type { SetRow } from "../types/runtime";
import { isSetRow } from "../types/runtime";
import { meta } from "../types/sql-value";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, isRowType, mergeReturning, reAlias } from "./query";
import type { TableBase } from "../table";
import { Connection } from "../database";
import { SqlValue, getColumn } from "../types/sql-value";
import { fn, expose } from "../exoeval/tool";
import z from "zod";

type Namespace<Name extends string, T> = { [K in Name]: T };

type UpdateOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  where?: (ns: Namespace<Name, T>) => Bool<any>;
  // Explicit opt-in for "match every row" — set by `.where(true)`.
  // Separate from `where` so bind() can emit no WHERE clause (rather than
  // constructing a dialect-specific `TRUE` Bool).
  matchAll?: boolean;
  set?: (ns: Namespace<Name, T>) => SetRow<T>;
  returning?: (ns: Namespace<Name, T>) => R;
};

type FinalizedUpdateOpts<Name extends string, T extends TableBase, R extends RowType> = {
  tableName: Name;
  alias: Alias;
  // Re-aliased instance — used to evaluate where/set/returning callbacks
  // and for getColumn() lookups when coercing SET values.
  instance: T;
  // undefined + matchAll=true → no WHERE emitted (delete/update all).
  where: Bool<any> | undefined;
  matchAll: boolean;
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
    const tableCls = instance.constructor;
    // If a predicate exists, honor it even when `.where(true)` was also
    // called — matchAll is just the "unrestricted delete/update
    // acknowledged" flag; a real predicate is still a no-op-safe filter.
    // Only when no predicate exists does matchAll produce the
    // "no WHERE clause" form.
    const inner = sql.join([
      sql`UPDATE ${tableCls.ident(tableName)} AS ${alias} SET ${sql.join(compileSetClauses(instance, setRow))}`,
      where && sql`WHERE ${where.toSql()}`,
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
    const ident = instance.constructor.database.scopedIdent(k);
    if (v instanceof SqlValue) {
      return sql`${ident} = ${v.toSql()}`;
    }
    const col = getColumn(instance, k);
    return sql`${ident} = ${col[meta].__class.from(v).toSql()}`;
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

  get database() {
    return this.#opts.instance.constructor.database;
  }

  // Multiple where() calls are combined with AND. .where(true) matches all rows
  // — sets a flag rather than constructing a dialect-specific `TRUE` predicate,
  // so the bind() step emits no WHERE clause on either PG or SQLite.
  @expose(z.union([z.literal(true), fn.returns(zBool)]))
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): UpdateBuilder<Name, T, R> {
    if (fn === true) {
      return new UpdateBuilder({ ...this.#opts, matchAll: true });
    }
    return new UpdateBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, fn),
    });
  }

  @expose(fn.returns(z.custom<any>((v) => isSetRow(v))))
  set(fn: (ns: Namespace<Name, T>) => SetRow<T>): UpdateBuilder<Name, T, R> {
    return new UpdateBuilder({ ...this.#opts, set: fn });
  }

  @expose(fn.returns(z.custom<any>((v) => isRowType(v))))
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
    if (!this.#opts.where && !this.#opts.matchAll) {
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
    const where = this.#opts.where?.(ns);
    const returning = this.#opts.returning?.(ns);
    return new FinalizedUpdate<Name, T, R>({
      tableName,
      alias,
      instance,
      where,
      matchAll: !!this.#opts.matchAll,
      setRow,
      ...(returning !== undefined ? { returning } : {}),
    });
  }

  bind(ctx: CompileContext): BoundSql {
    const t = this.#opts.instance.constructor.transformer?.update;
    return (t ? t(this) : this.finalize()).bind(ctx);
  }

  override children() {
    return [this.finalize()];
  }

  @expose(z.lazy(() => z.instanceof(Connection)))
  override async execute(conn: Connection<any>): Promise<RowTypeToTsType<R>[]> {
    return conn.execute(this);
  }

  @expose(z.lazy(() => z.instanceof(Connection)))
  async hydrate(conn: Connection<any>): Promise<R[]> {
    return conn.hydrate<any, any, R>(this);
  }

  @expose()
  debug(): this {
    const compiled = compile(this, { database: this.database });
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}
