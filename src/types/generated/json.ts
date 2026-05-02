// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Json<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Json;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Json<0 | 1>;
    __nonNullable: Json<1>;
    __aggregate: Json<number>;
    __any: Json<any>;
  };
  static __typname = runtime.sql`json`;
  static __typnameText = "json";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  jsonArrayElement<M0 extends types.Int4<any> | number>(arg0: M0): types.Json<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Json]]); return runtime.PgFunc("json_array_element", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonArrayElementText<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("json_array_element_text", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonArrayLength(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("json_array_length", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonObjectField<M0 extends types.Text<any> | string>(arg0: M0): types.Json<runtime.MaybeNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Json]]); return runtime.PgFunc("json_object_field", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonObjectFieldText<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgFunc("json_object_field_text", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("json_send", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonStripNulls(): types.Json<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Json]]); return runtime.PgFunc("json_strip_nulls", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonTypeof(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("json_typeof", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  jsonArrayElements(): runtime.PgSrf<{ value: types.Json<1> }, "json_array_elements"> { return new runtime.PgSrf("json_array_elements", [this], [["value", types.Json]]) as any; }
  @tool.unchecked()
  jsonArrayElementsText(): runtime.PgSrf<{ value: types.Text<1> }, "json_array_elements_text"> { return new runtime.PgSrf("json_array_elements_text", [this], [["value", types.Text]]) as any; }
  @tool.unchecked()
  jsonEach(): runtime.PgSrf<{ key: types.Text<1>; value: types.Json<1> }, "json_each"> { return new runtime.PgSrf("json_each", [this], [["key", types.Text], ["value", types.Json]]) as any; }
  @tool.unchecked()
  jsonEachText(): runtime.PgSrf<{ key: types.Text<1>; value: types.Text<1> }, "json_each_text"> { return new runtime.PgSrf("json_each_text", [this], [["key", types.Text], ["value", types.Text]]) as any; }
  @tool.unchecked()
  jsonObjectKeys(): runtime.PgSrf<{ json_object_keys: types.Text<N> }, "json_object_keys"> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return new runtime.PgSrf("json_object_keys", [this, ...__rest], [["json_object_keys", __rt]]) as any; }
  ['->']<M0 extends types.Text<any> | string>(arg0: M0): types.Json<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  ['->']<M0 extends types.Int4<any> | number>(arg0: M0): types.Json<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['->'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Json], [[{ type: types.Int4, allowPrimitive: true }], types.Json]]); return runtime.PgOp(runtime.sql`->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  ['->>']<M0 extends types.Int4<any> | number>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  ['->>']<M0 extends types.Text<any> | string>(arg0: M0): types.Text<runtime.MaybeNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  ['->>'](arg0: unknown): any { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Int4, allowPrimitive: true }], types.Text], [[{ type: types.Text, allowPrimitive: true }], types.Text]]); return runtime.PgOp(runtime.sql`->>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
