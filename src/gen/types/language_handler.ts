import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class LanguageHandler<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): LanguageHandler<1>;
    static new(v: null): LanguageHandler<0>;
    static new(v: Expression): LanguageHandler<0 | 1>;
    static new(v: SerializeParam | null | Expression): LanguageHandler<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "language_handler" } 
    asAggregate(): Types.LanguageHandler<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.LanguageHandler<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.LanguageHandler<1> | undefined {
          return undefined;
        }
       
}
