import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tsrange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tsrange<1>;
    static new(v: null): Tsrange<0>;
    static new(v: Expression): Tsrange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tsrange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tsrange" } 
    asAggregate(): Types.Tsrange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tsrange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tsrange<1> | undefined {
          return undefined;
        }
       
    tsmultirange(this: Types.Tsrange<1>): Types.Tsmultirange<1>
    tsmultirange(this: Types.Tsrange<0 | 1>): Types.Tsmultirange<0 | 1>
    tsmultirange(this: Types.Tsrange<number>): Types.Tsmultirange<0 | 1>
    tsmultirange(...args: unknown[]) {
        return sqlFunction("tsmultirange", [{args: [Types.Tsrange<0 | 1>], ret: Types.Tsmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
