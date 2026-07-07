// Auto-generated — do not edit
import * as runtime from "../../runtime";
import { meta } from "../../sql-value";
import { expose } from "../../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Tsquery<in out N extends number> extends Anynonarray<N> {
  declare [meta]: {
    __class: typeof Tsquery;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Tsquery<0 | 1>;
    __nonNullable: Tsquery<1>;
    __aggregate: Tsquery<number>;
    __any: Tsquery<any>;
  };
  static __typname = runtime.sql`tsquery`;
  static __typnameText = "tsquery";
  declare deserialize: (raw: string) => string;
  @expose.unchecked()
  numnode(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.funcCall("numnode", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  querytree(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.funcCall("querytree", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsMatchQv<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("ts_match_qv", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsRewrite<M0 extends types.Tsquery<any> | string, M1 extends types.Tsquery<any> | string>(arg0: M0, arg1: M1): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Tsquery, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.funcCall("ts_rewrite", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsqMcontained<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("tsq_mcontained", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsqMcontains<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.funcCall("tsq_mcontains", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsqueryAnd<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.funcCall("tsquery_and", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsqueryNot(): types.Tsquery<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Tsquery]]); return runtime.funcCall("tsquery_not", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsqueryOr<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.funcCall("tsquery_or", [this, ...__rest], __rt) as any; }
  tsqueryPhrase<M0 extends types.Tsquery<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  tsqueryPhrase<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @expose.unchecked()
  tsqueryPhrase(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Tsquery, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Tsquery], [[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.funcCall("tsquery_phrase", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  tsquerysend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.funcCall("tsquerysend", [this, ...__rest], __rt) as any; }
  @expose.unchecked()
  ['&&']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.opCall(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lt<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<->']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.opCall(runtime.sql`<->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<=']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  lte<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<>']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ne<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['<@']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['=']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  eq<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gt<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['>=']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  gte<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@>']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@@']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['@@@']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.opCall(runtime.sql`@@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @expose.unchecked()
  ['||']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.opCall(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
