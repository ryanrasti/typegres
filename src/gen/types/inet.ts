import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Inet<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Inet<1>;
    static new(v: null): Inet<0>;
    static new(v: Expression): Inet<0 | 1>;
    static new(v: SerializeParam | null | Expression): Inet<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "inet" } 
    asAggregate(): Types.Inet<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Inet<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Inet<1> | undefined {
          return undefined;
        }
       
    abbrev(this: Types.Inet<1>): Types.Text<1>
    abbrev(this: Types.Inet<0 | 1>): Types.Text<0 | 1>
    abbrev(this: Types.Inet<number>): Types.Text<0 | 1>
    abbrev(...args: unknown[]) {
        return sqlFunction("abbrev", [{args: [Types.Inet<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    broadcast(this: Types.Inet<1>): Types.Inet<1>
    broadcast(this: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    broadcast(this: Types.Inet<number>): Types.Inet<0 | 1>
    broadcast(...args: unknown[]) {
        return sqlFunction("broadcast", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cidr(this: Types.Inet<1>): Types.Cidr<1>
    cidr(this: Types.Inet<0 | 1>): Types.Cidr<0 | 1>
    cidr(this: Types.Inet<number>): Types.Cidr<0 | 1>
    cidr(...args: unknown[]) {
        return sqlFunction("cidr", [{args: [Types.Inet<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    family(this: Types.Inet<1>): Types.Int4<1>
    family(this: Types.Inet<0 | 1>): Types.Int4<0 | 1>
    family(this: Types.Inet<number>): Types.Int4<0 | 1>
    family(...args: unknown[]) {
        return sqlFunction("family", [{args: [Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    hashinet(this: Types.Inet<1>): Types.Int4<1>
    hashinet(this: Types.Inet<0 | 1>): Types.Int4<0 | 1>
    hashinet(this: Types.Inet<number>): Types.Int4<0 | 1>
    hashinet(...args: unknown[]) {
        return sqlFunction("hashinet", [{args: [Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashinetextended(this: Types.Inet<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashinetextended(this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashinetextended(this: Types.Inet<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashinetextended(...args: unknown[]) {
        return sqlFunction("hashinetextended", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    host(this: Types.Inet<1>): Types.Text<1>
    host(this: Types.Inet<0 | 1>): Types.Text<0 | 1>
    host(this: Types.Inet<number>): Types.Text<0 | 1>
    host(...args: unknown[]) {
        return sqlFunction("host", [{args: [Types.Inet<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hostmask(this: Types.Inet<1>): Types.Inet<1>
    hostmask(this: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    hostmask(this: Types.Inet<number>): Types.Inet<0 | 1>
    hostmask(...args: unknown[]) {
        return sqlFunction("hostmask", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetMerge(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Cidr<1>
    inetMerge(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Cidr<0 | 1>
    inetMerge(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Cidr<0 | 1>
    inetMerge(...args: unknown[]) {
        return sqlFunction("inet_merge", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetSameFamily(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    inetSameFamily(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    inetSameFamily(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    inetSameFamily(...args: unknown[]) {
        return sqlFunction("inet_same_family", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetand(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Inet<1>
    inetand(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    inetand(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    inetand(...args: unknown[]) {
        return sqlFunction("inetand", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetmi(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Int8<1>
    inetmi(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Int8<0 | 1>
    inetmi(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Int8<0 | 1>
    inetmi(...args: unknown[]) {
        return sqlFunction("inetmi", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetmiInt8(this: Types.Inet<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<1>
    inetmiInt8(this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    inetmiInt8(this: Types.Inet<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    inetmiInt8(...args: unknown[]) {
        return sqlFunction("inetmi_int8", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetnot(this: Types.Inet<1>): Types.Inet<1>
    inetnot(this: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    inetnot(this: Types.Inet<number>): Types.Inet<0 | 1>
    inetnot(...args: unknown[]) {
        return sqlFunction("inetnot", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetor(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Inet<1>
    inetor(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    inetor(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    inetor(...args: unknown[]) {
        return sqlFunction("inetor", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inetpl(this: Types.Inet<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<1>
    inetpl(this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    inetpl(this: Types.Inet<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    inetpl(...args: unknown[]) {
        return sqlFunction("inetpl", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    masklen(this: Types.Inet<1>): Types.Int4<1>
    masklen(this: Types.Inet<0 | 1>): Types.Int4<0 | 1>
    masklen(this: Types.Inet<number>): Types.Int4<0 | 1>
    masklen(...args: unknown[]) {
        return sqlFunction("masklen", [{args: [Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Inet<number>): Types.Inet<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    netmask(this: Types.Inet<1>): Types.Inet<1>
    netmask(this: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    netmask(this: Types.Inet<number>): Types.Inet<0 | 1>
    netmask(...args: unknown[]) {
        return sqlFunction("netmask", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    network(this: Types.Inet<1>): Types.Cidr<1>
    network(this: Types.Inet<0 | 1>): Types.Cidr<0 | 1>
    network(this: Types.Inet<number>): Types.Cidr<0 | 1>
    network(...args: unknown[]) {
        return sqlFunction("network", [{args: [Types.Inet<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkCmp(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Int4<1>
    networkCmp(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Int4<0 | 1>
    networkCmp(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Int4<0 | 1>
    networkCmp(...args: unknown[]) {
        return sqlFunction("network_cmp", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkEq(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkEq(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkEq(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkEq(...args: unknown[]) {
        return sqlFunction("network_eq", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkGe(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkGe(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkGe(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkGe(...args: unknown[]) {
        return sqlFunction("network_ge", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkGt(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkGt(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkGt(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkGt(...args: unknown[]) {
        return sqlFunction("network_gt", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkLarger(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Inet<1>
    networkLarger(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    networkLarger(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    networkLarger(...args: unknown[]) {
        return sqlFunction("network_larger", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkLe(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkLe(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkLe(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkLe(...args: unknown[]) {
        return sqlFunction("network_le", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkLt(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkLt(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkLt(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkLt(...args: unknown[]) {
        return sqlFunction("network_lt", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkNe(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkNe(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkNe(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkNe(...args: unknown[]) {
        return sqlFunction("network_ne", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkOverlap(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkOverlap(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkOverlap(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkOverlap(...args: unknown[]) {
        return sqlFunction("network_overlap", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkSmaller(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Inet<1>
    networkSmaller(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    networkSmaller(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    networkSmaller(...args: unknown[]) {
        return sqlFunction("network_smaller", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkSub(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkSub(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkSub(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkSub(...args: unknown[]) {
        return sqlFunction("network_sub", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkSubeq(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkSubeq(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkSubeq(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkSubeq(...args: unknown[]) {
        return sqlFunction("network_subeq", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkSup(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkSup(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkSup(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkSup(...args: unknown[]) {
        return sqlFunction("network_sup", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    networkSupeq(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    networkSupeq(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    networkSupeq(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    networkSupeq(...args: unknown[]) {
        return sqlFunction("network_supeq", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setMasklen(this: Types.Inet<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Inet<1>
    setMasklen(this: Types.Inet<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Inet<0 | 1>
    setMasklen(this: Types.Inet<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Inet<0 | 1>
    setMasklen(...args: unknown[]) {
        return sqlFunction("set_masklen", [{args: [Types.Inet<0 | 1>, Types.Int4<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    text(this: Types.Inet<1>): Types.Text<1>
    text(this: Types.Inet<0 | 1>): Types.Text<0 | 1>
    text(this: Types.Inet<number>): Types.Text<0 | 1>
    text(...args: unknown[]) {
        return sqlFunction("text", [{args: [Types.Inet<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Inet<1>
    ["&"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    ["&"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Int8<1>
    ["-"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Int8<0 | 1>
    ["-"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Int8<0 | 1>
    ["-"](this: Types.Inet<1>, a1: Types.Int8<1>): Types.Inet<1>
    ["-"](this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1>): Types.Inet<0 | 1>
    ["-"](this: Types.Inet<number>, a1: Types.Int8<number>): Types.Inet<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Int8<1>
    minus(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Int8<0 | 1>
    minus(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Int8<0 | 1>
    minus(this: Types.Inet<1>, a1: Types.Int8<1>): Types.Inet<1>
    minus(this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1>): Types.Inet<0 | 1>
    minus(this: Types.Inet<number>, a1: Types.Int8<number>): Types.Inet<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Inet<1>
    ["|"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    ["|"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Inet<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<1>
    ["+"](this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    ["+"](this: Types.Inet<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Inet<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<1>
    plus(this: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    plus(this: Types.Inet<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["="](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    eq(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    [">="](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    gte(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    [">"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    gt(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["<="](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    lte(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["<"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    lt(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["<>"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ne(this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["&&"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["&&"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["<<"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["<<"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<="](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    ["<<="](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    ["<<="](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    ["<<="](...args: unknown[]) {
        return sqlFunction("<<=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    [">>"](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    [">>"](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>="](this: Types.Inet<1>, a1: Types.Inet<1>): Types.Bool<1>
    [">>="](this: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
    [">>="](this: Types.Inet<number>, a1: Types.Inet<number>): Types.Bool<0 | 1>
    [">>="](...args: unknown[]) {
        return sqlFunction(">>=", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
