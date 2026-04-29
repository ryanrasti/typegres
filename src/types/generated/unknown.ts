// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Unknown<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Unknown;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Unknown<0 | 1>;
    __nonNullable: Unknown<1>;
    __aggregate: Unknown<number>;
    __any: Unknown<any>;
  };
  static __typname = runtime.sql`unknown`;
  static __typnameText = "unknown";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  unknownsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("unknownsend", [this, ...__rest], __rt) as any; }
}
