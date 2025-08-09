import camelCase from "camelcase";
import { QueryResult, RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Group } from "./group";
import {
  ParsedNode,
  Node,
  ParserContext,
  Repeated,
  ParseInputType,
  ParseReturnType,
} from "./node";
import { parseRowLike, RowLikeResult } from "../../query/values";
import { Typegres } from "../../db";
import { RowLike } from "../../types";
import { Context as ExpressionContext } from "../../expression";
import { TopLevelClause } from "./top-level-clause";
import { pipeExpressionContext } from "./context";
import { ParsedFromItem } from "./from-item";
import { AsFromItem, FromItem } from "../../query/from-item";
import { QueryAlias } from "../../expression";
import { dummyDb } from "../../test/db";
import { inspect } from "cross-inspect";
import { Bool } from "../../gen/types";
import {
  ExistsExpression,
  NotExistsExpression,
  Expression,
} from "../../expression";

type ToPascalCase<T extends string> = T extends `${infer P1} ${infer P2}`
  ? `${Capitalize<Lowercase<P1>>}${ToPascalCase<P2>}`
  : Capitalize<Lowercase<T>>;

export type ToCamelCase<T extends string> = Uncapitalize<ToPascalCase<T>>;

export const toCamelCase = <T extends string>(str: T): ToCamelCase<T> => {
  return camelCase(str) as ToCamelCase<T>;
};

export class Clause<
  N extends string = string,
  G extends Group | Repeated<Group> = Group | Repeated<Group>,
> extends Node {
  type = "clause";
  name: N;
  args: G;

  constructor(name: N, args: G, optional = false) {
    super(optional);
    this.name = name;
    this.args = (Array.isArray(args) ? new Group(args) : args) as G;
  }

  static new<N extends string, A extends Node[]>(
    name: N,
    args: A
  ): Clause<N, Group<A>>;
  static new<
    N extends string,
    G extends Group | Repeated<Group>,
  >(name: N, args: G): Clause<N, G>;
  static new(name: string, arg: Node[] | Group | Repeated<Group>) {
    return Array.isArray(arg)
      ? new Clause(name, new Group(arg))
      : new Clause(name, arg);
  }

  parse(value: { [k in ToCamelCase<N>]: ParseInputType<G> }): ParsedClause<
    RowLike,
    this
  > | null {
    if (typeof value !== "object" || value === null) {
      return null; // Expected an object with a key: clause.name
    }
    // Check for camelCase match
    const camelKey = toCamelCase(this.name);
    const rawArgs = value[camelKey];
    if (rawArgs == null) {
      return null; // Clause name not found
    }
    const parsedGroup = this.args.parse(rawArgs);
    if (parsedGroup === null) {
      return null; // Parsing failed for the group
    }
    return new ParsedClause(this, parsedGroup);
  }
}

// Parsed AST nodes (without optional/repeated/oneof concepts)
export class ParsedClause<
    R extends RowLike = RowLike,
    C extends Clause = Clause,
  >
  extends ParsedNode<C, ParseReturnType<C["args"]>>
  implements AsFromItem<R>
{
  constructor(
    grammar: C,
    public args: ParseReturnType<C["args"]>
  ) {
    super(grammar, args);
  }

  fromItems(): ParsedFromItem[] {
    const fromItems: ParsedFromItem[] = [];
    const traverse = (node: ParsedNode<Node, unknown>) => {
      if (node instanceof ParsedFromItem) {
        fromItems.push(node);
      }
      const children = [node.value].flat();
      for (const child of children) {
        if (child && child instanceof ParsedNode) {
          traverse(child);
        }
      }
    };
    traverse(this.args);
    return fromItems;
  }

  private asGenericParsedClause(): ParsedClause<RowLike> {
    return this as unknown as ParsedClause<RowLike>;
  }

  compile(ctx?: ParserContext): RawBuilder<any> {
    if (!ctx) {
      invariant(
        this.grammar instanceof TopLevelClause,
        "Only top-level clauses can be compiled without an explicit context"
      );

      return this.compile({
        topLevelClause: this.asGenericParsedClause(),
        expressionContext: pipeExpressionContext(
          ExpressionContext.new(),
          this.fromItems().map((item) => item.value)
        ),
      });
    }

    // Always include the clause name (e.g., SELECT, UPDATE)
    const clauseName = sql.raw(this.grammar.name);
    const compiledArgs = this.args.compile(ctx);
    return sql`${clauseName} ${compiledArgs}`;
  }

  scalar(): R extends RowLike ? R[keyof R] : unknown {
    const returnShape = (this.grammar as TopLevelClause).returnShapeExtractor(
      this.asGenericParsedClause()
    );
    invariant(
      returnShape != null,
      "Expected a return shape for scalar extraction"
    );
    const [val, ...rest] = Object.values(returnShape);
    invariant(
      rest.length === 0,
      `Expected a single scalar return shape, got: ${inspect(returnShape)}`
    );
    return val.getClass().new(this.toExpression()) as R extends RowLike
      ? R[keyof R]
      : unknown;
  }

  asFromItem(): FromItem<R> {
    const returnShape = (this.grammar as TopLevelClause).returnShapeExtractor(
      this.asGenericParsedClause()
    );
    invariant(
      returnShape != null,
      "Expected a return shape for FromItem extraction"
    );
    return new FromItem(
      this.toExpression(),
      new QueryAlias(this.grammar.name),
      {},
      returnShape as RowLike
    ) as FromItem<R>;
  }

  debug() {
    console.log("Debugging query:", this.compile().compile(dummyDb));
    return this;
  }

  async execute(
    typegres: Typegres
  ): Promise<R extends RowLike ? RowLikeResult<R>[] : unknown> {
    const compiled = this.compile();
    const compiledRaw = compiled.compile(typegres._internal);

    let raw: QueryResult<any>;
    try {
      raw = await typegres._internal.executeQuery(compiledRaw);
    } catch (error) {
      console.error(
        "Error executing query: ",
        compiledRaw.sql,
        compiledRaw.parameters
      );
      throw error;
    }
    const returnShape = (this.grammar as TopLevelClause).returnShapeExtractor(
      this.asGenericParsedClause()
    );
    return (
      returnShape
        ? raw.rows.map((row) => {
            invariant(
              typeof row === "object" && row !== null,
              "Expected each row to be an object"
            );
            return parseRowLike(returnShape, row);
          })
        : raw
    ) as R extends RowLike ? RowLikeResult<R>[] : unknown;
  }

  toExpression(): Expression {
    return new SubselectExpression(this);
  }

  /**
   * SQL EXISTS operator - checks if the subquery returns any rows
   * EXISTS (SELECT ...)
   */
  exists(): Bool<1> {
    return Bool.new(new ExistsExpression(this.toExpression())) as Bool<1>;
  }

  /**
   * SQL NOT EXISTS operator - checks if the subquery returns no rows
   * NOT EXISTS (SELECT ...)
   */
  notExists(): Bool<1> {
    return Bool.new(new NotExistsExpression(this.toExpression())) as Bool<1>;
  }
}

export class SubselectExpression extends Expression {
  constructor(public clause: ParsedClause<any>) {
    super();
  }

  compile(ctx: ExpressionContext) {
    const compiled = this.clause.compile({
      expressionContext: pipeExpressionContext(
        ctx,
        this.clause.fromItems().map((item) => item.value)
      ),
      topLevelClause: this.clause,
    });
    return sql`(${compiled})`;
  }
}
