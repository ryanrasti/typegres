import { sql } from "kysely";
import { Expression, QueryAlias } from "../expression";
import { Bool, Setof, Record } from "../types";
import { maybePrimitiveToSqlType } from "../types/primitive";
import { Context } from "../expression";
import { MakeNullable } from "../types/any";
import {
  aliasRowLike,
  isScalar,
  Query,
  ResultType,
  resultType,
  RowLike,
  Scalar,
  TableReferenceExpression,
  ValuesExpression,
} from "./values";
import { row } from "../types/record";

// Helper type to make all columns in a RowLike nullable
type MakeRowNullable<R> = R extends RowLike
  ? { [K in keyof R]: MakeNullable<R[K]> }
  : R extends Scalar
    ? MakeNullable<R>
    : never;

export type JoinType = "JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL OUTER JOIN";

type Join = {
  table: Setof<any>;
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

export type FromToSelectArgs<F extends RowLike | Scalar, J extends Joins> = [
  F extends RowLike ? Record<1, F> & F : F,
  JoinTables<J>,
];

export class FromItem<F extends RowLike | Scalar, J extends Joins = Joins> {
  constructor(
    public rawFromExpr: Expression,
    public fromAlias: QueryAlias,
    public joinAliases: { [key: string]: QueryAlias },
    public from: F,
    public joins: J = {} as J,
  ) {}

  toSelectArgs(): FromToSelectArgs<F, J> {
    return [
      (isScalar(this.from)
        ? this.from
        : row(
            this.from,
            new TableReferenceExpression(this.fromAlias, this.from),
          )) as F extends RowLike ? Record<1, F> & F : F,
      this.joinTables(),
    ];
  }

  joinTables() {
    return Object.fromEntries(
      Object.entries({ ...this.joins }).map(([key, value]) => [key, value.row]),
    ) as JoinTables<J>;
  }

  joinWithType<Q extends Query, A extends string>(
    j: Setof<Q>,
    as: A,
    type: JoinType,
    on: (from: F & MakeRowNullable<F>, js: any) => Bool<0 | 1> | boolean,
  ) {
    const alias = new QueryAlias(as);
    const row = aliasRowLike(alias, resultType(j.query) as RowLike);

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
          table: j,
          on: maybePrimitiveToSqlType(
            on(from as F & MakeRowNullable<F>, {
              ...joins,
              ...({ [as]: row } as { [a in A]: ResultType<Q> }),
            }),
          ),
          row,
          type,
        },
      },
    );
  }

  join<Q extends Query, A extends string>(
    j: Setof<Q>,
    as: A,
    on: (
      from: F,
      js: JoinTables<J> & { [a in A]: ResultType<Q> },
    ) => Bool<0 | 1> | boolean,
  ): FromItem<
    F,
    J & {
      [a in A]: {
        table: Setof<Q>;
        on: Bool<0 | 1>;
        row: ResultType<Q>;
        type: "JOIN";
      };
    }
  > {
    return this.joinWithType(j, as, "JOIN", on) as any;
  }

  leftJoin<Q extends Query, A extends string>(
    j: Setof<Q>,
    as: A,
    on: (
      from: F,
      js: JoinTables<J> & {
        [a in A]: MakeRowNullable<ResultType<Q>>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(j, as, "LEFT JOIN", on) as FromItem<
      F,
      J & {
        [a in A]: {
          table: Setof<Q>;
          on: Bool<0 | 1>;
          row: MakeRowNullable<ResultType<Q>>;
          type: "LEFT JOIN";
        };
      }
    >;
  }

  rightJoin<Q extends Query, A extends string>(
    j: Setof<Q>,
    as: A,
    on: (
      from: F,
      js: JoinTables<MakeJoinsNullable<J>> & {
        [a in A]: ResultType<Q>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(j, as, "RIGHT JOIN", on) as FromItem<
      MakeRowNullable<F>,
      MakeJoinsNullable<J> & {
        [a in A]: {
          table: Setof<Q>;
          on: Bool<0 | 1>;
          row: ResultType<Q>;
          type: "RIGHT JOIN";
        };
      }
    >;
  }

  fullOuterJoin<Q extends Query, A extends string>(
    j: Setof<Q>,
    as: A,
    on: (
      from: MakeRowNullable<F>,
      js: JoinTables<MakeJoinsNullable<J>> & {
        [a in A]: MakeRowNullable<ResultType<Q>>;
      },
    ) => Bool<0 | 1> | boolean,
  ) {
    return this.joinWithType(
      j,
      as,
      "FULL OUTER JOIN",
      on,
    ) as unknown as FromItem<
      MakeRowNullable<F>,
      MakeJoinsNullable<J> & {
        [a in A]: {
          table: Setof<Q>;
          on: Bool<0 | 1>;
          row: MakeRowNullable<ResultType<Q>>;
          type: "FULL OUTER JOIN";
        };
      }
    >;
  }

  compile(ctxIn: Context) {
    const ctx = ctxIn.withAliases([
      this.fromAlias,
      ...Object.values(this.joinAliases),
    ]);

    const from = sql`${this.rawFromExpr.compile(ctxIn)} as ${sql.ref(
      ctx.getAlias(this.fromAlias),
    )}${
      this.rawFromExpr instanceof ValuesExpression
        ? sql`(${this.tableColumnAlias()})`
        : sql``
    }`;

    const joins =
      Object.keys(this.joins).length > 0
        ? sql.join(
            Object.entries(this.joins ?? {}).map(([alias, join]) => {
              return sql`${sql.raw(join.type)} ${join.table.compile(ctx)} as ${sql.ref(
                ctx.getAlias(this.joinAliases[alias]),
              )} ON ${join.on.toExpression().compile(ctx)}`;
            }),
            sql` `,
          )
        : sql``;

    return [ctx, from, joins] as const;
  }

  tableColumnAlias() {
    const keys = Object.keys(this.from)
      .toSorted((k1, k2) => k1.localeCompare(k2))
      .map((key) => sql.ref(key));
    return sql.join(keys);
  }
}
