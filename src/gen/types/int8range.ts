import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Int8Range<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int8Range<1>;
    static new(v: null): Int8Range<0>;
    static new(v: Expression): Int8Range<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int8Range<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "int8range" } 
    asAggregate(): Types.Int8Range<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int8Range<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int8Range<1> | undefined {
          return undefined;
        }
       
    int8Multirange(this: Types.Int8Range<1>): Types.Int8Multirange<1>
    int8Multirange(this: Types.Int8Range<0 | 1>): Types.Int8Multirange<0 | 1>
    int8Multirange(this: Types.Int8Range<number>): Types.Int8Multirange<0 | 1>
    int8Multirange(...args: unknown[]) {
        return sqlFunction("int8multirange", [{args: [Types.Int8Range<0 | 1>], ret: Types.Int8Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8RangeCanonical(this: Types.Int8Range<1>): Types.Int8Range<1>
    int8RangeCanonical(this: Types.Int8Range<0 | 1>): Types.Int8Range<0 | 1>
    int8RangeCanonical(this: Types.Int8Range<number>): Types.Int8Range<0 | 1>
    int8RangeCanonical(...args: unknown[]) {
        return sqlFunction("int8range_canonical", [{args: [Types.Int8Range<0 | 1>], ret: Types.Int8Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
