import { sql } from "./sql-builder";
import { Int4, Text, Bool, Int8 } from "./types";
import type { Any } from "./types";

// Wrap a TS primitive into a typed pg expression with a parameterized SQL value.
export function val(value: number): Int4<1>;
export function val(value: string): Text<1>;
export function val(value: boolean): Bool<1>;
export function val(value: bigint): Int8<1>;
export function val(value: number | string | boolean | bigint): Any<1> {
  const raw = sql.param(value);
  switch (typeof value) {
    case "number":
      return new Int4(raw) as Any<1>;
    case "string":
      return new Text(raw) as Any<1>;
    case "boolean":
      return new Bool(raw) as Any<1>;
    case "bigint":
      return new Int8(raw) as Any<1>;
    default:
      throw new Error(`Unsupported val type: ${typeof value}`);
  }
}
