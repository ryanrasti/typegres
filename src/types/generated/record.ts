// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Record<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof types.Record;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: types.Record<0 | 1>;
    __nonNullable: types.Record<1>;
    __aggregate: types.Record<number>;
    __any: types.Record<any>;
  };
  static __typname = runtime.sql`record`;
  static __typnameText = "record";
  @tool.unchecked()
  recordImageEq<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("record_image_eq", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  recordImageGe<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("record_image_ge", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  recordImageGt<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("record_image_gt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  recordImageLe<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("record_image_le", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  recordImageLt<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("record_image_lt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  recordImageNe<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("record_image_ne", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['*<']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`*<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*<=']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`*<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*<>']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`*<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*=']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`*=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*>']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`*>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['*>=']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`*>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Record<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Record, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
