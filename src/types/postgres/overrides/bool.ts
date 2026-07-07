import { Bool as Generated } from "../generated/bool";
import { boolAnd, boolOr, boolNot } from "../../bool";
import type { NullOf, StrictNull } from "../../runtime";

export class Bool<N extends number> extends Generated<N> {
  static override primitiveTs = "boolean";
  override deserialize(raw: string): boolean { return raw === "t"; }

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
