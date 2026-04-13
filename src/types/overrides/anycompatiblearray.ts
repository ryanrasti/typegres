import type { TsTypeOf } from "../runtime";
import { Anycompatiblearray as Generated } from "../generated/anycompatiblearray";
import type { Any } from "../index";

export class Anycompatiblearray<T extends Any<number>, N extends number> extends Generated<T, N> {
  static __element: unknown;

  deserialize(raw: string): TsTypeOf<T>[] {
    // Delegates to Anyarray's parsing — same pg array format
    const inner = raw.slice(1, -1);
    if (inner === "") { return []; }
    const elements: string[] = [];
    let current = "";
    let inQuotes = false;
    let escaped = false;
    for (const ch of inner) {
      if (escaped) {
        current += ch;
        escaped = false;
      } else if (inQuotes && ch === "\\") {
        // backslash escaping only occurs inside quoted elements
        escaped = true;
      } else if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        elements.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    elements.push(current);
    const elDeser = (this.__class as any).__element.prototype.deserialize;
    return elements.map((el) => elDeser(el)) as TsTypeOf<T>[];
  }

  static of<T extends { __typname: string }>(element: T) {
    return class extends (this as any) {
      static __element = element;
      static __typname = `${element.__typname}[]`;
    };
  }
}
