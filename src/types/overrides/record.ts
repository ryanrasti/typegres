import { Record as Generated } from "../generated/record";
import type { Any } from "../index";

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

export type ColumnEntry = [string, Any<any>];

export class Record<N extends number> extends Generated<N> {
  static __columns: ColumnEntry[] = [];

  // Override deserialize to parse composite format and delegate to column types
  declare deserialize: (raw: string) => { [key: string]: unknown };

  static of(columns: ColumnEntry[]) {
    const cls = class extends (this as unknown as typeof Record) {
      static __columns = columns;
      static __typname = "record";
    };
    // Set up prototype deserialize using the column definitions
    cls.prototype.deserialize = (raw: string) => {
      const fields = parseComposite(raw);
      const result: { [key: string]: unknown } = {};
      for (let i = 0; i < columns.length; i++) {
        const [name, type] = columns[i]!;
        const val = fields[i];
        if (val === undefined || val === "") {
          result[name] = null;
        } else {
          result[name] = type.deserialize(val);
        }
      }
      return result;
    };
    return cls;
  }
}
