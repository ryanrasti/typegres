import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regcollation<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regcollation<1>;
    static new(v: null): Regcollation<0>;
    static new(v: Expression): Regcollation<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regcollation<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regcollation" } 
    asAggregate(): Types.Regcollation<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regcollation<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regcollation<1> | undefined {
          return undefined;
        }
       
}
