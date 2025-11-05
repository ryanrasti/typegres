import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regoper<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regoper<1>;
    static new(v: null): Regoper<0>;
    static new(v: Expression): Regoper<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regoper<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regoper" } 
    asAggregate(): Types.Regoper<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regoper<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regoper<1> | undefined {
          return undefined;
        }
       
}
