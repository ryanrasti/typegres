// Shared naming DATA for the unified emitter (../emission/emit.ts):
// operator-symbol aliases. Both dialects emit the same model —
// runtime.match dispatch under @expose.unchecked, camelCase function
// names, operator symbols as bracket methods plus readable aliases.


// Readable aliases for operator symbols (the catalogs don't provide
// nice names). Emitted as a second method next to the bracketed form:
//     ['=']<M>(arg: M): Bool<...>   // symbol form
//     eq<M>(arg: M): Bool<...>      // alias
// Dialect-shared with PG's collision rule: the alias is SKIPPED when
// a real function already owns the name (pg: mod/pow exist as catalog
// functions; sqlite: mod()) — the function's signature is
// authoritative.
export const OPERATOR_ALIASES: { [op: string]: string } = {
  "=": "eq",
  "<>": "ne",
  "<": "lt",
  "<=": "lte",
  ">": "gt",
  ">=": "gte",
  "+": "plus",
  "-": "minus",
  "*": "times",
  "/": "divide",
  "%": "mod",
  "^": "pow",
};

// Unary operators are alias-only where the bracket form would collide
// (unary "-" vs binary minus); "~" keeps its bracket form too.
export const UNARY_OPERATOR_ALIASES: { [op: string]: string } = {
  "-": "negate",
  "~": "bitNot",
};




