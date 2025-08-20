import { sql, RawBuilder } from "kysely";
import { Any } from "../types";
import { Context } from "../expression";
import invariant from "tiny-invariant";

// Types for ORDER BY expressions
export type OrderByDirection = "asc" | "desc";
export type OrderByNulls = "nulls first" | "nulls last";
export type OrderBySuffix = OrderByDirection | OrderByNulls | `${OrderByDirection} ${OrderByNulls}`;

export type OrderByExpression = Any<unknown, 0 | 1> | [Any<unknown, 0 | 1>, OrderBySuffix];

export type OrderBySpec = OrderByExpression | OrderByExpression[];

/**
 * Compiles an ORDER BY specification into SQL
 * @param spec - The ORDER BY specification (single item or array)
 * @param ctx - The compilation context
 * @returns The compiled SQL parts for ORDER BY clause
 */
export const compileOrderBy = (spec: OrderBySpec, ctx: Context): RawBuilder<unknown>[] => {
  return normalizeOrderBySpec(spec).map((item) => {
    if (Array.isArray(item)) {
      const [expr, suffix] = item;
      return compileOrderByItem(expr, suffix, ctx);
    }

    // Just an expression without suffix
    return item.toExpression().compile(ctx);
  });
};

/**
 * Compiles a single ORDER BY item with suffix
 */
const compileOrderByItem = (expr: Any<unknown, 0 | 1>, suffix: OrderBySuffix, ctx: Context): RawBuilder<unknown> => {
  const parts = suffix.split(" ");

  // Validate suffix parts
  const validParts: { [k in string]?: string } = Object.fromEntries(
    ["asc", "desc", "nulls", "first", "last"].map((p) => [p, p]),
  );
  const sanitizedParts = parts.map((p) => validParts[p.toLowerCase()]);
  invariant(sanitizedParts.every(Boolean), `Invalid ORDER BY suffix: ${suffix}`);
  invariant(sanitizedParts.length > 0 && sanitizedParts.length <= 3, `ORDER BY suffix invalid length: ${suffix}`);

  return sql`${expr.toExpression().compile(ctx)} ${sql.raw(sanitizedParts.join(" ").toUpperCase())}`;
};

/**
 * Checks if the spec is a single tuple [expr, "asc"/"desc"]
 * This is needed for backward compatibility with WindowSpec
 */
export const isSingleTupleSpec = (spec: unknown): spec is [Any, string] => {
  return (
    Array.isArray(spec) &&
    spec.length === 2 &&
    spec[0] &&
    typeof spec[0] === "object" &&
    "toExpression" in spec[0] &&
    typeof spec[1] === "string"
  );
};

/**
 * Normalizes an ORDER BY spec to always be an array of expressions
 * Handles the special case of a single tuple [expr, "asc"/"desc"]
 */
export const normalizeOrderBySpec = (spec: OrderBySpec): OrderByExpression[] => {
  // Check if it's a single tuple [expr, "asc"/"desc"]
  if (isSingleTupleSpec(spec)) {
    return [spec];
  }

  // Otherwise, ensure it's an array
  return Array.isArray(spec) ? spec : [spec];
};
