import { RawBuilder } from "kysely";
import { ParsedNode, ParserInfo, Node, ParserContext } from "./node";
import { Any } from "../../types";

export class Expression extends Node {
  type = "expression";
  returnType:
    | "Types.Any<unknown, 0 | 1>"
    | "Types.Bool<0 | 1>"
    | "Types.NumericLike"
    | "Types.Table<any>";
  name: string;

  constructor(
    returnType:
      | "Types.Any<unknown, 0 | 1>"
      | "Types.Bool<0 | 1>"
      | "Types.NumericLike"
      | "Types.Table<any>" = "Types.Any<unknown, 0 | 1>",
    name: string = "expression",
    optional = false,
  ) {
    super(optional);
    this.returnType = returnType;
    this.name = name;
  }

  toParserInfo(): ParserInfo {
    return ParsedExpression.toParserInfo(this);
  }
}

export class ParsedExpression extends ParsedNode<Expression, Any> {
  constructor(grammar: Expression, value: Any) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Expression): ParserInfo {
    return {
      params: {
        type: "identifier",
        value: grammar.returnType,
      },
      parse: (arg: any) => {
        if (!(arg instanceof Any)) {
          return null; // Expected an expression of type Any
        }
        return new ParsedExpression(grammar, arg);
      },
    };
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.value.toExpression().compile(ctx.expressionContext);
  }
}

export class Condition extends Expression {
  type = "condition";
  constructor(optional = false) {
    super("Types.Bool<0 | 1>", "condition", optional);
  }
}
