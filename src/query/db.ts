import { Kysely, sql } from "kysely";
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
  [t in keyof DB]: Table<{ from: TableSchemaToRowLike<DB[t]> }>;
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

class Table<Q extends Query> extends Setof<Q> {
  constructor(
    public rawFromExpr: RawTableReferenceExpression,
    public fromAlias: QueryAlias,
    public joinAliases: Record<string, QueryAlias>,
    public query: Q,
    public fromRow: RowLike,
  ) {
    super(rawFromExpr, fromAlias, joinAliases, query, fromRow);
  }

  static of<R extends RowLike>(fromRow: R) {
    return class extends Table<{
      from: R;
      select: R;
      wheres: undefined;
      groupBy: undefined;
    }> {
      static new(fromExpr: RawTableReferenceExpression) {
        const alias = new QueryAlias(fromExpr.table);
        return new Table<{
          from: R;
        }>(
          fromExpr,
          alias,
          {},
          {
            from: aliasRowLike(alias, fromRow),
          },
          fromRow,
        );
      }
    };
  }

  insert<
    Q2 extends
      | {
          from: RowLike;
          select: ResultType<Q2> extends RowLike
            ? InsertColumns<ResultType<Q2>>
            : never;
        }
      | {
          from: ResultType<Q2> extends RowLike
            ? InsertColumns<ResultType<Q2>>
            : never;
        },
  >(expr: Setof<Q2>) {
    const keys = sql.join(
      Object.keys(expr.query.from).toSorted().map(sql.ref),
      sql.raw(", "),
    );
    const statement = sql`
      INSERT INTO ${sql.ref(this.rawFromExpr.table)} (${keys})
      (${expr.compile(Context.new().withReference(this.rawFromExpr.table))})
      RETURNING *
    `;
    return {
      execute: async (db: Kysely<any>) => {
        try {
          const res = await db.executeQuery(statement.compile(db));
          return res.rows as unknown as AwaitedResultType<Q>;
        } catch (e) {
          console.error("Error executing insert:", e, statement.compile(db));
          throw e;
        }
      },
    };
  }

  update<
    A extends {
      where: (t: Q["from"]) => Bool<0 | 1>;
      from?: (t: Q["from"]) => Setof<Query>;
    },
  >(arg: A) {
    return new UpdateBuilder<Q, A>(this, arg);
  }
}

class UpdateBuilder<
  Q extends Query,
  A extends {
    where: (t: Q["from"]) => Bool<0 | 1>;
    from?: (t: Q["from"]) => Setof<Query>;
  },
> {
  constructor(
    public table: Table<Q>,
    public arg: A,
  ) {}

  set(
    setCb: (
      t: Q["from"],
      ...f: A["from"] extends (t: Q["from"]) => infer R
        ? R extends Setof<Query>
          ? SelectArgs<R["query"]>
          : []
        : []
    ) => Partial<Q["from"]>,
  ) {
    const builder = this;
    return {
      async execute(db: Kysely<any>) {
        const alias = new QueryAlias(builder.table.rawFromExpr.table);
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
        const fromWithoutWheres =
          from &&
          "from" in rest &&
          new Setof(
            from.rawFromExpr,
            from.fromAlias,
            from.joinAliases,
            rest,
            from.fromRow,
          );

        const set = setCb(
          asAlias,
          ...((builder.arg.from && from ? from.toSelectArgs() : []) as any),
        );

        const ctx = Context.new().withAliases([
          alias,
          ...(from ? [from.fromAlias, ...Object.values(from.joinAliases)] : []),
        ]);

        const statement = sql`
        UPDATE ${sql.ref(builder.table.rawFromExpr.table)}
        SET ${sql.join(
          Object.entries(set).map(
            ([key, value]) =>
              sql`${sql.ref(key)} = ${(value as Any).toExpression().compile(ctx)}`,
          ),
          sql.raw(", "),
        )}
        ${
          fromWithoutWheres
            ? sql`FROM ${fromWithoutWheres.compile(ctx)} AS ${sql.ref(
                from.fromAlias.name,
              )}`
            : sql``
        }
        ${
          wheres.length
            ? sql`WHERE ${sql.join(
                wheres.map((where) => where.toExpression().compile(ctx)),
                sql.raw(" AND "),
              )}`
            : sql``
        }
        RETURNING ${sql.ref(builder.table.rawFromExpr.table)}.*
      `;
        try {
          const res = await db.executeQuery(statement.compile(db));
          return res.rows as unknown as AwaitedResultType<Q>;
        } catch (e) {
          console.error("Error executing update:", e, statement.compile(db));
          throw e;
        }
      },
    };
  }
}
