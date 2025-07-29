import { RawBuilder } from "kysely";
import camelCase from "camelcase";
import invariant from "tiny-invariant";

export type ObjectParam = {
  type: "object";
  value: { [k in string]: { value: Params; optional?: boolean } };
};
// Representation of a type that will be generated:
export type Params =
  | { type: "identifier"; value: string }
  | { type: "atom"; value: string }
  // A list of parameters
  | { type: "array"; value: Params[]; minLength?: number; maxLength?: number }
  // A clause with the key as the name and value as its parameters
  | ObjectParam
  | { type: "union"; value: Params[]; exclusive?: boolean }
  | { type: "intersection"; value: Params[] };

const paramsToType = (params: Params): string => {
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
        // Regular array
        return `[${params.value.map(paramsToType).join(", ")}]`;
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
      return `(${params.value.map(paramsToType).join(" | ")})`;
    case "intersection":
      // For better dx, merge all simple objects in the intersection:
      return params.value.map(paramsToType).join(" & ");
  }
};

export type ParsedNodeType =
  // Normal parsed node (or optional, non-repeated that is present)
  | ParsedNode<Node, unknown>
  // Repeated parsed nodes (or optional, repeated that is present)
  | ParsedNode<Node, unknown>[]
  // Optional parsed node (that is not present)
  | undefined;

type Parser = (value: any) => ParsedNodeType | null;

export type ParserInfo = {
  parse: Parser;
  params: Params;
};

export const toParserInfo = (node: Node): ParserInfo => {
  const raw = node.toParserInfo();
  if (node.isOptional || node.isRepeated) {
    return {
      params: {
        type: "array",
        value: [raw.params],
        minLength: node.isOptional ? 0 : 1,
        maxLength: node.isRepeated ? Infinity : 1,
      },
      parse: (value: any) => {
        if (!Array.isArray(value)) {
          return null; // Expected an array
        }
        if (value.length === 0 && node.isOptional) {
          return [];
        }
        if (value.length > 1 && !node.isRepeated) {
          return null; // Too many values for a non-repeated node
        }
        const parsed: ParsedNode<Node, unknown>[] = [];
        for (const item of value) {
          const parsedItem = raw.parse(item);
          if (parsedItem === null) {
            return null; // Parsing failed for this item
          }
          // TODO: not correctly handling the case of nested optional/repeated
          //    nodes
          invariant(parsedItem instanceof ParsedNode);
          parsed.push(parsedItem);
        }
        return parsed;
      },
    };
  }
  return raw;
};

export abstract class Node {
  isOptional: boolean;
  isRepeated: boolean;

  constructor(isOptional = false, isRepeated = false) {
    this.isOptional = isOptional;
    this.isRepeated = isRepeated;
  }

  copy(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  optional(): this {
    const copy = this.copy();
    copy.isOptional = true;
    return copy;
  }

  repeated(): this {
    const copy = this.copy();
    copy.isRepeated = true;
    return copy;
  }

  // Generate both type parameter and parser function
  abstract toParserInfo(): ParserInfo;
}

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

  abstract compile(): RawBuilder<any>;
}
