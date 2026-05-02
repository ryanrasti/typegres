// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Jsonb<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
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
  @tool.unchecked()
  bool(): types.Bool<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bool]]); return runtime.PgFunc("bool", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float4(): types.Float4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float4]]); return runtime.PgFunc("float4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  float8(): types.Float8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Float8]]); return runtime.PgFunc("float8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int2(): types.Int2<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int2]]); return runtime.PgFunc("int2", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int4(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("int4", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  int8(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("int8", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbArrayElement<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_array_element", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbArrayElementText<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("jsonb_array_element_text", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbArrayLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("jsonb_array_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbConcat<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_concat", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbContained<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_contained", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbContains<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_contains", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbExists<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_exists", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbObjectField<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.MaybeNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_object_field", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbObjectFieldText<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("jsonb_object_field_text", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPathExists<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_path_exists", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPathExistsOpr<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_path_exists_opr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPathMatch<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_path_match", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPathMatchOpr<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("jsonb_path_match_opr", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPathQueryArray<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_path_query_array", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPathQueryFirst<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Jsonb]]); return runtime.PgFunc("jsonb_path_query_first", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbPretty(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("jsonb_pretty", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("jsonb_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbStripNulls(): types.Jsonb<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Jsonb]]); return runtime.PgFunc("jsonb_strip_nulls", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbTypeof(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("jsonb_typeof", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  numeric(): types.Numeric<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Numeric]]); return runtime.PgFunc("numeric", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonbArrayElements(): runtime.PgSrf<{ value: types.Jsonb<1> }, "jsonb_array_elements"> { return new runtime.PgSrf("jsonb_array_elements", [this], [["value", types.Jsonb]]) as any; }
  @tool.unchecked()
  jsonbArrayElementsText(): runtime.PgSrf<{ value: types.Text<1> }, "jsonb_array_elements_text"> { return new runtime.PgSrf("jsonb_array_elements_text", [this], [["value", types.Text]]) as any; }
  @tool.unchecked()
  jsonbEach(): runtime.PgSrf<{ key: types.Text<1>; value: types.Jsonb<1> }, "jsonb_each"> { return new runtime.PgSrf("jsonb_each", [this], [["key", types.Text], ["value", types.Jsonb]]) as any; }
  @tool.unchecked()
  jsonbEachText(): runtime.PgSrf<{ key: types.Text<1>; value: types.Text<1> }, "jsonb_each_text"> { return new runtime.PgSrf("jsonb_each_text", [this], [["key", types.Text], ["value", types.Text]]) as any; }
  @tool.unchecked()
  jsonbObjectKeys(): runtime.PgSrf<{ jsonb_object_keys: types.Text<N> }, "jsonb_object_keys"> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return new runtime.PgSrf("jsonb_object_keys", [this, ...__rest], [["jsonb_object_keys", __rt]]) as any; }
  @tool.unchecked()
  jsonbPathQuery<M0 extends types.Jsonpath<any> | string, M1 extends types.Jsonb<any> | string, M2 extends types.Bool<any> | boolean>(arg0: M0, arg1: M1, arg2: M2): runtime.PgSrf<{ jsonb_path_query: types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1> | runtime.NullOf<M2>>> }, "jsonb_path_query"> { const [__rt, ...__rest] = runtime.match([arg0, arg1, arg2], [[[{ type: types.Jsonpath, allowPrimitive: true }, { type: types.Jsonb, allowPrimitive: true }, { type: types.Bool, allowPrimitive: true }], types.Jsonb]]); return new runtime.PgSrf("jsonb_path_query", [this, ...__rest], [["jsonb_path_query", __rt]]) as any; }
  ['-']<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  ['-']<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['-'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb], [[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  minus<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  minus<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  minus(arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb], [[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.PgOp(runtime.sql`-`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['->']<M0 extends types.Int4<any> | number>(arg0: M0): types.Jsonb<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  ['->']<M0 extends types.Text<any> | string>(arg0: M0): types.Jsonb<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['->'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Jsonb], [[{ type: types.Text, allowPrimitive: true }], types.Jsonb]]); return runtime.PgOp(runtime.sql`->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['->>']<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  ['->>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['->>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text], [[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgOp(runtime.sql`->>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<@']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['?']<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`?`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@>']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@?']<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@?`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@@']<M0 extends types.Jsonpath<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonpath, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['||']<M0 extends types.Jsonb<any> | string>(arg0: M0): types.Jsonb<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Jsonb, allowPrimitive: true }], types.Jsonb]]); return runtime.PgOp(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
