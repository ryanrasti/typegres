import { RawBuilder, sql } from "kysely";
import {
  ParsedNode,
  ParsedNodeType,
  ParsedRepeated,
  ParseInputType,
  ParserContext,
} from "./node";
import { Clause } from "./clause";
import { Node } from "./node";
import { Literal } from "./literal";
import invariant from "tiny-invariant";

type ParsesFromObject = Group<Node[], true> | Clause | Literal;
const isParsesFromObject = (n: Node): n is ParsesFromObject => {
  return (
    (n instanceof Group && n.parsesAsObject) ||
    n instanceof Clause ||
    n instanceof Literal
  );
};

type TupleToIntersection<T extends any[]> = T extends [infer F, ...infer R]
  ? F & TupleToIntersection<R>
  : unknown;

type GroupParseInputType<G extends Group> =
  G extends Group<infer N, true>
    ? // If it parses as an object, then it's an intersection of all items:
      TupleToIntersection<{ [k in keyof N]: ParseInputType<N[k]> }>
    : G extends Group<infer N, boolean>
      ? N extends [...infer F, infer L]
        ? // If it parses as an array, then it's a tuple of items:
          {
            [k in keyof F]: ParseInputType<F[k] extends Node ? F[k] : never>;
          } & (L extends Group<Node[], true> & { isOptional: true }
            ? // If the last item is optional and parses as an object,
              // then it can be omitted:
              {
                [k in keyof L]?: ParseInputType<
                  L[k] extends Node ? L[k] : never
                >;
              }
            : {
                [k in keyof L]: ParseInputType<
                  L[k] extends Node ? L[k] : never
                >;
              })
        : { [k in keyof N]: ParseInputType<N[k]> }
      : never;

export class Group<
  N extends Node[] = Node[],
  O extends boolean = false,
> extends Node {
  type = "group";
  nodes: N;
  parsesAsObject: O;

  constructor(nodes: N, parsesAsObject: O, optional = false) {
    super(optional);
    this.nodes = nodes;
    this.parsesAsObject = parsesAsObject;
  }

  static new<N extends (ParsesFromObject & { isOptional: true })[]>(
    nodes: N
  ): Group<N, true> & { isOptional: true };
  static new<N extends Node[]>(nodes: N): Group<N>;
  static new(nodes: Node[]) {
    return new Group(
      nodes,
      nodes.every(isParsesFromObject),
      nodes.every((n) => n.isOptional)
    );
  }

  parse<G extends Group>(this: G, input: GroupParseInputType<G>) {
    const parsedNodes: ParsedNodeType[] = [];

    if (Array.isArray(input)) {
      if (input.length > this.nodes.length) {
        return null; // Too many items in the input
      }
      for (const [i, node] of this.nodes.entries()) {
        if (i >= input.length) {
          if (i == this.nodes.length - 1 && node.isOptional) {
            // If the last node is optional, we can skip it if no input is provided
            parsedNodes.push(undefined);
          } else {
            return null; // Not enough items in the input
          }
        }
        const parsed = node.parse(input[i]);
        if (parsed === null) {
          return null; // Parsing failed for this node
        }
        parsedNodes.push(parsed);
      }
    } else {
      if (typeof input !== "object" || input !== null) {
        return null; // Expected an object for parsing
      }
      for (const node of this.nodes) {
        const parsed = node.parse(input);
        if (parsed === null) {
          return null; // Parsing failed for this node
        }
        parsedNodes.push(parsed);
      }
    }

    return new ParsedGroup(this, parsedNodes);
  }
}

export class ParsedGroup<N extends Node[]> extends ParsedNode<
  Group<N>,
  ParsedNodeType[]
> {
  constructor(grammar: Group<N>, items: ParsedNodeType[]) {
    super(grammar, items);
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    const sqlParts = this.value
      .flatMap((item) =>
        // skip over optional (but absent items) and repeated items with 0 values:
        item === undefined ||
        (item instanceof ParsedRepeated && item.value.length === 0)
          ? []
          : item
      )
      .map((item) => item.compile(ctx));

    return sqlParts.length > 0 ? sql.join(sqlParts, sql` `) : sql``;
  }
}
