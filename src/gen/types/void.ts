import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Void<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Void<1>;
    static new(v: null): Void<0>;
    static new(v: Expression): Void<0 | 1>;
    static new(v: SerializeParam | null | Expression): Void<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "void" } 
    asAggregate(): Types.Void<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Void<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Void<1> | undefined {
          return undefined;
        }
       
}
