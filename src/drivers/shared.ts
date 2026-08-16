// Strip one outer pair of parentheses iff they balance to enclose the
// entire string. `(SELECT 1)` → `SELECT 1`; `(SELECT 1) UNION (SELECT 2)`
// stays as-is. QueryBuilder.bind() wraps statements in `(...)` for
// subquery splicing; SQLite and Oracle reject some top-level parenthesized
// statements.
export const stripMatchedOuterParens = (s: string): string => {
  const t = s.trim();
  if (!t.startsWith("(") || !t.endsWith(")")) { return s; }
  let depth = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === "(") { depth++; }
    else if (t[i] === ")") {
      depth--;
      if (depth === 0 && i !== t.length - 1) { return s; }
    }
  }
  return t.slice(1, -1);
};
