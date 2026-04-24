import { test, expectTypeOf } from "vitest";
import { Int4, Text } from "./index";
import { sql } from "../builder/sql";

// .cast(cls) must preserve the source's nullability class when producing
// the target type — non-null / nullable / aggregate each map to the
// corresponding variant on the target.

test("cast preserves nullability", () => {
  // N=1 → non-null target
  const nonNull = Int4.from(1).cast(Text);
  expectTypeOf(nonNull).toEqualTypeOf<Text<1>>();

  // N=0|1 → nullable target
  const maybeNull = Int4.from(sql`1`).cast(Text);
  expectTypeOf(maybeNull).toEqualTypeOf<Text<0 | 1>>();

  // N=number (aggregate) → aggregate target. Aggregate Int4 only exists
  // inside a groupBy namespace at runtime; use a real instance re-typed
  // so the method runs harmlessly and we can assert the return type.
  const agg = Int4.from(1) as unknown as Int4<number>;
  const aggCasted = agg.cast(Text);
  expectTypeOf(aggCasted).toEqualTypeOf<Text<number>>();
});
