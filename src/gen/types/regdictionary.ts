import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regdictionary<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regdictionary<1>;
    static new(v: null): Regdictionary<0>;
    static new(v: Expression): Regdictionary<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regdictionary<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regdictionary" } 
    asAggregate(): Types.Regdictionary<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regdictionary<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regdictionary<1> | undefined {
          return undefined;
        }
       
    tsLexize(this: Types.Regdictionary<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    tsLexize(this: Types.Regdictionary<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    tsLexize(this: Types.Regdictionary<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    tsLexize(...args: unknown[]) {
        return sqlFunction("ts_lexize", [{args: [Types.Regdictionary<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
