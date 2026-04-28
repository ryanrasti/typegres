// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regproc<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regproc;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regproc<0 | 1>;
    __nonNullable: Regproc<1>;
    __aggregate: Regproc<number>;
    __any: Regproc<any>;
  };
  static __typname = runtime.sql`regproc`;
  static __typnameText = "regproc";
  declare deserialize: (raw: string) => string;
  regprocsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regprocsend", [this, ...__rest], __rt) as any; }
}
