// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regrole<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regrole;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regrole<0 | 1>;
    __nonNullable: Regrole<1>;
    __aggregate: Regrole<number>;
    __any: Regrole<any>;
  };
  static __typname = runtime.sql`regrole`;
  static __typnameText = "regrole";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  regrolesend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regrolesend", [this, ...__rest], __rt) as any; }
}
