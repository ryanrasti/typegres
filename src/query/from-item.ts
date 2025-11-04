import { sql } from "kysely";
import invariant from "tiny-invariant";
import { Context, Expression, QueryAlias } from "../expression";
import { Select, select } from "../grammar/select";
import { Bool, RowLikeStrict } from "../types";
import Any, { MakeNullable } from "../types/any";
import { maybePrimitiveToSqlType } from "../types/primitive";
import { RowSchema, RowSchemaToRowLike, View } from "./db";
import { withMixinProxy } from "./mixin";
import { aliasRowLike, AnyOrParsed, RowLike, ValuesExpression } from "./values";
import { RpcTarget } from "capnweb";

// Helper type to make all columns in a RowLike nullable
type MakeRowNullable<R extends RowLike> = {
  [K in keyof R]: R[K] extends Any ? MakeNullable<R[K]> : R[K];
};

export type JoinType = "JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL OUTER JOIN";

type Join = {
  fromItem: WithFromItem<any>;
  row: RowLike;
  on: Bool<0 | 1>;
  type: JoinType;
};

export type Joins = { [key: string]: Join };

export type JoinTables<J extends Joins> = {
  [key in keyof J]: NonNullable<J>[key]["row"];
};

export type MakeJoinsNullable<J extends Joins> = {
  [K in keyof J]: NonNullable<J>[K] & {
    row: MakeRowNullable<NonNullable<J>[K]["row"]>;
  };
};

export type FromToSelectArgs<F extends RowLike, J extends Joins> = [F, JoinTables<J>];

const methods = [
  "as",
  "toSelectArgs",
  "joinTables",
  "joinWithType",
  "join",
  "leftJoin",
  "rightJoin",
  "fullOuterJoin",
  "getContext",
  "rawFromExpr",
  "fromAlias",
  "from",
  "joinAliases",
  "joins",
  "compileJustFrom",
  "compile",
  "tableColumnAlias",
  "select",
] as const;

export const withFromItem = <T extends { asFromItem: () => FromItem }>(base: T) =>
  withMixinProxy(() => base.asFromItem(), base, methods);

export type AsFromItem<F extends RowLike = RowLike, J extends Joins = Joins> = {
  asFromItem(): FromItem<F, J>;
};

export type WithFromItem<F extends RowLike = RowLike, J extends Joins = any> = AsFromItem<F, J> &
  Pick<FromItem<F, J>, (typeof methods)[number]>;

export type FromItemFromExpressionClass = {
  ["new"](fromExpr: Expression, alias?: string): FromItem<RowLike, Joins>;
};

export class FromItem<F extends RowLike = RowLike, J extends Joins = Joins> implements WithFromItem<F, J> {
  constructor(
    public rawFromExpr: Expression,
    public fromAlias: QueryAlias,
    public joinAliases: { [key: string]: QueryAlias },
    public from: F,
    public joins: J = {} as J,
  ) {}

  static ofSchema<T extends RowSchema>(columns: T) {
    const rowLike = Object.fromEntries(
      Object.entries(columns).map(([name, col]) => [name, col.new("")]),
    ) as RowSchemaToRowLike<T>;
    return FromItem.of(rowLike);
  }

  static of<R extends RowLike>(fromRow: R) {
    return class extends this {
      static new(fromExpr: Expression, alias?: string) {
        const queryAlias = new QueryAlias(alias ?? "f");
        return new this(fromExpr, queryAlias, {}, aliasRowLike(queryAlias, fromRow));
      }
    };
  }

  as<A extends string>(alias: A): FromItem<F, J> {
    const queryAlias = new QueryAlias(alias);
    return new FromItem(
      this.rawFromExpr,
      queryAlias,
      this.joinAliases,
      aliasRowLike(queryAlias, this.from),
      this.joins,
    );
  }

  asFromItem(): FromItem<F, J> {
    return this;
  }

  toSelectArgs(): FromToSelectArgs<F, J> {
    return [this.from, this.joinTables()];
  }

  joinTables() {
    return Object.fromEntries(
      Object.entries({ ...this.joins }).map(([key, value]) => [key, value.row]),
    ) as JoinTables<J>;
  }

  joinWithType<F2 extends RowLike, A extends string>(
    j: WithFromItem<F2>,
    as: A,
    type: JoinType,
    on: (from: F & MakeRowNullable<F>, js: any) => Bool<0 | 1> | boolean,
  ): FromItem<any, any> {
    const alias = new QueryAlias(as);
    const row = aliasRowLike(alias, j.from);

    const [from, joins] = this.toSelectArgs();
    return new FromItem(
      this.rawFromExpr,
      this.fromAlias,
      {
        ...this.joinAliases,
        [as]: alias,
      },
      this.from,
      {
        ...this.joins,
        [as]: {
          fromItem: j,
          on: maybePrimitiveToSqlType(
            on(from as F & MakeRowNullable<F>, {
              ...joins,
              ...({ [as]: row } as { [a in A]: F2 }),
            }),
          ),
          row,
          type,
        },
      },
    ) as any;
  }

  join<F2 extends RowLike, A extends string>(
    j: WithFromItem<F2>,
    as: A,
    on: (from: F, js: JoinTables<J> & { [a in A]: F2 }) => Bool<0 | 1> | boolean,
  ): FromItem<
    F,
    {
      [a in A]: {
        fromItem: WithFromItem<F2, Joins>;
        on: Bool<0 | 1>;
        row: F2;
        type: "JOIN";
      };
    }
  > {
    return this.joinWithType(j, as, "JOIN", on) as any;
  }

