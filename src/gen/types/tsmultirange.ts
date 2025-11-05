import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tsmultirange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tsmultirange<1>;
    static new(v: null): Tsmultirange<0>;
    static new(v: Expression): Tsmultirange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tsmultirange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tsmultirange" } 
    asAggregate(): Types.Tsmultirange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tsmultirange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tsmultirange<1> | undefined {
          return undefined;
        }
       
}
