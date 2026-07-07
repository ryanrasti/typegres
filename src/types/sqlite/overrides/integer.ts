import { Integer as Generated } from "../generated/integer";

// better-sqlite3 hands us JS numbers directly; the SqliteDriver stringifies
// them via `String(v)` before hydration (so PG and SQLite share one
// deserialize path). parseInt reverses that stringification.
export class Integer<N extends number> extends Generated<N> {
  static override primitiveTs = "number";
  override deserialize(raw: string): number { return parseInt(raw, 10); }
}
