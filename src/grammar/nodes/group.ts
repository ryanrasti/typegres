import { RawBuilder, sql } from "kysely";
import {
  ObjectParam,
  Params,
  ParsedNode,
  ParsedNodeType,
  ParsedRepeated,
  ParserContext,
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

  constructor(nodes: Node[], optional = false) {
    super(optional);
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
      (arg) => [arg, toParserInfo(arg, arg.isOptional)] as const,
    );

    // 1. Merge all adjacent objects
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

    // 2. And move all grouped objects to the end if they are all optional:
    const isOptionalObjects = (
      merged: [[Node, ParserInfo], ...[Node, ParserInfo][]],
    ) => {
      return merged.every(
        ([node, info]) => node.isOptional && isObject(info.params),
      );
    };
    const positionalArgs = mergedInfo.filter(
      (merged) => !isOptionalObjects(merged),
    );
    const optionalArg = mergedInfo.filter(isOptionalObjects).flat();
    const hasOptionalArgs = optionalArg.length > 0;
    const args = [...positionalArgs, ...(hasOptionalArgs ? [optionalArg] : [])];

    const rawParams: Params = {
      type: "array",
      value: args.map((merged) => {
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
      optionalAt: hasOptionalArgs ? args.length - 1 : undefined,
    };

    // console.log(
    //   `ParsedGroup.toParserInfo: ${args.length} args, hasOptionalArgs: ${hasOptionalArgs}`,
    //   positionalArgs.length,
    //   args[0],
    //   [rawParams.value[0], rawParams.value[0], rawParams]
    // );

    return {
      params:
        positionalArgs.length === 1
          ? {
              type: "union",
              value: [
                rawParams.value[0],
                rawParams.value.length > 1 ? rawParams : rawParams.value[0],
              ],
            }
          : rawParams,
      parse: (valueRaw: any) => {
        const value = Array.isArray(valueRaw) ? valueRaw : [valueRaw];

        const valueWithOptional =
          value.length < args.length && hasOptionalArgs
            ? [...value, undefined]
            : value;
        if (valueWithOptional.length !== args.length) {
          return null; // Number of arguments does not match
        }

        const parsedArgs: ParsedNodeType[] = [];
        let i = 0;

        for (const merged of mergedInfo) {
          // Parse againt the merged info (which might be the last item if it is optional)
          let val: unknown;
          if (isOptionalObjects(merged)) {
            // If the merged info is optional, we can use the last value
            val = valueWithOptional[valueWithOptional.length - 1];
          } else {
            // Otherwise, use the current value
            val = valueWithOptional[i];
            i++;
          }

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

  compile(ctx: ParserContext): RawBuilder<any> {
    const sqlParts = this.value
      .flatMap((item) =>
        // skip over optional (but absent items) and repeated items with 0 values:
        item === undefined ||
        (item instanceof ParsedRepeated && item.value.length === 0)
          ? []
          : item,
      )
      .map((item) => item.compile(ctx));

    return sqlParts.length > 0 ? sql.join(sqlParts, sql` `) : sql``;
  }
}
