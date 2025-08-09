import { RawBuilder } from "kysely";
import { RowLike } from "../../types";
import { AsFromItem, FromItem, isAsFromItem } from "../../query/from-item";
import { ParsedNode, Node, ParserContext } from "./node";

export class FromItemNode<F extends AsFromItem = AsFromItem> extends Node {
  type = "fromItem";
  typeParam: string;

  constructor(typeParam: string, optional = false) {
    super(optional);
    this.typeParam = typeParam;
  }

  toParam() {
    return this.typeParam;
  }

  parse(arg: F) {
    if (!(isAsFromItem(arg))) {
      return null; // Ensure the argument is an AsFromItem
    }
    return new ParsedFromItem(this, arg.asFromItem());
  }
}

export class ParsedFromItem<N extends FromItemNode> extends ParsedNode<
  N,
  FromItem<RowLike>
> {
  constructor(grammar: N, value: FromItem<RowLike>) {
    super(grammar, value);
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.value.compile(ctx.expressionContext);
  }
}
