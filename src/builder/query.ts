import type { BoundSql } from "./sql";
import { sql, Sql, Alias, compile } from "./sql";
import { Database } from "../database";
import { Bool } from "../types";
import { Any, Anyarray, Record } from "../types";
import { type TsTypeOf, type Nullable, type AggregateRow, meta } from "../types/runtime";
import { fn, tool } from "../exoeval/tool";
import { isTableClass, TableBase } from "../table";
import z from "zod";
import { Values } from "./values";

// Extract only Any<> instances from a row type
export const selectList = <T extends RowType>(output: T): T => {
  return Object.fromEntries(Object.entries(output).filter(([, v]) => v instanceof Any)) as T;
};

// Compile a row type into a SQL select list: col AS "name", ...
export const compileSelectList = (output: RowType): Sql => {
  return sql.join(
    Object.entries(output).flatMap(([k, v]) =>
      v instanceof Any ? [sql`${v.toSql()} as ${sql.ident(k)}`] : [],
    ),
  );
};

export const reAlias = <R extends RowType>(row: R, alias: Alias): R => {
  // Preserve the prototype so Table-subclass methods, instanceof checks,
  // and isRowType all behave the same as on the source. Copy every own
  // descriptor — including symbol-keyed ones like toolFieldsSymbol —
  // generically, replacing Any-typed columns with an alias-qualified
  // reference along the way.
  const out = Object.create(Object.getPrototypeOf(row));
  for (const key of Reflect.ownKeys(row)) {
    const desc = Object.getOwnPropertyDescriptor(row, key)!;
    if (desc.value instanceof Any) {
      Object.defineProperty(out, key, {
        ...desc,
        value: desc.value[meta].__class.from(sql.column(alias, sql.ident(key as string))),
      });
    } else {
      Object.defineProperty(out, key, desc);
    }
  }
  return out;
};

// Deserialize raw string rows using typed output descriptors
export const deserializeRows = <R>(
  rows: { [key: string]: string }[],
  output: { [key: string]: unknown },
): R[] => {
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([k, v]) => {
        const type = output[k];
        if (!(type instanceof Any)) {
          throw new Error(
            `deserializeRows: output column '${k}' is not a typed pg expression (got ${typeof v}). ` +
              `The select callback must return an object whose values are Any instances.`,
          );
        }
        if (v === null || v === undefined) {
          return [k, null];
        }
        return [k, type.deserialize(String(v))];
      }),
    ),
  ) as R[];
};

