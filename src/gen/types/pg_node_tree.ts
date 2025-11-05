import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class PgNodeTree<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): PgNodeTree<1>;
    static new(v: null): PgNodeTree<0>;
    static new(v: Expression): PgNodeTree<0 | 1>;
    static new(v: SerializeParam | null | Expression): PgNodeTree<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "pg_node_tree" } 
    asAggregate(): Types.PgNodeTree<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.PgNodeTree<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.PgNodeTree<1> | undefined {
          return undefined;
        }
       
    pgGetExpr(this: Types.PgNodeTree<1>, a1: Types.Oid<1>): Types.Text<1>
    pgGetExpr(this: Types.PgNodeTree<0 | 1>, a1: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetExpr(this: Types.PgNodeTree<number>, a1: Types.Oid<number>): Types.Text<0 | 1>
    pgGetExpr(this: Types.PgNodeTree<1>, a1: Types.Oid<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetExpr(this: Types.PgNodeTree<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetExpr(this: Types.PgNodeTree<number>, a1: Types.Oid<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetExpr(...args: unknown[]) {
        return sqlFunction("pg_get_expr", [{args: [Types.PgNodeTree<0 | 1>, Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.PgNodeTree<0 | 1>, Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
