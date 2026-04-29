// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Bpchar<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Bpchar;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Bpchar<0 | 1>;
    __nonNullable: Bpchar<1>;
    __aggregate: Bpchar<number>;
    __any: Bpchar<any>;
  };
  static __typname = runtime.sql`bpchar`;
  static __typnameText = "bpchar";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  bpchar<M0 extends types.Int4<any> | number, M1 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1): types.Bpchar<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bpchar]]); return runtime.PgFunc("bpchar", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharLarger<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bpchar<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bpchar]]); return runtime.PgFunc("bpchar_larger", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharPatternGe<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpchar_pattern_ge", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharPatternGt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpchar_pattern_gt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharPatternLe<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpchar_pattern_le", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharPatternLt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpchar_pattern_lt", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharSmaller<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bpchar<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bpchar]]); return runtime.PgFunc("bpchar_smaller", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpchariclike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpchariclike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharicnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharicnlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharicregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharicregexeq", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharicregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharicregexne", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharnlike", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharregexeq", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  bpcharregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("bpcharregexne", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  charLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("char_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  characterLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("character_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("octet_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  text(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("text", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  max(): types.Bpchar<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bpchar]]); return runtime.PgFunc("max", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  min(): types.Bpchar<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bpchar]]); return runtime.PgFunc("min", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['!~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['!~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['!~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['!~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`!~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~<=~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~<=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~<~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~<~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~>=~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~>=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~>~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~>~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
