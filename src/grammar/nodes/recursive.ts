import { ParserInfo, Node, ParsedNode, ParserContext } from "./node";
import type { ParsedClause } from "./clause";
import { sql } from "kysely";

export class Recursive<
  T extends ParsedNode<Node, unknown> = ParsedNode<Node, unknown>,
> extends Node {
  type = "recursive";

  constructor(optional = false) {
    super(optional);
  }

  parse(value: T) {
    if (value instanceof ParsedNode) {
      return new ParsedRecursive(this, value);
    }
    return null;
  }
}

export class ParsedRecursive<
  T extends ParsedNode<Node, unknown>,
  R extends Recursive<T>,
> extends ParsedNode<R, T> {
  constructor(grammar: R, value: T) {
    super(grammar, value);
  }

  compile(ctx: ParserContext) {
    if (this.value.grammar.type === 'topLevelClause') {
      return sql`(${(this.value as unknown as ParsedClause).compile()})`;
    }
    return sql`(${this.value.compile(ctx)})`;
  }
}
