import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regproc<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regproc<1>;
    static new(v: null): Regproc<0>;
    static new(v: Expression): Regproc<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regproc<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regproc" } 
    asAggregate(): Types.Regproc<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regproc<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regproc<1> | undefined {
          return undefined;
        }
       
}
