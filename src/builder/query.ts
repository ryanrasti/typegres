import type { BoundSql, CompileContext } from "./sql";
import type { Database } from "../database";
import { sql, Sql, Alias, Ident, compile } from "./sql";
import { Connection } from "../database";
// Anyarray / Record stay pinned to PG — scalar() below emits ROW() /
// array_agg / COALESCE which are PG-specific. When the Scalar AST node
// dispatches per-dialect (Phase 2.1) these will be gated by ctx.dialect.
import { Anyarray, Record } from "../types/postgres";
// Dialect-agnostic base for shape/predicate/instanceof checks — accepts
// PG's Any or SQLite's Any uniformly.
import { SqlValue } from "../types/sql-value";
import { zBool, type Bool } from "../types/bool";
import { type TsTypeOf, type Nullable, type AggregateRow } from "../types/runtime";
import { meta } from "../types/sql-value";
import { fn, expose, copyToolFields } from "../exoeval/tool";
import { isTableClass, TableBase } from "../table";
import z from "zod";
import { Values } from "./values";

// Compile a row type into a SQL select list: col AS "name", ...
export const compileSelectList = (output: RowType, omitAliases = false): Sql => {
  return sql.join(
    Object.entries(output).flatMap(([k, v]) =>
      v instanceof SqlValue ? [
        omitAliases ? v.toSql() :
        sql`${v.toSql()} as ${new Ident(k)}`] : [],
    ),
  );
};

export const reAlias = <R extends RowType>(row: R, alias: Alias): R => {
  // Preserve the prototype so Table-subclass methods, instanceof checks,
  // and isRowType all behave the same as on the source. Copy every own
  // descriptor — including symbol-keyed ones like toolFieldsSymbol —
  // generically, replacing typed columns with an alias-qualified
  // reference along the way.
  const out = Object.create(Object.getPrototypeOf(row));
  for (const key of Reflect.ownKeys(row)) {
    const desc = Object.getOwnPropertyDescriptor(row, key)!;
    if (desc.value instanceof SqlValue) {
      Object.defineProperty(out, key, {
        ...desc,
        // Untagged: the column-name Ident inside Column(alias, name)
        // is resolved through the alias's scope binding — the alias is
        // what carries the schema provenance (its Fromable's tagged
        // Idents got emitted at the FROM clause).
        value: desc.value[meta].__class.from(sql.column(alias, new Ident(key as string))),
      });
    } else {
      Object.defineProperty(out, key, desc);
    }
  }
  return out;
};

// Hydrate raw rows into typed instances that share the shape's prototype.
// Each column field is a SqlValue wrapping a CAST(param) of the
// deserialized value — so methods on the class that reference `this.col`
// can compose into follow-up queries (operator methods accept SqlValue
// via match()).
//
// This is the materializing counterpart to deserializeRows: instead of
// plain JS primitives, you get class instances with callable methods.
export const hydrateRows = <R>(
  rows: { [key: string]: string }[],
  shape: { [key: string]: unknown },
): R[] => {
  // TODO: unify the "build a table instance + populate columns" dance with
  // the one `reAlias` does — both rebuild a row's prototype + fields, just
  // with different per-field values.
  const proto = Object.getPrototypeOf(shape);
  return rows.map((row) => {
    const instance = Object.create(proto);
    // Decorator-registered @expose field markers are own symbol properties,
    // which Object.create(proto) drops — carry them over so the @expose
    // contract keeps working on hydrated rows.
    copyToolFields(shape, instance);
    for (const [k, raw] of Object.entries(row)) {
      const col = shape[k];
      let value: unknown;
      if (col instanceof SqlValue) {
        const deserialized =
          raw === null || raw === undefined ? null : col.deserialize(String(raw));
        value = col[meta].__class.from(deserialized);
      } else {
        value = raw;
      }
      Object.defineProperty(instance, k, { value, enumerable: true });
    }
    return instance;
  }) as R[];
};

// Mapping of row name to type (class instance)
export type RowType = TableBase | { [k: string]: SqlValue<any> };
export const isRowType = (obj: unknown): obj is RowType => {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  if (obj instanceof TableBase) {
    return true;
  }
  const proto = Object.getPrototypeOf(obj);
  if (proto !== Object.prototype && proto !== null) {
    return false;
  }
  return Object.entries(obj).every(([_, v]) => v instanceof SqlValue);
};

