// The boolean view's hand-written behavior over the generated surface
// (../generated/bool.ts — chrome + iif and friends). SQLite has no
// native bool — the storage class is INTEGER 0/1 (the generated CAST
// target is INTEGER), so deserialization reads "1"/"0" and the
// and/or/not connectives build on integer truthiness.
import { Bool as Generated } from "../generated/bool";
import { boolAnd, boolOr, boolNot } from "../../bool";
import type { StrictNull, NullOf } from "../../runtime";

export class Bool<in out N extends number> extends Generated<N> {
  static override primitiveTs = "boolean";
  // Restore the typeof narrowing (Any's permissive acceptsPrimitive
  // override is inherited by statics).
  static override acceptsPrimitive(v: unknown): boolean { return typeof v === "boolean"; }
  override deserialize(raw: string): boolean { return raw === "1"; }

  and<M extends Bool<any>>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    return Bool.from(boolAnd(this.toSql(), other, Bool.dialect.name)) as any;
  }

  or<M extends Bool<any>>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    return Bool.from(boolOr(this.toSql(), other, Bool.dialect.name)) as any;
  }

  not(): Bool<N> {
    return Bool.from(boolNot(this.toSql(), Bool.dialect.name)) as any;
  }
}
