// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Date<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Date;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Date<0 | 1>;
    __nonNullable: Date<1>;
    __aggregate: Date<number>;
    __any: Date<any>;
  };
  static __typname = runtime.sql`date`;
  static __typnameText = "date";
  declare deserialize: (raw: string) => string;
  dateLarger<M0 extends types.Date<any> | string>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Date]]); return runtime.PgFunc("date_larger", [this, ...__rest], __rt) as any; }
  dateSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("date_send", [this, ...__rest], __rt) as any; }
  dateSmaller<M0 extends types.Date<any> | string>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Date]]); return runtime.PgFunc("date_smaller", [this, ...__rest], __rt) as any; }
  daterangeSubdiff<M0 extends types.Date<any> | string>(arg0: M0): types.Float8<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Float8]]); return runtime.PgFunc("daterange_subdiff", [this, ...__rest], __rt) as any; }
  isfinite(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("isfinite", [this, ...__rest], __rt) as any; }
  timestamp(): types.Timestamp<N>;
  timestamp<M0 extends types.Time<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  timestamp(arg0?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[], types.Timestamp], [[{ type: types.Time, allowPrimitive: true }], types.Timestamp]]); return runtime.PgFunc("timestamp", [this, ...__rest], __rt) as any; }
  timestamptz<M0 extends types.Timetz<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timetz, allowPrimitive: true }], types.Timestamptz]]); return runtime.PgFunc("timestamptz", [this, ...__rest], __rt) as any; }
  max(): types.Date<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Date]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  min(): types.Date<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Date]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  ['+']<M0 extends types.Int4<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Timetz<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Time<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['+'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4 }], types.Date], [[{ type: types.Timetz, allowPrimitive: true }], types.Timestamptz], [[{ type: types.Time, allowPrimitive: true }], types.Timestamp], [[{ type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  plus<M0 extends types.Int4<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Timetz<any> | string>(arg0: M0): types.Timestamptz<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Time<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  plus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4 }], types.Date], [[{ type: types.Timetz, allowPrimitive: true }], types.Timestamptz], [[{ type: types.Time, allowPrimitive: true }], types.Timestamp], [[{ type: types.Interval, allowPrimitive: true }], types.Timestamp]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Date<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Int4<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp], [[{ type: types.Date, allowPrimitive: true }], types.Int4], [[{ type: types.Int4 }], types.Date]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Interval<any> | string>(arg0: M0): types.Timestamp<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Date<any> | string>(arg0: M0): types.Int4<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Int4<any>>(arg0: M0): types.Date<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Interval, allowPrimitive: true }], types.Timestamp], [[{ type: types.Date, allowPrimitive: true }], types.Int4], [[{ type: types.Int4 }], types.Date]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lt<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<=']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  lte<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  lte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['<>']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['<>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ne<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ne(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['=']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  eq<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  eq(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gt<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gt(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool], [[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['>=']<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>=']<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['>='](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  gte<M0 extends types.Date<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Timestamp<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte<M0 extends types.Timestamptz<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  gte(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Date, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamp, allowPrimitive: true }], types.Bool], [[{ type: types.Timestamptz, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
