import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Refcursor<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Refcursor<1>;
    static new(v: null): Refcursor<0>;
    static new(v: Expression): Refcursor<0 | 1>;
    static new(v: SerializeParam | null | Expression): Refcursor<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "refcursor" } 
    asAggregate(): Types.Refcursor<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Refcursor<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Refcursor<1> | undefined {
          return undefined;
        }
       
    cursorToXml(this: Types.Refcursor<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    cursorToXml(this: Types.Refcursor<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    cursorToXml(this: Types.Refcursor<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    cursorToXml(...args: unknown[]) {
        return sqlFunction("cursor_to_xml", [{args: [Types.Refcursor<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cursorToXmlschema(this: Types.Refcursor<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    cursorToXmlschema(this: Types.Refcursor<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    cursorToXmlschema(this: Types.Refcursor<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    cursorToXmlschema(...args: unknown[]) {
        return sqlFunction("cursor_to_xmlschema", [{args: [Types.Refcursor<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
