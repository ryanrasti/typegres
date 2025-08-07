import { RawBuilder } from "kysely";
import { RowLike } from "../../types";
import { FromItem, isAsFromItem } from "../../query/from-item";
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

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.value.compile(ctx.expressionContext);
  }
}
