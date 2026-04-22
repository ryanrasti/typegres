// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regcollation<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regcollation;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regcollation<0 | 1>;
    __nonNullable: Regcollation<1>;
    __aggregate: Regcollation<number>;
    __any: Regcollation<any>;
  };
  static __typname = runtime.sql`regcollation`;
  static __typnameText = "regcollation";
  declare deserialize: (raw: string) => string;
  regcollationsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regcollationsend", [this, ...__rest], __rt) as any; }
}
