import { Expression, LiteralExpression } from "../expression";
import { Any as PgAny } from "../gen/types/any";
import { Context } from "../expression";
import { Typegres } from "../db";
import { sql } from "kysely";

export type ClassType<T> = {
  typeString(): string | undefined;
  subtype(): UseSubtype | undefined;
  parse(v: string): unknown;
  prototype: T;

  "new"(v: Expression): T;
  "new"(v: unknown): T;
};

export type Schema = {
  [key in string]: ClassType<Any<unknown, 0 | 1>>;
};

export type UseSubtype = {
  subtype: typeof Any | Schema;
  withSubtype: (subtype: typeof Any | Schema) => typeof Any;
};

export default class Any<R = unknown, N extends number = number> extends PgAny {
  constructor(public v: unknown | null | Expression) {
    super();
  }

  static new(v: null): Any<unknown, 0>;
  static new(v: Expression): Any<unknown, 0 | 1>;
  static new(v: unknown): Any<unknown, 1>;
  static new(v: string | null | Expression): Any<unknown, 0 | 1> {
    return new Any(v);
  }

  asAggregate(): Any<R, number> | undefined {
    return undefined;
  }

  static typeString(): string | undefined {
    return undefined;
  }

  static subtype(): UseSubtype | undefined {
    return undefined;
  }

  toExpression(): Expression {
    if (this.v instanceof Expression) {
      return this.v;
    }
    const typeString = this.getClass()?.typeString();
    if (!typeString) {
      throw new Error(
        `Type string is not defined for ${this.constructor.name}`
      );
    }
    return new LiteralExpression(this.v, typeString);
  }

  serializeParamTypes: unknown | undefined = undefined;
  resultType: R | undefined = undefined;
  nullability: N | undefined = undefined;

  static parse(v: string): unknown {
    return v;
  }

  execute(db: Typegres) {
    const self = this;
    return {
      then(
        resolve: (
          result: N extends 0 ? null : N extends 1 ? R : R | null
        ) => void,
        reject: (err: unknown) => void
      ): void {
        const expr = self.toExpression();
        const kysely = (db as any)._internal;
        const compiled = sql`SELECT ${expr.compile(Context.new())} AS val`.compile(kysely);
        
        kysely
          .executeQuery(compiled)
          .then((result: any) => {
            const row = result.rows[0];
            resolve(
              (row?.val != null
                ? self.getClass().parse(row.val as string)
                : row?.val) as unknown as any
            );
          })
          .catch((err: any) => {
            console.error("Error executing query:", compiled, err);
            reject(err);
          });
      },
    };
  }

  getClass(this: this): typeof Any {
    return this.constructor as any;
  }
}

export type AnyType = Any<unknown>;
