import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Int8Multirange<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int8Multirange<1>;
    static new(v: null): Int8Multirange<0>;
    static new(v: Expression): Int8Multirange<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int8Multirange<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "int8multirange" } 
    asAggregate(): Types.Int8Multirange<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int8Multirange<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int8Multirange<1> | undefined {
          return undefined;
        }
       
}
