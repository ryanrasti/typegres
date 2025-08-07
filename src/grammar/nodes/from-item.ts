import { RawBuilder } from "kysely";
import { RowLike } from "../../types";
import { FromItem, isAsFromItem } from "../../query/from-item";
import { Context as ExpressionContext } from "../../expression";
import { ParsedNode, ParserInfo, Node, ParserContext } from "./node";

export class FromItemNode extends Node {
  type = "fromItem";
  typeParam: string;

  constructor(typeParam: string, optional = false) {
    super(optional);
    this.typeParam = typeParam;
  }

  toParam() {
    return this.typeParam;
  }

  toParserInfo(): ParserInfo {
    return ParsedFromItem.toParserInfo(this);
  }
}

export class ParsedFromItem extends ParsedNode<
  FromItemNode,
  FromItem<RowLike>
> {
  constructor(grammar: FromItemNode, value: FromItem<RowLike>) {
    super(grammar, value);
  }

  static toParserInfo(grammar: FromItemNode): ParserInfo {
    return {
      params: { type: "identifier", value: grammar.typeParam },
      parse: (arg: any) => {
        if (!isAsFromItem(arg)) {
          return null; // Expected a Setof type for FromItem
        }
        return new ParsedFromItem(grammar, arg.asFromItem());
      },
    };
  }

  todoApplyUpdateContext(ctx: ParserContext): ExpressionContext {
    // A hack to make sure the expression context in an UPDATE clause
    //   passes from the UPDATE to the FROM item.
    // const [maybeUpdate, maybeFrom] = extractUpdateAndFromItemAsSelectArgs(
    //   ctx.topLevelClause,
    // );
    // if (maybeUpdate && maybeFrom) {
    //   return pipeContextThroughExpressionContext(ctx.expressionContext, [
    //     maybeUpdate,
    //     undefined,
    //   ]);
    // }
    return ctx.expressionContext;
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.value.compile(this.todoApplyUpdateContext(ctx));
  }
}
