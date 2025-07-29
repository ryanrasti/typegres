import camelCase from "camelcase";
import invariant from "tiny-invariant";
import { Clause } from "./clause";
import { Node, Params } from "./node";
import { Group } from "./group";

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

export class TopLevelClause extends Clause {
  type = "topLevelClause";
  typeParams: string;
  returnType: string;

  constructor(
    name: string,
    typeParams: string,
    returnType: string,
    args: Node[],
    optional = false,
    repeated = false,
  ) {
    super(name, args, optional, repeated);
    this.typeParams = typeParams;
    this.returnType = returnType;
  }

  generateParserTypes(): string {
    // For now, skip generating complex types until the parser is more complete
    // This avoids TypeScript errors with incomplete type definitions
    return "// Type declarations will be generated when the AST parser is complete";
  }

  generateParsedClass(): string {
    // Generate a simple parsed class that extends ParsedNode
    const className = `Parsed${this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()}`;

    // Collect all the arguments that will be in the parsed class
    const args: { name: string; optional: boolean }[] = [];

    const processNode = (node: Node): void => {
      if (node instanceof Clause && !(node instanceof TopLevelClause)) {
        const name = camelCase(node.name);
        args.push({ name, optional: node.isOptional });
      } else if (node instanceof Group) {
        node.nodes.forEach(processNode);
      }
    };

    this.args.nodes.forEach(processNode);

    // Generate constructor parameters
    const constructorParams = args
      .map(({ name, optional }) => {
        // Handle reserved words
        const propName = name === "for" ? "forClause" : name;
        return `public ${propName}${optional ? "?" : ""}: ParsedClause`;
      })
      .join(",\n    ");

    // Simplified without generic types for now
    return `export class ${className} extends ParsedNode<TopLevelClause, unknown> {
  constructor(
    grammar: TopLevelClause,
    ${constructorParams}
  ) {
    super(grammar, undefined);
  }

  compile(): RawBuilder<any> {
    // TODO: Implement compilation logic
    throw new Error("Compilation not yet implemented for ${className}");
  }
}`;
  }

  generateParser(): string {
    const funcName = camelCase(this.name);
    // Collect all parameters in order
    const info = this.args.toParserInfo();
    const { params } = info;
    invariant(params.type === "array", "Expected params to be an array");

    // Generate the function overload and implementation
    return `export function ${funcName}${this.typeParams}(
  ${params.value.map((p, idx) => `arg${idx}: ${paramsToType(p)}`).join(",\n  ")}
): ParsedClause;
export function ${funcName}(...args: any[]) {
  // TopLevelClause expects the args wrapped in an object with the clause name (camelCase)
  const wrappedArgs = { "${funcName}": args };
  const result = grammars.${funcName}.toParserInfo().parse(wrappedArgs);
  invariant(result != null, "Parser failed to parse ${funcName} statement");
  return result;
}`;
  }
}
