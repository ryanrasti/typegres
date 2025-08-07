import {
  TopLevelClause,
  Clause,
  ExpressionList,
  FromItem,
  Literal,
  Context,
  ParsedClause,
  ParsedFromItem,
  Node,
  OneOf,
  IdentifierList,
  Todo,
  Recursive,
} from "./nodes";
import { ExtractedContext, extractReturnValue } from "./nodes/context";
import invariant from "tiny-invariant";

/*
https://www.postgresql.org/docs/current/sql-insert.html

[ WITH [ RECURSIVE ] with_query [, ...] ]
INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
    [ OVERRIDING { SYSTEM | USER } VALUE ]
    { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
    [ ON CONFLICT [ conflict_target ] conflict_action ]
    [ RETURNING { * | output_expression [ [ AS ] output_name ] } [, ...] ]

where conflict_target can be one of:

    ( { index_column_name | ( index_expression ) } [ COLLATE collation ] [ opclass ] [, ...] ) [ WHERE index_predicate ]
    ON CONSTRAINT constraint_name

and conflict_action is one of:

    DO NOTHING
    DO UPDATE SET { column_name = { expression | DEFAULT } |
                    ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
                    ( column_name [, ...] ) = ( sub-SELECT )
                  } [, ...]
              [ WHERE condition ]
*/

export const extractInsertTableAsSelectArgs = (
  tlc: ParsedClause,
): ExtractedContext => {
  if (tlc.grammar.name === "INSERT") {
    const insertTable = tlc.args.value[1];
    invariant(
      insertTable instanceof ParsedFromItem,
      `Expected ParsedFromItem of type 'table' in INSERT clause, but got ${insertTable}`,
    );

    return [insertTable.value, undefined];
  }
  return [undefined, undefined];
};

const withContext = (node: Node): Node =>
  new Context(
    "[insertRow: Types.FromToSelectArgs<I, {}>[0]]",
    extractInsertTableAsSelectArgs,
    node,
  );

const conflictTarget = new Todo("conflictTarget");
const conflictAction = new Todo("conflictAction");

export const insertGrammar = new TopLevelClause(
  "INSERT",
  "<I extends Types.RowLike, K extends keyof I, S extends Pick<I, K>, R extends Types.RowLike>",
  "R",
  extractReturnValue("RETURNING"),
  [
    new Literal("INTO"),
    new FromItem("Types.Table<I>"),
    new IdentifierList("column_names", "K").optional(),
    new Clause("OVERRIDING", [
      new OneOf([new Literal("SYSTEM"), new Literal("USER")]),
      new Literal("VALUE"),
    ]).optional(),
    new OneOf([
      new Literal("DEFAULT VALUES"),
      new Recursive("Types.ParsedClause<S>"),
    ]),
    new Clause("ON CONFLICT", [
      conflictTarget.optional(),
      conflictAction,
    ]).optional(),
    new Clause("RETURNING", [
      withContext(new ExpressionList("alias", "R")),
    ]).optional(),
  ],
);
