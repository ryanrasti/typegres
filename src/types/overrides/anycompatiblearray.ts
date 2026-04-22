import { meta, type TsTypeOf } from "../runtime";
import { Anycompatiblearray as Generated } from "../generated/anycompatiblearray";
import type { Any } from "../index";
import { sql } from "../../builder/sql";

export class Anycompatiblearray<T extends Any<any>, N extends number> extends Generated<T, N> {
  static __element: Any<any>;

  deserialize(raw: string): TsTypeOf<T>[] {
    // Pg array format: `{a,b,NULL,"quoted","with,comma"}`.
    // NULL elements are the unquoted word `NULL` (case-sensitive). Quoted
    // `"NULL"` is the 4-char string. Track wasQuoted per element so we can
    // tell them apart after stripping surrounding quote chars.
    const inner = raw.slice(1, -1);
    if (inner === "") { return []; }
    const elements: (string | null)[] = [];
    let current = "";
    let inQuotes = false;
    let wasQuoted = false;
    let escaped = false;
    const pushElement = () => {
      elements.push(current === "NULL" && !wasQuoted ? null : current);
      current = "";
      wasQuoted = false;
    };
    for (const ch of inner) {
      if (escaped) {
        current += ch;
        escaped = false;
      } else if (inQuotes && ch === "\\") {
        // backslash escaping only occurs inside quoted elements
        escaped = true;
      } else if (ch === '"') {
        inQuotes = !inQuotes;
        wasQuoted = true;
      } else if (ch === "," && !inQuotes) {
        pushElement();
      } else {
        current += ch;
      }
    }
    pushElement();
    // Bind to the stored element instance — its deserialize uses
    // `this.constructor` to look up the type in the registry.
    const element = (this[meta].__class as unknown as { __element: Any<any> }).__element;
    const elDeser = element.deserialize.bind(element);
    return elements.map((el) => el === null ? null : elDeser(el)) as TsTypeOf<T>[];
  }

  static of<T extends Any<any>>(element: T) {
    const elClass = element[meta].__class;
    return class extends (this as any) {
      static __element = element;
      static __typname = sql`${elClass.__typname}[]`;
      static __typnameText = `${elClass.__typnameText}[]`;
    } as unknown as typeof Anycompatiblearray<T, any>;
  }
}
