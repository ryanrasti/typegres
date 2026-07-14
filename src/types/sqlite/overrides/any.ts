// SQLite root class — hand-written core over the generated method
// surface (../generated/any.ts): dialect metadata plus the members
// whose signatures the codegen can't express.
//
// `dialect.root` / `dialect.bool` use barrel-import getters so the
// class-level dialect object can be initialized at class-def time
// without resolving the cyclic references at import time. Property
// access happens at method-call time.
import { Any as Generated } from "../generated/any";
import { type Dialect } from "../../sql-value";
import { meta } from "../../sql-value";
import * as types from "../index";
import { sql, type Sql } from "../../../builder/sql";
import { expose } from "../../../exoeval/tool";
import { isPlainData } from "../../../util";

export class Any<in out N extends number> extends Generated<N> {
  declare [meta]: {
    __class: typeof Any;
    __raw: Sql;
    __nullability: N;
    __nullable: Any<0 | 1>;
    __nonNullable: Any<1>;
    __aggregate: Any<number>;
  };
  static override dialect: Dialect = {
    name: "sqlite",
    get root() { return types.Any; },
    get bool() { return types.Bool; },
  };
  static override __typname = sql`any`;
  static override __typnameText = "any";
  // Any-typed arguments accept every bindable primitive (the default
  // typeof check would only accept strings). Used by runtime.match's
  // allowPrimitive path.
  static override acceptsPrimitive(v: unknown): boolean {
    return ["number", "string", "boolean"].includes(typeof v) || v instanceof Uint8Array;
  }

  isNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NULL)`) as types.Bool<1>;
  }

  isNotNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NOT NULL)`) as types.Bool<1>;
  }

  // Non-generic `.in()` — SQLite's shallow class hierarchy (SqlValue →
  // Any → concrete) triggers TS2589 with the PG-style
  // `<T extends Any<any>, Vs>(this: T, ...)` signature, because
  // each concrete class's `[meta].__any: Concrete<any>` self-reference
  // never bottoms out at that depth. PG dodges the recursion via a
  // deeper 7-level chain.
  //
  // Trade-off: users don't get "same-typed args required" narrowing at
  // compile time. Runtime enforcement via serialize() still applies.
  // eslint-disable-next-line no-restricted-syntax -- generic vararg signature inexpressible in zod
  @expose.unchecked()
  in(...vals: [Any<any> | boolean | number | string | Uint8Array, ...(Any<any> | boolean | number | string | Uint8Array)[]]): types.Bool<any> {
    const wrapped = vals.map((v) => {
      if (v instanceof Any) {return v;}
      // Uint8Array is the blob primitive — a class instance, so it
      // fails isPlainData but is accepted the same way the generated
      // methods accept it (serialize() still enforces per-receiver).
      if (!(v instanceof Uint8Array) && !isPlainData(v)) {
        const name = (Object.getPrototypeOf(v) as { constructor?: { name?: string } } | null)?.constructor?.name ?? "anonymous";
        throw new TypeError(
          `Any.in: cannot accept ${name} instance as a list value. ` +
          `Pass a typegres expression or a primitive matching ${(this[meta].__class as typeof Any).__typnameText}.`,
        );
      }
      return this[meta].__class.serialize(v);
    });
    const list = sql.join(wrapped.map((v) => v.toSql()));
    return types.Bool.from(sql`(${this.toSql()} IN (${list}))`) as types.Bool<any>;
  }
}
