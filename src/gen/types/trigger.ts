import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Trigger<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Trigger<1>;
    static new(v: null): Trigger<0>;
    static new(v: Expression): Trigger<0 | 1>;
    static new(v: SerializeParam | null | Expression): Trigger<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "trigger" } 
    asAggregate(): Types.Trigger<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Trigger<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Trigger<1> | undefined {
          return undefined;
        }
       
}
