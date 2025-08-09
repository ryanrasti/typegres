import { RawBuilder, sql } from "kysely";
import camelCase from "camelcase";
import { ParsedClause } from "./clause";
import { Context as ExpressionContext } from "../../expression";
import { inspect } from "cross-inspect";

export type ObjectParam = {
  type: "object";
  value: { [k in string]: { value: Params; optional?: boolean } };
};
// Representation of a type that will be generated:
export type Params =
  | { type: "identifier"; value: string }
  | { type: "atom"; value: string }
  // A list of parameters
  | {
      type: "array";
      value: Params[];
      minLength?: number;
      maxLength?: number;
      optionalAt?: number;
    }
  // A clause with the key as the name and value as its parameters
  | ObjectParam
  | { type: "union"; value: Params[]; exclusive?: boolean }
  | { type: "intersection"; value: Params[] };

export const paramsToType = (params: Params): string => {
  switch (params.type) {
    case "identifier":
      return params.value;
    case "atom":
      // Convert ALL_CAPS to camelCase for string literals
      const camelCased = camelCase(params.value);
      return `"${camelCased}"`;
    case "array":
      if (params.minLength === 0 && params.maxLength === 1) {
        // Optional: [X] | []
        return `[${params.value.map(paramsToType).join(", ")}] | []`;
      } else if (params.minLength === 1 && params.maxLength === Infinity) {
        // Repeated: [X, ...X[]]
        const types = params.value.map(paramsToType);
        if (types.length === 1) {
          return `[${types[0]}, ...(${types[0]})[]]`;
        }
        return `[${types.join(", ")}]`;
      } else if (params.minLength === 0 && params.maxLength === Infinity) {
        // Optional repeated: X[]
        const types = params.value.map(paramsToType);
        if (types.length === 1) {
          return `${types[0]}[]`;
        }
        return `[${types.join(", ")}][]`;
      } else {
        // Array literal:
        return `[${params.value
          .map((val, idx) => {
            const type = paramsToType(val);
            if (params.optionalAt != null && idx >= params.optionalAt) {
              return `(${type})?`;
            }
            return type;
          })
          .join(", ")}]`;
      }
    case "object":
      const entries = Object.entries(params.value).map(
        ([key, { value, optional }]) => {
          // Convert object keys to camelCase
          const camelKey = camelCase(key);
          const valueType = paramsToType(value);
          return `${camelKey}${optional ? "?" : ""}: ${valueType}`;
        }
      );
      return `{${entries.join(", ")}}`;
    case "union":
      return `(${params.value.map((x) => `(${paramsToType(x)})`).join(" | ")})`;
    case "intersection":
      // For better dx, merge all simple objects in the intersection:
      return params.value.map((x) => `(${paramsToType(x)})`).join(" & ");
  }
};

const isObject = (params: Params): params is ObjectParam => {
  return (
    params.type === "object" ||
    (params.type === "intersection" && params.value.every(isObject)) ||
    (params.type === "union" && params.value.every(isObject))
  );
};

export type ParsedNodeType =
  // Normal parsed node (or optional that is present)
  | ParsedNode<Node, unknown>
  // Optional parsed node (that is not present)
  | undefined;

type Parser = (value: any) => ParsedNodeType | null;

export type ParserInfo = {
  parse: Parser;
  params: Params;
};

export type ParseInputType<N extends Node> = Parameters<N["parse"]>[0];
export type ParseReturnType<N extends Node> = NonNullable<
  ReturnType<N["parse"]>
>;

export abstract class Node {
  isOptional: boolean;
  abstract type: string;

  constructor(isOptional = false) {
    this.isOptional = isOptional;
  }

  copy(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  optional(): this & { isOptional: true } {
    const copy = this.copy();
    copy.isOptional = true;
    return copy as this & { isOptional: true };
  }

  repeated(joiner?: (raw: RawBuilder<any>[]) => RawBuilder<any>) {
    return new Repeated<this>(
      this,
      joiner ??
        ((raw: RawBuilder<any>[]) =>
          raw.length === 0 ? sql`` : sql.join(raw)),
      this.isOptional
    );
  }

  toString(): string {
    return `${inspect(this)}(${this.isOptional ? "optional" : ""})`;
  }

  abstract parse(value: unknown): ParsedNode<Node, unknown> | null;
}

export type ParserContext = {
  topLevelClause: ParsedClause;
  expressionContext: ExpressionContext;
};

export abstract class ParsedNode<N extends Node, T> {
  constructor(
    public grammar: N,
    public value: T
  ) {}

  static parse<N extends Node, T>(
    _grammar: N,
    _value: any
  ): ParsedNode<Node, T> | null {
    throw new Error("Not implemented");
  }

  abstract compile(ctx: ParserContext): RawBuilder<any>;
}

// Repeated:

export class Repeated<N extends Node = Node> extends Node {
  type = "repeated";
  child: N;
  joiner: (raw: RawBuilder<any>[]) => RawBuilder<any>;

  constructor(
    child: N,
    joiner: (raw: RawBuilder<any>[]) => RawBuilder<any>,
    optional = false
  ) {
    super(optional);
    this.child = child;
    this.joiner = joiner;
  }

  parse(valueRaw: ParseInputType<N>) {
    const tryParse = (value: any) => {
      if (!Array.isArray(value)) {
        return null; // Expected an array
      }

      const parsed: ParsedNode<Node, unknown>[] = [];
      for (const item of value) {
        const parsedItem = this.child.parse(item);
        if (parsedItem == null) {
          return parsedItem; // Parsing failed for this item
        }
        parsed.push(parsedItem);
      }
      return new ParsedRepeated(this, parsed);
    };

    return tryParse(valueRaw) ?? tryParse([valueRaw]);
  }
}

export class ParsedRepeated extends ParsedNode<
  Repeated,
  ParsedNode<Node, unknown>[]
> {
  constructor(grammar: Repeated, value: ParsedNode<Node, unknown>[]) {
    super(grammar, value);
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.grammar.joiner(this.value.map((item) => item.compile(ctx)));
  }
}
