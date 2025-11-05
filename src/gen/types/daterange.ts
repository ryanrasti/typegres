import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Daterange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Daterange<1>;
    static new(v: null): Daterange<0>;
    static new(v: Expression): Daterange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Daterange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "daterange" } 
    asAggregate(): Types.Daterange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Daterange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Daterange<1> | undefined {
          return undefined;
        }
       
    datemultirange(this: Types.Daterange<1>): Types.Datemultirange<1>
    datemultirange(this: Types.Daterange<0 | 1>): Types.Datemultirange<0 | 1>
    datemultirange(this: Types.Daterange<number>): Types.Datemultirange<0 | 1>
    datemultirange(...args: unknown[]) {
        return sqlFunction("datemultirange", [{args: [Types.Daterange<0 | 1>], ret: Types.Datemultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    daterangeCanonical(this: Types.Daterange<1>): Types.Daterange<1>
    daterangeCanonical(this: Types.Daterange<0 | 1>): Types.Daterange<0 | 1>
    daterangeCanonical(this: Types.Daterange<number>): Types.Daterange<0 | 1>
    daterangeCanonical(...args: unknown[]) {
        return sqlFunction("daterange_canonical", [{args: [Types.Daterange<0 | 1>], ret: Types.Daterange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
