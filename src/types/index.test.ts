import { test } from "vitest";
import { expectTypeOf } from "vitest";
import type { StrictNull, MaybeNull, NullOf, TsTypeOf } from "./runtime.js";
import type { Any, Int4, Text, Bool, Float8, Int8 } from "./index.js";

// --- Nullability helpers ---

test("StrictNull propagation", () => {
  expectTypeOf<StrictNull<1>>().toEqualTypeOf<1>();
  expectTypeOf<StrictNull<0 | 1>>().toEqualTypeOf<0 | 1>();
  expectTypeOf<StrictNull<number>>().toEqualTypeOf<number>();
});

test("MaybeNull always adds 0", () => {
  expectTypeOf<MaybeNull<1>>().toEqualTypeOf<0 | 1>();
  expectTypeOf<MaybeNull<0>>().toEqualTypeOf<0>();
  expectTypeOf<MaybeNull<number>>().toEqualTypeOf<number>();
});

test("NullOf extracts nullability from pg types, defaults to 1 for primitives", () => {
  expectTypeOf<NullOf<Int4<0 | 1>>>().toEqualTypeOf<0 | 1>();
  expectTypeOf<NullOf<Int4<1>>>().toEqualTypeOf<1>();
  expectTypeOf<NullOf<number>>().toEqualTypeOf<1>();
  expectTypeOf<NullOf<string>>().toEqualTypeOf<1>();
});

// --- TsTypeOf ---

test("TsTypeOf extracts TS primitive from pg types", () => {
  expectTypeOf<TsTypeOf<Int4<1>>>().toEqualTypeOf<number>();
  expectTypeOf<TsTypeOf<Text<1>>>().toEqualTypeOf<string>();
  expectTypeOf<TsTypeOf<Bool<1>>>().toEqualTypeOf<boolean>();
  expectTypeOf<TsTypeOf<Float8<1>>>().toEqualTypeOf<number>();
  expectTypeOf<TsTypeOf<Int8<1>>>().toEqualTypeOf<bigint>();
});

// --- Method return type nullability ---

test("strict single-arg passes through N", () => {
  type AbsNonNull = ReturnType<Int4<1>["abs"]>;
  expectTypeOf<AbsNonNull>().toEqualTypeOf<Int4<1>>();

  type AbsNullable = ReturnType<Int4<0 | 1>["abs"]>;
  expectTypeOf<AbsNullable>().toEqualTypeOf<Int4<0 | 1>>();
});

test("non-strict functions always return non-null", () => {
  type ConcatNullable = ReturnType<Any<0 | 1>["concat"]>;
  expectTypeOf<ConcatNullable>().toEqualTypeOf<Text<1>>();

  type ConcatNull = ReturnType<Any<0>["concat"]>;
  expectTypeOf<ConcatNull>().toEqualTypeOf<Text<1>>();
});
