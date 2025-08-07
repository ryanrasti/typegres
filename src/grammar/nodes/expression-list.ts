import { RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Any, RowLike } from "../../types";
import { ParsedNode, ParserInfo, Node, ParserContext } from "./node";

export class ExpressionList extends Node {
  type = "expressionList";
  returnTypeParam: string;
  format: "alias" | "assignment" | "bare" | "values";

  constructor(
    format: "alias" | "assignment" | "bare" | "values",
    returnTypeParam?: string,
    optional = false,
  ) {
    super(optional);
    this.returnTypeParam =
      returnTypeParam ?? (format === "bare" ? "Types.Any[]" : "Types.RowLike");
    this.format = format;
  }

  toParserInfo(): ParserInfo {
    return ParsedExpressionList.toParserInfo(this);
  }
}

export class ParsedExpressionList extends ParsedNode<ExpressionList, RowLike> {
  constructor(grammar: ExpressionList, value: RowLike) {
    super(grammar, value);
  }

  static toParserInfo(grammar: ExpressionList): ParserInfo {
    return {
      params: {
        type: "identifier",
        value: grammar.returnTypeParam,
      },
      parse: (value: any) => {
        if (typeof value !== "object") {
          return null; // Expected a function for expression list
        }
        return new ParsedExpressionList(grammar, value);
      },
    };
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    if (
      this.grammar.format === "alias" ||
      this.grammar.format === "assignment"
    ) {
      invariant(
        typeof this.value === "object" && this.value != null,
        "ExpressionList must return an object",
      );
      return sql.join(
        Object.entries(this.value).map(([key, value]) => {
          // Handle Any types by converting to expression
          invariant(
            value instanceof Any,
            `Value must be an instance of Any, got: ${value}`,
          );
          const compiledValue = value
            .toExpression()
            .compile(ctx.expressionContext);

          return this.grammar.format === "alias"
            ? sql`${compiledValue} AS ${sql.ref(key)}`
            : sql`${sql.ref(key)} = ${compiledValue}`;
        }),
      );
    }
    // TODO: bare: it should just be a list -- but we don't parse correctly yet, so it's just
    //   a single value:
    invariant(
      this.value instanceof Any,
      "Bare expression must be an instance of Any",
    );
    return this.value.toExpression().compile(ctx.expressionContext);
  }
}
