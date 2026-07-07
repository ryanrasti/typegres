// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Bytea<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
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
  @expose.unchecked()
  bitCount(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("bit_count", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bitLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("bit_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  btrim<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("btrim", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  byteacat<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("byteacat", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bytealike<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bytealike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  byteanlike<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("byteanlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  byteasend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("byteasend", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  encode<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("encode", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  getBit<M0 extends types.Int8<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("get_bit", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  getByte<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("get_byte", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  like<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("like", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  likeEscape<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("like_escape", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ltrim<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("ltrim", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  md5(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("md5", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  notlike<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("notlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("octet_length", [this, ...__rest], __rt) as any; }
  overlay<M0 extends types.Bytea<any> | string, M1 extends types.Int4<any> | number, M2 extends types.Int4<any> | number>(arg0: M0, arg1: M1, arg2: M2): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  overlay<M0 extends types.Bytea<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @expose.unchecked()
  overlay(arg0: unknown, arg1: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Bytea, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea], [[{ type: types.Bytea, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("overlay", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  position<M0 extends types.Bytea<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Int4]]); return runtime.funcCall("position", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  rtrim<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("rtrim", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  setBit<M0 extends types.Int8<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int8, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("set_bit", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  setByte<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("set_byte", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sha224(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("sha224", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sha256(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("sha256", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sha384(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("sha384", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sha512(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("sha512", [this, ...__rest], __rt) as any; }
  substr<M0 extends types.Int4<any> | number>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  substr<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @expose.unchecked()
  substr(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }], types.Bytea], [[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("substr", [this, ...__rest], __rt) as any; }
  substring<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring<M0 extends types.Int4<any> | number>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  substring(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bytea], [[{ type: types.Int4, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("substring", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  stringAgg<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<0 | 1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.funcCall("string_agg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['!~~']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['||']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bytea<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bytea]]); return runtime.opCall(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~~']<M0 extends types.Bytea<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bytea, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