// All of the row types in the current namespace
type Namespace = {
  [k: string]: RowType;
};

// Map each row field to its deserialized JS type. Non-Any fields
// (methods, derived-column functions, user-written instance methods)
// resolve to `never` via TsTypeOf, so calling them is a TS error
// even if the key is structurally present.
//
// We don't use an `as` remap to drop non-Any keys outright — that
// breaks TS's variance reasoning across generic intersections like
// `RowTypeToTsType<R & R2>` ↔ `RowTypeToTsType<R2>` (used by
// returningMerge and similar mutation chains). Trade-off: row type
// has the method keys with `never` values rather than no keys.
export type RowTypeToTsType<R extends RowType> = {
  [K in keyof R]: TsTypeOf<R[K]>;
};

type RowTypeToNullable<R extends RowType> = {
  [k in keyof R]: Nullable<R[k]>;
};

export const sortRowColumns = <R extends RowType>(row: R): R => {
  return Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))) as R;
};

// A Fromable has a tsAlias string, can produce its rowType, and knows how
// to bind itself into a Sql fragment usable in a FROM clause. rowType() is
// a method so generic return types thread correctly — `Users.rowType()`
// returns the subclass instance type, which a static getter can't express.
//
// Two shapes satisfy this structurally:
//   - Table *classes* via statics (`Users.tsAlias`, `Users.rowType()`, `Users.bind()`)
//   - Instance-based sources (Values, Srf, QB subqueries) via instance
//     fields/methods of the same names.
export type Fromable<R extends RowType = RowType, A extends string = string> = {
  readonly tsAlias: A;
  rowType(): R;
  // Fromables may optionally consume the compile ctx (Srf uses it to
  // check dialect + tag its function-name Ident); Table.bind() ignores
  // it, and TS allows the wider-parameter signature to satisfy the
  // narrower typedef.
  bind(ctx?: CompileContext): BoundSql;
  emitColumnNamesWithAlias?: boolean; // default false; if true, emit column names in FROM clause (e.g. VALUES)
};

const isFromable = (obj: unknown): obj is Fromable => {
  // We enumerate the actualy implemetors for validation purposes:
  return (
    obj instanceof Values ||
    obj instanceof QueryBuilder ||
    isTableClass(obj)
  );
};

// The concrete Bool has `.and()`; the shared marker interface does not
// (see src/types/bool.ts — omitted for variance reasons). Cast through
// `any` for chaining; the runtime call succeeds on the concrete class.
type Chainable = { and(other: Bool<any>): Bool<any> };
export const combinePredicates = <N extends Namespace>(
  left: ((ns: N) => Bool<any>) | undefined,
  right: (ns: N) => Bool<any>,
) => {
  if (!left) {
    return right;
  }
  return (ns: N) => (left(ns) as unknown as Chainable).and(right(ns));
};

// Bool-valued predicate combine (used by UPDATE/DELETE where the predicate
// has already been evaluated against the single-table namespace).
export const combineBoolPredicates = (left: Bool<any> | undefined, right: Bool<any>): Bool<any> =>
  left ? (left as unknown as Chainable).and(right) : right;

// Compose two RETURNING callbacks into one that returns their merged
// shape. Throws on key conflict — used by mutation builders' returningMerge
// to safely add bookkeeping columns without silently shadowing the user's.
export const mergeReturning = <N extends Namespace, A extends RowType, B extends RowType>(
  prev: ((ns: N) => A) | undefined,
  next: (ns: N) => B,
): ((ns: N) => A & B) => {
  if (!prev) { return next as (ns: N) => A & B; }
  return (ns: N) => {
    const a = prev(ns);
    const b = next(ns);
    for (const k of Object.keys(b)) {
      if (k in a) {
        throw new Error(
          `returningMerge: key conflict on '${k}' — already present in prior RETURNING`,
        );
      }
    }
    return { ...a, ...b };
  };
};

type OrderDirection = "asc" | "desc";
type OrderByEntry = SqlValue<any> | [SqlValue<any>, OrderDirection];
const isOrderByEntry = (obj: unknown): obj is OrderByEntry =>
  obj instanceof SqlValue ||
  (Array.isArray(obj) &&
    obj.length === 2 &&
    obj[0] instanceof SqlValue &&
    (obj[1] === "asc" || obj[1] === "desc"));

