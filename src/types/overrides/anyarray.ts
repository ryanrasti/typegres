import { Anyarray as Generated } from "../generated/anyarray";
import type { Any } from "../index";
import { Int2, Int4, Int8 } from "../index";
import { meta } from "../runtime";
import type { Sql } from "../../builder/sql";
import { sql } from "../../builder/sql";
import { expose } from "../../exoeval/tool";

export class Anyarray<T extends Any<any>, N extends number> extends Generated<T, N> {
  static __element: Any<any>;

  // pg array subscript: 1-indexed; out-of-bounds returns NULL (not an error).
  // Bracket-string-keyed to mirror pg's SQL syntax (`arr[i]`), matching the
  // existing `id["="](v)` / `arr["&&"](rhs)` style. Result is the element
  // type's __nullable variant since out-of-bounds yields SQL NULL.
  // eslint-disable-next-line no-restricted-syntax -- mirrors codegen for typegres ops
  @expose.unchecked()
  ["[]"]<I extends Int2<any> | Int4<any> | Int8<any> | number | bigint>(
    i: I,
  ): T extends { [meta]: { __nullable: infer U } } ? U : T {
    let idxSql: Sql
    if (typeof i === "number" || typeof i === "bigint") {
      idxSql = sql`${i}`;
    } else if (i instanceof Int2 || i instanceof Int4 || i instanceof Int8) {
      idxSql = i.toSql();
    } else {
      throw new Error(`Invalid array index type: ${typeof i}`);
    }
    const elClass = (this.constructor as unknown as { __element: Any<any> })
      .__element[meta].__class;
    return elClass.from(sql`((${this.toSql()})[${idxSql}])`) as any;
  }
}
