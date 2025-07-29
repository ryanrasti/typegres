import {
  TopLevelClause,
  Clause,
  ExpressionList,
  FromItem,
  Identifier,
  Literal,
  Condition,
} from "./nodes";

/*
https://www.postgresql.org/docs/current/sql-update.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
          ( column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]
*/

export const updateGrammar = new TopLevelClause(
  "UPDATE",
  // TODO: `U extends string` should be `U extends Types.Table` to power
  //  context-awareness
  "<U extends string, F extends FromItem, R extends Types.RowLike>",
  "R",
  [
    new Literal("ONLY").optional(),
    new Identifier("table_name", "U", true),
    new Clause("SET", [
      new ExpressionList(["MergeSelectArgs<U, F>"], "assignment"),
    ]),
    new Clause("FROM", [new FromItem("F").repeated()]).optional(),
    new Clause("WHERE", [new Condition(["MergeSelectArgs<U, F>"])]).optional(),
    new Clause("RETURNING", [
      new ExpressionList(["MergeSelectArgs<U, F>", "R"], "alias"),
    ]).optional(),
  ],
);
