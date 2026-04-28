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

const parseBigInt = (raw: string): bigint => BigInt(raw);

const parseBytea = (raw: string): Uint8Array => {
  // pg hex format: \x48656c6c6f
  const hex = raw.slice(2);
  return Uint8Array.from(
    { length: hex.length / 2 },
    (_, i) => parseInt(hex.slice(i * 2, i * 2 + 2), 16),
  );
};

// Non-string types — everything else defaults to string/identity
export const typeRegistry: { [key: string]: TypeDef } = {
  bool: { tsType: "boolean", deserialize: parseBoolean },
  int2: { tsType: "number", deserialize: parseInt32 },
  int4: { tsType: "number", deserialize: parseInt32 },
  float4: { tsType: "number", deserialize: parseFloat },
  float8: { tsType: "number", deserialize: parseFloat },
  oid: { tsType: "number", deserialize: parseInt32 },
  int8: { tsType: "bigint", deserialize: parseBigInt },
  bytea: { tsType: "Uint8Array", deserialize: parseBytea },
};

export const defaultTypeDef: TypeDef = {
  tsType: "string",
  deserialize: identity,
};

export const getTypeDef = (typname: string): TypeDef =>
  typeRegistry[typname] ?? defaultTypeDef;
