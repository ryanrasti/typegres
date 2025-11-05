import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class PgMcvList<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): PgMcvList<1>;
    static new(v: null): PgMcvList<0>;
    static new(v: Expression): PgMcvList<0 | 1>;
    static new(v: SerializeParam | null | Expression): PgMcvList<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "pg_mcv_list" } 
    asAggregate(): Types.PgMcvList<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.PgMcvList<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.PgMcvList<1> | undefined {
          return undefined;
        }
       
    pgMcvListItems(this: Types.PgMcvList<1>): Types.FromItem<{index: Types.Int4<1>, values: Types.Array<1, Types.Text<0 | 1>>, nulls: Types.Array<1, Types.Bool<0 | 1>>, frequency: Types.Float8<1>, base_frequency: Types.Float8<1>}>
    pgMcvListItems(this: Types.PgMcvList<0 | 1>): Types.FromItem<{index: Types.Int4<0 | 1>, values: Types.Array<0 | 1, Types.Text<0 | 1>>, nulls: Types.Array<0 | 1, Types.Bool<0 | 1>>, frequency: Types.Float8<0 | 1>, base_frequency: Types.Float8<0 | 1>}>
    pgMcvListItems(this: Types.PgMcvList<number>): Types.FromItem<{index: Types.Int4<0 | 1>, values: Types.Array<0 | 1, Types.Text<0 | 1>>, nulls: Types.Array<0 | 1, Types.Bool<0 | 1>>, frequency: Types.Float8<0 | 1>, base_frequency: Types.Float8<0 | 1>}>
    pgMcvListItems(...args: unknown[]) {
        return sqlFunction("pg_mcv_list_items", [{args: [Types.PgMcvList<0 | 1>], ret: Types.FromItem.ofSchema({index: Types.Int4<0 | 1>, values: Types.Array.of(Types.Text<0 | 1>), nulls: Types.Array.of(Types.Bool<0 | 1>), frequency: Types.Float8<0 | 1>, base_frequency: Types.Float8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
