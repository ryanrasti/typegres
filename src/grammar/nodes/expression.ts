import { RawBuilder } from "kysely";
import { ParsedNode, Node, ParserContext } from "./node";
import { Any, Bool } from "../../types";

export class Expression<T extends Any = Any> extends Node {
  type = "expression";
  name: string;

  constructor(name: string = "expression", optional = false) {
    super(optional);
    this.name = name;
  }

  parse(arg: T) {
    if (!(arg instanceof Any)) {
      return null; // Ensure the argument is an instance of Any
    }
    return new ParsedExpression(this, arg);
  }
}

export class ParsedExpression<E extends Expression> extends ParsedNode<E, Any> {
  constructor(grammar: E, value: Any) {
    super(grammar, value);
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.value.toExpression().compile(ctx.expressionContext);
  }
}

export class Condition extends Expression<Bool<0 | 1>> {
  type = "condition";
  constructor(optional = false) {
    super("condition", optional);
  }
}
