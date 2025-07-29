import { RawBuilder, sql } from "kysely";
import { Node, ParsedNode, ParserInfo } from "./node";

export class Identifier extends Node {
  type = "identifier";
  name: string;
  withAlias: boolean;
  typeParam: string;

  constructor(
    name: string,
    typeParam: string,
    withAlias = false,
    optional = false,
    repeated = false,
  ) {
    super(optional, repeated);
    this.name = name;
    this.withAlias = withAlias;
    this.typeParam = typeParam;
  }

  toParserInfo(): ParserInfo {
    return ParsedIdentifier.toParserInfo(this, this.typeParam);
  }
}

export class ParsedIdentifier<T = any> extends ParsedNode<Identifier, T> {
  constructor(grammar: Identifier, value: T) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Identifier, _value: any): ParserInfo {
    return {
      params: { type: "identifier", value: grammar.typeParam },
      parse: (arg: any) => {
        if (typeof arg !== "string") {
          return null; // Expected a string identifier
        }
        return new ParsedIdentifier(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    // This would compile to a table/column reference
    return sql.ref(this.value as string);
  }
}
