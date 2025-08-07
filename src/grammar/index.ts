import { updateGrammar } from "./update";
import { selectGrammar } from "./select";
import { insertGrammar } from "./insert";
import { ParsedClause, TopLevelClause } from "./nodes";
import { Typegres } from "../db";
import { RowLike } from "../types";
import { parseRowLike, RowLikeResult } from "../query/values";
import invariant from "tiny-invariant";
import { Context } from "../expression";
export type { ParsedClause } from "./nodes";

export { select } from "./generated/select";
export { update } from "./generated/update";
export { insert } from "./generated/insert";

// Export grammar definitions for generated files
export const grammars = {
  update: updateGrammar,
  select: selectGrammar(),
  insert: insertGrammar,
};

export class ExecutableStatement<R extends RowLike> {
  public clause: ParsedClause;

  constructor(clause: ParsedClause) {
    this.clause = clause;
  }

  async execute(typegres: Typegres): Promise<RowLikeResult<R>[]> {
    const compiled = this.clause.compile({
      topLevelClause: this.clause,
      expressionContext: Context.new(),
    });
    const raw = await typegres._internal.executeQuery(
      compiled.compile(typegres._internal),
    );
    invariant(Array.isArray(raw), "Expected an array of results");
    const returnShape = (
      this.clause.grammar as TopLevelClause
    ).returnShapeExtractor(this.clause);
    return returnShape
      ? raw.map((row) => {
          invariant(
            typeof row === "object" && row !== null,
            "Expected each row to be an object",
          );
          return parseRowLike(returnShape, row);
        })
      : raw;
  }
}
