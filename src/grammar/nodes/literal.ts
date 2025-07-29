import camelCase from "camelcase";
import { RawBuilder, sql } from "kysely";
import { Node, ParsedNode, ParserInfo } from "./node";

export class Literal extends Node {
  type = "literal";
  value: string;

  constructor(value: string, optional = false, repeated = false) {
    super(optional, repeated);
    this.value = value;
  }

  toParam() {
    return `"${this.value}"`;
  }

  toParserInfo() {
    return ParsedLiteral.toParserInfo(this);
  }
}

export class ParsedLiteral extends ParsedNode<Literal, string> {
  constructor(grammar: Literal, value: string) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Literal): ParserInfo {
    return {
      params: { type: "atom", value: grammar.value },
      parse: (arg: any) => {
        // Check for camelCase match
        if (arg !== camelCase(grammar.value)) {
          return null; // Value does not match the literal
        }
        return new ParsedLiteral(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    return sql.raw(this.grammar.value);
  }
}
