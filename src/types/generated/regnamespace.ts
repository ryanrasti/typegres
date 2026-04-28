// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regnamespace<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regnamespace;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regnamespace<0 | 1>;
    __nonNullable: Regnamespace<1>;
    __aggregate: Regnamespace<number>;
    __any: Regnamespace<any>;
  };
  static __typname = runtime.sql`regnamespace`;
  static __typnameText = "regnamespace";
  declare deserialize: (raw: string) => string;
  regnamespacesend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regnamespacesend", [this, ...__rest], __rt) as any; }
}
