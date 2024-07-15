import Any, { Schema, UseSubtype } from "./any";
import { default as PgRecord } from "../gen/types/record";
import { Expression, LiteralExpression } from "../expression";
import array from "postgres-array";
import { RawBuilder, sql } from "kysely";
import {
  ColumnAliasExpression,
  RowLike,
  RowLikeRelaxed,
  TableReferenceExpression,
} from "../query/values";
import { MaybePrimitiveToSqlType, maybePrimitiveToSqlType } from "./primitive";
import { Context } from "../expression";

export class LiteralRecordExpression extends Expression {
  constructor(
    public value: string | null,
    public schema: Schema,
  ) {
    if (value === null) {
      throw new Error("Cannot create a null literal record");
    }
    super();
  }

  compile(): RawBuilder<unknown> {
    if (this.value === null) {
      throw new Error("Cannot create a null literal record");
    }
    // 1. Pretend the value is an array and parse the parts
    const parts = array.parse(`{${this.value.slice(1, -1)}}`, (v) => v);
    // 2. Then each part corresponds to a k/v in the schema:
    return sql`ROW(${sql.join(
      Object.values(this.schema).map((type, i) => {
        const instantiated = type.new("");
        return instantiated instanceof Record
          ? new LiteralRecordExpression(parts[i], instantiated.schema).compile()
          : new LiteralExpression(parts[i], type.typeString()!).compile();
      }),
      sql.raw(", "),
    )})`;
  }
}

class RecordAccessExpression extends Expression {
  constructor(
    public base: Expression,
    public key: string,
  ) {
    super();
  }

  compile(ctx: Context): RawBuilder<unknown> {
    return sql`(${this.base.compile(ctx)}).${sql.ref(this.key)}`;
  }
}

type SchemaPrototype<S extends Schema> = {
  [key in keyof S]: S[key]["prototype"];
};

type SchemaResultType<S extends Schema> = {
  [key in keyof S]: S[key]["prototype"]["resultType"];
};

export type RecordClass<T extends { [key in string]: Any<unknown, 0 | 1> }> = {
  new (v: string): Record<number, T> & T;
  ["new"](v: string): Record<1, T> & T;
  ["new"](v: null): Record<0, T> & T;
  ["new"](v: Expression): Record<0 | 1, T> & T;
  prototype: Record<0 | 1, T> & T;

  typeString(): string | undefined;
  subtype(): UseSubtype | undefined;
  parse(v: string): { [key in keyof T]: T[key]["resultType"] };
};

export default abstract class Record<
  N extends number,
  T extends RowLike,
> extends PgRecord<N, T> {
  public abstract schema: { [K in keyof T]: ReturnType<T[K]["getClass"]> };

  static of<S extends Schema>(schema: S): RecordClass<SchemaPrototype<S>> {
    return class RecordImpl<N extends number> extends Record<
      N,
      SchemaPrototype<S>
    > {
      schema = schema as any;

      static resultType:
        | {
            [K in keyof SchemaPrototype<S>]: SchemaPrototype<S>[K]["resultType"];
          }
        | undefined;
      static typeString(): string {
        return `(${Object.entries(schema)
          .map(([key, value]) => `${key} ${value.typeString()}`)
          .join(", ")})`;
      }
      static subtype(): UseSubtype {
        return {
          subtype: schema,
          withSubtype: Record.of as any,
        };
      }

      static parse(v: string): SchemaResultType<S> {
        // 1. Pretend the value is an array and parse the parts
        const parts = array.parse(`{${v.slice(1, -1)}}`, (v) => v);
        // 2. Then each part corresponds to a k/v in the schema:
        return Object.fromEntries(
          Object.entries(schema).map(([key, value], i) => [
            key,
            value.parse(parts[i]),
          ]),
        ) as SchemaResultType<S>;
      }

      constructor(v: string | null | Expression) {
        super(v);
        for (const [key, value] of Object.entries(schema)) {
          if (key in this) {
            throw new Error(
              `Record constructor: ${key} already defined ${JSON.stringify(
                this,
              )}, cannot redefine`,
            );
          }

          (this as any)[key] = value.new(
            this.v instanceof TableReferenceExpression
              ? // This is the case where we're using reference to a table, so we don't use
                // parens around the expression to access the column:
                new ColumnAliasExpression(this.v.table, key)
              : new RecordAccessExpression(this.toExpression(), key),
          );
        }
      }

      toExpression(): Expression {
        if (this.v instanceof Expression) {
          return super.toExpression();
        }
        if (typeof this.v !== "string") {
          throw new Error(
            `Record.toExpression: expected string, got ${typeof this.v}`,
          );
        }
        return new LiteralRecordExpression(this.v, schema);
      }

      static new(v: string): Record<1, SchemaPrototype<S>> & SchemaPrototype<S>;
      static new(v: null): Record<0, SchemaPrototype<S>> & SchemaPrototype<S>;
      static new(
        v: Expression,
      ): Record<0 | 1, SchemaPrototype<S>> & SchemaPrototype<S>;
      static new(v: unknown) {
        return new RecordImpl(v as unknown as string) as any;
      }
    } as RecordClass<SchemaPrototype<S>>;
  }
}

export const row = <R extends RowLikeRelaxed>(
  row: R,
  expression: Expression,
): Record<1, { [K in keyof R]: MaybePrimitiveToSqlType<R[K]> }> => {
  const rowLike = maybePrimitiveToSqlType(row) as RowLike;
  return Record.of(
    Object.fromEntries(
      Object.entries(rowLike).map(([key, value]) => [
        key,
        (value as Any).getClass(),
      ]),
    ) as Schema,
  ).new(expression) as Record<
    1,
    { [K in keyof R]: MaybePrimitiveToSqlType<R[K]> }
  >;
};
