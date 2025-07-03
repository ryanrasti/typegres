import type Any from "./any";

export type Input<T extends Any> = unknown extends T["resultType"]
  ? never
  : T["resultType"];

export const typeMap = {
  bool: {
    parse: (value: string): boolean => {
      // from node-pg-types
      return (
        value === "TRUE" ||
        value === "t" ||
        value === "true" ||
        value === "y" ||
        value === "yes" ||
        value === "on" ||
        value === "1"
      );
    },
    serialize: (value: boolean): string => (value ? "true" : "false"),
    serializeFromTypes: ["boolean"],
  },
  int2: {
    parse: Number,
    serialize: (value: number) => value.toString(),
    serializeFromTypes: ["number"],
  },
  int4: {
    parse: Number,
    serialize: (value: number) => value.toString(),
    serializeFromTypes: ["number"],
  },
  int8: {
    parse: BigInt,
    serialize: (value: bigint) => value.toString(),
    serializeFromTypes: ["bigint"],
  },
  float4: {
    parse: parseFloat,
    serialize: (value: number): string => value.toString(),
    serializeFromTypes: ["number"],
  },
  float8: {
    parse: parseFloat,
    serialize: (value: number): string => value.toString(),
    serializeFromTypes: ["number"],
  },
  numeric: {
    parse: (x: string) => x,
    serialize: (value: number | bigint | string): string => value.toString(),
    serializeFromTypes: ["number", "bigint", "string"],
  },
  text: {
    parse: (x: string) => x,
    serialize: (value: string): string => value,
    serializeFromTypes: ["string"],
  },
} as const;

export const canonicalType = {
  boolean: "bool",
  number: "float8",
  bigint: "int8",
  string: "text",
};
