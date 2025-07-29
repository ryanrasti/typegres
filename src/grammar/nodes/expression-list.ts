import { RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Any } from "../../types";
import { Context } from "../../expression";
import { ParsedNode, ParserInfo, Node } from "./node";

export class ExpressionList extends Node {
  type = "expressionList";
  context: string;
  returnTypeParam: string;
  format: "alias" | "assignment" | "bare";

  constructor(
    contextAndReturnTypeParam: [string] | [string, string],
    format: "alias" | "assignment" | "bare",
    optional = false,
    repeated = false,
  ) {
    super(optional, repeated);
    this.context = contextAndReturnTypeParam[0];
    this.returnTypeParam = contextAndReturnTypeParam[1] ?? "Types.RowLike";
    this.format = format;
  }

  toParserInfo(): ParserInfo {
    return ParsedExpressionList.toParserInfo(this);
  }
}

export class ParsedExpressionList<T = any> extends ParsedNode<
  ExpressionList,
  T
> {
  constructor(grammar: ExpressionList, value: T) {
    super(grammar, value);
  }

  static toParserInfo(grammar: ExpressionList): ParserInfo {
    return {
      params: {
        type: "identifier",
        value: grammar.context.includes("<")
          ? `(args: ${grammar.context}) => ${grammar.returnTypeParam}`
          : grammar.context === ""
            ? `() => ${grammar.returnTypeParam}`
            : `(arg: ${grammar.context}) => ${grammar.returnTypeParam}`,
      },
      parse: (value: any) => {
        if (typeof value !== "function") {
          return null; // Expected a function for expression list
        }
        return new ParsedExpressionList(grammar, value);
      },
    };
  }

  compile(): RawBuilder<any> {
    // TODO: we will need to pass a context here and look up the arguments
    //    from the context. For now just call the function directly.
    if (typeof this.value !== "function") {
      throw new Error("ExpressionList value is not a function");
    }
    const result = this.value();
    if (
      this.grammar.format === "alias" ||
      this.grammar.format === "assignment"
    ) {
      invariant(
        typeof result === "object" && result != null,
        "ExpressionList must return an object",
      );
      return sql.join(
        Object.entries(result).map(([key, value]) => {
          // Handle Any types by converting to expression
          invariant(value instanceof Any, "Value must be an instance of Any");
          const todoContext = Context.new();
          const compiledValue = value.toExpression().compile(todoContext);

          return this.grammar.format === "alias"
            ? sql`${compiledValue} AS ${sql.ref(key)}`
            : sql`${sql.ref(key)} = ${compiledValue}`;
        }),
      );
    }
    // bare: it should just be a list:
    invariant(
      Array.isArray(result),
      "ExpressionList in bare format must return an array",
    );
    return sql.join(result.map((value) => sql`${value}`));
  }
}
