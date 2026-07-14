import type { RowType } from "./builder/query";
import { SqlValue } from "./types/sql-value";
import { exposedFieldsOf } from "./exoeval/tool";

// Plain-data check, recursive. Is this a value that's JSON-safe all
// the way down — no class instances anywhere in the tree? Accepts:
//   - primitives (string, number, bigint, boolean, symbol, undefined)
//   - null
//   - plain objects (Object.prototype or null-proto), recursively
//   - arrays, recursively
// Rejects any class instance at any depth — Date, Map, Set, custom
// classes, typegres typed values (SqlValue), etc.
//
// Used as a security boundary at serialization (RPC wire) and at
// type-level wrapping (SqlValue.from, SqlValue.in). A class instance
// buried three levels deep is just as bad as one at the top, so the
// check recurses.
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

export const isPlainObject = (v: unknown): v is { [key: string]: unknown } => {
  if (v === null || typeof v !== "object") {return false;}
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};

export const isThenable = (v: unknown): v is PromiseLike<unknown> => {
  return (
    v !== null &&
    (typeof v === "object" || typeof v === "function") &&
    "then" in v &&
    typeof (v as PromiseLike<unknown>).then === "function"
  );
};

// --- @expose-aware row deserialization ---
//
// Final-presentation gate for the @expose contract. If `output` is a
// table-instance row type, it carries a Set of @expose-marked field
// names under `toolFieldsSymbol` (read via `exposedFieldsOf`); this
// filter drops unmarked columns at the wire boundary so a bare
// `Users.from().execute(db)` (or a scalar subquery wrapping the same
// instance) can't leak unmarked fields like `password_hash`. POJOs
// (from `.select(cb)`) carry no marker — `exposedFieldsOf` returns
// undefined and every named field passes through.
//
// Lives here (not in builder/query.ts) so `Record.deserialize` can
// reuse the same logic without a value-import cycle through the type
// re-export tree.

export const deserializeRows = <R>(
  rows: { [key: string]: string | null | undefined }[],
  shape: RowType,
): R[] => {
  let exposed = undefined;
  if (!isPlainObject(shape)) {
    exposed = exposedFieldsOf(shape);
    if (exposed == null) {
      throw new Error(
        `deserializeRows: expected a plain object or an @expose-marked table instance as shape, got ${JSON.stringify(shape)}`,
      );
    }
  }
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row)
        .filter(([k]) => !exposed || exposed.has(k))
        .map(([k, v]) => {
          const type = (shape as { [k: string]: unknown })[k];
          if (!(type instanceof SqlValue)) {
            throw new Error(
              `deserializeRows: output column '${k}' is not a typed expression (got ${JSON.stringify(type)}). ` +
                `The select callback must return an object whose values are typegres SqlValue instances.`,
            );
          }
          if (v == null) {
            return [k, null];
          }
          return [k, type.deserialize(String(v))];
        }),
    ),
  ) as R[];
};
