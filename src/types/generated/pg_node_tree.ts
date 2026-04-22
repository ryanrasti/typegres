// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgNodeTree<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgNodeTree;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgNodeTree<0 | 1>;
    __nonNullable: PgNodeTree<1>;
    __aggregate: PgNodeTree<number>;
    __any: PgNodeTree<any>;
  };
  static __typname = runtime.sql`pg_node_tree`;
  static __typnameText = "pg_node_tree";
  declare deserialize: (raw: string) => string;
}
