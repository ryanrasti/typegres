import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Int2Vector<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int2Vector<1>;
    static new(v: null): Int2Vector<0>;
    static new(v: Expression): Int2Vector<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int2Vector<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "int2vector" } 
    asAggregate(): Types.Int2Vector<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int2Vector<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int2Vector<1> | undefined {
          return undefined;
        }
       
}
