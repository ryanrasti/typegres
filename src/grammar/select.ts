import { RawBuilder, sql } from "kysely";
import {
  TopLevelClause,
  Node,
  Group,
  OneOf,
  Clause,
  ExpressionList,
  FromItem,
  Identifier,
  Recursive,
  Literal,
  Condition,
  Expression,
  Context,
  extractFromItemAsSelectArgs,
} from "./nodes";
import { extractReturnValue } from "./nodes/context";
import { Joins, RowLike } from "../types";

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

const withContext = (node: Node): Node =>
  new Context(
    "Types.FromToSelectArgs<F, J>",
    extractFromItemAsSelectArgs,
    node
  );

const expressionListJoiner = (raw: RawBuilder<any>[]) => {
  return sql`(${raw.length === 0 ? sql`` : sql.join(raw)})`;
};

const bareExpressionList = new Expression().repeated(expressionListJoiner);

/*
and grouping_element can be one of:

    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )
*/

const groupingElement: Node = new OneOf([
  bareExpressionList,
  Clause.new("ROLLUP", [bareExpressionList]),
  Clause.new("CUBE", [bareExpressionList]),
  // TODO: technically GROUPING SETS is a list of grouping elements,
  // but we treat it as a single grouping element for simplicity. To handle
  // this case we need to modify the codegen to emit type definitions for
  // grouping element (so it can be recursively defined).
  Clause.new("GROUPING SETS", [bareExpressionList]),
]);

export const selectGrammar = <
  F extends RowLike,
  J extends Joins,
  S extends RowLike,
>() =>
  new TopLevelClause(
    "SELECT",
    "<F extends Types.RowLike, J extends Types.Joins, S extends Types.RowLike>",
    "S extends Types.RowLikeRelaxed",
    extractReturnValue(1),
    [
      new OneOf([
        new Literal("ALL"),
        new Literal("DISTINCT"),
        Clause.new("DISTINCT ON", [bareExpressionList]),
      ]).optional(),
      withContext(new ExpressionList<S>("alias")),
      Group.new([
        Clause.new("FROM", [new FromItem("Types.AsFromItem<F, J>")]).optional(),
        Clause.new("WHERE", [withContext(new Condition())]).optional(),
        Clause.new("GROUP BY", [
          new OneOf([new Literal("ALL"), new Literal("DISTINCT")]).optional(),
          withContext(groupingElement.repeated()),
        ]).optional(),
        Clause.new("HAVING", [withContext(new Condition())]).optional(),
        Clause.new("WINDOW", [withContext(bareExpressionList)]).optional(),
        new OneOf([
          Clause.new("UNION", [new Recursive("Types.ParsedClause<S>")]),
          Clause.new("UNION ALL", [new Recursive("Types.ParsedClause<S>")]),
          Clause.new("INTERSECT", [new Recursive("Types.ParsedClause<S>")]),
          Clause.new("INTERSECT ALL", [new Recursive("Types.ParsedClause<S>")]),
          Clause.new("EXCEPT", [new Recursive("Types.ParsedClause<S>")]),
          Clause.new("EXCEPT ALL", [new Recursive("Types.ParsedClause<S>")]),
        ]).optional(),
        Clause.new(
          "ORDER BY",
          Group.new([
            withContext(new Expression("Types.Any<unknown, 0 | 1>")),
            new OneOf([
              new Literal("ASC"),
              new Literal("DESC"),
              Clause.new("USING", [new Identifier("operator", "string")]),
            ]).optional(),
            new OneOf([
              new Literal("NULLS FIRST"),
              new Literal("NULLS LAST"),
            ]).optional(),
          ]).repeated()
        ).optional(),
        Clause.new("LIMIT", [
          new OneOf([
            new Expression("Types.NumericLike", "count"),
            new Literal("ALL"),
          ]),
        ]).optional(),
        Clause.new("OFFSET", [
          new Expression("Types.NumericLike", "start"),
          new OneOf([new Literal("ROW"), new Literal("ROWS")]).optional(),
        ]).optional(),
        Clause.new("FETCH", [
          new OneOf([new Literal("FIRST"), new Literal("NEXT")]),
          new OneOf([
            new Expression("Types.NumericLike", "count"),
            new Literal("ALL"),
          ]).optional(),
          new OneOf([new Literal("ROW"), new Literal("ROWS")]).optional(),
          new OneOf([new Literal("ONLY"), new Literal("WITH TIES")]).optional(),
        ]).optional(),
        Clause.new("FOR", [
          new OneOf([
            new Literal("UPDATE"),
            new Literal("NO KEY UPDATE"),
            new Literal("SHARE"),
            new Literal("KEY SHARE"),
          ]),
          Group.new([
            new Literal("OF"),
            new Expression("Types.Table<any>").repeated(),
          ]).optional(),
          new OneOf([
            new Literal("NOWAIT"),
            new Literal("SKIP LOCKED"),
          ]).optional(),
        ]).optional(),
      ]),
    ]
  );
