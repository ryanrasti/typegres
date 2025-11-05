import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Numrange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Numrange<1>;
    static new(v: null): Numrange<0>;
    static new(v: Expression): Numrange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Numrange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "numrange" } 
    asAggregate(): Types.Numrange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Numrange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Numrange<1> | undefined {
          return undefined;
        }
       
    nummultirange(this: Types.Numrange<1>): Types.Nummultirange<1>
    nummultirange(this: Types.Numrange<0 | 1>): Types.Nummultirange<0 | 1>
    nummultirange(this: Types.Numrange<number>): Types.Nummultirange<0 | 1>
    nummultirange(...args: unknown[]) {
        return sqlFunction("nummultirange", [{args: [Types.Numrange<0 | 1>], ret: Types.Nummultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
