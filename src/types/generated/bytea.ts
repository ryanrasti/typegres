// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Bytea<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Bytea;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Bytea<0 | 1>;
    __nonNullable: Bytea<1>;
    __aggregate: Bytea<number>;
    __any: Bytea<any>;
  };
  static __typname = runtime.sql`bytea`;
  static __typnameText = "bytea";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  bitCount(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("bit_count", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bitLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("bit_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  btrim<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("btrim", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  byteacat<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("byteacat", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bytealike<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bytealike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  byteanlike<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("byteanlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  byteasend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("byteasend", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  encode<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("encode", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  getBit<M0 extends types.Int8<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("get_bit", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  getByte<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("get_byte", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  like<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("like", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  likeEscape<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("like_escape", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ltrim<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("ltrim", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  md5(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("md5", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  notlike<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("notlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("octet_length", [this, ...__rest], __rt) as any; }
  overlay<M0 extends types.Bytea<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  overlay<M0 extends types.Bytea<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @tool.unchecked()
  overlay(arg0: unknown, arg1: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Bytea, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea], [[{ type: types.Bytea, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("overlay", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  position<M0 extends types.Bytea<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("position", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  rtrim<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("rtrim", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  setBit<M0 extends types.Int8<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int8, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("set_bit", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  setByte<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("set_byte", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sha224(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("sha224", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sha256(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("sha256", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sha384(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("sha384", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  sha512(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("sha512", [this, ...__rest], __rt) as any; }
  substr<M0 extends types.Int4<any> | number>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  substr<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @tool.unchecked()
  substr(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }], types.Bytea], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("substr", [this, ...__rest], __rt) as any; }
  substring<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring<M0 extends types.Int4<any> | number>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  substring(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea], [[{ type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("substring", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  stringAgg<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgFunc("string_agg", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['!~~']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['||']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.PgOp(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~~']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
