// THE facts schema — the single signature contract the unified
// emitter (./emit.ts) consumes. Both dialects produce instances of
// it: postgres builds them in memory from the catalog
// (postgres/emit.ts produceFacts — mechanical, nothing to validate);
// sqlite commits them as docs/*.json and zod-validates them on load
// (LLM-extracted, so validation is load-bearing; see
// sqlite/docs/index.ts for the sqlite-specific refinements layered on
// top: storage-class/hint vocabularies, required docs).
//
// The TS types are INFERRED from these schemas, so the emitter's
// contract and the validator cannot drift.
import z from "zod";

export const NullabilitySchema = z.enum([
  "propagates",  // NULL in any arg → NULL out; non-null in → non-null out
  "never",       // non-null even for NULL inputs (hex(NULL) = '')
  "always",      // may be NULL on valid non-null input (aggregate over ∅)
  "on_error",    // NULL is the error signal (date parse failure, bad path)
  "maybe_null",  // may be NULL on key-miss (pg's ->/->> family)
]);

export const EmitArgSchema = z.object({
  type: z.string().nullable(),      // type-table name; null = unknown (pg catalog gaps)
  hint: z.string().optional(),      // verifier sample-domain hint (sqlite; inert in emission)
  optional: z.boolean().optional(), // trailing optional parameter
});

export const EmitOverloadSchema = z.object({
  // In the SQL call's EXACT documented order; args[0] is the method
  // receiver (100% call-order fidelity — the emitted SQL is always
  // fn(this, ...rest)). sqlite functions that lead with a pattern or
  // format string host there (pattern.like(x), format.strftime(t));
  // like/glob's string-first direction stays available as the infix
  // LIKE/GLOB operators.
  args: z.array(EmitArgSchema),
  variadic: z.boolean().optional(), // last arg repeats 0+ more times
  returns: z.string().nullable(),   // type name, "arg0", or null (unknown / SRF row)
  nullability: NullabilitySchema,
  // Positions where NULL injection is part of the domain — for
  // "propagates", only these positions propagate (concat_ws skips
  // NULL values); for "never", only these positions tolerate NULL at
  // all (json_object labels may not be NULL). Omitted ⇒ every
  // position.
  nullPositions: z.array(z.number()).optional(),
});

export const EmitFnSchema = z.object({
  sql: z.string(),                  // SQL spelling (function name or operator symbol)
  kind: z.enum(["scalar", "aggregate", "binop", "unaryop"]),
  doc: z.string().optional(),       // one-sentence summary (sqlite pages; pg carries none)
  // Whether the function is deterministic (same inputs ⇒ same output).
  // Non-deterministic functions are NOT emitted to the typed surface
  // (postgres pre-filters via provolatile='i', so the field is absent
  // there; sqlite's claim is cross-checked against the engine's
  // SQLITE_DETERMINISTIC flag by the verifier).
  deterministic: z.boolean().optional(),
  // Set-returning (table-valued) function: emitted as an Srf with the
  // fixed row shape in outColumns instead of a scalar return.
  isSrf: z.boolean().optional(),
  outColumns: z.array(z.object({ name: z.string(), type: z.string() })).optional(),
  overloads: z.array(EmitOverloadSchema).min(1),
});

export type Nullability = z.infer<typeof NullabilitySchema>;
export type EmitArg = z.infer<typeof EmitArgSchema>;
export type EmitOverload = z.infer<typeof EmitOverloadSchema>;
export type EmitFn = z.infer<typeof EmitFnSchema>;
