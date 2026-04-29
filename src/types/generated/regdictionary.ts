// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regdictionary<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regdictionary;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regdictionary<0 | 1>;
    __nonNullable: Regdictionary<1>;
    __aggregate: Regdictionary<number>;
    __any: Regdictionary<any>;
  };
  static __typname = runtime.sql`regdictionary`;
  static __typnameText = "regdictionary";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  regdictionarysend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regdictionarysend", [this, ...__rest], __rt) as any; }
}
