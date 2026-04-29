// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regoper<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regoper;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regoper<0 | 1>;
    __nonNullable: Regoper<1>;
    __aggregate: Regoper<number>;
    __any: Regoper<any>;
  };
  static __typname = runtime.sql`regoper`;
  static __typnameText = "regoper";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  regopersend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regopersend", [this, ...__rest], __rt) as any; }
}
