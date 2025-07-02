import { Expression, LiteralExpression } from "../expression";
import { default as PgAny } from "../gen/types/any";
import { Context } from "../expression";
import { Typegres } from "../db";

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
        const kexpr = db.selectNoFrom(
          expr.compile(Context.new()).as("val")
        );

        kexpr
          .executeTakeFirst()
          ?.then((result) =>
            resolve(
              (result?.val != null
                ? self.getClass().parse(result.val as string)
                : result?.val) as unknown as any
            )
          )
          .catch((err) => {
            console.error("Error executing query:", kexpr.compile(), err);
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
