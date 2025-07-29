import camelCase from "camelcase";
import { RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Group, ParsedGroup } from "./group";
import { ParsedNode, Node, ParserInfo, toParserInfo } from "./node";
import { OneOf } from "./one-of";

export class Clause extends Node {
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
