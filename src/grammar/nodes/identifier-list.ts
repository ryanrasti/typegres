import { RawBuilder, sql } from "kysely";
import { Node, ParsedNode, ParserInfo, ParserContext } from "./node";

export class IdentifierList extends Node {
  type = "identifierList";
  name: string;
  typeParam: string;

  constructor(
    name: string,
    typeParam: string,
    optional = false,
  ) {
    super(optional);
    this.name = name;
    this.typeParam = typeParam;
  }

  toParserInfo(): ParserInfo {
    return ParsedIdentifierList.toParserInfo(this);
  }
}

export class ParsedIdentifierList extends ParsedNode<IdentifierList, string[]> {
  constructor(grammar: IdentifierList, value: string[]) {
    super(grammar, value);
  }

  static toParserInfo(grammar: IdentifierList): ParserInfo {
    return {
      params: {
        type: "array",
        value: [{ type: "identifier", value: grammar.typeParam }],
        minLength: 0,
        maxLength: Infinity,
      },
      parse: (arg: any) => {
        if (!Array.isArray(arg)) {
          return null; // Expected an array of identifiers
        }
        // Check that all elements are strings
        if (!arg.every((item) => typeof item === "string")) {
          return null;
        }
        return new ParsedIdentifierList(grammar, arg);
      },
    };
  }

  compile(_ctx: ParserContext): RawBuilder<any> {
    if (this.value.length === 0) {
      return sql``;
    }

    // Wrap column names in parentheses
    const columns = sql.join(this.value.map((col) => sql.ref(col)));
    return sql`(${columns})`;
  }
}
