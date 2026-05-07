// Plain-data check, recursive. Is this a value that's JSON-safe all
// the way down — no class instances anywhere in the tree? Accepts:
//   - primitives (string, number, bigint, boolean, symbol, undefined)
//   - null
//   - plain objects (Object.prototype or null-proto), recursively
//   - arrays, recursively
// Rejects any class instance at any depth — Date, Map, Set, custom
// classes, typegres `Any` expressions, etc.
//
// Used as a security boundary at serialization (RPC wire) and at
// type-level wrapping (Any.from, Any.in). A class instance buried
// three levels deep is just as bad as one at the top, so the check
// recurses.
//
// Cycles aren't handled — typegres callers don't pass cyclic data;
// JSON.stringify would fail downstream anyway. A cyclic input here
// produces a stack overflow rather than a clean `false`.
export const isPlainData = (v: unknown): boolean => {
  if (v === null || typeof v !== "object") {return true;}
  const proto = Object.getPrototypeOf(v);
  if (proto !== Object.prototype && proto !== Array.prototype && proto !== null) {return false;}
  for (const child of Object.values(v as object)) {
    if (!isPlainData(child)) {return false;}
  }
  return true;
};
