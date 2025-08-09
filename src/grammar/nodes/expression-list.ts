import { RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Any, RowLike } from "../../types";
import { ParsedNode, Node, ParserContext } from "./node";

export class ExpressionList<R extends RowLike = RowLike> extends Node {
  type = "expressionList";
  format: "alias" | "assignment";

  constructor(format: "alias" | "assignment", optional = false) {
    super(optional);
    this.format = format;
  }

  parse(value: R) {
    if (typeof value !== "object" || value === null) {
      return null; // Ensure the value is an object
    }
    return new ParsedExpressionList(this, value);
  }
}

export class ParsedExpressionList<E extends ExpressionList> extends ParsedNode<
  E,
  RowLike
> {
  constructor(grammar: E, value: RowLike) {
    super(grammar, value);
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return sql.join(
      Object.entries(this.value).map(([key, value]) => {
        // Handle Any types by converting to expression
        invariant(
          value instanceof Any,
          `Value must be an instance of Any, got: ${value}`
        );
        const compiledValue = value
          .toExpression()
          .compile(ctx.expressionContext);

        return this.grammar.format === "alias"
          ? sql`${compiledValue} AS ${sql.ref(key)}`
          : sql`${sql.ref(key)} = ${compiledValue}`;
      })
    );
  }
}
