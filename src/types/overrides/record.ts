import { Record as Generated } from "../generated/record";
import type { Any } from "../index";
import type { RowTypeToTsType } from "../../builder/query";

// Pg composite format parser: (val1,val2,...) → string[]
// Handles quoted values and nested composites
const parseComposite = (raw: string): string[] => {
  const inner = raw.slice(1, -1);
  if (inner === "") { return []; }
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  let depth = 0;
  let escaped = false;
  for (const ch of inner) {
    if (escaped) {
      current += ch;
      escaped = false;
    } else if (inQuotes && ch === "\\") {
      escaped = true;
    } else if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (!inQuotes && ch === "(") {
      depth++;
      current += ch;
    } else if (!inQuotes && ch === ")") {
      depth--;
      current += ch;
    } else if (ch === "," && !inQuotes && depth === 0) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
};

export class Record<T = unknown, N extends number = number> extends Generated<N> {
  static __columns: { [key: string]: Any<any> } = {};

  // @ts-expect-error — intentional: widen return type from string → RowTypeToTsType<T>
  declare deserialize: (raw: string) => RowTypeToTsType<T>;

  static of<T extends { [key: string]: Any<any> }>(columns: T) {
    const entries = Object.entries(columns);
    const cls = class extends (this as any) {
      static __columns = columns;
      static __typname = "record";
    };
    // Closure over entries — works even when called without `this` (e.g., from Anyarray)
    cls.prototype["deserialize"] = (raw: string) => {
      const fields = parseComposite(raw);
      const result: { [key: string]: unknown } = {};
      for (let i = 0; i < entries.length; i++) {
        const [name, type] = entries[i]!;
        const val = fields[i];
        if (val === undefined || val === "") {
          result[name] = null;
        } else {
          result[name] = type.deserialize(val);
        }
      }
      return result;
    };
    return cls as unknown as typeof Record<T, number>;
  }
}
