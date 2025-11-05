import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regoperator<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regoperator<1>;
    static new(v: null): Regoperator<0>;
    static new(v: Expression): Regoperator<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regoperator<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regoperator" } 
    asAggregate(): Types.Regoperator<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regoperator<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regoperator<1> | undefined {
          return undefined;
        }
       
}
