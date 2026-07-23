import { Sql, sql, Alias, compile, type CompileContext } from "./sql";
import type { BoundSql } from "./sql";
import { zBool, type Bool } from "../types/bool";
import type { RowType, RowTypeToTsType } from "./query";
import { combinePredicates, compileSelectList, isRowType, mergeReturning, reAlias } from "./query";
import type { TableBase } from "../table";
import { Connection } from "../database";
import { fn, expose } from "../exoeval/tool";
import z from "zod";

type Namespace<Name extends string, T> = { [K in Name]: T };

type DeleteOpts<Name extends string, T extends TableBase, R extends RowType> = {
  instance: T;
  where?: (ns: Namespace<Name, T>) => Bool<any>;
  matchAll?: boolean;
  returning?: (ns: Namespace<Name, T>) => R;
};

// Resolved DELETE — alias minted, where/returning evaluated against the
// bound namespace. Consumers (live capture) inspect structured fields
// without re-parsing raw Sql.
type FinalizedDeleteOpts<Name extends string, T extends TableBase, R extends RowType> = {
  tableName: Name;
  alias: Alias;
  instance: T;
  where: Bool<any> | undefined;
  matchAll: boolean;
  returning?: R;
};

export class FinalizedDelete<Name extends string, T extends TableBase, R extends RowType = {}> extends Sql {
  readonly opts: FinalizedDeleteOpts<Name, T, R>;

  constructor(opts: FinalizedDeleteOpts<Name, T, R>) {
    super();
    this.opts = opts;
  }

  bind(): BoundSql {
    const { tableName, alias, where, returning, instance } = this.opts;
    const tableCls = instance.constructor;
    // See UpdateBuilder for the matchAll semantics: a real predicate
    // always takes precedence over the matchAll flag.
    const inner = sql.join([
      sql`DELETE FROM ${tableCls.ident(tableName)} AS ${alias}`,
      where && sql`WHERE ${where.toSql()}`,
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

  // The target table class — finalize-free access to its statics
  // (tableName, database, live).
  get table() {
    return this.#opts.instance.constructor;
  }

  // Multiple where() calls are combined with AND. .where(true) matches all rows —
  // stored as a matchAll flag; bind() emits no WHERE clause.
  @expose(z.union([z.literal(true), fn.returns(zBool)]))
  where(fn: ((ns: Namespace<Name, T>) => Bool<any>) | true): DeleteBuilder<Name, T, R> {
    if (fn === true) {
      return new DeleteBuilder({ ...this.#opts, matchAll: true });
    }
    return new DeleteBuilder({
      ...this.#opts,
      where: combinePredicates(this.#opts.where, fn),
    });
  }

  @expose(fn.returns(z.custom<any>((v) => isRowType(v))))
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
    return this.#opts.returning?.({ [this.table.tableName]: this.#opts.instance } as Namespace<Name, T>);
  }

  finalize(): FinalizedDelete<Name, T, R> {
    if (!this.#opts.where && !this.#opts.matchAll) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    const tableName = this.table.tableName as Name;
    const alias = new Alias(tableName);
    const instance = reAlias(this.#opts.instance as RowType, alias) as T;
    const ns = { [tableName]: instance } as Namespace<Name, T>;
    const where = this.#opts.where?.(ns);
    const returning = this.#opts.returning?.(ns);
    return new FinalizedDelete<Name, T, R>({
      tableName,
      alias,
      instance,
      where,
      matchAll: !!this.#opts.matchAll,
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
