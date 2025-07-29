import { sql } from "kysely";
import { Any, Bool } from "../types";
import {
  aliasRowLike,
  AwaitedResultType,
  Query,
  resultType,
  ResultType,
  RowLike,
  SelectArgs,
  Setof,
} from "./values";
import { Context, QueryAlias, SelectableExpression } from "../expression";
import type { Typegres } from "../db";
import { FromItem, Joins } from "./from-item";
import invariant from "tiny-invariant";
import { dummyDb } from "../test/db";

export const Generated = Symbol("Generated");

// Like `TableReferenceExpression` but referencing a table directly (not an alias)
export class RawTableReferenceExpression extends SelectableExpression {
  constructor(
    public table: string,
    schema: RowLike,
  ) {
    super(schema);
  }

  compile(_ctx: Context) {
    return sql.ref(this.table);
  }
}

type InstanceType<C> = C extends { new (...args: any[]): infer R } ? R : never;

type DbSchema = {
  [key: string]: TableSchema;
};

type TableSchema = {
  [key: string]: typeof Any<unknown, 0 | 1>;
};

type TableSchemaToRowLike<T extends TableSchema> = {
  [key in keyof T]: InstanceType<T[key]> &
    (T[key] extends typeof Generated ? typeof Generated : InstanceType<T[key]>);
};

type Database<DB extends DbSchema> = {
  [t in keyof DB]: Table<{
    from: FromItem<TableSchemaToRowLike<DB[t]>, Joins>;
  }>;
};

const table = (name: string, columns: TableSchema) => {
  const rowLike = Object.fromEntries(
    Object.entries(columns).map(([name, col]) => [name, col.new("")]),
  ) as RowLike;
  return Table.of(rowLike).new(new RawTableReferenceExpression(name, rowLike));
};

export const database = <DB extends DbSchema>(schema: DB) => {
  return Object.fromEntries(
    Object.entries(schema).map(([name, columns]) => [
      name,
      table(name, columns),
    ]),
  ) as Database<DB>;
};

type InsertColumns<R extends RowLike> = {
  [key in keyof R as R[key] extends typeof Generated ? never : key]: R[key];
};

export class Table<Q extends Query> extends Setof<Q> {
  constructor(public query: Q) {
    super(query);
  }

  static of<R extends RowLike>(fromRow: R) {
    return class extends Table<{
      from: FromItem<R, Joins>;
      select: R;
      wheres: undefined;
      groupBy: undefined;
    }> {
      static new(fromExpr: RawTableReferenceExpression) {
        const alias = new QueryAlias(fromExpr.table);
        return new Table<{
          from: FromItem<R, Joins>;
        }>({
          from: new FromItem(fromExpr, alias, {}, aliasRowLike(alias, fromRow)),
        });
      }
    };
  }

  rawFromExpr() {
    const rawFromExpr = this.query.from.rawFromExpr;
    invariant(
      rawFromExpr instanceof RawTableReferenceExpression,
      "Raw from expression must be a table reference",
    );
    return rawFromExpr;
  }

  insert<
    Q2 extends
      | {
          from: FromItem<RowLike, Joins>;
          select: ResultType<Q2> extends RowLike
            ? InsertColumns<ResultType<Q2>>
            : never;
        }
      | {
          from: FromItem<
            ResultType<Q2> extends RowLike
              ? InsertColumns<ResultType<Q2>>
              : never,
            Joins
          >;
        },
  >(expr: Setof<Q2>) {
    const keys = sql.join(
      Object.keys(expr.query.from.from).toSorted().map(sql.ref),
      sql.raw(", "),
    );
    const statement = sql`
      INSERT INTO ${sql.ref(this.rawFromExpr().table)} (${keys})
      (${expr.compile(Context.new().withReference(this.rawFromExpr().table))})
      RETURNING *
    `;
    return {
      debug() {
        console.log("Debugging query:", statement.compile(dummyDb));
        return this;
      },
      execute: async (tg: Typegres) => {
        const kysely = (tg as any)._internal;
        try {
          const res = await kysely.executeQuery(statement.compile(kysely));
          return res.rows as unknown as AwaitedResultType<Q>;
        } catch (e) {
          console.error(
            "Error executing insert:",
            e,
            statement.compile(kysely),
          );
          throw e;
        }
      },
    };
  }

  update<
    A extends {
      where: (t: Q["from"]["from"]) => Bool<0 | 1>;
      from?: (t: Q["from"]["from"]) => Setof<Query>;
    },
  >(arg: A) {
    return new UpdateBuilder<Q, A>(this, arg);
  }
}

class UpdateBuilder<
  Q extends Query,
  A extends {
    where: (t: Q["from"]["from"]) => Bool<0 | 1>;
    from?: (t: Q["from"]["from"]) => Setof<Query>;
  },
> {
  constructor(
    public table: Table<Q>,
    public arg: A,
  ) {}

  set(
    setCb: (
      t: Q["from"]["from"],
      ...f: A["from"] extends (t: Q["from"]["from"]) => infer R
        ? R extends Setof<Query>
          ? SelectArgs<R["query"]>
          : []
        : []
    ) => Partial<Q["from"]["from"]>,
  ) {
    const builder = this;
    return {
      async execute(tg: Typegres) {
        const kysely = (tg as any)._internal;
        const alias = new QueryAlias(builder.table.rawFromExpr().table);
        const asAlias = aliasRowLike(
          alias,
          resultType(builder.table.query) as RowLike,
        );

        const where =
          "where" in builder.arg ? builder.arg.where(asAlias) : undefined;
        const from =
          "from" in builder.arg && builder.arg.from
            ? builder.arg.from(asAlias)
            : undefined;
        const wheres = [where, ...(from?.query.wheres ?? [])].filter(
          (where) => where !== undefined,
        );
        const { wheres: _fromWheres, ...rest } = from?.query ?? {};
        const fromWithoutWheres = from && "from" in rest && rest.from;

        const set = setCb(
          asAlias,
          ...((builder.arg.from && from ? from.toSelectArgs() : []) as any),
        );

        const [ctx, from2, joins] = fromWithoutWheres
          ? fromWithoutWheres.compile(Context.new().withAliases([alias]))
          : [Context.new().withAliases([alias]), null, null];

        const statement = sql`
        UPDATE ${sql.ref(builder.table.rawFromExpr().table)}
        SET ${sql.join(
          Object.entries(set).map(
            ([key, value]) =>
              sql`${sql.ref(key)} = ${(value as Any).toExpression().compile(ctx)}`,
          ),
          sql.raw(", "),
        )}
        ${from2 && joins ? sql`FROM ${from2} ${joins}` : sql``}
        ${
          wheres.length
            ? sql`WHERE ${sql.join(
                wheres.map((where) => where.toExpression().compile(ctx)),
                sql.raw(" AND "),
              )}`
            : sql``
        }
        RETURNING ${sql.ref(builder.table.rawFromExpr().table)}.*
      `;
        try {
          const res = await kysely.executeQuery(statement.compile(kysely));
          return res.rows as unknown as AwaitedResultType<Q>;
        } catch (e) {
          console.error(
            "Error executing update:",
            e,
            statement.compile(kysely),
          );
          throw e;
        }
      },
    };
  }
}
