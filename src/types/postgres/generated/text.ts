// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Text<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
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
  @expose.unchecked()
  ascii(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("ascii", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bitLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("bit_length", [this, ...__rest], __rt) as any; }
  btrim(): types.Text<N>;
  btrim<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  btrim(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("btrim", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  char(): types.Char<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Char]]); return runtime.funcCall("char", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  charLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("char_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  characterLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("character_length", [this, ...__rest], __rt) as any; }
  datePart<M0 extends types.Timestamp<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Date<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Time<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Timetz<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  datePart<M0 extends types.Interval<any>>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  datePart(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp }], types.Float8], [[{ type: types.Date }], types.Float8], [[{ type: types.Time }], types.Float8], [[{ type: types.Timetz }], types.Float8], [[{ type: types.Interval }], types.Float8]]); return runtime.funcCall("date_part", [this, ...__rest], __rt) as any; }
  dateTrunc<M0 extends types.Interval<any>>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  dateTrunc<M0 extends types.Timestamptz<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  dateTrunc<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  dateTrunc(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Interval }], types.Interval], [[{ type: types.Timestamptz, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Timestamptz], [[{ type: types.Timestamp }], types.Timestamp]]); return runtime.funcCall("date_trunc", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  decode<M0 extends types.Text<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("decode", [this, ...__rest], __rt) as any; }
  extract<M0 extends types.Interval<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Timestamp<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Timetz<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Time<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  extract<M0 extends types.Date<any>>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  extract(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Numeric], [[{ type: types.Timestamp }], types.Numeric], [[{ type: types.Timetz }], types.Numeric], [[{ type: types.Time }], types.Numeric], [[{ type: types.Date }], types.Numeric]]); return runtime.funcCall("extract", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  initcap(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("initcap", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  isNormalized<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("is_normalized", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  left<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("left", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  like<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("like", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  likeEscape<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("like_escape", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  lower(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("lower", [this, ...__rest], __rt) as any; }
  lpad<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lpad<M0 extends types.Int4<any> | number, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @expose.unchecked()
  lpad(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("lpad", [this, ...__rest], __rt) as any; }
  ltrim<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ltrim(): types.Text<N>;
  @expose.unchecked()
  ltrim(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.funcCall("ltrim", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  md5(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("md5", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  normalize<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("normalize", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  notlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("notlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("octet_length", [this, ...__rest], __rt) as any; }
  overlay<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  overlay<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  @expose.unchecked()
  overlay(arg0: unknown, arg1: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("overlay", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  pgSizeBytes(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("pg_size_bytes", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  position<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("position", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  quoteIdent(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("quote_ident", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  quoteLiteral(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("quote_literal", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  quoteNullable(): types.Text<1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("quote_nullable", [this, ...__rest], __rt) as any; }
  regexpCount<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  regexpCount<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpCount<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  @expose.unchecked()
  regexpCount(arg0: unknown, arg1?: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Text, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("regexp_count", [this, ...__rest], __rt) as any; }
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Text<any> | string, M5 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4, arg5: M5): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4> | runtime.NullOf<M5>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3>>>;
  regexpInstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpInstr<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  regexpInstr(arg0: unknown, arg1?: unknown, arg2?: unknown, arg3?: unknown, arg4?: unknown, arg5?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4, arg5], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Int4], [[{ type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("regexp_instr", [this, ...__rest], __rt) as any; }
  regexpLike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  regexpLike<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @expose.unchecked()
  regexpLike(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }], types.Bool], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("regexp_like", [this, ...__rest], __rt) as any; }
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpReplace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string, M2 extends types.Int4<any> | number, M3 extends types.Int4<any> | number, M4 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>>;
  @expose.unchecked()
  regexpReplace(arg0: unknown, arg1: unknown, arg2?: unknown, arg3?: unknown, arg4?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("regexp_replace", [this, ...__rest], __rt) as any; }
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Text<any> | string, M4 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2, arg3: M3, arg4: M4): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3> | runtime.NullOf<M4>>>;
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  regexpSubstr<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number, M3 extends types.Text<any> | string>(arg0: M0, arg1: M1, arg2: M2, arg3: M3): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2> | runtime.NullOf<M3>>>;
  regexpSubstr<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  regexpSubstr(arg0: unknown, arg1?: unknown, arg2?: unknown, arg3?: unknown, arg4?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2, arg3, arg4], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("regexp_substr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  repeat<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("repeat", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  replace<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("replace", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  reverse(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("reverse", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  right<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("right", [this, ...__rest], __rt) as any; }
  rpad<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  rpad<M0 extends types.Int4<any> | number, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @expose.unchecked()
  rpad(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("rpad", [this, ...__rest], __rt) as any; }
  rtrim<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  rtrim(): types.Text<N>;
  @expose.unchecked()
  rtrim(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.funcCall("rtrim", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  similarEscape<M0 extends types.Text<any> | string>(arg0: M0): types.Text<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("similar_escape", [this, ...__rest], __rt) as any; }
  similarToEscape<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  similarToEscape(): types.Text<N>;
  @expose.unchecked()
  similarToEscape(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.funcCall("similar_to_escape", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  splitPart<M0 extends types.Text<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("split_part", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  startsWith<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("starts_with", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  strpos<M0 extends types.Text<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("strpos", [this, ...__rest], __rt) as any; }
  substr<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substr<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  substr(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("substr", [this, ...__rest], __rt) as any; }
  substring<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  substring<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  substring(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("substring", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textLarger<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("text_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textPatternGe<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("text_pattern_ge", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textPatternGt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("text_pattern_gt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textPatternLe<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("text_pattern_le", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textPatternLt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("text_pattern_lt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textSmaller<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("text_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textcat<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("textcat", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  texticlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("texticlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  texticnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("texticnlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  texticregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("texticregexeq", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  texticregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("texticregexne", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textlen(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("textlen", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("textlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("textnlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("textregexeq", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  textregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("textregexne", [this, ...__rest], __rt) as any; }
  timezone<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  timezone<M0 extends types.Timestamptz<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  timezone(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp }], types.Timestamptz], [[{ type: types.Timestamptz }], types.Timestamp]]); return runtime.funcCall("timezone", [this, ...__rest], __rt) as any; }
  toAscii<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  toAscii(): types.Text<N>;
  @expose.unchecked()
  toAscii(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[], types.Text]]); return runtime.funcCall("to_ascii", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  translate<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("translate", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  unicodeAssigned(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("unicode_assigned", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  unistr(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("unistr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  upper(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("upper", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xmlIsWellFormedContent(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("xml_is_well_formed_content", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xmlIsWellFormedDocument(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("xml_is_well_formed_document", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xmlcomment(): types.Xml<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xml]]); return runtime.funcCall("xmlcomment", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xmlexists<M0 extends types.Xml<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xml, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("xmlexists", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xmltext(): types.Xml<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xml]]); return runtime.funcCall("xmltext", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  xpathExists<M0 extends types.Xml<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xml, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("xpath_exists", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Text<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Text<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stringAgg<M0 extends types.Text<any> | string>(arg0: M0): types.Text<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("string_agg", [this, ...__rest], __rt) as any; }
  regexpSplitToTable<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): runtime.Srf<{ regexp_split_to_table: types.Text<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "regexp_split_to_table">;
  regexpSplitToTable<M0 extends types.Text<any> | string>(arg0: M0): runtime.Srf<{ regexp_split_to_table: types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> }, "regexp_split_to_table">;
  @expose.unchecked()
  regexpSplitToTable(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return new runtime.Srf("regexp_split_to_table", [this, ...__rest], [["regexp_split_to_table", __rt]]) as any; }
  stringToTable<M0 extends types.Text<any> | string>(arg0: M0): runtime.Srf<{ string_to_table: types.Text<1> }, "string_to_table">;
  stringToTable<M0 extends types.Text<any> | string, M1 extends types.Text<any> | string>(arg0: M0, arg1: M1): runtime.Srf<{ string_to_table: types.Text<1> }, "string_to_table">;
  @expose.unchecked()
  stringToTable(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }], types.Text]]); return new runtime.Srf("string_to_table", [this, ...__rest], [["string_to_table", __rt]]) as any; }
  @expose.unchecked()
  ['!~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['!~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['!~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['!~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['@@']<M0 extends types.Tsquery<any>>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['@@']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['@@'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery }], types.Bool], [[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['^@']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`^@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['||']<M0 extends types.Anynonarray<any>>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['||']<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['||'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Anynonarray }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.opCall(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~<=~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~<=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~<~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~<~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~>=~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~>=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~>~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~>~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
