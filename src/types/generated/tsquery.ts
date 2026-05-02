// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Tsquery<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
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
  @tool.unchecked()
  numnode(): types.Int4<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int4]]); return runtime.PgFunc("numnode", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  querytree(): types.Text<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Text]]); return runtime.PgFunc("querytree", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsMatchQv<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("ts_match_qv", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsRewrite<M0 extends types.Tsquery<any> | string, M1 extends types.Tsquery<any> | string>(arg0: M0, arg1: M1): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>> { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Tsquery, allowPrimitive: true }, { type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("ts_rewrite", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsqMcontained<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("tsq_mcontained", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsqMcontains<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgFunc("tsq_mcontains", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsqueryAnd<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("tsquery_and", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsqueryNot(): types.Tsquery<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Tsquery]]); return runtime.PgFunc("tsquery_not", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsqueryOr<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("tsquery_or", [this, ...__rest], __rt) as any; }
  tsqueryPhrase<M0 extends types.Tsquery<any> | string, M1 extends types.Int4<any> | number>(arg0: M0, arg1: M1): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0> | runtime.NullOf<M1>>>;
  tsqueryPhrase<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>>;
  @tool.unchecked()
  tsqueryPhrase(arg0: unknown, arg1?: unknown): any { const [__rt, ...__rest] = runtime.match([arg0, arg1], [[[{ type: types.Tsquery, allowPrimitive: true }, { type: types.Int4, allowPrimitive: true }], types.Tsquery], [[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgFunc("tsquery_phrase", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  tsquerysend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("tsquerysend", [this, ...__rest], __rt) as any; }
  @tool.unchecked()
  ['&&']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgOp(runtime.sql`&&`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lt<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<->']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgOp(runtime.sql`<->`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<=']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  lte<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<>']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ne<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['<@']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`<@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['=']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  eq<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gt<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['>=']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  gte<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`>=`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@>']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@>`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@@']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['@@@']<M0 extends types.Tsvector<any> | string>(arg0: M0): types.Bool<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsvector, allowPrimitive: true }], types.Bool]]); return runtime.PgOp(runtime.sql`@@@`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
  @tool.unchecked()
  ['||']<M0 extends types.Tsquery<any> | string>(arg0: M0): types.Tsquery<runtime.StrictNull<N | runtime.NullOf<M0>>> { const [__rt, ...__rest] = runtime.match([arg0], [[[{ type: types.Tsquery, allowPrimitive: true }], types.Tsquery]]); return runtime.PgOp(runtime.sql`||`, [this, ...__rest] as [unknown, unknown], __rt) as any; }
}
