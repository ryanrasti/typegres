import { RawBuilder, sql } from "kysely";
import { Node, ParsedNode } from "./node";

export class Literal<V extends string = string> extends Node {
  type = "literal";
  value: V;

  constructor(value: V, optional = false) {
    super(optional);
    this.value = value;
  }

  parse(value: V) {
    if (value !== this.value) {
      return null; // Ensure the value matches the literal
    }
    return new ParsedLiteral(this, value);
  }
}

export class LiteralAsObject<V extends string = string> extends Node {
  type = "literalAsObject";
  value: V;

  constructor(value: V, optional = false) {
    super(optional);
    this.value = value;
  }

  parse(obj: { [key in V]: true }) {
    if (obj[this.value] !== true) {
      return null; // Expected the literal to be true
    }
    return new ParsedLiteral(this, this.value);
  }
}

export class ParsedLiteral<
  L extends Literal | LiteralAsObject,
> extends ParsedNode<L, string> {
  constructor(grammar: L, value: string) {
    super(grammar, value);
  }

  compile(): RawBuilder<any> {
    return sql.raw(this.grammar.value);
  }
}
