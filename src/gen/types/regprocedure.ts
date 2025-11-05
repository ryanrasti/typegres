import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regprocedure<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regprocedure<1>;
    static new(v: null): Regprocedure<0>;
    static new(v: Expression): Regprocedure<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regprocedure<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regprocedure" } 
    asAggregate(): Types.Regprocedure<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regprocedure<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regprocedure<1> | undefined {
          return undefined;
        }
       
}
