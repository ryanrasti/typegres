// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Tsvector<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Tsvector;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Tsvector<0 | 1>;
    __nonNullable: Tsvector<1>;
    __aggregate: Tsvector<number>;
    __any: Tsvector<any>;
  };
  static __typname = runtime.sql`tsvector`;
  static __typnameText = "tsvector";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  setweight<M0 extends types.Char<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Char, allowPrimitive: true }], types.Tsvector]]); return runtime.PgFunc("setweight", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  strip(): types.Tsvector<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Tsvector]]); return runtime.PgFunc("strip", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsDelete<M0 extends types.Text<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Tsvector]]); return runtime.PgFunc("ts_delete", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsMatchVq<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("ts_match_vq", [this, ...__rest], __rt) as any; }
  tsRank<M0 extends types.Tsquery<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  tsRank<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  tsRank(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Tsquery, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Float4], [[{ type: types.Tsquery, allowPrimitive: true }], types.Float4]]); return runtime.PgFunc("ts_rank", [this, ...__rest], __rt) as any; }
  tsRankCd<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  tsRankCd<M0 extends types.Tsquery<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Float4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @tool.unchecked()
  tsRankCd(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Float4], [[{ type: types.Tsquery, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Float4]]); return runtime.PgFunc("ts_rank_cd", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsvectorConcat<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Tsvector]]); return runtime.PgFunc("tsvector_concat", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsvectorsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("tsvectorsend", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  unnest(): runtime.PgSrf<{ lexeme: types.Text<1> }, "unnest"> { return new runtime.PgSrf("unnest", [this], [["lexeme", types.Text]]) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@@']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@@@']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['||']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Tsvector<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Tsvector]]); return runtime.PgOp(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
