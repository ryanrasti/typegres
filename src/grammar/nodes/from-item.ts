import { RawBuilder } from "kysely";
import { Setof } from "../../types";
import { Context } from "../../expression";
import { ParsedNode, ParserInfo, Node } from "./node";

export class FromItem extends Node {
  type = "fromItem";
  typeParam: string;

  constructor(typeParam: string, optional = false, repeated = false) {
    super(optional, repeated);
    this.typeParam = typeParam;
  }

  toParam() {
    return this.typeParam;
  }

  toParserInfo(): ParserInfo {
    return ParsedFromItem.toParserInfo(this);
  }
}

export class ParsedFromItem extends ParsedNode<FromItem, Setof<any>> {
  constructor(grammar: FromItem, value: Setof<any>) {
    super(grammar, value);
  }

  static toParserInfo(grammar: FromItem): ParserInfo {
    return {
      params: { type: "identifier", value: grammar.typeParam },
      parse: (arg: any) => {
        if (!(arg instanceof Setof)) {
          return null; // Expected a Setof type for FromItem
        }
        return new ParsedFromItem(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    const todoContext = Context.new();
    return this.value.compile(todoContext);
  }
}
