import invariant from "tiny-invariant";
import {
  TopLevelClause,
  Clause,
  ExpressionList,
  FromItem,
  Literal,
  Condition,
  Context,
  ParsedClause,
  ParsedFromItem,
  Node,
} from "./nodes";
import {
  ExtractedContext,
  extractFromItemAsSelectArgs,
  extractReturnValue,
} from "./nodes/context";

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

export const extractUpdateAndFromItemAsSelectArgs = (
  tlc: ParsedClause,
): ExtractedContext => {
  const [fromItem] = extractFromItemAsSelectArgs(tlc);
  if (tlc.grammar.name === "UPDATE") {
    const updateTable = tlc.args.value[1];
    invariant(
      updateTable instanceof ParsedFromItem,
      `Expected ParsedFromItem of type 'table' in UPDATE clause, but got ${updateTable}`,
    );

    return [updateTable.value, fromItem];
  }
  return [undefined, fromItem];
};

const withContext = (node: Node): Node =>
  new Context(
    "[updateRow: Types.FromToSelectArgs<U, {}>[0], ...Types.FromToSelectArgs<ReturnType<FR['asFromItem']>['from'], ReturnType<FR['asFromItem']>['joins']>]",
    extractUpdateAndFromItemAsSelectArgs,
    node,
  );

export const updateGrammar = new TopLevelClause(
  "UPDATE",
  "<U extends Types.RowLike, F extends Types.RowLike, J extends Types.Joins, FR extends Types.AsFromItem<F, J>, R extends Types.RowLike>",
  "R",
  extractReturnValue("RETURNING"),
  [
    new Literal("ONLY").optional(),
    new FromItem("Types.Table<U>"),
    new Clause("SET", [withContext(new ExpressionList("assignment"))]),
    new Clause("FROM", [new FromItem("FR")]).optional(),
    new Clause("WHERE", [withContext(new Condition())]).optional(),
    new Clause("RETURNING", [
      withContext(new ExpressionList("alias", "R")),
    ]).optional(),
  ],
);
