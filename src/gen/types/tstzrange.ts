import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tstzrange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tstzrange<1>;
    static new(v: null): Tstzrange<0>;
    static new(v: Expression): Tstzrange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tstzrange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tstzrange" } 
    asAggregate(): Types.Tstzrange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tstzrange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tstzrange<1> | undefined {
          return undefined;
        }
       
    tstzmultirange(this: Types.Tstzrange<1>): Types.Tstzmultirange<1>
    tstzmultirange(this: Types.Tstzrange<0 | 1>): Types.Tstzmultirange<0 | 1>
    tstzmultirange(this: Types.Tstzrange<number>): Types.Tstzmultirange<0 | 1>
    tstzmultirange(...args: unknown[]) {
        return sqlFunction("tstzmultirange", [{args: [Types.Tstzrange<0 | 1>], ret: Types.Tstzmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
