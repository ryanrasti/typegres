// Placeholder — these will be the real expression node builders
export const PgFunc = (name: string, args: unknown[]): unknown => {
  return { __pg: true, kind: "func", func: name, args };
};

export const PgOp = (op: string, args: unknown[]): unknown => {
  return { __pg: true, kind: "op", op, args };
};
