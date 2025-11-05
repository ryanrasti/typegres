import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Datemultirange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Datemultirange<1>;
    static new(v: null): Datemultirange<0>;
    static new(v: Expression): Datemultirange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Datemultirange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "datemultirange" } 
    asAggregate(): Types.Datemultirange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Datemultirange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Datemultirange<1> | undefined {
          return undefined;
        }
       
}