type Cardinality = "one" | "maybe" | "many";
const ZCardinality = z.union([z.literal("one"), z.literal("maybe"), z.literal("many")]);

export type QueryBuilderOptions<N extends Namespace, O extends RowType, GB extends SqlValue<any>[]> = {
  // Provenance handle — the Database this query is scoped to. Threaded
  // from `Table.from` / `db.from` / `db.values` at construction and
  // spread through every chained builder. Used at compile-entry
  // (debug/execute) to synthesize the outer ctx.
  database: Database;
  // Preferred name only. The QueryBuilder ctor creates its own fresh Alias
  // identity from this string, so every builder instance in a chain — and
  // each reuse — registers independently.
  tsAlias: string;
  select?: (ns: N) => O;
  where?: (ns: N) => Bool<any>;
  groupBy?: (ns: N) => GB;
  having?: (ns: N) => Bool<any>;
  orderBy?: (ns: N) => OrderByEntry[];
  tables: [
    { type: "from"; source: Fromable },
    ...{
      source: Fromable;
      on: (ns: N) => Bool<any>;
      type: "join" | "leftJoin";
    }[],
  ];
  limit?: number;
  offset?: number;
};

export class QueryBuilder<
  N extends Namespace,
  O extends RowType,
  GB extends SqlValue<any>[],
  Card extends Cardinality = "many",
