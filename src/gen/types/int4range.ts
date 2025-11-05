import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Int4Range<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int4Range<1>;
    static new(v: null): Int4Range<0>;
    static new(v: Expression): Int4Range<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int4Range<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "int4range" } 
    asAggregate(): Types.Int4Range<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int4Range<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int4Range<1> | undefined {
          return undefined;
        }
       
    int4Multirange(this: Types.Int4Range<1>): Types.Int4Multirange<1>
    int4Multirange(this: Types.Int4Range<0 | 1>): Types.Int4Multirange<0 | 1>
    int4Multirange(this: Types.Int4Range<number>): Types.Int4Multirange<0 | 1>
    int4Multirange(...args: unknown[]) {
        return sqlFunction("int4multirange", [{args: [Types.Int4Range<0 | 1>], ret: Types.Int4Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4RangeCanonical(this: Types.Int4Range<1>): Types.Int4Range<1>
    int4RangeCanonical(this: Types.Int4Range<0 | 1>): Types.Int4Range<0 | 1>
    int4RangeCanonical(this: Types.Int4Range<number>): Types.Int4Range<0 | 1>
    int4RangeCanonical(...args: unknown[]) {
        return sqlFunction("int4range_canonical", [{args: [Types.Int4Range<0 | 1>], ret: Types.Int4Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
