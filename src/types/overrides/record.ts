import { Record as Generated } from "../generated/record";
import type { Any } from "../index";
import type { RowTypeToTsType } from "../../builder/query";
import { sql } from "../../builder/sql";

// Pg composite format parser: `(val1,val2,...)` → per-field string, or null
// for a pg NULL field. Pg encodes NULL as absence between commas
// (`(1,,3)` → field 2 is NULL); empty string is quoted (`(1,"",3)` → field
// 2 is ""). Track `wasQuoted` so we can tell them apart after stripping
// the surrounding quote chars.
const parseComposite = (raw: string): (string | null)[] => {
  const inner = raw.slice(1, -1);
  if (inner === "") { return []; }
  const fields: (string | null)[] = [];
  let current = "";
  let inQuotes = false;
  let wasQuoted = false;
  let depth = 0;
  let escaped = false;
  const pushField = () => {
    fields.push(current === "" && !wasQuoted ? null : current);
    current = "";
    wasQuoted = false;
  };
  for (const ch of inner) {
    if (escaped) {
      current += ch;
      escaped = false;
    } else if (inQuotes && ch === "\\") {
      escaped = true;
    } else if (ch === '"') {
      inQuotes = !inQuotes;
      wasQuoted = true;
    } else if (!inQuotes && ch === "(") {
      depth++;
      current += ch;
    } else if (!inQuotes && ch === ")") {
      depth--;
      current += ch;
    } else if (ch === "," && !inQuotes && depth === 0) {
      pushField();
    } else {
      current += ch;
    }
  }
  pushField();
  return fields;
};

export class Record<T = unknown, N extends number = number> extends Generated<N> {
  static __columns: { [key: string]: Any<any> } = {};

  // Conditional so the declaration tolerates T being filled with a non-row
  // type (e.g. codegen's `types.Record<0 | 1>` in variant [meta] fields,
  // where the slot is positionally wrong but inert).
  declare deserialize: (raw: string) => T extends object ? RowTypeToTsType<T> : unknown;

  static of<T extends { [key: string]: Any<any> }>(columns: T) {
    const entries = Object.entries(columns);
    const cls = class extends (this as any) {
      static __columns = columns;
      static __typname = sql`record`;
      static __typnameText = "record";
    };
    // Closure over entries — works even when called without `this` (e.g., from Anyarray)
    cls.prototype["deserialize"] = (raw: string) => {
      const fields = parseComposite(raw);
      return Object.fromEntries(
        entries.map(([name, type], i) => {
          const val = fields[i];
          // undefined = column not emitted (pg output always emits every
          // field, so this is just a safety net); null = pg NULL; "" = real
          // empty string and flows through to type.deserialize.
          return [name, val === undefined || val === null ? null : type.deserialize(val)];
        }),
      );
    };
    return cls as unknown as typeof Record<T, any>;
  }
}
