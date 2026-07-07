// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Bpchar<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
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
  @expose.unchecked()
  bpchar<M0 extends types.Int4<any> | number, M1 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1): types.Bpchar<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Int4, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bpchar]]); return runtime.funcCall("bpchar", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharLarger<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bpchar<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bpchar]]); return runtime.funcCall("bpchar_larger", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharPatternGe<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpchar_pattern_ge", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharPatternGt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpchar_pattern_gt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharPatternLe<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpchar_pattern_le", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharPatternLt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpchar_pattern_lt", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharSmaller<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bpchar<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bpchar]]); return runtime.funcCall("bpchar_smaller", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpchariclike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpchariclike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharicnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharicnlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharicregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharicregexeq", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharicregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharicregexne", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharnlike<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharnlike", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharregexeq<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharregexeq", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  bpcharregexne<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("bpcharregexne", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  charLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("char_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  characterLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("character_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  length(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  octetLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("octet_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  text(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("text", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  max(): types.Bpchar<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bpchar]]); return runtime.funcCall("max", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  min(): types.Bpchar<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bpchar]]); return runtime.funcCall("min", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['!~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['!~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['!~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['!~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`!~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~<=~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~<=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~<~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~<~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~>=~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~>=~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~>~']<M0 extends types.Bpchar<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Bpchar, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~>~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~~']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~~`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['~~*']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`~~*`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
