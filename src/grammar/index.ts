import camelCase from "camelcase";
import { RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Any, Setof } from "../types";
import { Context } from "../expression";

// Export for use in generated files
export { camelCase, toParserInfo };

// Export TopLevelClause for generated files
export { TopLevelClause };

type ObjectParam = {
  type: "object";
  value: { [k in string]: { value: Params; optional?: boolean } };
};
// Representation of a type that will be generated:
type Params =
  | { type: "identifier"; value: string }
  | { type: "atom"; value: string }
  // A list of parameters
  | { type: "array"; value: Params[]; minLength?: number; maxLength?: number }
  // A clause with the key as the name and value as its parameters
  | ObjectParam
  | { type: "union"; value: Params[]; exclusive?: boolean }
  | { type: "intersection"; value: Params[] };

const isObject = (params: Params) => {
  return (
    params.type === "object" ||
    (params.type === "union" && params.value.every(isObject)) ||
    (params.type === "intersection" && params.value.every(isObject))
  );
};

const mergeObjects = (objects: ObjectParam[]): ObjectParam => {
  return {
    type: "object",
    value: Object.fromEntries(
      objects.flatMap((obj) =>
        Object.entries(obj.value).map(([key, { value, optional }]) => [
          key,
          { value, optional: optional ?? false },
        ]),
      ),
    ),
  };
};

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

type Parser = (value: any) => ParsedNodeType | null;

type ParserInfo = {
  parse: Parser;
  params: Params;
};

