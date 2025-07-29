import { updateGrammar } from "./update";
import { selectGrammar } from "./select";
export type { ParsedClause } from "./nodes";

// Export grammar definitions for generated files
export const grammars = {
  update: updateGrammar,
  select: selectGrammar(),
};
