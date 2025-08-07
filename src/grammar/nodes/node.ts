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
        },
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

export const toParserInfo = (
  node: Node,
  preferObject?: boolean,
): ParserInfo => {
  const raw = node.toParserInfo(preferObject);
  if (node.isOptional && !isObject(raw.params) && !(node instanceof Repeated)) {
    return new Repeated(node, node.isOptional).toParserInfo(preferObject);
  }
  return raw;
};

export abstract class Node {
  isOptional: boolean;

  constructor(isOptional = false) {
    this.isOptional = isOptional;
  }

  copy(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  optional(): this {
    const copy = this.copy();
    copy.isOptional = true;
    return copy;
  }

  repeated() {
    return new Repeated<this>(this, this.isOptional);
  }

  // Generate both type parameter and parser function
  abstract toParserInfo(preferObject?: boolean): ParserInfo;

  toString(): string {
    return `${inspect(this)}(${this.isOptional ? "optional" : ""})`;
  }
}

export type ParserContext = {
  topLevelClause: ParsedClause;
  expressionContext: ExpressionContext;
};

export abstract class ParsedNode<N extends Node, T> {
  constructor(
    public grammar: N,
    public value: T,
  ) {}

  static parse<N extends Node, T>(
    _grammar: N,
    _value: any,
  ): ParsedNode<Node, T> | null {
    throw new Error("Not implemented");
  }

  abstract compile(ctx: ParserContext): RawBuilder<any>;
}

// Repeated:

export class Repeated<N extends Node = Node> extends Node {
  type = "repeated";
  child: N;

  constructor(child: N, optional = false) {
    super(optional);
    this.child = child;
  }

  toParserInfo(preferObject?: boolean): ParserInfo {
    return ParsedRepeated.toParserInfo(this, preferObject);
  }
}

export class ParsedRepeated extends ParsedNode<
  Repeated,
  ParsedNode<Node, unknown>[]
> {
  constructor(grammar: Repeated, value: ParsedNode<Node, unknown>[]) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Repeated, preferObject?: boolean): ParserInfo {
    const raw = grammar.child.toParserInfo(preferObject);

    return {
      params: {
        type: "identifier",
        value: `Types.Repeated<${paramsToType(raw.params)}>${grammar.isOptional ? " | []" : ""}`,
      },
      parse: (valueRaw: any) => {
        const tryParse = (value: any) => {
          if (!Array.isArray(value)) {
            return null; // Expected an array
          }
          const parsed: ParsedNode<Node, unknown>[] = [];
          for (const item of value) {
            const parsedItem = raw.parse(item);
            if (parsedItem == null) {
              return parsedItem; // Parsing failed for this item
            }
            parsed.push(parsedItem);
          }
          return new ParsedRepeated(grammar, parsed);
        };

        return tryParse(valueRaw) ?? tryParse([valueRaw]);
      },
    };
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    const compiled = this.value.map((item) => item.compile(ctx));
    return compiled.length === 0 ? sql`` : sql.join(compiled);
  }
}
