// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Timestamp<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Timestamp;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Timestamp<0 | 1>;
    __nonNullable: Timestamp<1>;
    __aggregate: Timestamp<number>;
    __any: Timestamp<any>;
  };
  static __typname = runtime.sql`timestamp`;
  static __typnameText = "timestamp";
  declare deserialize: (raw: string) => string;
  age<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Interval]]); return runtime.PgFunc("age", [this, ...__rest], __rt) as any; }
  date(): types.Date<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Date]]); return runtime.PgFunc("date", [this, ...__rest], __rt) as any; }
  isfinite(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("isfinite", [this, ...__rest], __rt) as any; }
  overlaps<M0 extends types.Interval<any> | string, M1 extends types.Timestamp<any> | string, M2 extends types.Interval<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Interval<any> | string, M1 extends types.Timestamp<any> | string, M2 extends types.Timestamp<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Timestamp<any> | string, M1 extends types.Timestamp<any> | string, M2 extends types.Interval<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps<M0 extends types.Timestamp<any> | string, M1 extends types.Timestamp<any> | string, M2 extends types.Timestamp<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1>;
  overlaps(arg0: unknown, arg1: unknown, arg2: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Interval, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }], types.Bool], [[{ type: types.Interval, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }, { type: types.Timestamp, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("overlaps", [this, ...__rest], __rt) as any; }
  time(): types.Time<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Time]]); return runtime.PgFunc("time", [this, ...__rest], __rt) as any; }
  timestamp<M0 extends types.Int4<any> | number>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Timestamp]]); return runtime.PgFunc("timestamp", [this, ...__rest], __rt) as any; }
  timestampLarger<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Timestamp]]); return runtime.PgFunc("timestamp_larger", [this, ...__rest], __rt) as any; }
  timestampSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("timestamp_send", [this, ...__rest], __rt) as any; }
  timestampSmaller<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Timestamp]]); return runtime.PgFunc("timestamp_smaller", [this, ...__rest], __rt) as any; }
  tsrangeSubdiff<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("tsrange_subdiff", [this, ...__rest], __rt) as any; }
  max(): types.Timestamp<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamp]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  min(): types.Timestamp<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Timestamp]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  generateSeries<M0 extends types.Timestamp<any> | string, M1 extends types.Interval<any> | string>(arg0: M0, arg1: M1): runtime.PgSrf<{ generate_series: types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> }, "generate_series"> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Timestamp, allowPrimitive: true }, { type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return new runtime.PgSrf("generate_series", [this, ...__rest], [["generate_series", __rt]]) as any; }
  ['+']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp], [[{ type: types.Timestamp, allowPrimitive: true }], types.Interval]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Interval<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp], [[{ type: types.Timestamp, allowPrimitive: true }], types.Interval]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
