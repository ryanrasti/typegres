import { Expression, LiteralExpression, Context } from "./expression";
import { Any } from "./types";
import * as Types from "./types";
import { sql } from "kysely";

// WhenThen allows any types with the same base result type
export interface WhenThen<R extends Any> {
  when: Types.Bool<any>;
  then: R;
}

/**
 * SQL CASE expression
 * CASE WHEN condition THEN result [WHEN ...] [ELSE result] END
 *
 * Returns the common base type of all branches
 * Without ELSE: always nullable
 * With ELSE: nullable if any branch is nullable
 */

type AsNullable<R extends Any<unknown, number>> = ReturnType<
  R["asNullable"]>;

// Without ELSE - always nullable
export function caseWhen<N extends number, R extends Any<unknown, N>>(
  ...cases: WhenThen<R>[]
): AsNullable<R>;

// With ELSE - returns the same type as the ELSE clause
// This is a simplification - in reality SQL would check all branches
// but for TypeScript we'll use the ELSE type as the return type
export function caseWhen<N extends number, T extends Any<unknown, N>>(
  ...casesAndElse: [...WhenThen< T>[], T]
): T;
export function caseWhen<N extends number, T extends Any<unknown, N>>(
  ...casesAndElse: [...WhenThen<AsNullable<T>>[], T]
): AsNullable<T>;

export function caseWhen<R extends Any<unknown, N>, N extends number>(
  ...args: (WhenThen<R> | Types.Any<R, N>)[]
): Types.Any<R, N> {
  // Check if last argument is the ELSE clause
  const lastArg = args[args.length - 1];
  const hasElse =
    args.length > 0 &&
    (typeof lastArg !== "object" || lastArg === null || !("when" in lastArg));
  const whenThens = hasElse
    ? (args.slice(0, -1) as WhenThen<R>[])
    : (args as WhenThen<R>[]);
  const elseValue = hasElse
    ? (args[args.length - 1] as Types.Any<R, any>)
    : undefined;

  if (whenThens.length === 0) {
    throw new Error("CASE expression must have at least one WHEN clause");
  }

  // Find first non-null value to determine the concrete type
  let resultClass: typeof Types.Any | undefined;
  let typeStr: string | undefined;

  // Check WHEN branches first
  for (const wt of whenThens) {
    if (wt.then !== null && wt.then !== undefined) {
      resultClass = wt.then.getClass();
      typeStr = wt.then.getClass().typeString();
      if (typeStr) break;
    }
  }

  // If all WHEN branches are null, check ELSE
  if (!typeStr && elseValue != null) {
    resultClass = elseValue.getClass();
    typeStr = elseValue.getClass().typeString();
  }

  if (!typeStr || !resultClass) {
    throw new Error(
      `Cannot create CASE expression: unable to determine result type`
    );
  }

  // Convert all values to expressions
  const whens = whenThens.map((wt) => ({
    condition: wt.when.toExpression(),
    result:
      wt.then instanceof Any
        ? wt.then.toExpression()
        : new LiteralExpression(wt.then, typeStr),
  }));

  const elseExpr =
    elseValue !== undefined
      ? elseValue instanceof Any
        ? elseValue.toExpression()
        : new LiteralExpression(elseValue, typeStr)
      : undefined;

  const expr = new CaseExpression(whens, elseExpr);

  // Without ELSE, always nullable
  if (!hasElse) {
    return resultClass.new(expr).asNullable() as Types.Any<R, any>;
  }

  // With ELSE, return as-is (the type system will handle it based on the ELSE type)
  return resultClass.new(expr) as any;
}

export class CaseExpression extends Expression {
  constructor(
    private whens: Array<{ condition: Expression; result: Expression }>,
    private elseResult?: Expression
  ) {
    super();
  }

  compile(ctx: Context) {
    const whenClauses = this.whens.map(
      (w) => sql`WHEN ${w.condition.compile(ctx)} THEN ${w.result.compile(ctx)}`
    );

    const elsePart = this.elseResult
      ? sql` ELSE ${this.elseResult.compile(ctx)}`
      : sql``;

    return sql`CASE ${sql.join(whenClauses, sql` `)}${elsePart} END`;
  }
}
