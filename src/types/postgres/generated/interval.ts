// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Interval<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Interval;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Interval<0 | 1>;
    __nonNullable: Interval<1>;
    __aggregate: Interval<number>;
    __any: Interval<any>;
  };
  static __typname = runtime.sql`interval`;
  static __typnameText = "interval";
  declare deserialize: (raw: string) => string;
  dateBin<M0 extends types.Timestamp<any>, M1 extends types.Timestamp<any>>(arg0: M0, arg1: M1): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  dateBin<M0 extends types.Timestamptz<any>, M1 extends types.Timestamptz<any>>(arg0: M0, arg1: M1): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  @expose.unchecked()
  dateBin(arg0: unknown, arg1: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Timestamp }, { type: types.Timestamp }], types.Timestamp], [[{ type: types.Timestamptz }, { type: types.Timestamptz }], types.Timestamptz]]); return runtime.funcCall("date_bin", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  interval<M0 extends types.Int4<any> | number>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Interval]]); return runtime.funcCall("interval", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  intervalLarger<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Interval]]); return runtime.funcCall("interval_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  intervalSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("interval_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  intervalSmaller<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Interval]]); return runtime.funcCall("interval_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  isfinite(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("isfinite", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  justifyDays(): types.Interval<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("justify_days", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  justifyHours(): types.Interval<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("justify_hours", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  justifyInterval(): types.Interval<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("justify_interval", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  time(): types.Time<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Time]]); return runtime.funcCall("time", [this, ...__rest], __rt) as any; }
  timezone<M0 extends types.Timestamptz<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  timezone<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  timezone<M0 extends types.Timetz<any>>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  timezone(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz }], types.Timestamp], [[{ type: types.Timestamp }], types.Timestamptz], [[{ type: types.Timetz }], types.Timetz]]); return runtime.funcCall("timezone", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  avg(): types.Interval<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("avg", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Interval<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Interval<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  sum(): types.Interval<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.funcCall("sum", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['*']<M0 extends types.Float8<any> | number>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  times<M0 extends types.Float8<any> | number>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['+']<M0 extends types.Date<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Timetz<any>>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Timestamptz<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Time<any>>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Timestamp], [[{ type: types.Timetz }], types.Timetz], [[{ type: types.Timestamp }], types.Timestamp], [[{ type: types.Timestamptz }], types.Timestamptz], [[{ type: types.Time }], types.Time], [[{ type: types.Interval, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Date<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Timetz<any>>(arg0: M0): types.Timetz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Timestamp<any>>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Timestamptz<any>>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Time<any>>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date }], types.Timestamp], [[{ type: types.Timetz }], types.Timetz], [[{ type: types.Timestamp }], types.Timestamp], [[{ type: types.Timestamptz }], types.Timestamptz], [[{ type: types.Time }], types.Time], [[{ type: types.Interval, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['-']<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  minus<M0 extends types.Interval<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['/']<M0 extends types.Float8<any> | number>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  divide<M0 extends types.Float8<any> | number>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Float8, allowPrimitive: true }], types.Interval]]); return runtime.opCall(runtime.sql`/`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Interval<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
