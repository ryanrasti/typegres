// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Inet<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Inet;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Inet<0 | 1>;
    __nonNullable: Inet<1>;
    __aggregate: Inet<number>;
    __any: Inet<any>;
  };
  static __typname = runtime.sql`inet`;
  static __typnameText = "inet";
  declare deserialize: (raw: string) => string;
  abbrev(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("abbrev", [this, ...__rest], __rt) as any; }
  broadcast(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("broadcast", [this, ...__rest], __rt) as any; }
  cidr(): types.Cidr<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Cidr]]); return runtime.PgFunc("cidr", [this, ...__rest], __rt) as any; }
  family(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("family", [this, ...__rest], __rt) as any; }
  host(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("host", [this, ...__rest], __rt) as any; }
  hostmask(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("hostmask", [this, ...__rest], __rt) as any; }
  inetSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("inet_send", [this, ...__rest], __rt) as any; }
  inetand<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("inetand", [this, ...__rest], __rt) as any; }
  inetnot(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("inetnot", [this, ...__rest], __rt) as any; }
  inetor<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("inetor", [this, ...__rest], __rt) as any; }
  masklen(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("masklen", [this, ...__rest], __rt) as any; }
  netmask(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("netmask", [this, ...__rest], __rt) as any; }
  network(): types.Cidr<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Cidr]]); return runtime.PgFunc("network", [this, ...__rest], __rt) as any; }
  networkLarger<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("network_larger", [this, ...__rest], __rt) as any; }
  networkOverlap<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_overlap", [this, ...__rest], __rt) as any; }
  networkSmaller<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("network_smaller", [this, ...__rest], __rt) as any; }
  networkSub<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_sub", [this, ...__rest], __rt) as any; }
  networkSubeq<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_subeq", [this, ...__rest], __rt) as any; }
  networkSup<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_sup", [this, ...__rest], __rt) as any; }
  setMasklen<M0 extends types.Int4<any> | number>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("set_masklen", [this, ...__rest], __rt) as any; }
  text(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("text", [this, ...__rest], __rt) as any; }
  max(): types.Inet<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  min(): types.Inet<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  ['&']<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['&&']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Int8<any> | bigint>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Int8<any> | bigint>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Int8<any>>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Inet<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Inet], [[{ type: types.Inet, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int8<any>>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Inet<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Inet], [[{ type: types.Inet, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<<']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<<=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>>']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>>=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['|']<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
