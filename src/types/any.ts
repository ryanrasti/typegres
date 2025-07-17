import {
  Expression,
  LiteralExpression,
  UnaryOperatorExpression,
  BinaryOperatorExpression,
  CastExpression,
  InExpression,
  NotInExpression,
} from "../expression";
import { Any as PgAny } from "../gen/types/any";
import { Context } from "../expression";
import { Typegres } from "../db";
import * as Types from "../types";

export type WithNullability<N extends number, T extends Any> = NonNullable<
  ReturnType<
    N extends 0
      ? T["asNullable"]
      : N extends 1
        ? T["asNonNullable"]
        : T["asAggregate"]
  >
>;

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

  /**
   * Helper function to convert a value to an Expression
   * If the value is already an Any type, uses its expression
   * Otherwise creates a LiteralExpression with the appropriate type
   */
  private toExpressionHelper(value: Any | unknown): Expression {
    return value instanceof Any
      ? value.toExpression()
      : new LiteralExpression(value, this.getClass().typeString() || "unknown");
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

  asNullable(): Any<R, 0 | 1> | undefined {
    return undefined;
  }
  asNonNullable(): Any<R, 1> | undefined {
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
        const kexpr = db._internal.selectNoFrom(
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

  /**
   * SQL IS NULL operator - checks if the value is null
   */
  isNull(): Types.Bool<1> {
    return Types.Bool.new(
      new UnaryOperatorExpression(
        "IS NULL",
        this.toExpression(),
        true // postfix operator
      )
    ) as Types.Bool<1>;
  }

  /**
   * SQL IS NOT NULL operator - checks if the value is not null
   */
  isNotNull(): Types.Bool<1> {
    return Types.Bool.new(
      new UnaryOperatorExpression(
        "IS NOT NULL",
        this.toExpression(),
        true // postfix operator
      )
    ) as Types.Bool<1>;
  }

  /**
   * SQL IS DISTINCT FROM operator - null-safe inequality comparison
   * Returns true when values are different, treating NULL as a known value
   * NULL IS DISTINCT FROM NULL = false
   * NULL IS DISTINCT FROM value = true
   * value IS DISTINCT FROM value = false
   */
  isDistinctFrom<R2, N2 extends number>(
    other: Types.Any<R2, N2> | Types.Input<Types.Any<R2, N2>>
  ): Types.Bool<1> {
    return Types.Bool.new(
      new BinaryOperatorExpression("IS DISTINCT FROM", [
        this.toExpression(),
        this.toExpressionHelper(other),
      ])
    ) as Types.Bool<1>;
  }

  /**
   * SQL IS NOT DISTINCT FROM operator - null-safe equality comparison
   * Returns true when values are the same, treating NULL as a known value
   * NULL IS NOT DISTINCT FROM NULL = true
   * NULL IS NOT DISTINCT FROM value = false
   * value IS NOT DISTINCT FROM value = true
   */
  isNotDistinctFrom<R2, N2 extends number>(
    other: Types.Any<R2, N2> | Types.Input<Types.Any<R2, N2>>
  ): Types.Bool<1> {
    return Types.Bool.new(
      new BinaryOperatorExpression("IS NOT DISTINCT FROM", [
        this.toExpression(),
        this.toExpressionHelper(other),
      ])
    ) as Types.Bool<1>;
  }

  /**
   * SQL CAST operator - converts a value to a different type
   * CAST(expression AS target_type)
   */
  cast<N extends number, T extends typeof Any<unknown, N>>(
    this: Any<unknown, N>,
    targetType: T
  ): WithNullability<N, ReturnType<T["new"]>> {
    const typeStr = targetType.typeString();
    if (!typeStr) {
      throw new Error(
        `Cannot cast to type without typeString(): target type must be a concrete SQL type`
      );
    }
    return targetType.new(
      new CastExpression(this.toExpression(), typeStr)
    ) as WithNullability<N, ReturnType<T["new"]>>;
  }

  /**
   * SQL IN operator - checks if value is in a list or subquery result
   * value IN (1, 2, 3) or value IN (SELECT ...)
   */
  in<R>(
    list: Types.Input<Any<R, 0 | 1>>[] | Types.Setof<any>
  ): Types.Bool<1> {
    return Types.Bool.new(
      new InExpression(
        this.toExpression(),
        Array.isArray(list) 
          ? list.map(item => this.toExpressionHelper(item))
          : list
      )
    ) as Types.Bool<1>;
  }

  /**
   * SQL NOT IN operator - checks if value is not in a list or subquery result
   * value NOT IN (1, 2, 3) or value NOT IN (SELECT ...)
   */
  notIn<R>(
    list: Types.Input<Any<R, 0 | 1>>[] | Types.Setof<any>
  ): Types.Bool<1> {
    return Types.Bool.new(
      new NotInExpression(
        this.toExpression(),
        Array.isArray(list) 
          ? list.map(item => this.toExpressionHelper(item))
          : list
      )
    ) as Types.Bool<1>;
  }
}

export type AnyType = Any<unknown>;