> extends Sql {
  public readonly opts: QueryBuilderOptions<N, O, GB>;
  private card: Card;

  get tsAlias(): string {
    return this.opts.tsAlias;
  }

  constructor(opts: QueryBuilderOptions<N, O, GB>, card?: Card) {
    super();
    this.opts = opts;
    this.card = (card ?? "many") as Card;
  }

  // Subsequent `select` calls replace the output type (columns must be redefined).
  @expose(fn.returns(z.custom<any>(isRowType)))
  select<O2 extends RowType>(select: (n: N) => O2): QueryBuilder<N, O2, GB, Card> {
    return new QueryBuilder({ ...this.opts, select: select }, this.card);
  }

  // Multiple `where` calls are combined with AND
  @expose(fn.returns(zBool))
  where(where: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      where: combinePredicates(this.opts.where, where),
    });
  }

  #assertNotInNamespace(alias: string) {
    for (const table of this.opts.tables) {
      if (table.source.tsAlias === alias) {
        throw new Error(
          `Alias '${alias}' is already used in the query. ` +
            `Each table source must have a unique alias, and it cannot be reused in the namespace.`,
        );
      }
    }
  }

  // First overload: table *class* passed directly (e.g. `.join(Owners, ...)`).
  // TableBase's statics (`rowType()`, `bind()`) use a `this:`-generic return,
  // which doesn't narrow under structural Fromable matching — so without this
  // overload, R widens to `TableBase` and column access on the namespace fails.
  // By destructuring the constructor to `InstanceType<T>` directly, we capture
  // the concrete subclass type (`Owners`, `Pets`, …).
  join<T extends typeof TableBase>(
    from: T,
    on: (ns: N & { [K in T["tsAlias"]]: InstanceType<T> }) => Bool<any>,
  ): QueryBuilder<N & { [K in T["tsAlias"]]: InstanceType<T> }, O, GB>;
  join<R extends RowType, A extends string>(
    from: Fromable<R, A>,
    on: (ns: N & { [k in A]: R }) => Bool<any>,
  ): QueryBuilder<N & { [k in A]: R }, O, GB>;
  @expose(z.custom<any>(isFromable), fn.returns(zBool))
  join(from: Fromable, on: (ns: any) => Bool<any>): any {
    this.#assertNotInNamespace(from.tsAlias);
    return new QueryBuilder({
      ...this.opts,
      tables: [...this.opts.tables, { source: from, on, type: "join" }],
    });
  }

  leftJoin<T extends typeof TableBase>(
    from: T,
    on: (ns: N & { [K in T["tsAlias"]]: RowTypeToNullable<InstanceType<T>> }) => Bool<any>,
  ): QueryBuilder<N & { [K in T["tsAlias"]]: RowTypeToNullable<InstanceType<T>> }, O, GB>;
  leftJoin<R extends RowType, A extends string>(
    from: Fromable<R, A>,
    onFn: (ns: N & { [k in A]: RowTypeToNullable<R> }) => Bool<any>,
  ): QueryBuilder<N & { [k in A]: RowTypeToNullable<R> }, O, GB>;
  @expose(z.custom<Fromable>(isFromable), fn.returns(zBool))
  leftJoin(from: Fromable, onFn: (ns: any) => Bool<any>): any {
    this.#assertNotInNamespace(from.tsAlias);
    return new QueryBuilder({
      ...this.opts,
      tables: [...this.opts.tables, { source: from, on: onFn, type: "leftJoin" }],
    });
  }

  // After groupBy, table columns in the namespace become aggregate types (N=number).
  // Grouped columns are accessible by index with their original types.
  // Output is reset to {} — must call select() after groupBy to define output columns.
  // No args = whole-table aggregate (no GROUP BY clause emitted).
  // Multiple groupBy calls are concatenated (GROUP BY a, b, c).
  groupBy(): QueryBuilder<{ [K in keyof N]: AggregateRow<N[K]> }, {}, GB, Card>;
  groupBy<G extends SqlValue<any>[]>(
    groupBy: (n: N) => [...G],
  ): QueryBuilder<{ [K in keyof N]: AggregateRow<N[K]> } & G, {}, [...GB, ...G], Card>;
  @expose(fn.returns(z.array(z.lazy(() => z.instanceof(SqlValue)))).optional())
  groupBy(groupBy?: (n: N) => SqlValue<any>[]): any {
    const { select: _, ...opts } = this.opts;
    if (!groupBy) {
      // Whole-table aggregate: clear output, don't modify groupBy
      return new QueryBuilder(opts, this.card);
    }

    const prev = this.opts.groupBy;
    const mergedGroupBy = (ns: N) =>
      [...(prev?.(ns) ?? []), ...groupBy(ns)] as [...GB, ...SqlValue<any>[]];

    return new QueryBuilder({ ...opts, groupBy: mergedGroupBy } as any, this.card);
  }

  // Multiple `having` calls are combined with AND
  @expose(fn.returns(zBool))
  having(having: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      having: combinePredicates(this.opts.having, having),
    });
  }

  // Multiple `orderBy` calls are concatenated (ORDER BY a, b, c).
  @expose(
    fn.returns(
      z.union([z.custom<any>(isOrderByEntry), z.array(z.custom<any>(isOrderByEntry)).min(1)]),
    ),
  )
  orderBy(
    orderBy: (n: N) => OrderByEntry | [OrderByEntry, ...OrderByEntry[]],
  ): QueryBuilder<N, O, GB, Card> {
    const prev = this.opts.orderBy;
    const next = (ns: N) => {
      const result = orderBy(ns);
      // Normalize: single entry → array
      const entries: OrderByEntry[] =
        result instanceof SqlValue ||
        (Array.isArray(result) && result[0] instanceof SqlValue && typeof result[1] === "string")
          ? [result as OrderByEntry]
          : (result as OrderByEntry[]);
      return [...(prev?.(ns) ?? []), ...entries];
    };
    return new QueryBuilder({ ...this.opts, orderBy: next }, this.card);
  }

  // Multiple `limit` calls are combined with `MIN` (safest option)
  @expose(z.int().gte(0))
  limit(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, limit: Math.min(this.opts.limit ?? Infinity, n) });
  }

  // Multiple `offset` calls are combined by summing offsets (safest option)
  @expose(z.int().gte(0))
  offset(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, offset: (this.opts.offset ?? 0) + n });
  }

  // Fluent terminators. Narrow the Sql.execute() return type from
  // QueryResult to a row array, and expose the hydrated / single-row
  // variants as chainable terminators too.
  @expose(z.lazy(() => z.instanceof(Connection)))
  override async execute(conn: Connection<any>): Promise<RowTypeToTsType<O>[]> {
    return conn.execute(this);
  }

  // Streaming terminator. Mirrors `execute` but yields the rowset on
  // every committed mutation that touches one of the live-tagged
  // tables this query reads from. Caller iterates with `for await`.
  @expose(z.lazy(() => z.instanceof(Connection)))
  live(conn: Connection<any>): AsyncIterable<RowTypeToTsType<O>[]> {
    return conn.live(this) as AsyncIterable<RowTypeToTsType<O>[]>;
  }

  @expose(z.lazy(() => z.instanceof(Connection)))
  async hydrate(conn: Connection<any>): Promise<O[]> {
    return conn.hydrate<O, GB, Card>(this);
  }

  @expose(z.lazy(() => z.instanceof(Connection)))
  async one(conn: Connection<any>): Promise<O> {
    const [row] = await conn.hydrate(this.limit(1));
    if (!row) {
      throw new Error("QueryBuilder.one(): query returned no rows");
    }
    return row;
  }

  @expose(z.lazy(() => z.instanceof(Connection)))
  async maybeOne(conn: Connection<any>): Promise<O | null> {
    const [row] = await conn.hydrate(this.limit(1));
    return row ?? null;
  }

  // Currently PG-only: emits ROW() + array_agg + COALESCE(..., '{}'). SQLite
  // needs json_object + json_group_array (Phase 2.1 Scalar AST node).
  // Detected here via the first source Table's database dialect —
  // callers get a clear error before the malformed SQL reaches the driver.
  scalar(): [Card] extends ["one"]
    ? Record<O, 1>
    : [Card] extends ["maybe"]
      ? Record<O, 0 | 1>
      : Anyarray<Record<O, 1>, 1>;
  @expose()
  scalar(): any {
    // .scalar() emits ROW()/array_agg — PG-only syntax. Fail closed
    // for any non-PG dialect (rather than only guarding against the
    // currently-known SQLite case) so a new dialect can't silently
    // slip through with broken output.
    if (this.opts.database.dialect !== "postgres") {
      throw new Error(
        `.scalar() is not yet supported on ${this.opts.database.dialect} — the Phase 2.1 Scalar AST ` +
        "node will dispatch ROW()/array_agg → dialect-specific json aggregation. " +
        "For now, build the JSON aggregation directly via a raw sql template.",
      );
    }
    const RecordClass = Record.of(this.rowType());

    // Wrap as a subquery: (SELECT ROW(...) FROM ... WHERE ...)
    // inner QB — when embedded in sql``, its emit() wraps as subquery with AS
    const inner = this.select((ns) => {
      // ROW() takes raw expressions without aliases
      const rowSql = sql`ROW(${compileSelectList(this.#doSelect(ns), true)})`;
      return { __row: RecordClass.from(rowSql) };
    });
    if (this.card === "many") {
      return Anyarray.of(RecordClass.from(sql``)).from(
        sql`COALESCE((SELECT array_agg("__row") FROM ${inner} AS "q"), '{}')`,
      );
    }
    return RecordClass.from(sql`(SELECT "__row" FROM ${inner} AS "q")`);
  }

  #doSelect(ns: N): O {
    if (!this.opts.select) {
      return ns[this.opts.tables[0].source.tsAlias] as unknown as O;
    }
    return this.opts.select(ns);
  }

  rowType(): O {
    // Mirror bind()'s ns construction — including numeric slots for groupBy
    // columns — so select callbacks that reference `ns[0]` after a groupBy
    // resolve correctly when rowType() is called for deserialization.
    const ns: { [k: string]: unknown } = {};
    for (const t of this.opts.tables) {
      const alias = new Alias(t.source.tsAlias);
      Object.defineProperty(ns, t.source.tsAlias, {
        value: reAlias(t.source.rowType(), alias),
        enumerable: true,
      });
    }
    const groups = this.opts.groupBy && this.opts.groupBy(ns as unknown as N);
    for (const [i, g] of groups?.entries() ?? []) {
      Object.defineProperty(ns, i, { value: g, enumerable: true });
    }
    return this.#doSelect(ns as unknown as N);
  }

  finalize(): FinalizedQuery {
    const ns: N = {} as N;
    const finalizedTables: FinalizedQuery["opts"]["tables"] = [] as any;

    for (const t of this.opts.tables) {
      const alias = new Alias(t.source.tsAlias);
      Object.defineProperty(ns, t.source.tsAlias, {
        value: reAlias(t.source.rowType(), alias),
        enumerable: true,
      });
      finalizedTables.push({
        source: t.source,
        on: (t.type === "from" ? undefined : t.on(ns)) as any,
        type: t.type,
        alias,
      });
    }
    const groups = this.opts.groupBy && this.opts.groupBy(ns);
    for (const [i, g] of groups?.entries() ?? []) {
      if (i in ns) {
        throw new Error(
          `Found a numeric namespace key ${i}. This is not allowed because it collides with groupBy column indices. ` +
            `Please rename the '${i}' key in your namespace to something else.`,
        );
      }
      Object.defineProperty(ns, i, { value: g, enumerable: true });
    }

    return new FinalizedQuery({
      select: this.#doSelect(ns),
      where: this.opts?.where?.(ns),
      groupBy: groups,
      having: this.opts?.having?.(ns),
      orderBy: this.opts?.orderBy?.(ns),
      tables: finalizedTables,
      limit: this.opts.limit,
      offset: this.opts.offset,
    });
  }

  bind(ctx: CompileContext): BoundSql {
    return this.finalize().bind(ctx);
  }

  children() {
    return [this.finalize()];
  }

  @expose(ZCardinality)
  cardinality<C extends Cardinality>(card: C): QueryBuilder<N, O, GB, C> {
    return new QueryBuilder(this.opts, card);
  }

  @expose()
  debug(): this {
    const compiled = compile(this, { database: this.opts.database });
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}

