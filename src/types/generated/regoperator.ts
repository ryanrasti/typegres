// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regoperator<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regoperator;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regoperator<0 | 1>;
    __nonNullable: Regoperator<1>;
    __aggregate: Regoperator<number>;
    __any: Regoperator<any>;
  };
  static __typname = runtime.sql`regoperator`;
  static __typnameText = "regoperator";
  declare deserialize: (raw: string) => string;
  regoperatorsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regoperatorsend", [this, ...__rest], __rt) as any; }
}
