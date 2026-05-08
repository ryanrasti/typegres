// Auto-generated — do not edit
import * as runtime from "../runtime";
import { expose } from "../../exoeval/tool";
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
  @expose.unchecked()
  abbrev(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("abbrev", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  broadcast(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("broadcast", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  cidr(): types.Cidr<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Cidr]]); return runtime.PgFunc("cidr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  family(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("family", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  host(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("host", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  hostmask(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("hostmask", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  inetSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("inet_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  inetand<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("inetand", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  inetnot(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("inetnot", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  inetor<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("inetor", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  masklen(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("masklen", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  netmask(): types.Inet<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("netmask", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  network(): types.Cidr<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Cidr]]); return runtime.PgFunc("network", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  networkLarger<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("network_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  networkOverlap<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_overlap", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  networkSmaller<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("network_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  networkSub<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_sub", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  networkSubeq<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_subeq", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  networkSup<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("network_sup", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  setMasklen<M0 extends types.Int4<any> | number>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Inet]]); return runtime.PgFunc("set_masklen", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  text(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("text", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Inet<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Inet<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Inet]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['&']<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['&&']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['+']<M0 extends types.Int8<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  plus<M0 extends types.Int8<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Int8<any>>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Inet<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Inet], [[{ type: types.Inet, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int8<any>>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Inet<any> | string>(arg0: M0): types.Int8<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8 }], types.Inet], [[{ type: types.Inet, allowPrimitive: true }], types.Int8]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<<']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<<=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>>']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>>=']<M0 extends types.Inet<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['|']<M0 extends types.Inet<any> | string>(arg0: M0): types.Inet<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Inet, allowPrimitive: true }], types.Inet]]); return runtime.PgOp(runtime.sql`|`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
