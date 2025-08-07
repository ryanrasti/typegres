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
    node,
  );

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
  new ExpressionList("bare"),
  new Clause("ROLLUP", [new ExpressionList("bare")]),
  new Clause("CUBE", [new ExpressionList("bare")]),
  // TODO: technically GROUPING SETS is a list of grouping elements,
  // but we treat it as a single grouping element for simplicity. To handle
  // this case we need to modify the codegen to emit type definitions for
  // grouping element (so it can be recursively defined).
  new Clause("GROUPING SETS", [new ExpressionList("bare")]),
]);

export const selectGrammar = () =>
  new TopLevelClause(
    "SELECT",
    "<F extends Types.RowLike, J extends Types.Joins, S extends Types.RowLike>",
    "S extends Types.RowLikeRelaxed",
    extractReturnValue(1),
    [
      new OneOf([
        new Literal("ALL"),
        new Literal("DISTINCT"),
        new Clause("DISTINCT ON", [new ExpressionList("bare")]),
      ]).optional(),
      withContext(new ExpressionList("alias", "S")),
      new Clause("FROM", [new FromItem("Types.AsFromItem<F, J>")]).optional(),
      new Clause("WHERE", [withContext(new Condition())]).optional(),
      new Clause("GROUP BY", [
        new OneOf([new Literal("ALL"), new Literal("DISTINCT")]).optional(),
        withContext(groupingElement.repeated()),
      ]).optional(),
      new Clause("HAVING", [withContext(new Condition())]).optional(),
      new Clause("WINDOW", [
        withContext(new ExpressionList("bare")),
      ]).optional(),
      new OneOf([
        new Clause("UNION", [new Recursive("Types.ParsedClause<S>")]),
        new Clause("UNION ALL", [new Recursive("Types.ParsedClause<S>")]),
        new Clause("INTERSECT", [new Recursive("Types.ParsedClause<S>")]),
        new Clause("INTERSECT ALL", [new Recursive("Types.ParsedClause<S>")]),
        new Clause("EXCEPT", [new Recursive("Types.ParsedClause<S>")]),
        new Clause("EXCEPT ALL", [new Recursive("Types.ParsedClause<S>")]),
      ]).optional(),
      new Clause(
        "ORDER BY",
        new Group([
          withContext(new Expression("Types.Any<unknown, 0 | 1>")),
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
      ).optional(),
      new Clause("LIMIT", [
        new OneOf([
          new Expression("Types.NumericLike", "count"),
          new Literal("ALL"),
        ]),
      ]).optional(),
      new Clause("OFFSET", [
        new Expression("Types.NumericLike", "start"),
        new OneOf([new Literal("ROW"), new Literal("ROWS")]).optional(),
      ]).optional(),
      new Clause("FETCH", [
        new OneOf([new Literal("FIRST"), new Literal("NEXT")]),
        new OneOf([
          new Expression("Types.NumericLike", "count"),
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
          new Expression("Types.Table<any>").repeated(),
        ]).optional(),
        new OneOf([
          new Literal("NOWAIT"),
          new Literal("SKIP LOCKED"),
        ]).optional(),
      ]).optional(),
    ],
  );
