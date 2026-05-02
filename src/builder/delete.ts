import { Sql, sql, Alias, compile } from "./sql";
import type { BoundSql } from "./sql";
import { Bool } from "../types";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, isRowType, mergeReturning, reAlias } from "./query";
import type { TableBase } from "../table";
import { Database } from "../database";
import { fn, tool } from "../exoeval/tool";
import z from "zod";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  where?: (ns: Namespace<Name, T>) => Bool<any>;
  returning?: (ns: Namespace<Name, T>) => R;
};

// Resolved DELETE — alias minted, where/returning evaluated against the
// bound namespace. Transformers inspect structured fields without
// re-parsing raw Sql.
type FinalizedDeleteOpts<Name extends string, T extends TableBase, R extends RowType> = {
  tableName: Name;
  alias: Alias;
  instance: T;
  where: Bool<any>;
  returning?: R;
};

export class FinalizedDelete<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  readonly opts: FinalizedDeleteOpts<Name, T, R>;

  constructor(opts: FinalizedDeleteOpts<Name, T, R>) {
    super();
    this.opts = opts;
  }

  bind(): BoundSql {
    const { tableName, alias, where, returning } = this.opts;
    const inner = sql.join([
      sql`DELETE FROM ${sql.ident(tableName)} AS ${alias}`,
      sql`WHERE ${where.toSql()}`,
      returning && sql`RETURNING ${compileSelectList(returning)}`,
    ], sql` `);
    return sql.withScope([alias], inner);
  }
}

export class DeleteBuilder<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  #opts: DeleteOpts<Name, T, R>;

  constructor(opts: DeleteOpts<Name, T, R>) {
    super();
    this.#opts = opts;
  }

  get tableName(): Name {
    return this.#opts.instance.constructor.tableName as Name;
  }

  // Multiple where() calls are combined with AND. .where(true) matches all rows.
  @tool(z.union([z.literal(true), fn.returns(z.lazy(() => z.instanceof(Bool)))]))
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): DeleteBuilder<Name, T, R> {
    const wrapped: (ns: Namespace<Name, T>) => Bool<any> =
      fn === true ? () => Bool.from(sql`TRUE`) as Bool<any> : fn;
    return new DeleteBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, wrapped),
    });
  }

  @tool(fn.returns(z.custom<any>((v) => isRowType(v))))
  returning<R2 extends RowType>(fn: (ns: Namespace<Name, T>) => R2): DeleteBuilder<Name, T, R2> {
    return new DeleteBuilder({ ...this.#opts, returning: fn });
  }

  // Merge with whatever was already returned. Throws on key conflict.
  returningMerge<R2 extends RowType>(
    fn: (ns: Namespace<Name, T>) => R2,
  ): DeleteBuilder<Name, T, R & R2> {
    return new DeleteBuilder({
      ...this.#opts,
      returning: mergeReturning(this.#opts.returning, fn),
    }) as DeleteBuilder<Name, T, R & R2>;
  }

  rowType(): R | undefined {
    return this.#opts.returning?.({ [this.tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  finalize(): FinalizedDelete<Name, T, R> {
    if (!this.#opts.where) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    const tableName = this.tableName;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;
    const where = this.#opts.where(ns);
    const returning = this.#opts.returning?.(ns);
    return new FinalizedDelete<Name, T, R>({
      tableName,
      alias,
      instance,
      where,
      ...(returning !== undefined ? { returning } : {}),
    });
  }

  bind(): BoundSql {
    const t = this.#opts.instance.constructor.transformer?.delete;
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
