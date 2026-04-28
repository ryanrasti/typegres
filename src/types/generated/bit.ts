// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Bit<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Bit;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Bit<0 | 1>;
    __nonNullable: Bit<1>;
    __aggregate: Bit<number>;
    __any: Bit<any>;
  };
  static __typname = runtime.sql`bit`;
  static __typnameText = "bit";
  declare deserialize: (raw: string) => string;
  bit<M0 extends types.Int4<any> | number, M1 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bit", [this, ...__rest], __rt) as any; }
  bitCount(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("bit_count", [this, ...__rest], __rt) as any; }
  bitLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("bit_length", [this, ...__rest], __rt) as any; }
  bitSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("bit_send", [this, ...__rest], __rt) as any; }
  bitand<M0 extends types.Bit<any> | string>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bitand", [this, ...__rest], __rt) as any; }
  bitnot(): types.Bit<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bit]]); return runtime.PgFunc("bitnot", [this, ...__rest], __rt) as any; }
  bitor<M0 extends types.Bit<any> | string>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bitor", [this, ...__rest], __rt) as any; }
  bitshiftleft<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bitshiftleft", [this, ...__rest], __rt) as any; }
  bitshiftright<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bitshiftright", [this, ...__rest], __rt) as any; }
  bitxor<M0 extends types.Bit<any> | string>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("bitxor", [this, ...__rest], __rt) as any; }
  getBit<M0 extends types.Int4<any> | number>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("get_bit", [this, ...__rest], __rt) as any; }
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("length", [this, ...__rest], __rt) as any; }
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("octet_length", [this, ...__rest], __rt) as any; }
  overlay<M0 extends types.Bit<any>, M1 extends types.Int4<any>, M2 extends types.Int4<any>>(arg0: M0, arg1: M1, arg2: M2): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>>;
  overlay<M0 extends types.Bit<any>, M1 extends types.Int4<any>>(arg0: M0, arg1: M1): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  overlay(arg0: unknown, arg1: unknown, arg2?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Bit, allowPrimitive: true }, { type: types.Int4 }, { type: types.Int4 }], types.Bit], [[{ type: types.Bit, allowPrimitive: true }, { type: types.Int4 }], types.Bit]]); return runtime.PgFunc("overlay", [this, ...__rest], __rt) as any; }
  position<M0 extends types.Bit<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Int4]]); return runtime.PgFunc("position", [this, ...__rest], __rt) as any; }
  setBit<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgFunc("set_bit", [this, ...__rest], __rt) as any; }
  substring<M0 extends types.Int4<any>>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  substring<M0 extends types.Int4<any>, M1 extends types.Int4<any>>(arg0: M0, arg1: M1): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  substring(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4 }], types.Bit], [[{ type: types.Int4 }, { type: types.Int4 }], types.Bit]]); return runtime.PgFunc("substring", [this, ...__rest], __rt) as any; }
  bitAnd(): types.Bit<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bit]]); return runtime.PgFunc("bit_and", [this, ...__rest], __rt) as any; }
  bitOr(): types.Bit<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bit]]); return runtime.PgFunc("bit_or", [this, ...__rest], __rt) as any; }
  bitXor(): types.Bit<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bit]]); return runtime.PgFunc("bit_xor", [this, ...__rest], __rt) as any; }
  ['#']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bit]]); return runtime.PgOp(runtime.sql`#`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bit]]); return runtime.PgOp(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<<']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Bit<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Bit]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['|']<M0 extends types.Bit<any> | string>(arg0: M0): types.Bit<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bit, allowPrimitive: true }], types.Bit]]); return runtime.PgOp(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