  leftJoin<F2 extends RowLike, A extends string>(
    j: WithFromItem<F2>,
    as: A,
    on: (
      from: F,
      js: JoinTables<J> & {
        [a in A]: MakeRowNullable<F2>;
      },
    ) => Bool<0 | 1> | boolean,
  ): FromItem<
    F,
    J & {
      [a in A]: {
        fromItem: WithFromItem<F2>;
        on: Bool<0 | 1>;
        row: MakeRowNullable<F2>;
        type: "LEFT JOIN";
      };
    }
  > {
    return this.joinWithType(j, as, "LEFT JOIN", on);
  }

  rightJoin<F2 extends RowLike, A extends string>(
    j: WithFromItem<F2>,
    as: A,
    on: (
      from: F,
      js: JoinTables<MakeJoinsNullable<J>> & {
        [a in A]: F2;
      },
    ) => Bool<0 | 1> | boolean,
  ): FromItem<
    MakeRowNullable<F>,
    MakeJoinsNullable<J> & {
      [a in A]: {
        fromItem: WithFromItem<F2>;
        on: Bool<0 | 1>;
        row: F2;
        type: "RIGHT JOIN";
      };
    }
  > {
    return this.joinWithType(j, as, "RIGHT JOIN", on) as FromItem<
      MakeRowNullable<F>,
      MakeJoinsNullable<J> & {
        [a in A]: {
          fromItem: WithFromItem<F2>;
          on: Bool<0 | 1>;
          row: F2;
          type: "RIGHT JOIN";
        };
      }
    >;
  }

  fullOuterJoin<F2 extends RowLike, A extends string>(
    this: WithFromItem<F, J>,
    j: WithFromItem<F2>,
    as: A,
    on: (
      from: MakeRowNullable<F>,
      js: JoinTables<MakeJoinsNullable<J>> & {
        [a in A]: MakeRowNullable<F2>;
      },
    ) => Bool<0 | 1> | boolean,
  ): FromItem<
    MakeRowNullable<F>,
    MakeJoinsNullable<J> & {
      [a in A]: {
        table: WithFromItem<F2>;
        on: Bool<0 | 1>;
        row: MakeRowNullable<F2>;
        type: "FULL OUTER JOIN";
      };
    }
  > {
    return this.joinWithType(j, as, "FULL OUTER JOIN", on);
  }

  getContext(ctxIn: Context): Context {
    return ctxIn.withAliases([this.fromAlias, ...Object.values(this.joinAliases)]);
  }

  compileJustFrom(ctx: Context, alias?: string) {
    return sql`${this.rawFromExpr.compile(ctx)} as ${sql.ref(alias ?? ctx.getAlias(this.fromAlias))}${
      this.rawFromExpr instanceof ValuesExpression ? sql`(${this.tableColumnAlias()})` : sql``
    }`;
  }

  compile(ctx: Context) {
    const from = this.compileJustFrom(ctx);

    const joins = Object.entries(this.joins ?? {}).map(([alias, join]) => {
      invariant(Object.keys(join.fromItem.joins).length === 0, "Joins in expression joining to");
      return sql`${sql.raw(join.type)} ${join.fromItem.compileJustFrom(ctx, alias)} ON ${join.on.toExpression().compile(ctx)}`;
    });

    return sql.join([from, ...joins], sql` `);
  }

  tableColumnAlias() {
    const keys = Object.keys(this.from)
      .toSorted((k1, k2) => k1.localeCompare(k2))
      .map((key) => sql.ref(key));
    return sql.join(keys);
  }

  select(this: WithFromItem<F, J>): Select<F, F, J>;
  select<S extends RowLike>(this: WithFromItem<F, J>, cb: (f: F, j: JoinTables<J>) => S): Select<S, F, J>;
  select<S extends RowLike>(this: WithFromItem<F, J>, cb: (f: F) => S): Select<S, F, J>;
  select<S extends RowLike>(
    this: WithFromItem<F, J>,
    cb?: ((f: F, j: JoinTables<J>) => S) | ((f: F) => S),
  ): Select<S, F, J> {
    console.log(">>>>>> select called with this:", this);
    return select<S, F, J>(cb ?? ((f: F) => f as unknown as S), {
      from: this,
    }) as Select<S, F, J>;
  }

  asClass<E extends object>(this: FromItem<F extends RowLikeStrict ? F : never, J>) {
    return View(this).extend<E>();
  }
}

/**
 * Values represents a VALUES clause in SQL
 * It extends FromItem so it can be used in FROM clauses,
 * but is a distinct type so we can match on it specifically for INSERT
 */
export class Values<R extends RowLikeStrict = RowLikeStrict> extends FromItem<R> {
  constructor(public rows: [R, ...AnyOrParsed<R>[]]) {
    const alias = new QueryAlias("values");
    super(new ValuesExpression(rows), alias, {}, aliasRowLike(alias, rows[0]));
  }

  getRowLike(): R {
    return this.from;
  }
  // Helper to identify Values instances
  static isValues(value: unknown): value is Values<any> {
    return value instanceof Values;
  }
}
