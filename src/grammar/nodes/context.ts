import { RawBuilder } from "kysely";
import {
  Node,
  ParsedNode,
  ParserContext,
  ParseReturnType,
} from "./node";
import { ParsedClause } from "./clause";
import invariant from "tiny-invariant";
import { ParsedFromItem } from "./from-item";
import { FromItem } from "../../query/from-item";
import { RowLike, Table } from "../../types";
import { ParsedExpressionList } from "./expression-list";
import { Context as ExpressionContext } from "../../expression";

export type ExtractedContext =
  // A select's context is a from item:
  | [FromItem<RowLike> | undefined]
  // For update/insert, it is the table to update and an optional from item:
  | [Table<RowLike> | undefined, FromItem<RowLike> | undefined];
//

const extractContextToSelectArgs = (ctx: ExtractedContext) => {
  const [first, second] = ctx;
  if (first && second) {
    return [first.toSelectArgs()[0], ...(second?.toSelectArgs() ?? [])];
  }
  return first ? first.toSelectArgs() : [];
};

export const pipeExpressionContext = (
  ctx: ExpressionContext,
  fromItems: FromItem[]
) => {
  return fromItems.reduce((acc, fromItem) => fromItem.getContext(acc), ctx);
};

// Represents wrapping a node in a context -- represented as a TS function where the args
// are the context parameters and the body is the child node's parameter.
export class Context<
  A extends unknown[] = unknown[],
  C extends Node = Node,
> extends Node {
  type = "context";
  extractor: (tlc: ParsedClause) => A;
  param: string;
  child: C;

  constructor(
    param: string,
    extractor: (tlc: ParsedClause) => A,
    child: C,
    optional = false
  ) {
    super(optional);
    this.extractor = extractor;
    this.param = param;
    this.child = child;
  }

  parse(arg: (...args: A) => ParseReturnType<C>): ParsedContext<this> | null {
    return new ParsedContext(this, arg);
  }
}

export class ParsedContext<C extends Context> extends ParsedNode<
  C,
  (...args: ReturnType<C["extractor"]>) => ParseReturnType<C["child"]>
> {
  constructor(
    grammar: C,
    value: (...args: ReturnType<C["extractor"]>) => ParseReturnType<C["child"]>
  ) {
    super(grammar, value);
  }

  resolve(clause: ParsedClause): ParsedNode<Node, unknown> {
    const extracted = this.grammar.extractor(clause) as ReturnType<C["extractor"]>;
    // If no fromItem, call the function with no arguments
    const resolvedChild = this.value(...extracted);
    const parsedChild = this.grammar.child.parse(resolvedChild);
    if (!parsedChild) {
      throw new Error(`Failed to parse child node with args: ${extracted}`);
    }
    return parsedChild;
  }

  compile(ctx: ParserContext): RawBuilder<any> {
    return this.resolve(ctx.topLevelClause).compile(ctx);
  }
}

export const extractParsedClause = (
  tlc: ParsedClause,
  clauseName: string
): ParsedNode<Node, unknown> | undefined => {
  return tlc.args.value
    .flatMap((c) => (c == null ? [] : c))
    .find((c) => c instanceof ParsedClause && c.grammar.name === clauseName);
};

export const extractFromItemAsSelectArgs = (
  tlc: ParsedClause
): ExtractedContext => {
  const fromClause = extractParsedClause(tlc, "FROM");
  if (fromClause && fromClause instanceof ParsedClause) {
    const [parsedFromItem, ...rest] = fromClause.args.value;
    invariant(
      parsedFromItem instanceof ParsedFromItem,
      `Expected ParsedFromItem in FROM clause, but got ${parsedFromItem}`
    );
    invariant(
      rest.length === 0,
      `Expected only one FromItem in FROM clause, but got ${rest.length}`
    );

    return [parsedFromItem.value];
  }
  return [undefined];
};

export const extractReturnValue =
  (clauseNameOrPosition: string | number) => (tlc: ParsedClause) => {
    let context: ParsedContext | undefined = undefined;
    if (typeof clauseNameOrPosition === "number") {
      const candidate = Array.isArray(tlc.args.value[clauseNameOrPosition])
        ? tlc.args.value[clauseNameOrPosition][0]
        : tlc.args.value[clauseNameOrPosition];

      if (candidate instanceof ParsedContext) {
        context = candidate;
      }
    } else {
      const clause = extractParsedClause(tlc, clauseNameOrPosition);

      if (clause && clause instanceof ParsedClause) {
        const [ctx, ...rest] = clause.args.value;
        invariant(
          ctx instanceof ParsedContext,
          `Expected ExpressionList as return clause, but got ${ctx}`
        );
        invariant(
          rest.length === 0,
          `Expected only one ExpressionList as return clause, but got ${rest.length}`
        );
        context = ctx;
      }
    }
    if (!context) {
      return undefined;
    }

    const ret = context.resolve(tlc);
    invariant(
      ret instanceof ParsedExpressionList,
      `Expected ParsedExpressionList, but got ${ret}`
    );
    return ret.value;
  };