abstract class Node {
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

const toParserInfo = (node: Node): ParserInfo => {
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

class Clause extends Node {
  type = "clause";
  name: string;
  args: Group;

  constructor(name: string, args: Node[], optional = false, repeated = false) {
    super(optional, repeated);
    this.name = name;
    this.args = new Group(args);
  }

  toParserInfo(): ParserInfo {
    return ParsedClause.toParserInfo(this);
  }
}

const isTransitivelyClause = (n: Node) =>
  n instanceof Clause ||
  (n instanceof OneOf && n.options.every(isTransitivelyClause));

type ParsedNodeType =
  // Normal parsed node (or optional, non-repeated that is present)
  | ParsedNode<Node, unknown>
  // Repeated parsed nodes (or optional, repeated that is present)
  | ParsedNode<Node, unknown>[]
  // Optional parsed node (that is not present)
  | undefined;

// Parsed AST nodes (without optional/repeated/oneof concepts)
export class ParsedClause extends ParsedNode<Clause, ParsedGroup> {
  constructor(
    grammar: Clause,
    public args: ParsedGroup,
  ) {
    super(grammar, args);
  }

  static toParserInfo(clause: Clause): ParserInfo {
    const groupInfo = toParserInfo(clause.args);

    return {
      params: {
        type: "object",

        value: {
          [clause.name]: {
            value: groupInfo.params,
            optional: clause.isOptional,
          },
        },
      },
      parse: (value: any) => {
        if (typeof value !== "object" || value === null) {
          return null; // Expected an object with a key: clause.name
        }
        // Check for camelCase match
        const camelKey = camelCase(clause.name);
        const rawArgs = value[camelKey];
        if (rawArgs == null) {
          return null; // Clause name not found
        }
        const parsedGroup = groupInfo.parse(rawArgs);
        if (parsedGroup === null) {
          return null; // Parsing failed for the group
        }
        invariant(parsedGroup instanceof ParsedGroup);
        return new ParsedClause(clause, parsedGroup);
      },
    };
  }

  compile(): RawBuilder<any> {
    // Always include the clause name (e.g., SELECT, UPDATE)
    const clauseName = sql.raw(this.grammar.name);
    const compiledArgs = this.args.compile();
    return sql`${clauseName} ${compiledArgs}`;
  }
}

class Literal extends Node {
  type = "literal";
  value: string;

  constructor(value: string, optional = false, repeated = false) {
    super(optional, repeated);
    this.value = value;
  }

  toParam() {
    return `"${this.value}"`;
  }

  toParserInfo() {
    return ParsedLiteral.toParserInfo(this);
  }
}

export class ParsedLiteral extends ParsedNode<Literal, string> {
  constructor(grammar: Literal, value: string) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Literal): ParserInfo {
    return {
      params: { type: "atom", value: grammar.value },
      parse: (arg: any) => {
        // Check for camelCase match
        if (arg !== camelCase(grammar.value)) {
          return null; // Value does not match the literal
        }
        return new ParsedLiteral(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    return sql.raw(this.grammar.value);
  }
}

class TopLevelClause extends Clause {
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

class Identifier extends Node {
  type = "identifier";
  name: string;
  withAlias: boolean;
  typeParam: string;

  constructor(
    name: string,
    typeParam: string,
    withAlias = false,
    optional = false,
    repeated = false,
  ) {
    super(optional, repeated);
    this.name = name;
    this.withAlias = withAlias;
    this.typeParam = typeParam;
  }

  toParserInfo(): ParserInfo {
    return ParsedIdentifier.toParserInfo(this, this.typeParam);
  }
}

export class ParsedIdentifier<T = any> extends ParsedNode<Identifier, T> {
  constructor(grammar: Identifier, value: T) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Identifier, _value: any): ParserInfo {
    return {
      params: { type: "identifier", value: grammar.typeParam },
      parse: (arg: any) => {
        if (typeof arg !== "string") {
          return null; // Expected a string identifier
        }
        return new ParsedIdentifier(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    // This would compile to a table/column reference
    return sql.ref(this.value as string);
  }
}

class ExpressionList extends Node {
  type = "expressionList";
  context: string;
  returnTypeParam: string;
  format: "alias" | "assignment" | "bare";

  constructor(
    contextAndReturnTypeParam: [string] | [string, string],
    format: "alias" | "assignment" | "bare",
    optional = false,
    repeated = false,
  ) {
    super(optional, repeated);
    this.context = contextAndReturnTypeParam[0];
    this.returnTypeParam = contextAndReturnTypeParam[1] ?? "Types.RowLike";
    this.format = format;
  }

  toParserInfo(): ParserInfo {
    return ParsedExpressionList.toParserInfo(this);
  }
}

export class ParsedExpressionList<T = any> extends ParsedNode<
  ExpressionList,
  T
> {
  constructor(grammar: ExpressionList, value: T) {
    super(grammar, value);
  }

  static toParserInfo(grammar: ExpressionList): ParserInfo {
    return {
      params: {
        type: "identifier",
        value: grammar.context.includes("<")
          ? `(args: ${grammar.context}) => ${grammar.returnTypeParam}`
          : grammar.context === ""
            ? `() => ${grammar.returnTypeParam}`
            : `(arg: ${grammar.context}) => ${grammar.returnTypeParam}`,
      },
      parse: (value: any) => {
        if (typeof value !== "function") {
          return null; // Expected a function for expression list
        }
        return new ParsedExpressionList(grammar, value);
      },
    };
  }

  compile(): RawBuilder<any> {
    // TODO: we will need to pass a context here and look up the arguments
    //    from the context. For now just call the function directly.
    if (typeof this.value !== "function") {
      throw new Error("ExpressionList value is not a function");
    }
    const result = this.value();
    if (
      this.grammar.format === "alias" ||
      this.grammar.format === "assignment"
    ) {
      invariant(
        typeof result === "object" && result != null,
        "ExpressionList must return an object",
      );
      return sql.join(
        Object.entries(result).map(([key, value]) => {
          // Handle Any types by converting to expression
          invariant(value instanceof Any, "Value must be an instance of Any");
          const todoContext = Context.new();
          const compiledValue = value.toExpression().compile(todoContext);

          return this.grammar.format === "alias"
            ? sql`${compiledValue} AS ${sql.ref(key)}`
            : sql`${sql.ref(key)} = ${compiledValue}`;
        }),
      );
    }
    // bare: it should just be a list:
    invariant(
      Array.isArray(result),
      "ExpressionList in bare format must return an array",
    );
    return sql.join(result.map((value) => sql`${value}`));
  }
}

class Expression extends Node {
  type = "expression";
  returnType:
    | "Types.Any<unknown, 0 | 1>"
    | "Types.Bool<0 | 1>"
    | "Types.NumericLike"
    | "Types.Table<any>";
  context: string[];
  name: string;

  constructor(
    context: [string] | [],
    returnType:
      | "Types.Any<unknown, 0 | 1>"
      | "Types.Bool<0 | 1>"
      | "Types.NumericLike"
      | "Types.Table<any>" = "Types.Any<unknown, 0 | 1>",
    name: string = "expression",
    optional = false,
    repeated = false,
  ) {
    super(optional, repeated);
    this.context = context;
    this.returnType = returnType;
    this.name = name;
  }

  toParserInfo(): ParserInfo {
    return ParsedExpression.toParserInfo(this);
  }
}

export class ParsedExpression<T = any> extends ParsedNode<Expression, T> {
  constructor(grammar: Expression, value: T) {
    super(grammar, value);
  }

  static toParserInfo(grammar: Expression): ParserInfo {
    return {
      params: {
        type: "identifier",
        value:
          grammar.context.length === 0
            ? grammar.returnType
            : grammar.context.length === 1 && !grammar.context[0].includes("<")
              ? `(arg: ${grammar.context[0]}) => ${grammar.returnType}`
              : grammar.context.some((c) => c.includes("<"))
                ? `(args: ${grammar.context.join(", ")}) => ${grammar.returnType}`
                : `(${grammar.context.map((c, i) => `arg${i}: ${c}`).join(", ")}) => ${grammar.returnType}`,
      },
      parse: (arg: any) => {
        if (grammar.context.length === 0) {
          if (!(arg instanceof Any)) {
            return null; // Expected an expression of type Any
          }
          return new ParsedExpression(grammar, arg);
        }
        if (typeof arg !== "function") {
          return null; // Expected a function for expression
        }
        return new ParsedExpression(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    // TODO: we will need to pass a context here and look up the arguments
    //    from the context. For now just call the function directly.
    const result = typeof this.value === "function" ? this.value() : this.value;
    invariant(
      result instanceof Any,
      "Expression must return an instance of Any",
    );
    const todoContext = Context.new();
    return result.toExpression().compile(todoContext);
  }
}

class Condition extends Expression {
  type = "condition";
  constructor(context: [string] | [], optional = false, repeated = false) {
    super(context, "Types.Bool<0 | 1>", "condition", optional, repeated);
  }
}

class FromItem extends Node {
  type = "fromItem";
  typeParam: string;

  constructor(typeParam: string, optional = false, repeated = false) {
    super(optional, repeated);
    this.typeParam = typeParam;
  }

  toParam() {
    return this.typeParam;
  }

  toParserInfo(): ParserInfo {
    return ParsedFromItem.toParserInfo(this);
  }
}

export class ParsedFromItem extends ParsedNode<FromItem, Setof<any>> {
  constructor(grammar: FromItem, value: Setof<any>) {
    super(grammar, value);
  }

  static toParserInfo(grammar: FromItem): ParserInfo {
    return {
      params: { type: "identifier", value: grammar.typeParam },
      parse: (arg: any) => {
        if (!(arg instanceof Setof)) {
          return null; // Expected a Setof type for FromItem
        }
        return new ParsedFromItem(grammar, arg);
      },
    };
  }

  compile(): RawBuilder<any> {
    const todoContext = Context.new();
    return this.value.compile(todoContext);
  }
}

class OneOf extends Node {
  type = "oneOf";
  options: Node[];

  constructor(options: Node[], optional = false, repeated = false) {
    super(optional, repeated);
    this.options = options;
  }

  toParam(): string {
    return this.options.join(" | ");
  }

  toParserInfo(): ParserInfo {
    // For OneOf, we need to generate type as union and parser that tries each option
    const optionsInfo = this.options.map((opt) => toParserInfo(opt));
    return {
      params: {
        type: "union",
        value: optionsInfo.map((info) =>
          info.params.type === "object"
            ? // If the option is an object, then its properties should be optional
              {
                ...info.params,
                value: Object.fromEntries(
                  Object.entries(info.params.value).map(([k, v]) => [
                    k,
                    { ...v, optional: v.optional || this.isOptional },
                  ]),
                ),
              }
            : info.params,
        ),
        exclusive: true,
      },
      parse: (value: any) => {
        for (const info of optionsInfo) {
          const parsed = info.parse(value);
          if (parsed !== null) {
            return parsed; // Return the first successful parse
          }
        }
        return null; // None of the options matched
      },
    };
  }
}

class Recursive extends Node {
  type = "recursive";
  rule: () => Node;

  constructor(rule: () => Node, optional = false, repeated = false) {
    super(optional, repeated);
    this.rule = rule;
  }

  toParserInfo(): ParserInfo {
    // Avoid infinite recursion - just return a placeholder for recursive rules
    return {
      params: { type: "identifier", value: "never" },
      parse: () => {
        throw new Error("TODO: Recursive parsing not implemented yet");
      },
    };
  }
}

class Todo extends Node {
  type = "todo";
  text: string;

  constructor(text: string, optional = false, repeated = false) {
    super(optional, repeated);
    this.text = text;
  }

  toParserInfo(): ParserInfo {
    return {
      params: { type: "identifier", value: "never" },
      parse: () => {
        throw new Error("TODO: " + this.text + " not implemented yet");
      },
    };
  }
}

class Group extends Node {
  type = "group";
  nodes: Node[];

  constructor(nodes: Node[], optional = false, repeated = false) {
    super(optional, repeated);
    this.nodes = nodes;
  }

  toParserInfo(): ParserInfo {
    return ParsedGroup.toParserInfo(this);
  }
}

export class ParsedGroup extends ParsedNode<Group, ParsedNodeType[]> {
  constructor(grammar: Group, items: ParsedNodeType[]) {
    super(grammar, items);
  }

  static toParserInfo(grammar: Group): ParserInfo {
    const argsInfo = grammar.nodes.map(
      (arg) =>
        // Don't wrap optional clauses, we'll handle them separately
        [
          arg,
          !arg.isRepeated && isTransitivelyClause(arg)
            ? arg.toParserInfo()
            : toParserInfo(arg),
        ] as const,
    );

    const mergedInfo: [[Node, ParserInfo], ...[Node, ParserInfo][]][] = [];
    for (const [arg, info] of argsInfo) {
      const prev = mergedInfo.at(-1);
      if (
        isObject(info.params) &&
        prev?.every(([_, p]) => isObject(p.params))
      ) {
        // Merge with previous object if it has the same type
        prev.push([arg, info]);
      } else {
        // Start a new entry for this info
        mergedInfo.push([[arg, info]]);
      }
    }

    return {
      params: {
        type: "array",
        value: mergedInfo.map((merged) => {
          const [first, ...rest] = merged;
          if (rest.length > 0) {
            return {
              type: "intersection",
              value: [
                mergeObjects(
                  merged
                    .map(([, info]) => info.params)
                    .filter((p) => p.type === "object"),
                ),
                ...merged
                  .filter(([, info]) => info.params.type !== "object")
                  .map(([, info]) => info.params),
              ],
            };
          }
          return first[1].params;
        }),
      },
      parse: (value: any) => {
        if (!Array.isArray(value)) {
          return null; // Expected an array of arguments
        }

        if (value.length !== mergedInfo.length) {
          return null; // Number of arguments does not match
        }

        const parsedArgs: ParsedNodeType[] = [];

        for (const [i, merged] of mergedInfo.entries()) {
          const val = value[i];
          for (const [arg, info] of merged) {
            // If we're parsing a normal argument, `infos` will have only one item
            // If we're parsing an object with multiple keys, `infos` will have multiple
            //   items but the nice thing is that `val` will still have the key
            const parsed = info.parse(val) ?? undefined;
            if (parsed == null && !arg.isOptional) {
              return null; // Parsing failed for this argument
            }
            parsedArgs.push(parsed);
          }
        }
        return new ParsedGroup(grammar, parsedArgs);
      },
    };
  }

  compile(): RawBuilder<any> {
    const sqlParts = this.value
      .flatMap((item) => (item === undefined ? [] : item))
      .map((item) => item.compile());

    return sqlParts.length > 0 ? sql.join(sqlParts, sql` `) : sql``;
  }
}

/*
https://www.postgresql.org/docs/current/sql-update.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
          ( column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]
*/

const update = new TopLevelClause(
  "UPDATE",
  // TODO: `U extends string` should be `U extends Types.Table` to power
  //  context-awareness
  "<U extends string, F extends FromItem, R extends Types.RowLike>",
  "R",
  [
    new Literal("ONLY").optional(),
    new Identifier("table_name", "U", true),
    new Clause("SET", [
      new ExpressionList(["MergeSelectArgs<U, F>"], "assignment"),
    ]),
    new Clause("FROM", [new FromItem("F").repeated()]).optional(),
    new Clause("WHERE", [new Condition(["MergeSelectArgs<U, F>"])]).optional(),
    new Clause("RETURNING", [
      new ExpressionList(["MergeSelectArgs<U, F>", "R"], "alias"),
    ]).optional(),
  ],
);

/*
https://www.postgresql.org/docs/current/sql-select.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ { * | expression [ [ AS ] output_name ] } [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF from_reference [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]
*/

const groupingElement: Node = new Todo("groupingElement");

const select = () =>
  new TopLevelClause(
    "SELECT",
    "<F extends FromItem, _S extends Types.RowLike>",
    "S",
    [
      new OneOf([
        new Literal("ALL"),
        new Literal("DISTINCT"),
        new Clause("DISTINCT ON", [new ExpressionList(["F"], "bare")]),
      ]).optional(),
      new ExpressionList(["F"], "alias").optional(),
      new Clause("FROM", [new FromItem("F")]).optional(),
      new Clause("WHERE", [new Condition(["F"])]).optional(),
      new Clause("GROUP BY", [
        new OneOf([new Literal("ALL"), new Literal("DISTINCT")]).optional(),
        groupingElement.repeated(),
      ]).optional(),
      new Clause("HAVING", [new Condition(["F"])]).optional(),
      new Clause("WINDOW", [new ExpressionList(["F"], "bare")]).optional(),
      new OneOf([
        new Clause("UNION", [new Recursive(select)]),
        new Clause("UNION ALL", [new Recursive(select)]),
        new Clause("INTERSECT", [new Recursive(select)]),
        new Clause("INTERSECT ALL", [new Recursive(select)]),
        new Clause("EXCEPT", [new Recursive(select)]),
        new Clause("EXCEPT ALL", [new Recursive(select)]),
      ]).optional(),
      new Clause("ORDER BY", [
        new Group([
          new Expression(["F"], "Types.Any<unknown, 0 | 1>"),
          new OneOf([
            new Literal("ASC"),
            new Literal("DESC"),
            new Clause("USING", [new Identifier("operator", "string")]),
          ]).optional(),
          new OneOf([
            new Literal("NULLS FIRST"),
            new Literal("NULLS LAST"),
          ]).optional(),
        ]).repeated(),
      ]).optional(),
      new Clause("LIMIT", [
        new OneOf([
          new Expression([], "Types.NumericLike", "count"),
          new Literal("ALL"),
        ]).optional(),
      ]).optional(),
      new Clause("OFFSET", [
        new Expression([], "Types.NumericLike", "start"),
        new OneOf([new Literal("ROW"), new Literal("ROWS")]).optional(),
      ]).optional(),
      new Clause("FETCH", [
        new OneOf([new Literal("FIRST"), new Literal("NEXT")]),
        new OneOf([
          new Expression([], "Types.NumericLike", "count"),
          new Literal("ALL"),
        ]).optional(),
        new OneOf([new Literal("ROW"), new Literal("ROWS")]).optional(),
        new OneOf([new Literal("ONLY"), new Literal("WITH TIES")]).optional(),
      ]).optional(),
      new Clause("FOR", [
        new OneOf([
          new Literal("UPDATE"),
          new Literal("NO KEY UPDATE"),
          new Literal("SHARE"),
          new Literal("KEY SHARE"),
        ]),
        new Group([
          new Literal("OF"),
          new Expression(["F"], "Types.Table<any>").repeated(),
        ]).optional(),
        new OneOf([
          new Literal("NOWAIT"),
          new Literal("SKIP LOCKED"),
        ]).optional(),
      ]).optional(),
    ],
  );

// Export grammar definitions for generated files
export const grammars = {
  update: update,
  select: select(),
};

// Main function to generate parser files
function main() {
  const fs = require("fs");
  const path = require("path");
  const { execSync } = require("child_process");

  const topLevelClauses = [
    { name: "update", clause: update },
    { name: "select", clause: select() },
  ];

  const outputDir = path.join(__dirname, "generated");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate a file for each top-level clause
  for (const { name, clause } of topLevelClauses) {
    const content = `// Generated parser for ${name.toUpperCase()} statement
import { grammars, ParsedClause } from '../index';
import * as Types from '../../types';
import invariant from 'tiny-invariant';

// Type imports for the parser function
type FromItem = any; // TODO: Import proper FromItem type
${clause === update ? `type MergeSelectArgs<_U, _F> = any; // TODO: Import proper MergeSelectArgs type` : ""}

${clause.generateParser()}
`;

    const filePath = path.join(outputDir, `${name}.ts`);
    fs.writeFileSync(filePath, content);
    console.log(`Generated ${name}.ts`);
  }

  // Format generated files with prettier
  console.log("Formatting generated files...");
  try {
    execSync(`npm run format -- ${outputDir}/*.ts`, { stdio: "inherit" });
  } catch (error) {
    console.error("Error formatting files:", error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}
