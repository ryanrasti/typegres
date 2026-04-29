// Single source of truth for pg type → TS type mapping and deserialization.
// Used by codegen (tsType field) and runtime (deserialize fn).
// Types not listed here default to: tsType = "string", deserialize = identity.

export interface TypeDef {
  tsType: string;
  deserialize: (raw: string) => unknown;
}

const identity = (raw: string): string => raw;

const parseBoolean = (raw: string): boolean => raw === "t";

const parseInt32 = (raw: string): number => parseInt(raw, 10);

// parseFloat handles NaN, Infinity, -Infinity natively

// Non-string types — everything else defaults to string/identity.
//
// int8 / bytea sit at "string" rather than bigint / Uint8Array on purpose:
// the RPC wire format is JSON, and bigint/Uint8Array don't survive JSON
// round-tripping. Keeping deserialize as identity here means the wire is
// JSON-clean by default. Users who want bigint arithmetic can `BigInt(s)`
// themselves; bytea stays as pg's hex string (`\xDEADBEEF`). A richer
// wire codec (bigint, bytes, dates as sentinels) is a v0.2 item — see 
// ISSUES.md.
export const typeRegistry: { [key: string]: TypeDef } = {
  bool: { tsType: "boolean", deserialize: parseBoolean },
  int2: { tsType: "number", deserialize: parseInt32 },
  int4: { tsType: "number", deserialize: parseInt32 },
  float4: { tsType: "number", deserialize: parseFloat },
  float8: { tsType: "number", deserialize: parseFloat },
  oid: { tsType: "number", deserialize: parseInt32 }
};

export const defaultTypeDef: TypeDef = {
  tsType: "string",
  deserialize: identity,
};

export const getTypeDef = (typname: string): TypeDef =>
  typeRegistry[typname] ?? defaultTypeDef;
