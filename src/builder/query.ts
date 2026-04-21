import { sql, Sql, BoundSql, Alias } from "./sql";
import type { Bool } from "../types";
import { Any, Anyarray, Record } from "../types";
import { type TsTypeOf, type Nullable, type AggregateRow, meta } from "../types/runtime";

// Extract only Any<> instances from a row type
export const selectList = <T extends RowType>(output: T): T => {
  return Object.fromEntries(Object.entries(output).filter(([, v]) => v instanceof Any)) as T;
};

// Compile a row type into a SQL select list: col AS "name", ...
export const compileSelectList = (output: { [key: string]: unknown }): Sql => {
  return sql.join(
    Object.entries(output).flatMap(([k, v]) =>
      v instanceof Any ? [sql`${v.toSql()} as ${sql.ident(k)}`] : [],
    ),
  );
};

export const reAlias = <R extends RowType>(row: R, alias: Alias): R => {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => {
      if (v instanceof Any) {
        return [k, v[meta].__class.from(sql.column(alias, k))];
      }
      return [k, v];
    }),
  ) as R;
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

// Mapping of row name to type (class instance)
export type RowType = object;
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
  bind(): Sql;
  emitColumnNamesWithAlias?: boolean; // default false; if true, emit column names in FROM clause (e.g. VALUES)
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

type OrderDirection = "asc" | "desc";
type OrderByEntry = Any<any> | [Any<any>, OrderDirection];
type Cardinality = "one" | "maybe" | "many";

type QueryBuilderOptions<N extends Namespace, O extends RowType, GB extends Any<any>[]> = {
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
  private opts: QueryBuilderOptions<N, O, GB>;
  private card: Card;

  get tsAlias(): string {
    return this.opts.tsAlias;
  }

  constructor(opts: QueryBuilderOptions<N, O, GB>, card?: Card) {
    super();
    this.opts = opts;
    this.card = (card ?? "many") as Card;
  }

  // Subsequent `select` calls replace the output type (columns must be redefined)
  select<O2 extends RowType>(select: (n: N) => O2): QueryBuilder<N, O2, GB, Card> {
    return new QueryBuilder({ ...this.opts, select: select }, this.card);
  }

  // Multiple `where` calls are combined with AND
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

  join<R extends RowType, A extends string>(
    from: Fromable<R, A>,
    on: (ns: N & { [k in A]: R }) => Bool<any>,
  ): QueryBuilder<N & { [k in A]: R }, O, GB> {
    this.#assertNotInNamespace(from.tsAlias);
    return new QueryBuilder({
      ...this.opts,
      tables: [...this.opts.tables, { source: from, on, type: "join" }],
    });
  }

  leftJoin<R extends RowType, A extends string>(
    from: Fromable<R, A>,
    onFn: (ns: N & { [k in A]: RowTypeToNullable<R> }) => Bool<any>,
  ): QueryBuilder<N & { [k in A]: RowTypeToNullable<R> }, O, GB> {
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
  having(having: (n: N) => Bool<any>): QueryBuilder<N, O, GB> {
    return new QueryBuilder({
      ...this.opts,
      having: combinePredicates(this.opts.having, having),
    });
  }

  // Multiple `orderBy` calls are concatenated (ORDER BY a, b, c).
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
  limit(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, limit: Math.min(this.opts.limit ?? Infinity, n) });
  }

  // Multiple `offset` calls are combined by summing offsets (safest option)
  offset(n: number): QueryBuilder<N, O, GB> {
    return new QueryBuilder({ ...this.opts, offset: (this.opts.offset ?? 0) + n });
  }

  // TODO: ROW(), array_agg(), COALESCE should be regular typed ops once we support them
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  scalar(this: QueryBuilder<N, O, GB, "one">): Record<O, 1>;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  scalar(this: QueryBuilder<N, O, GB, "maybe">): Record<O, 0 | 1>;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  scalar(this: QueryBuilder<N, O, GB, "many">): Anyarray<Record<O, 1>, 1>;
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

  bind(): BoundSql {
    const ns: N = {} as N;
    const aliases: Alias[] = [];
    const tableSql: Sql[] = [];

    for (const t of this.opts.tables) {
      const sourceSql = t.source.bind();
      const alias = new Alias(t.source.tsAlias);
      aliases.push(alias);
      Object.defineProperty(ns, t.source.tsAlias, {
        value: reAlias(t.source.rowType(), alias),
        enumerable: true,
      });
      const aliasRef = sql.tableRef(alias);
      const asClause = t.source.emitColumnNamesWithAlias
        ? sql`AS ${aliasRef}(${sql.join(Object.keys(t.source.rowType()).map((col) => sql.ident(col)))})`
        : sql`AS ${aliasRef}`;
      if (t.type === "from") {
        tableSql.push(sql`FROM ${sourceSql} ${asClause}`);
      } else {
        tableSql.push(
          sql`  ${t.type === "leftJoin" ? sql`LEFT JOIN` : sql`JOIN`} ${sourceSql} ${asClause} ON ${t.on(ns).toSql()}`,
        );
      }
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

    const body = sql.join(
      [
        sql`SELECT ${compileSelectList(this.#doSelect(ns) as { [key: string]: unknown })}`,
        ...tableSql,
        this.opts.where && sql`WHERE ${this.opts.where(ns).toSql()}`,
        groups && groups.length > 0 && sql`GROUP BY ${sql.join(groups.map((g) => g.toSql()))}`,
        this.opts.having && sql`HAVING ${this.opts.having(ns).toSql()}`,
        this.opts.orderBy &&
          sql`ORDER BY ${sql.join(
            this.opts.orderBy(ns).map((entry) => {
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

    return sql`(${sql.withScope(aliases, body)})`.bind();
  }

  cardinality<C extends Cardinality>(card: C): QueryBuilder<N, O, GB, C> {
    return new QueryBuilder(this.opts, card);
  }

  debug(): this {
    const compiled = this.bind().compile("pg");
    console.log(compiled.text, compiled.values, this.opts);
    return this;
  }

  // Internal: expose structured opts for live-query extraction.
  // Do not use for anything else — this is meant for the live-query extractor's
  // AST walk, and may change shape as extraction evolves.
  liveIntrospect(): Readonly<QueryBuilderOptions<N, O, GB>> {
    return this.opts;
  }
}
