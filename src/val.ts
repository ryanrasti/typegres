import { Int4, Text, Bool, Int8 } from "./types";
import type { Any } from "./types";

// Wrap a TS primitive into a typed pg expression.
// The constructor handles CAST($1 AS <typname>) automatically.
export function val(value: number): Int4<1>;
export function val(value: string): Text<1>;
export function val(value: boolean): Bool<1>;
export function val(value: bigint): Int8<1>;
export function val(value: number | string | boolean | bigint): Any<1> {
  switch (typeof value) {
    case "number":
      return new Int4(value) as Any<1>;
    case "string":
      return new Text(value) as Any<1>;
    case "boolean":
      return new Bool(value) as Any<1>;
    case "bigint":
      return new Int8(value) as Any<1>;
    default:
      throw new Error(`Unsupported val type: ${typeof value}`);
  }
}
