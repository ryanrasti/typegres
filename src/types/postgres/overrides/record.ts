import { Record as Generated } from "../generated/record";
import type { RowType, RowTypeToTsType } from "../../../builder/query";
import { sql } from "../../../builder/sql";
import { deserializeRows } from "../../../util";

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

export class Record<N extends number = number, T = unknown> extends Generated<N> {
  // N is first so codegen's `types.Record<0 | 1>` / `types.Record<N>` targets
  // nullability (matching every other Cls<N>); the row type T is the optional
  // second param, filled via Record.of(). Conditional in case T isn't a row
  // type.
  declare deserialize: (raw: string) => T extends RowType ? RowTypeToTsType<T> : unknown;

  static of<T extends RowType>(rowType: T) {
    const cls = class extends (this as any) {
      static __typname = sql`record`;
      static __typnameText = "record";
    };
    cls.prototype["deserialize"] = (raw: string) => {
      // pg emits composite fields positionally; reassemble into a named
      // row so deserializeRows can apply the @expose filter by name.
      const fields = parseComposite(raw);
      const namedRow = Object.fromEntries(
        Object.keys(rowType).map((name, i) => [name, fields[i] ?? null]),
      );
      return deserializeRows([namedRow], rowType)[0];
    };
    return cls as unknown as typeof Record<any, T>;
  }
}
