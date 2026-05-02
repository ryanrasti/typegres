// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Text<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Text;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Text<0 | 1>;
    __nonNullable: Text<1>;
    __aggregate: Text<number>;
    __any: Text<any>;
  };
  static __typname = runtime.sql`text`;
  static __typnameText = "text";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  ascii(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("ascii", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("bit_length", [this, ...__rest], __rt) as any; }
  btrim(): types.Text<N>;
  btrim<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  btrim(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("btrim", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  char(): types.Char<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Char]]); return runtime.PgFunc("char", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  charLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("char_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  characterLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("character_length", [this, ...__rest], __rt) as any; }
  datePart<M0 extends types.Timestamp<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Date<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Time<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Timetz<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Interval<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  datePart(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp }], types.Float8], [[{ type: types.Date }], types.Float8], [[{ type: types.Time }], types.Float8], [[{ type: types.Timetz }], types.Float8], [[{ type: types.Interval }], types.Float8]]); return runtime.PgFunc("date_part", [this, ...__rest], __rt) as any; }
  dateTrunc<M0 extends types.Interval<any>>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  dateTrunc<M0 extends types.Timestamptz<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  dateTrunc<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  dateTrunc(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Interval }], types.Interval], [[{ type: types.Timestamptz, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Timestamptz], [[{ type: types.Timestamp }], types.Timestamp]]); return runtime.PgFunc("date_trunc", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  decode<M0 extends types.Text<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("decode", [this, ...__rest], __rt) as any; }
  extract<M0 extends types.Interval<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Timestamp<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Timetz<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Time<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Date<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  extract(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Numeric], [[{ type: types.Timestamp }], types.Numeric], [[{ type: types.Timetz }], types.Numeric], [[{ type: types.Time }], types.Numeric], [[{ type: types.Date }], types.Numeric]]); return runtime.PgFunc("extract", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  initcap(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("initcap", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  isNormalized<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("is_normalized", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  left<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("left", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  like<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("like", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  likeEscape<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("like_escape", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  lower(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("lower", [this, ...__rest], __rt) as any; }
  lpad<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lpad<M0 extends types.Int4<any> | number, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @tool.unchecked()
  lpad(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("lpad", [this, ...__rest], __rt) as any; }
  ltrim<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ltrim(): types.Text<N>;
  @tool.unchecked()
  ltrim(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.PgFunc("ltrim", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  md5(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("md5", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  normalize<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("normalize", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  notlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("notlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("octet_length", [this, ...__rest], __rt) as any; }
  overlay<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  overlay<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  @tool.unchecked()
  overlay(arg0: unknown, arg1: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("overlay", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgSizeBytes(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("pg_size_bytes", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  position<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("position", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  quoteIdent(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("quote_ident", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  quoteLiteral(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("quote_literal", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  quoteNullable(): types.Text<1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("quote_nullable", [this, ...__rest], __rt) as any; }
  regexpCount<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  regexpCount<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpCount<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  @tool.unchecked()
  regexpCount(arg0: unknown, arg1?: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Text, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("regexp_count", [this, ...__rest], __rt) as any; }
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Text<any> | string, M5 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4, arg5: M5): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4> | runtime.NullOf<M5>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpInstr<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  regexpInstr(arg0: unknown, arg1?: unknown, arg2?: unknown, arg3?: unknown, arg4?: unknown, arg5?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4, arg5], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("regexp_instr", [this, ...__rest], __rt) as any; }
  regexpLike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  regexpLike<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @tool.unchecked()
  regexpLike(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }], types.Bool], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("regexp_like", [this, ...__rest], __rt) as any; }
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>>;
  @tool.unchecked()
  regexpReplace(arg0: unknown, arg1: unknown, arg2?: unknown, arg3?: unknown, arg4?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("regexp_replace", [this, ...__rest], __rt) as any; }
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Text<any> | string, M4 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>>;
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2, arg3: M3): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3>>>;
  regexpSubstr<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  regexpSubstr(arg0: unknown, arg1?: unknown, arg2?: unknown, arg3?: unknown, arg4?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("regexp_substr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  repeat<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("repeat", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  replace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("replace", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  reverse(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("reverse", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  right<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("right", [this, ...__rest], __rt) as any; }
  rpad<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  rpad<M0 extends types.Int4<any> | number, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @tool.unchecked()
  rpad(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("rpad", [this, ...__rest], __rt) as any; }
  rtrim<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  rtrim(): types.Text<N>;
  @tool.unchecked()
  rtrim(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.PgFunc("rtrim", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  similarEscape<M0 extends types.Text<any> | string>(arg0: M0): types.Text<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("similar_escape", [this, ...__rest], __rt) as any; }
  similarToEscape<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  similarToEscape(): types.Text<N>;
  @tool.unchecked()
  similarToEscape(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.PgFunc("similar_to_escape", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  splitPart<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("split_part", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  startsWith<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("starts_with", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  strpos<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("strpos", [this, ...__rest], __rt) as any; }
  substr<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substr<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  substr(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("substr", [this, ...__rest], __rt) as any; }
  substring<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  substring<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  substring(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("substring", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textLarger<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("text_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textPatternGe<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("text_pattern_ge", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textPatternGt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("text_pattern_gt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textPatternLe<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("text_pattern_le", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textPatternLt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("text_pattern_lt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textSmaller<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("text_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textcat<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("textcat", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  texticlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("texticlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  texticnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("texticnlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  texticregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("texticregexeq", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  texticregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("texticregexne", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textlen(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("textlen", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("textlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("textnlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("textregexeq", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  textregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("textregexne", [this, ...__rest], __rt) as any; }
  timezone<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  timezone<M0 extends types.Timestamptz<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  timezone(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp }], types.Timestamptz], [[{ type: types.Timestamptz }], types.Timestamp]]); return runtime.PgFunc("timezone", [this, ...__rest], __rt) as any; }
  toAscii<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  toAscii(): types.Text<N>;
  @tool.unchecked()
  toAscii(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.PgFunc("to_ascii", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  translate<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("translate", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  unicodeAssigned(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("unicode_assigned", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  unistr(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("unistr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  upper(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("upper", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  xmlIsWellFormedContent(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("xml_is_well_formed_content", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  xmlIsWellFormedDocument(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("xml_is_well_formed_document", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  xmlcomment(): types.Xml<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xml]]); return runtime.PgFunc("xmlcomment", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  xmlexists<M0 extends types.Xml<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xml, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("xmlexists", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  xmltext(): types.Xml<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xml]]); return runtime.PgFunc("xmltext", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  xpathExists<M0 extends types.Xml<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xml, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("xpath_exists", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Text<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Text<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stringAgg<M0 extends types.Text<any> | string>(arg0: M0): types.Text<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("string_agg", [this, ...__rest], __rt) as any; }
  regexpSplitToTable<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): runtime.PgSrf<{ regexp_split_to_table: types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "regexp_split_to_table">;
  regexpSplitToTable<M0 extends types.Text<any> | string>(arg0: M0): runtime.PgSrf<{ regexp_split_to_table: types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "regexp_split_to_table">;
  @tool.unchecked()
  regexpSplitToTable(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return new runtime.PgSrf("regexp_split_to_table", [this, ...__rest], [["regexp_split_to_table", __rt]]) as any; }
  stringToTable<M0 extends types.Text<any> | string>(arg0: M0): runtime.PgSrf<{ string_to_table: types.Text<1> }, "string_to_table">;
  stringToTable<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): runtime.PgSrf<{ string_to_table: types.Text<1> }, "string_to_table">;
  @tool.unchecked()
  stringToTable(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return new runtime.PgSrf("string_to_table", [this, ...__rest], [["string_to_table", __rt]]) as any; }
  @tool.unchecked()
  ['!~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['!~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['!~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['!~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['@@']<M0 extends types.Tsquery<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['@@']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['@@'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery }], types.Bool], [[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['^@']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`^@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['||']<M0 extends types.Anynonarray<any>>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['||']<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['||'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anynonarray }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgOp(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~<=~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~<=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~<~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~<~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~>=~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~>=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~>~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~>~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
