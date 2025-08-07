import camelCase from "camelcase";
import { QueryResult, RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { Group, ParsedGroup } from "./group";
import {
  ParsedNode,
  Node,
  ParserInfo,
  toParserInfo,
  ParserContext,
  Repeated,
  ParsedRepeated,
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

export class Clause extends Node {
  type = "clause";
  name: string;
  args: Group | Repeated<Group>;

  constructor(
    name: string,
    args: Node[] | Group | Repeated<Group>,
    optional = false,
  ) {
    super(optional);
    this.name = name;
    this.args = Array.isArray(args) ? new Group(args) : args;
  }

  toParserInfo(): ParserInfo {
    return ParsedClause.toParserInfo(this);
  }
}

// Parsed AST nodes (without optional/repeated/oneof concepts)
export class ParsedClause<R extends RowLike = RowLike>
  extends ParsedNode<Clause, ParsedGroup | ParsedRepeated>
  implements AsFromItem<R>
{
  constructor(
    grammar: Clause,
    public args: ParsedGroup | ParsedRepeated,
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
        invariant(
          parsedGroup instanceof ParsedGroup ||
            parsedGroup instanceof ParsedRepeated,
          `Expected ParsedGroup, got ${inspect(parsedGroup)}`,
        );
        return new ParsedClause(clause, parsedGroup);
      },
    };
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
        "Only top-level clauses can be compiled without an explicit context",
      );

      return this.compile({
        topLevelClause: this.asGenericParsedClause(),
        expressionContext: pipeExpressionContext(
          ExpressionContext.new(),
          this.fromItems().map((item) => item.value),
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
      this.asGenericParsedClause(),
    );
    invariant(
      returnShape != null,
      "Expected a return shape for scalar extraction",
    );
    const [val, ...rest] = Object.values(returnShape);
    invariant(
      rest.length === 0,
      `Expected a single scalar return shape, got: ${inspect(returnShape)}`,
    );
    return val.getClass().new(this.toExpression()) as R extends RowLike
      ? R[keyof R]
      : unknown;
  }

  asFromItem(): FromItem<R> {
    const returnShape = (this.grammar as TopLevelClause).returnShapeExtractor(
      this.asGenericParsedClause(),
    );
    invariant(
      returnShape != null,
      "Expected a return shape for FromItem extraction",
    );
    return new FromItem(
      this.toExpression(),
      new QueryAlias(this.grammar.name),
      {},
      returnShape as RowLike,
    ) as FromItem<R>;
  }

  debug() {
    console.log("Debugging query:", this.compile().compile(dummyDb));
    return this;
  }

  async execute(
    typegres: Typegres,
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
        compiledRaw.parameters,
      );
      throw error;
    }
    const returnShape = (this.grammar as TopLevelClause).returnShapeExtractor(
      this.asGenericParsedClause(),
    );
    return (
      returnShape
        ? raw.rows.map((row) => {
            invariant(
              typeof row === "object" && row !== null,
              "Expected each row to be an object",
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
        this.clause.fromItems().map((item) => item.value),
      ),
      topLevelClause: this.clause,
    });
    return sql`(${compiled})`;
  }
}
