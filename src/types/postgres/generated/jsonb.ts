// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Jsonb<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Jsonb;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Jsonb<0 | 1>;
    __nonNullable: Jsonb<1>;
    __aggregate: Jsonb<number>;
    __any: Jsonb<any>;
  };
  static __typname = runtime.sql`jsonb`;
  static __typnameText = "jsonb";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  bool(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.funcCall("bool", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.funcCall("float4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.funcCall("float8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.funcCall("int2", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("int4", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.funcCall("int8", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbArrayElement<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb]]); return runtime.funcCall("jsonb_array_element", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbArrayElementText<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.funcCall("jsonb_array_element_text", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbArrayLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("jsonb_array_length", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbConcat<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Jsonb]]); return runtime.funcCall("jsonb_concat", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbContained<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_contained", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbContains<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_contains", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbExists<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_exists", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbObjectField<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.MaybeNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.funcCall("jsonb_object_field", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbObjectFieldText<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.funcCall("jsonb_object_field_text", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPathExists<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_path_exists", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPathExistsOpr<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_path_exists_opr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPathMatch<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_path_match", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPathMatchOpr<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("jsonb_path_match_opr", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPathQueryArray<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Jsonb]]); return runtime.funcCall("jsonb_path_query_array", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPathQueryFirst<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Jsonb]]); return runtime.funcCall("jsonb_path_query_first", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbPretty(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("jsonb_pretty", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("jsonb_send", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbStripNulls(): types.Jsonb<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Jsonb]]); return runtime.funcCall("jsonb_strip_nulls", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbTypeof(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("jsonb_typeof", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.funcCall("numeric", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  jsonbArrayElements(): runtime.Srf<{ value: types.Jsonb<1> }, "jsonb_array_elements"> { return new runtime.Srf("jsonb_array_elements", [this], [["value", types.Jsonb]]) as any; }
  @expose.unchecked()
  jsonbArrayElementsText(): runtime.Srf<{ value: types.Text<1> }, "jsonb_array_elements_text"> { return new runtime.Srf("jsonb_array_elements_text", [this], [["value", types.Text]]) as any; }
  @expose.unchecked()
  jsonbEach(): runtime.Srf<{ key: types.Text<1>; value: types.Jsonb<1> }, "jsonb_each"> { return new runtime.Srf("jsonb_each", [this], [["key", types.Text], ["value", types.Jsonb]]) as any; }
  @expose.unchecked()
  jsonbEachText(): runtime.Srf<{ key: types.Text<1>; value: types.Text<1> }, "jsonb_each_text"> { return new runtime.Srf("jsonb_each_text", [this], [["key", types.Text], ["value", types.Text]]) as any; }
  @expose.unchecked()
  jsonbObjectKeys(): runtime.Srf<{ jsonb_object_keys: types.Text<N> }, "jsonb_object_keys"> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return new runtime.Srf("jsonb_object_keys", [this, ...__rest], [["jsonb_object_keys", __rt]]) as any; }
  @expose.unchecked()
  jsonbPathQuery<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): runtime.Srf<{ jsonb_path_query: types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> }, "jsonb_path_query"> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Jsonb]]); return new runtime.Srf("jsonb_path_query", [this, ...__rest], [["jsonb_path_query", __rt]]) as any; }
  ['-']<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb], [[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb], [[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.opCall(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['->']<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  ['->']<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['->'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb], [[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.opCall(runtime.sql`->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['->>']<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  ['->>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  ['->>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.opCall(runtime.sql`->>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<@']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['?']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`?`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@>']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@?']<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@?`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@@']<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['||']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Jsonb]]); return runtime.opCall(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
