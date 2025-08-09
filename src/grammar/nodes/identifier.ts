import { RawBuilder, sql } from "kysely";
import { Node, ParsedNode } from "./node";

export class Identifier<T extends string = string> extends Node {
  type = "identifier";
  name: T;

  constructor(name: T, optional = false) {
    super(optional);
    this.name = name;
  }

  parse(arg: T) {
    if (typeof arg !== "string") {
      return null; // Ensure the argument is a string
    }
    return new ParsedIdentifier(this, arg);
  }
}

export class ParsedIdentifier<I extends Identifier> extends ParsedNode<Identifier, I['name']> {
  constructor(grammar: Identifier, value: I['name']) {
    super(grammar, value);
  }

  compile(): RawBuilder<any> {
    // This would compile to a table/column reference
    return sql.ref(this.value as string);
  }
}
