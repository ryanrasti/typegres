import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Jsonpath<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Jsonpath<1>;
    static new(v: null): Jsonpath<0>;
    static new(v: Expression): Jsonpath<0 | 1>;
    static new(v: SerializeParam | null | Expression): Jsonpath<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "jsonpath" } 
    asAggregate(): Types.Jsonpath<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Jsonpath<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Jsonpath<1> | undefined {
          return undefined;
        }
       
}
