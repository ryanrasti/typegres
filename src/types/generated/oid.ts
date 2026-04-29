// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Oid<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Oid;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Oid<0 | 1>;
    __nonNullable: Oid<1>;
    __aggregate: Oid<number>;
    __any: Oid<any>;
  };
  static __typname = runtime.sql`oid`;
  static __typnameText = "oid";
  declare deserialize: (raw: string) => number;
  @tool.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  makeaclitem<M0 extends types.Oid<any> | number, M1 extends types.Text<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Aclitem<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Oid, allowPrimitive: true }, { type: types.Text, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Aclitem]]); return runtime.PgFunc("makeaclitem", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  oidlarger<M0 extends types.Oid<any> | number>(arg0: M0): types.Oid<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Oid]]); return runtime.PgFunc("oidlarger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  oidsend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("oidsend", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  oidsmaller<M0 extends types.Oid<any> | number>(arg0: M0): types.Oid<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Oid]]); return runtime.PgFunc("oidsmaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  pgIndexamProgressPhasename<M0 extends types.Int8<any> | string>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int8, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("pg_indexam_progress_phasename", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  satisfiesHashPartition<M0 extends types.Int4<any> | number, M1 extends types.Int4<any> | number, M2 extends types.Any<any> | string>(arg0: M0, arg1: M1, arg2: M2): types.Bool<1> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }, { type: types.Any, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("satisfies_hash_partition", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Oid<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Oid]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Oid<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Oid]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsParse<M0 extends types.Text<any> | string>(arg0: M0): runtime.PgSrf<{ tokid: types.Int4<1>; token: types.Text<1> }, "ts_parse"> { return new runtime.PgSrf("ts_parse", [this, arg0], [["tokid", types.Int4], ["token", types.Text]]) as any; }
  @tool.unchecked()
  tsTokenType(): runtime.PgSrf<{ tokid: types.Int4<1>; alias: types.Text<1>; description: types.Text<1> }, "ts_token_type"> { return new runtime.PgSrf("ts_token_type", [this], [["tokid", types.Int4], ["alias", types.Text], ["description", types.Text]]) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Oid<any> | number>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Oid, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
