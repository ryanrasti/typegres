import { Bool as PgBool } from "../gen/types/bool";
import * as Types from "../types";
import { BinaryOperatorExpression, UnaryOperatorExpression } from "../expression";

export default class Bool<N extends number> extends PgBool<N> {
  /**
   * SQL AND operator - combines two boolean expressions
   * Returns true only when both expressions are true
   */
  and<N2 extends number>(
    other: Types.Bool<N2> | Types.Input<Types.Bool<N2>>
  ): Types.Bool<N | N2> {
    const otherExpr = other instanceof Types.Any 
      ? other.toExpression() 
      : Types.Bool.new(other as any).toExpression();
    
    return Types.Bool.new(
      new BinaryOperatorExpression(
        "AND",
        [this.toExpression(), otherExpr]
      )
    ) as any;
  }

  /**
   * SQL OR operator - combines two boolean expressions
   * Returns true when at least one expression is true
   */
  or<N2 extends number>(
    other: Types.Bool<N2> | Types.Input<Types.Bool<N2>>
  ): Types.Bool<N | N2> {
    const otherExpr = other instanceof Types.Any 
      ? other.toExpression() 
      : Types.Bool.new(other as any).toExpression();
    
    return Types.Bool.new(
      new BinaryOperatorExpression(
        "OR",
        [this.toExpression(), otherExpr]
      )
    ) as any;
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
        false // prefix operator
      )
    ) as any;
  }
}