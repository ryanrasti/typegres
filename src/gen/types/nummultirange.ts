import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Nummultirange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Nummultirange<1>;
    static new(v: null): Nummultirange<0>;
    static new(v: Expression): Nummultirange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Nummultirange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "nummultirange" } 
    asAggregate(): Types.Nummultirange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Nummultirange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Nummultirange<1> | undefined {
          return undefined;
        }
       
}
