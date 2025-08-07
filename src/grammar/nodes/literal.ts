import camelCase from "camelcase";
import { RawBuilder, sql } from "kysely";
import { Node, ParsedNode, ParserInfo } from "./node";

export class Literal extends Node {
  type = "literal";
  value: string;

  constructor(value: string, optional = false) {
    super(optional);
    this.value = value;
  }

  toParam() {
    return `"${this.value}"`;
  }

  toParserInfo(preferObject?: boolean) {
    return ParsedLiteral.toParserInfo(this, preferObject);
  }
}

export class ParsedLiteral extends ParsedNode<Literal, string> {
  constructor(grammar: Literal, value: string) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Literal, preferObject?: boolean): ParserInfo {
    if (preferObject) {
      // For better DX, optional literals are placed in an object
      return {
        params: {
          type: "object",
          value: {
            [camelCase(grammar.value)]: {
              value: { type: "identifier", value: "true" },
              optional: grammar.isOptional,
            },
          },
        },
        parse: (arg: any) => {
          if (typeof arg !== "object" || !arg) {
            return null; // Expected an object with the literal key
          }
          if (
            !(camelCase(grammar.value) in arg) ||
            arg[camelCase(grammar.value)] !== true
          ) {
            return null; // Key not found, but it's optional
          }
          return new ParsedLiteral(grammar, camelCase(grammar.value));
        },
      };
    }

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
