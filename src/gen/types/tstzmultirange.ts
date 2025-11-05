import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tstzmultirange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tstzmultirange<1>;
    static new(v: null): Tstzmultirange<0>;
    static new(v: Expression): Tstzmultirange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tstzmultirange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tstzmultirange" } 
    asAggregate(): Types.Tstzmultirange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tstzmultirange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tstzmultirange<1> | undefined {
          return undefined;
        }
       
}
