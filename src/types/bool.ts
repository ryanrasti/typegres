import { Bool as PgBool } from "../gen/types/bool";
import * as Types from "../types";
import {
  BinaryOperatorExpression,
  UnaryOperatorExpression,
  Expression,
} from "../expression";

export default class Bool<N extends number> extends PgBool<N> {
  /**
   * Helper to convert a boolean value to an Expression
   */
  private toBoolExpression(
    value: Types.Bool<any> | Types.Input<Types.Bool<any>>,
  ): Expression {
    return value instanceof Types.Any
      ? value.toExpression()
      : Types.Bool.new(value as boolean).toExpression();
  }

  /**
   * SQL AND operator - combines two boolean expressions
   * Returns true only when both expressions are true
   */
  and<N2 extends number>(
    other: Types.Bool<N2> | Types.Input<Types.Bool<N2>>,
  ): Types.Bool<N | N2> {
    return Types.Bool.new(
      new BinaryOperatorExpression("AND", [
        this.toExpression(),
        this.toBoolExpression(other),
      ]),
    ) as Types.Bool<N | N2>;
  }

  /**
   * SQL OR operator - combines two boolean expressions
   * Returns true when at least one expression is true
   */
  or<N2 extends number>(
    other: Types.Bool<N2> | Types.Input<Types.Bool<N2>>,
  ): Types.Bool<N | N2> {
    return Types.Bool.new(
      new BinaryOperatorExpression("OR", [
        this.toExpression(),
        this.toBoolExpression(other),
      ]),
    ) as Types.Bool<N | N2>;
  }

  /**
   * SQL NOT operator - negates a boolean expression
   * Returns true when the expression is false and vice versa
   */
  not(): Types.Bool<N> {
    return Types.Bool.new(
      new UnaryOperatorExpression(
        "NOT",
        this.toExpression(),
        false, // prefix operator
      ),
    ) as Types.Bool<N>;
  }
}
