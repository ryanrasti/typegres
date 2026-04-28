// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Xml<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Xml;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Xml<0 | 1>;
    __nonNullable: Xml<1>;
    __aggregate: Xml<number>;
    __any: Xml<any>;
  };
  static __typname = runtime.sql`xml`;
  static __typnameText = "xml";
  declare deserialize: (raw: string) => string;
  text(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("text", [this, ...__rest], __rt) as any; }
  xmlconcat2<M0 extends types.Xml<any> | string>(arg0: M0): types.Xml<1> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Xml, allowPrimitive: true }], types.Xml]]); return runtime.PgFunc("xmlconcat2", [this, ...__rest], __rt) as any; }
  xmlvalidate<M0 extends types.Text<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Text, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("xmlvalidate", [this, ...__rest], __rt) as any; }
  xmlagg(): types.Xml<0 | 1> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xml]]); return runtime.PgFunc("xmlagg", [this, ...__rest], __rt) as any; }
}
