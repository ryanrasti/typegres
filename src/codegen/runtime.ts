// Nullability: 0 = null, 1 = non-null, 0|1 = nullable, number = aggregate/unknown
// StrictNull: null propagates — if any arg is null, result is null (proisstrict = true)
export type StrictNull<T extends number> = number extends T ? number : T;
// MaybeNull: function can return null even with non-null args (proisstrict = false)
export type MaybeNull<T extends number> = number extends T ? number : 0 | T;

// Placeholder — these will be the real expression node builders
export const PgFunc = (name: string, args: unknown[]): unknown => {
  return { __pg: true, kind: "func", func: name, args };
};

export const PgOp = (op: string, args: unknown[]): unknown => {
  return { __pg: true, kind: "op", op, args };
};
