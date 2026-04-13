import type { Any } from "./index.js";

// Nullability: 0 = null, 1 = non-null, 0|1 = nullable, number = aggregate/unknown
// StrictNull: null propagates — if any arg is null, result is null (proisstrict = true)
export type StrictNull<T extends number> = number extends T ? number : T;
// MaybeNull: function can return null even with non-null args (proisstrict = false)
export type MaybeNull<T extends number> = number extends T ? number : 0 | T;

// Extract nullability from a pg expression or TS primitive
// Pg types extend Any<N> → extract N. TS primitives (number, string, etc.) → 1 (non-null).
export type NullOf<T> = T extends Any<infer N extends number> ? N : 1;

// Extract the TS type that a pg type deserializes to
// Each pg type carries a phantom __tsType. For primitives passed directly, it's the type itself.
export type TsTypeOf<T> = T extends { __tsType: infer U } ? U : T;

// Runtime type resolution helpers
// pgType(expr) — returns the constructor of the expression (for self-returning generics)
export const pgType = (expr: unknown): unknown => {
  const ctor = (expr as any).constructor;
  if (!ctor) throw new Error("pgType: expression has no constructor");
  return ctor;
};
// pgElement(expr) — returns the element type of a container (for T-returning generics)
export const pgElement = (expr: unknown): unknown => {
  const el = (expr as any).constructor?.__element;
  if (!el) throw new Error("pgElement: container type has no __element — did you call .of()?");
  return el;
};

// Placeholder — these will be the real expression node builders
export const PgFunc = (name: string, args: unknown[], type: unknown): unknown => {
  return { __pg: true, kind: "func", func: name, args, type };
};

export const PgOp = (op: string, args: unknown[], type: unknown): unknown => {
  return { __pg: true, kind: "op", op, args, type };
};