type AppliedOpts = {
  select: RowType;
  where?: Bool<any> | undefined;
  groupBy?: SqlValue<any>[] | undefined;
  having?: Bool<any> | undefined;
  orderBy?: OrderByEntry[] | undefined;
  tables: [
    { type: "from"; source: Fromable; alias: Alias },
    ...{
      source: Fromable;
      on: Bool<any>;
      type: "join" | "leftJoin";
      alias: Alias;
    }[],
  ];
  limit?: number | undefined;
  offset?: number | undefined;
};

export class FinalizedQuery extends Sql {
  opts: AppliedOpts;

  constructor(opts: AppliedOpts) {
    super();
    this.opts = opts;
  }

  children(): Sql[] {
    return [
      ...this.opts.tables.map((t) => t.source),
      this.opts.where?.toSql(),
      ...(this.opts.groupBy?.map((g) => g.toSql()) ?? []),
      this.opts.having?.toSql(),
      ...(this.opts.orderBy?.flatMap((entry) =>
        entry instanceof SqlValue ? [entry.toSql()] : [entry[0].toSql()],
      ) ?? []),
    ].filter((x) => x instanceof Sql);
  }

  bind(ctx: CompileContext): BoundSql {
    const tableSql: Sql[] = [];

    for (const t of this.opts.tables) {
      const alias = t.alias;
      const sourceSql = t.source.bind(ctx);
      const asClause = t.source.emitColumnNamesWithAlias
        ? sql`AS ${alias}(${sql.join(Object.keys(t.source.rowType()).map((col) => new Ident(col)))})`
        : sql`AS ${alias}`;
      if (t.type === "from") {
        tableSql.push(sql`FROM ${sourceSql} ${asClause}`);
      } else {
        tableSql.push(
          sql`  ${t.type === "leftJoin" ? sql`LEFT JOIN` : sql`JOIN`} ${sourceSql} ${asClause} ON ${t.on.toSql()}`,
        );
      }
    }

    const body = sql.join(
      [
        sql`SELECT ${compileSelectList(this.opts.select)}`,
        ...tableSql,
        this.opts.where && sql`WHERE ${this.opts.where.toSql()}`,
        this.opts.groupBy && sql`GROUP BY ${sql.join(this.opts.groupBy.map((g) => g.toSql()))}`,
        this.opts.having && sql`HAVING ${this.opts.having.toSql()}`,
        this.opts.orderBy &&
          sql`ORDER BY ${sql.join(
            this.opts.orderBy.map((entry) => {
              if (entry instanceof SqlValue) {
                return entry.toSql();
              }
              const [expr, dir] = entry;
              if (dir === "desc") {
                return sql`${expr.toSql()} DESC`;
              }
              return sql`${expr.toSql()} ASC`;
            }),
          )}`,
        this.opts.limit !== undefined && sql`LIMIT ${sql.param(this.opts.limit)}`,
        this.opts.offset !== undefined && sql`OFFSET ${sql.param(this.opts.offset)}`,
      ],
      sql`\n`,
    );

    const aliases = this.opts.tables.map((t) => t.alias);
    return sql`(${sql.withScope(aliases, body)})`;
  }
}
