import { RawBuilder } from "kysely";
import invariant from "tiny-invariant";
import { ParsedNode, ParserInfo, Node } from "./node";
import { Any } from "../../types";
import { Context } from "../../expression";

export class Expression extends Node {
  type = "expression";
  returnType:
    | "Types.Any<unknown, 0 | 1>"
    | "Types.Bool<0 | 1>"
    | "Types.NumericLike"
    | "Types.Table<any>";
  context: string[];
  name: string;

  constructor(
    context: [string] | [],
    returnType:
      | "Types.Any<unknown, 0 | 1>"
      | "Types.Bool<0 | 1>"
      | "Types.NumericLike"
      | "Types.Table<any>" = "Types.Any<unknown, 0 | 1>",
    name: string = "expression",
    optional = false,
    repeated = false,
  ) {
    super(optional, repeated);
    this.context = context;
    this.returnType = returnType;
    this.name = name;
  }

  toParserInfo(): ParserInfo {
    return ParsedExpression.toParserInfo(this);
  }
}

export class ParsedExpression<T = any> extends ParsedNode<Expression, T> {
  constructor(grammar: Expression, value: T) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Expression): ParserInfo {
    return {
      params: {
        type: "identifier",
        value:
          grammar.context.length === 0
            ? grammar.returnType
            : grammar.context.length === 1 && !grammar.context[0].includes("<")
              ? `(arg: ${grammar.context[0]}) => ${grammar.returnType}`
              : grammar.context.some((c) => c.includes("<"))
                ? `(args: ${grammar.context.join(", ")}) => ${grammar.returnType}`
                : `(${grammar.context.map((c, i) => `arg${i}: ${c}`).join(", ")}) => ${grammar.returnType}`,
      },
      parse: (arg: any) => {
        if (grammar.context.length === 0) {
          if (!(arg instanceof Any)) {
            return null; // Expected an expression of type Any
          }
          return new ParsedExpression(grammar, arg);
        }
        if (typeof arg !== "function") {
          return null; // Expected a function for expression
        }
        return new ParsedExpression(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    // TODO: we will need to pass a context here and look up the arguments
    //    from the context. For now just call the function directly.
    const result = typeof this.value === "function" ? this.value() : this.value;
    invariant(
      result instanceof Any,
      "Expression must return an instance of Any",
    );
    const todoContext = Context.new();
    return result.toExpression().compile(todoContext);
  }
}

export class Condition extends Expression {
  type = "condition";
  constructor(context: [string] | [], optional = false, repeated = false) {
    super(context, "Types.Bool<0 | 1>", "condition", optional, repeated);
  }
}
