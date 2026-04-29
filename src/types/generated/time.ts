// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Time<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Time;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Time<0 | 1>;
    __nonNullable: Time<1>;
    __aggregate: Time<number>;
    __any: Time<any>;
  };
  static __typname = runtime.sql`time`;
  static __typnameText = "time";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  interval(): types.Interval<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Interval]]); return runtime.PgFunc("interval", [this, ...__rest], __rt) as any; }
  overlaps<M0 extends types.Time<any> | string, M1 extends types.Time<any> | string, M2 extends types.Interval<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Time<any> | string, M1 extends types.Time<any> | string, M2 extends types.Time<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Interval<any> | string, M1 extends types.Time<any> | string, M2 extends types.Interval<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Interval<any> | string, M1 extends types.Time<any> | string, M2 extends types.Time<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  @tool.unchecked()
  overlaps(arg0: unknown, arg1: unknown, arg2: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Time, allowPrimitive: true }, { type: types.Time, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }], types.Bool], [[{ type: types.Time, allowPrimitive: true }, { type: types.Time, allowPrimitive: true }, { type: types.Time, allowPrimitive: true }], types.Bool], [[{ type: types.Interval, allowPrimitive: true }, { type: types.Time, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }], types.Bool], [[{ type: types.Interval, allowPrimitive: true }, { type: types.Time, allowPrimitive: true }, { type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("overlaps", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  time<M0 extends types.Int4<any> | number>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Time]]); return runtime.PgFunc("time", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timeLarger<M0 extends types.Time<any> | string>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Time]]); return runtime.PgFunc("time_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timeSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("time_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  timeSmaller<M0 extends types.Time<any> | string>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Time]]); return runtime.PgFunc("time_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Time<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Time]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Time<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Time]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  ['+']<M0 extends types.Interval<any> | string>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Date<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Time], [[{ type: types.Date, allowPrimitive: true }], types.Timestamp]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Interval<any> | string>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Date<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Time], [[{ type: types.Date, allowPrimitive: true }], types.Timestamp]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Time<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Interval<any> | string>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Interval], [[{ type: types.Interval, allowPrimitive: true }], types.Time]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Time<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Interval<any> | string>(arg0: M0): types.Time<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Interval], [[{ type: types.Interval, allowPrimitive: true }], types.Time]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Time<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Time, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
