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
  Todo,
  Literal,
  Condition,
  Expression,
} from "./nodes";

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

export const selectGrammar = () =>
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
        new Clause("UNION", [new Recursive(selectGrammar)]),
        new Clause("UNION ALL", [new Recursive(selectGrammar)]),
        new Clause("INTERSECT", [new Recursive(selectGrammar)]),
        new Clause("INTERSECT ALL", [new Recursive(selectGrammar)]),
        new Clause("EXCEPT", [new Recursive(selectGrammar)]),
        new Clause("EXCEPT ALL", [new Recursive(selectGrammar)]),
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