// Hydrate raw rows into typed instances that share the shape's prototype.
// Each column field is an Any wrapping a CAST(param) of the deserialized
// value — so methods on the class that reference `this.col` can compose
// into follow-up queries (operator methods accept Any via match()).
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
    for (const [k, raw] of Object.entries(row)) {
      const col = shape[k];
      let value: unknown;
      if (col instanceof Any) {
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
export type RowType = object;
export const isRowType = (obj: unknown): obj is RowType => {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  return obj instanceof TableBase || proto === Object.prototype || proto === null;
};

// All of the row types in the current namespace
type Namespace = {
  [k: string]: RowType;
};

export type RowTypeToTsType<R extends RowType> = {
  [k in keyof R]: TsTypeOf<R[k]>;
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
//   - Instance-based sources (Values, PgSrf, QB subqueries) via instance
//     fields/methods of the same names.
export type Fromable<R extends RowType = RowType, A extends string = string> = {
  readonly tsAlias: A;
  rowType(): R;
  bind(): BoundSql;
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

export const combinePredicates = <N extends Namespace>(
  left: ((ns: N) => Bool<any>) | undefined,
  right: (ns: N) => Bool<any>,
) => {
  if (!left) {
    return right;
  }
  return (ns: N) => left(ns).and(right(ns));
};

// Bool-valued predicate combine (used by UPDATE/DELETE where the predicate
// has already been evaluated against the single-table namespace).
export const combineBoolPredicates = (left: Bool<any> | undefined, right: Bool<any>): Bool<any> =>
  left ? left.and(right) : right;

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
type OrderByEntry = Any<any> | [Any<any>, OrderDirection];
const isOrderByEntry = (obj: unknown): obj is OrderByEntry =>
  obj instanceof Any ||
  (Array.isArray(obj) &&
    obj.length === 2 &&
    obj[0] instanceof Any &&
    (obj[1] === "asc" || obj[1] === "desc"));

type Cardinality = "one" | "maybe" | "many";
const ZCardinality = z.union([z.literal("one"), z.literal("maybe"), z.literal("many")]);

export type QueryBuilderOptions<N extends Namespace, O extends RowType, GB extends Any<any>[]> = {
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
  GB extends Any<any>[],
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
  @tool(fn.returns(z.custom<any>(isRowType)))
  select<O2 extends RowType>(select: (n: N) => O2): QueryBuilder<N, O2, GB, Card> {
    return new QueryBuilder({ ...this.opts, select: select }, this.card);
  }

  // Multiple `where` calls are combined with AND
  @tool(fn.returns(z.lazy(() => z.instanceof(Bool))))
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
  join<T extends { readonly tsAlias: string; new (): object }>(
    from: T,
    on: (ns: N & { [K in T["tsAlias"]]: InstanceType<T> }) => Bool<any>,
  ): QueryBuilder<N & { [K in T["tsAlias"]]: InstanceType<T> }, O, GB>;
  join<R extends RowType, A extends string>(
    from: Fromable<R, A>,
    on: (ns: N & { [k in A]: R }) => Bool<any>,
  ): QueryBuilder<N & { [k in A]: R }, O, GB>;
  @tool(z.custom<any>(isFromable), fn.returns(z.lazy(() => z.instanceof(Bool))))
  join(from: Fromable, on: (ns: any) => Bool<any>): any {
    this.#assertNotInNamespace(from.tsAlias);
    return new QueryBuilder({
      ...this.opts,
      tables: [...this.opts.tables, { source: from, on, type: "join" }],
    });
  }

  leftJoin<T extends { readonly tsAlias: string; new (): object }>(
    from: T,
    on: (ns: N & { [K in T["tsAlias"]]: RowTypeToNullable<InstanceType<T>> }) => Bool<any>,
  ): QueryBuilder<N & { [K in T["tsAlias"]]: RowTypeToNullable<InstanceType<T>> }, O, GB>;
  leftJoin<R extends RowType, A extends string>(
    from: Fromable<R, A>,
    onFn: (ns: N & { [k in A]: RowTypeToNullable<R> }) => Bool<any>,
  ): QueryBuilder<N & { [k in A]: RowTypeToNullable<R> }, O, GB>;
  @tool(z.custom<Fromable>(isFromable), fn.returns(z.lazy(() => z.instanceof(Bool))))
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
  groupBy<G extends Any<any>[]>(
    groupBy: (n: N) => [...G],
  ): QueryBuilder<{ [K in keyof N]: AggregateRow<N[K]> } & G, {}, [...GB, ...G], Card>;
  @tool(fn.returns(z.array(z.lazy(() => z.instanceof(Any)))).optional())
  groupBy(groupBy?: (n: N) => Any<any>[]): any {
    const { select: _, ...opts } = this.opts;
    if (!groupBy) {
      // Whole-table aggregate: clear output, don't modify groupBy
      return new QueryBuilder(opts, this.card);
    }

    const prev = this.opts.groupBy;
    const mergedGroupBy = (ns: N) =>
      [...(prev?.(ns) ?? []), ...groupBy(ns)] as [...GB, ...Any<any>[]];

    return new QueryBuilder({ ...opts, groupBy: mergedGroupBy } as any, this.card);
  }

  // Multiple `having` calls are combined with AND
  @tool(fn.returns(z.lazy(() => z.instanceof(Bool))))
  having(having: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      having: combinePredicates(this.opts.having, having),
    });
  }

  // Multiple `orderBy` calls are concatenated (ORDER BY a, b, c).
  @tool(
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
        result instanceof Any ||
        (Array.isArray(result) && result[0] instanceof Any && typeof result[1] === "string")
          ? [result as OrderByEntry]
          : (result as OrderByEntry[]);
      return [...(prev?.(ns) ?? []), ...entries];
    };
    return new QueryBuilder({ ...this.opts, orderBy: next }, this.card);
  }

  // Multiple `limit` calls are combined with `MIN` (safest option)
  @tool(z.int().gte(0))
  limit(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, limit: Math.min(this.opts.limit ?? Infinity, n) });
  }

  // Multiple `offset` calls are combined by summing offsets (safest option)
  @tool(z.int().gte(0))
  offset(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, offset: (this.opts.offset ?? 0) + n });
  }

  // Fluent terminators. Narrow the Sql.execute() return type from
  // QueryResult to a row array, and expose the hydrated / single-row
  // variants as chainable terminators too.
  @tool(z.lazy(() => z.instanceof(Database)))
  override async execute(db: Database): Promise<RowTypeToTsType<O>[]> {
    return db.execute(this);
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  async hydrate(db: Database): Promise<O[]> {
    return db.hydrate<O, GB, Card>(this);
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  async one(db: Database): Promise<O> {
    const [row] = await db.hydrate(this.limit(1));
    if (!row) {
      throw new Error("QueryBuilder.one(): query returned no rows");
    }
    return row;
  }

  @tool(z.lazy(() => z.instanceof(Database)))
  async maybeOne(db: Database): Promise<O | null> {
    const [row] = await db.hydrate(this.limit(1));
    return row ?? null;
  }

  // TODO: ROW(), array_agg(), COALESCE should be regular typed ops once we support them
  // Conditional return type avoids overload resolution quirks: TS's `this:`
  // overloads can pick the wrong branch when the Card type is already narrowed.
  /* eslint-disable @typescript-eslint/no-restricted-types */
  scalar(): [Card] extends ["one"]
    ? Record<O, 1>
    : [Card] extends ["maybe"]
      ? Record<O, 0 | 1>
      : Anyarray<Record<O, 1>, 1>;
  /* eslint-enable @typescript-eslint/no-restricted-types */
  @tool()
  scalar(): any {
    const staticCols = selectList(this.rowType());
    const RecordClass = Record.of(staticCols as any);

    // Wrap as a subquery: (SELECT ROW(...) FROM ... WHERE ...)
    // inner QB — when embedded in sql``, its emit() wraps as subquery with AS
    const inner = this.select((ns) => {
      const cols = selectList(this.#doSelect(ns));
      const rowExprs = Object.values(cols).map((type: any) => type.toSql());
      // ROW() takes raw expressions without aliases
      const rowSql = sql`ROW(${sql.join(rowExprs)})`;
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

  bind(): BoundSql {
    return this.finalize().bind();
  }

  children() {
    return [this.finalize()];
  }

  @tool(ZCardinality)
  cardinality<C extends Cardinality>(card: C): QueryBuilder<N, O, GB, C> {
    return new QueryBuilder(this.opts, card);
  }

  @tool()
  debug(): this {
    const compiled = compile(this, "pg");
    console.log("Debugging query:", { sql: compiled.text, parameters: compiled.values });
    return this;
  }
}

type AppliedOpts = {
  select: RowType;
  where?: Bool<any> | undefined;
  groupBy?: Any<any>[] | undefined;
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
        entry instanceof Any ? [entry.toSql()] : [entry[0].toSql()],
      ) ?? []),
    ].filter((x) => x instanceof Sql);
  }

  bind(): BoundSql {
    const tableSql: Sql[] = [];

    for (const t of this.opts.tables) {
      const alias = t.alias;
      const sourceSql = t.source.bind();
      const asClause = t.source.emitColumnNamesWithAlias
        ? sql`AS ${alias}(${sql.join(Object.keys(t.source.rowType()).map((col) => sql.ident(col)))})`
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
              if (entry instanceof Any) {
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
