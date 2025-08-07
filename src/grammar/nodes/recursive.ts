import { ParserInfo, Node, ParsedNode, ParserContext } from "./node";
import type { ParsedClause } from "./clause";
import { sql } from "kysely";

export class Recursive extends Node {
  type = "recursive";
  params: string;

  constructor(params: string, optional = false) {
    super(optional);
    this.params = params;
  }

  toParserInfo(): ParserInfo {
    return ParsedRecursive.toParserInfo(this);
  }
}

export class ParsedRecursive extends ParsedNode<Recursive, ParsedClause> {
  constructor(grammar: Recursive, value: ParsedClause) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Recursive): ParserInfo {
    return {
      params: { type: "identifier", value: grammar.params },
      parse: (value: unknown) => {
        if (value instanceof ParsedNode) {
          return new ParsedRecursive(
            grammar,
            // TODO: doing a cast here because importing `ParsedClause` directly causes circular dependencies
            value as ParsedClause,
          );
        }
        return null;
      },
    };
  }

  compile(_ctx: ParserContext) {
    // Note that we intentionally do not propagate the context here,
    // as the recursive node should have its own context.
    return sql`(${this.value.compile()})`;
  }
}
