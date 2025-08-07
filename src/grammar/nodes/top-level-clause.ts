import camelCase from "camelcase";
import invariant from "tiny-invariant";
import { Clause, ParsedClause } from "./clause";
import { Node, paramsToType, Repeated } from "./node";
import { Group } from "./group";
import { RowLike } from "../../types";

export class TopLevelClause extends Clause {
  type = "topLevelClause";
  typeParams: string;
  returnType: string;
  returnShapeExtractor: (tlc: ParsedClause) => RowLike | undefined;

  constructor(
    name: string,
    typeParams: string,
    returnType: string,
    returnShapeExtractor: (tlc: ParsedClause) => RowLike | undefined,
    args: Node[],
    optional = false,
  ) {
    super(name, args, optional);
    this.typeParams = typeParams;
    this.returnType = returnType;
    this.returnShapeExtractor = returnShapeExtractor;
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

    if (this.args instanceof Group) {
      this.args.nodes.forEach(processNode);
    } else if (this.args instanceof Repeated) {
      invariant(this.args.child instanceof Group, "Expected Repeated child to be a Group");
      this.args.child.nodes.forEach(processNode);
    } else {
      this.args satisfies never;
    }

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
    const { params: paramsRaw } = info;

    const params =
      paramsRaw.type === "array"
        ? paramsRaw
        : paramsRaw.type === "union"
          ? paramsRaw.value.find((p) => p.type === "array")
          : paramsRaw;
    invariant(
      params && params.type === "array",
      `Expected params to be an array: ${JSON.stringify(params)}`,
    );

    const bareReturnType = this.returnType.split(" ")[0];

    // Generate the function overload and implementation
    return `export function ${funcName}${this.typeParams}(
  ${params.value
    .map((p, idx) => {
      const optional = params.optionalAt != null && idx >= params.optionalAt;
      return `arg${idx}${optional ? "?" : ""}: ${paramsToType(p)}`;
    })
    .join(",\n  ")}
): ParsedClause<${bareReturnType}>;
export function ${funcName}(...args: any[]) {
  // TopLevelClause expects the args wrapped in an object with the clause name (camelCase)
  const wrappedArgs = { "${funcName}": args };
  const result = grammars.${funcName}.toParserInfo().parse(wrappedArgs);
  invariant(result != null, "Parser failed to parse ${funcName} statement");
  return result;
}`;
  }
}
