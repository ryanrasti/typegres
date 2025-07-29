import { RawBuilder, sql } from "kysely";
import {
  ObjectParam,
  Params,
  ParsedNode,
  ParsedNodeType,
  ParserInfo,
  toParserInfo,
} from "./node";
import { Clause } from "./clause";
import { OneOf } from "./one-of";
import { Node } from "./node";

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

export class Group extends Node {
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

const isTransitivelyClause = (n: Node) =>
  n instanceof Clause ||
  (n instanceof OneOf && n.options.every(isTransitivelyClause));

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
