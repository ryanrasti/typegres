// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regconfig<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regconfig;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regconfig<0 | 1>;
    __nonNullable: Regconfig<1>;
    __aggregate: Regconfig<number>;
    __any: Regconfig<any>;
  };
  static __typname = runtime.sql`regconfig`;
  static __typnameText = "regconfig";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  jsonToTsvector<M0 extends types.Json<any> | string, M1 extends types.Jsonb<any> | string>(arg0: M0, arg1: M1): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Json, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }], types.Tsvector]]); return runtime.PgFunc("json_to_tsvector", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbToTsvector<M0 extends types.Jsonb<any> | string, M1 extends types.Jsonb<any> | string>(arg0: M0, arg1: M1): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Jsonb, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }], types.Tsvector]]); return runtime.PgFunc("jsonb_to_tsvector", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  phrasetoTsquery<M0 extends types.Text<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("phraseto_tsquery", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  plaintoTsquery<M0 extends types.Text<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("plainto_tsquery", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  regconfigsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regconfigsend", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  toTsquery<M0 extends types.Text<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("to_tsquery", [this, ...__rest], __rt) as any; }
  toTsvector<M0 extends types.Text<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  toTsvector<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  toTsvector<M0 extends types.Json<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  toTsvector(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Tsvector], [[{ type: types.Jsonb, allowPrimitive: true }], types.Tsvector], [[{ type: types.Json, allowPrimitive: true }], types.Tsvector]]); return runtime.PgFunc("to_tsvector", [this, ...__rest], __rt) as any; }
  tsHeadline<M0 extends types.Json<any> | string, M1 extends types.Tsquery<any> | string>(arg0: M0, arg1: M1): types.Json<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  tsHeadline<M0 extends types.Text<any> | string, M1 extends types.Tsquery<any> | string, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  tsHeadline<M0 extends types.Text<any> | string, M1 extends types.Tsquery<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  tsHeadline<M0 extends types.Json<any> | string, M1 extends types.Tsquery<any> | string, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Json<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  tsHeadline<M0 extends types.Jsonb<any> | string, M1 extends types.Tsquery<any> | string>(arg0: M0, arg1: M1): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  tsHeadline<M0 extends types.Jsonb<any> | string, M1 extends types.Tsquery<any> | string, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  @tool.unchecked()
  tsHeadline(arg0: unknown, arg1: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Json, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }], types.Json], [[{ type: types.Text, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }], types.Text], [[{ type: types.Json, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Json], [[{ type: types.Jsonb, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }], types.Jsonb], [[{ type: types.Jsonb, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("ts_headline", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  websearchToTsquery<M0 extends types.Text<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("websearch_to_tsquery", [this, ...__rest], __rt) as any; }
}
