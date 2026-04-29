// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgLsn<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgLsn;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgLsn<0 | 1>;
    __nonNullable: PgLsn<1>;
    __aggregate: PgLsn<number>;
    __any: PgLsn<any>;
  };
  static __typname = runtime.sql`pg_lsn`;
  static __typnameText = "pg_lsn";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  pgLsnLarger<M0 extends types.PgLsn<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.PgLsn]]); return runtime.PgFunc("pg_lsn_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgLsnSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("pg_lsn_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgLsnSmaller<M0 extends types.PgLsn<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.PgLsn]]); return runtime.PgFunc("pg_lsn_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgWalLsnDiff<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Numeric]]); return runtime.PgFunc("pg_wal_lsn_diff", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgWalfileName(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("pg_walfile_name", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgWalfileNameOffset(): types.Record<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Record]]); return runtime.PgFunc("pg_walfile_name_offset", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.PgLsn<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.PgLsn]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.PgLsn<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.PgLsn]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['+']<M0 extends types.Numeric<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.PgLsn]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  plus<M0 extends types.Numeric<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.PgLsn]]); return runtime.PgOp(runtime.sql`+`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['-']<M0 extends types.Numeric<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.PgLsn], [[{ type: types.PgLsn, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Numeric<any> | string>(arg0: M0): types.PgLsn<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Numeric<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Numeric, allowPrimitive: true }], types.PgLsn], [[{ type: types.PgLsn, allowPrimitive: true }], types.Numeric]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.PgLsn<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.PgLsn, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
