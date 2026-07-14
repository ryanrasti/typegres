// PG-side root class. Sits above the pg_catalog codegen'd `Generated`
// (which provides all pg_catalog method surface) and below the leaf
// concrete types (Int4, Text, Bool, ...). Carries the PG-specific
// static metadata plus the three Bool-returning methods (isNull,
// isNotNull, in) that couldn't live on `SqlValue` — see sql-value.ts
// docstring for the variance reason.
//
// `dialect.root` / `dialect.bool` use barrel-import getters so the
// class-level dialect object can be initialized at class-def time
// without resolving the cyclic references at import time. Property
// access happens at method-call time, by which point the barrel has
// finished loading.
import { Any as Generated } from "../generated/any";
import type { Dialect } from "../../sql-value";
import { meta } from "../../sql-value";
import type { NullOf, StrictNull, TsTypeOf } from "../../runtime";
import * as types from "../index";
import { sql, type Sql } from "../../../builder/sql";
import { expose } from "../../../exoeval/tool";
import { isPlainData } from "../../../util";

export class Any<in out N extends number> extends Generated<N> {
  // Narrow SqlValue's `[meta].__aggregate: SqlValue<number>` to
  // `Any<number>` so the pg_catalog aggregate row type stays PG-shaped
  // rather than collapsing to the bare shared base.
  declare [meta]: {
    __class: typeof Any;
    __raw: Sql;
    __nullability: N;
    __nullable: Any<0 | 1>;
    __nonNullable: Any<1>;
    __aggregate: Any<number>;
  };
  static override dialect: Dialect = {
    name: "postgres",
    get root() { return types.Any; },
    get bool() { return types.Bool; },
  };
  static override __typname = sql`any`;
  static override __typnameText = "any";

  isNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NULL)`) as types.Bool<1>;
  }

  isNotNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NOT NULL)`) as types.Bool<1>;
  }

  // Type-safe IN. Accepts a vararg of "this type at any nullability"
  // — including primitive values that the type knows how to serialize.
  // For `Text`, that means `.in("a", "b", textVal)` all work. Always
  // compiles to `(this IN (v1, v2, ...))`; pg's planner rewrites the
  // single-value case to `=` itself during planning. SQL forbids
  // `IN ()`, so the type signature requires at least one arg.
  //
  // Return nullability propagates from the LHS and any of the args:
  // SQL three-valued logic on `IN` returns NULL when there's no match
  // and either `this` or any list element is NULL.
  //
  // eslint-disable-next-line no-restricted-syntax -- generic vararg signature with `this`-bound type narrowing isn't expressible in zod
  @expose.unchecked()
  in<
    T extends Any<any>,
    Vs extends [
      (T extends { [meta]: { __any: infer A } } ? A : Any<any>) | TsTypeOf<T>,
      ...((T extends { [meta]: { __any: infer A } } ? A : Any<any>) | TsTypeOf<T>)[],
    ],
  >(
    this: T,
    ...vals: Vs
  ): types.Bool<StrictNull<NullOf<T> | NullOf<Vs[number]>>> {
    const wrapped = vals.map((v) => {
      if (v instanceof Any) {return v;}
      if (!isPlainData(v)) {
        const name = (Object.getPrototypeOf(v) as { constructor?: { name?: string } } | null)?.constructor?.name ?? "anonymous";
        throw new TypeError(
          `Any.in: cannot accept ${name} instance as a list value. ` +
            `Pass a typegres expression or a primitive matching ${(this[meta].__class as typeof Any).__typnameText}.`,
        );
      }
      return this[meta].__class.serialize(v);
    });
    const list = sql.join(wrapped.map((v) => v.toSql()));
    return types.Bool.from(sql`(${this.toSql()} IN (${list}))`) as unknown as types.Bool<StrictNull<NullOf<T> | NullOf<Vs[number]>>>;
  }
}
