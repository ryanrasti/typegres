// Auto-generated — do not edit
import * as runtime from "../runtime";
import { expose } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Timetz<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Timetz;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Timetz<0 | 1>;
    __nonNullable: Timetz<1>;
    __aggregate: Timetz<number>;
    __any: Timetz<any>;
  };
  static __typname = runtime.sql`timetz`;
  static __typnameText = "timetz";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  overlaps<M0 extends types.Timetz<any> | string, M1 extends types.Timetz<any> | string, M2 extends types.Timetz<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Timetz, allowPrimitive: true }, { type: types.Timetz, allowPrimitive: true }, { type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("overlaps", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  time(): types.Time<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Time]]); return runtime.PgFunc("time", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timetz<M0 extends types.Int4<any> | number>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Timetz]]); return runtime.PgFunc("timetz", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timetzLarger<M0 extends types.Timetz<any> | string>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Timetz]]); return runtime.PgFunc("timetz_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timetzSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("timetz_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  timetzSmaller<M0 extends types.Timetz<any> | string>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Timetz]]); return runtime.PgFunc("timetz_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Timetz<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timetz]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Timetz<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timetz]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  ['+']<M0 extends types.Interval<any>>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Date<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Timetz], [[{ type: types.Date }], types.Timestamptz]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Interval<any>>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Date<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval }], types.Timetz], [[{ type: types.Date }], types.Timestamptz]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['-']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timetz]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  minus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timetz]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Timetz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
