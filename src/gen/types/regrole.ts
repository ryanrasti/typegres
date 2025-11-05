import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regrole<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regrole<1>;
    static new(v: null): Regrole<0>;
    static new(v: Expression): Regrole<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regrole<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regrole" } 
    asAggregate(): Types.Regrole<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regrole<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regrole<1> | undefined {
          return undefined;
        }
       
}
