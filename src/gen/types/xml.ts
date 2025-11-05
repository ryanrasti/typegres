import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Xml<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Xml<1>;
    static new(v: null): Xml<0>;
    static new(v: Expression): Xml<0 | 1>;
    static new(v: SerializeParam | null | Expression): Xml<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "xml" } 
    asAggregate(): Types.Xml<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Xml<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Xml<1> | undefined {
          return undefined;
        }
       
    text(this: Types.Xml<1>): Types.Text<1>
    text(this: Types.Xml<0 | 1>): Types.Text<0 | 1>
    text(this: Types.Xml<number>): Types.Text<0 | 1>
    text(...args: unknown[]) {
        return sqlFunction("text", [{args: [Types.Xml<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    xmlagg(this: Types.Xml<number>): Types.Xml<0 | 1>
    xmlagg(...args: unknown[]) {
        return sqlFunction("xmlagg", [{args: [Types.Xml<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xmlconcat2(this: Types.Xml<1>, a1: Types.Xml<1>): Types.Xml<1>
    xmlconcat2(this: Types.Xml<0 | 1>, a1: Types.Xml<0 | 1>): Types.Xml<0 | 1>
    xmlconcat2(this: Types.Xml<number>, a1: Types.Xml<number>): Types.Xml<0 | 1>
    xmlconcat2(...args: unknown[]) {
        return sqlFunction("xmlconcat2", [{args: [Types.Xml<0 | 1>, Types.Xml<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xmlvalidate(this: Types.Xml<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    xmlvalidate(this: Types.Xml<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    xmlvalidate(this: Types.Xml<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    xmlvalidate(...args: unknown[]) {
        return sqlFunction("xmlvalidate", [{args: [Types.Xml<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
