import { Expression, LiteralExpression, UnaryOperatorExpression, BinaryOperatorExpression, TernaryOperatorExpression } from "../expression";
import { Any as PgAny } from "../gen/types/any";
import { Context } from "../expression";
import { Typegres } from "../db";
import * as Types from "../types";

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
      new BinaryOperatorExpression(
        "IS DISTINCT FROM",
        [this.toExpression(), this.toExpressionHelper(other)]
      )
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
      new BinaryOperatorExpression(
        "IS NOT DISTINCT FROM",
        [this.toExpression(), this.toExpressionHelper(other)]
      )
    ) as Types.Bool<1>;
  }

  /**
   * SQL BETWEEN operator - checks if value is within a range (inclusive)
   * value BETWEEN lower AND upper is equivalent to value >= lower AND value <= upper
   * Returns null if any of the three values is null
   * Note: This will generate a runtime error if used on types without >= and <= operators
   */
  between<N2 extends number, N3 extends number>(
    lower: Types.Any<R, N2>,
    upper: Types.Any<R, N3>
  ): Types.Bool<N | N2 | N3> {
    return Types.Bool.new(
      new TernaryOperatorExpression(
        "BETWEEN",
        "AND",
        this.toExpression(),
        this.toExpressionHelper(lower),
        this.toExpressionHelper(upper)
      )
    ) as Types.Bool<N | N2 | N3>;
  }

  /**
   * SQL NOT BETWEEN operator - checks if value is outside a range
   * value NOT BETWEEN lower AND upper is equivalent to value < lower OR value > upper
   * Returns null if any of the three values is null
   * Note: This will generate a runtime error if used on types without >= and <= operators
   */
  notBetween<N2 extends number, N3 extends number>(
    lower: Types.Any<R, N2>,
    upper: Types.Any<R, N3>
  ): Types.Bool<N | N2 | N3> {
    return Types.Bool.new(
      new TernaryOperatorExpression(
        "NOT BETWEEN",
        "AND",
        this.toExpression(),
        this.toExpressionHelper(lower),
        this.toExpressionHelper(upper)
      )
    ) as Types.Bool<N | N2 | N3>;
  }
}

export type AnyType = Any<unknown>;
