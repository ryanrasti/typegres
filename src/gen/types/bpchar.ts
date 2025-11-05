import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Bpchar<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Bpchar<1>;
    static new(v: null): Bpchar<0>;
    static new(v: Expression): Bpchar<0 | 1>;
    static new(v: SerializeParam | null | Expression): Bpchar<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "bpchar" } 
    asAggregate(): Types.Bpchar<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Bpchar<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Bpchar<1> | undefined {
          return undefined;
        }
       
    bpchar(this: Types.Bpchar<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bpchar<1>
    bpchar(this: Types.Bpchar<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bpchar<0 | 1>
    bpchar(this: Types.Bpchar<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bpchar<0 | 1>
    bpchar(...args: unknown[]) {
        return sqlFunction("bpchar", [{args: [Types.Bpchar<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharLarger(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bpchar<1>
    bpcharLarger(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bpchar<0 | 1>
    bpcharLarger(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bpchar<0 | 1>
    bpcharLarger(...args: unknown[]) {
        return sqlFunction("bpchar_larger", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharPatternGe(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharPatternGe(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharPatternGe(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharPatternGe(...args: unknown[]) {
        return sqlFunction("bpchar_pattern_ge", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharPatternGt(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharPatternGt(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharPatternGt(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharPatternGt(...args: unknown[]) {
        return sqlFunction("bpchar_pattern_gt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharPatternLe(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharPatternLe(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharPatternLe(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharPatternLe(...args: unknown[]) {
        return sqlFunction("bpchar_pattern_le", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharPatternLt(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharPatternLt(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharPatternLt(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharPatternLt(...args: unknown[]) {
        return sqlFunction("bpchar_pattern_lt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharSmaller(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bpchar<1>
    bpcharSmaller(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bpchar<0 | 1>
    bpcharSmaller(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bpchar<0 | 1>
    bpcharSmaller(...args: unknown[]) {
        return sqlFunction("bpchar_smaller", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharcmp(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Int4<1>
    bpcharcmp(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    bpcharcmp(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Int4<0 | 1>
    bpcharcmp(...args: unknown[]) {
        return sqlFunction("bpcharcmp", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpchareq(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpchareq(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpchareq(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpchareq(...args: unknown[]) {
        return sqlFunction("bpchareq", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharge(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharge(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharge(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharge(...args: unknown[]) {
        return sqlFunction("bpcharge", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpchargt(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpchargt(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpchargt(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpchargt(...args: unknown[]) {
        return sqlFunction("bpchargt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpchariclike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpchariclike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpchariclike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpchariclike(...args: unknown[]) {
        return sqlFunction("bpchariclike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharicnlike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharicnlike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharicnlike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharicnlike(...args: unknown[]) {
        return sqlFunction("bpcharicnlike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharicregexeq(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharicregexeq(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharicregexeq(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharicregexeq(...args: unknown[]) {
        return sqlFunction("bpcharicregexeq", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharicregexne(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharicregexne(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharicregexne(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharicregexne(...args: unknown[]) {
        return sqlFunction("bpcharicregexne", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharle(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharle(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharle(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharle(...args: unknown[]) {
        return sqlFunction("bpcharle", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharlike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharlike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharlike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharlike(...args: unknown[]) {
        return sqlFunction("bpcharlike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharlt(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharlt(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharlt(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharlt(...args: unknown[]) {
        return sqlFunction("bpcharlt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharne(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    bpcharne(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    bpcharne(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    bpcharne(...args: unknown[]) {
        return sqlFunction("bpcharne", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharnlike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharnlike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharnlike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharnlike(...args: unknown[]) {
        return sqlFunction("bpcharnlike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharregexeq(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharregexeq(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharregexeq(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharregexeq(...args: unknown[]) {
        return sqlFunction("bpcharregexeq", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpcharregexne(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    bpcharregexne(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharregexne(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    bpcharregexne(...args: unknown[]) {
        return sqlFunction("bpcharregexne", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btbpcharPatternCmp(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Int4<1>
    btbpcharPatternCmp(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    btbpcharPatternCmp(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Int4<0 | 1>
    btbpcharPatternCmp(...args: unknown[]) {
        return sqlFunction("btbpchar_pattern_cmp", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    charLength(this: Types.Bpchar<1>): Types.Int4<1>
    charLength(this: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    charLength(this: Types.Bpchar<number>): Types.Int4<0 | 1>
    charLength(...args: unknown[]) {
        return sqlFunction("char_length", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    characterLength(this: Types.Bpchar<1>): Types.Int4<1>
    characterLength(this: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    characterLength(this: Types.Bpchar<number>): Types.Int4<0 | 1>
    characterLength(...args: unknown[]) {
        return sqlFunction("character_length", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashbpchar(this: Types.Bpchar<1>): Types.Int4<1>
    hashbpchar(this: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    hashbpchar(this: Types.Bpchar<number>): Types.Int4<0 | 1>
    hashbpchar(...args: unknown[]) {
        return sqlFunction("hashbpchar", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashbpcharextended(this: Types.Bpchar<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashbpcharextended(this: Types.Bpchar<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashbpcharextended(this: Types.Bpchar<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashbpcharextended(...args: unknown[]) {
        return sqlFunction("hashbpcharextended", [{args: [Types.Bpchar<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    length(this: Types.Bpchar<1>): Types.Int4<1>
    length(this: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    length(this: Types.Bpchar<number>): Types.Int4<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Bpchar<number>): Types.Bpchar<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Bpchar<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    name(this: Types.Bpchar<1>): Types.Name<1>
    name(this: Types.Bpchar<0 | 1>): Types.Name<0 | 1>
    name(this: Types.Bpchar<number>): Types.Name<0 | 1>
    name(...args: unknown[]) {
        return sqlFunction("name", [{args: [Types.Bpchar<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    octetLength(this: Types.Bpchar<1>): Types.Int4<1>
    octetLength(this: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
    octetLength(this: Types.Bpchar<number>): Types.Int4<0 | 1>
    octetLength(...args: unknown[]) {
        return sqlFunction("octet_length", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    text(this: Types.Bpchar<1>): Types.Text<1>
    text(this: Types.Bpchar<0 | 1>): Types.Text<0 | 1>
    text(this: Types.Bpchar<number>): Types.Text<0 | 1>
    text(...args: unknown[]) {
        return sqlFunction("text", [{args: [Types.Bpchar<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["~>=~"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["~>=~"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["~>=~"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["~>=~"](...args: unknown[]) {
        return sqlFunction("~>=~", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~>~"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["~>~"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["~>~"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["~>~"](...args: unknown[]) {
        return sqlFunction("~>~", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~<=~"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["~<=~"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["~<=~"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["~<=~"](...args: unknown[]) {
        return sqlFunction("~<=~", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~<~"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["~<~"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["~<~"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["~<~"](...args: unknown[]) {
        return sqlFunction("~<~", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["="](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    eq(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    [">="](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    gte(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    [">"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    gt(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~*"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~~*"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~*"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~*"](...args: unknown[]) {
        return sqlFunction("~~*", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ilike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ilike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ilike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ilike(...args: unknown[]) {
        return sqlFunction("~~*", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~*"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~~*"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~*"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~*"](...args: unknown[]) {
        return sqlFunction("!~~*", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    notilike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    notilike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notilike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notilike(...args: unknown[]) {
        return sqlFunction("!~~*", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~*"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~*"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~*"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~*"](...args: unknown[]) {
        return sqlFunction("~*", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~*"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~*"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~*"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~*"](...args: unknown[]) {
        return sqlFunction("!~*", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["<="](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    lte(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~~"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~"](...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    like(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    like(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    like(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    like(...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["<"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    lt(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ["<>"](this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Bpchar<1>, a1: Types.Bpchar<1>): Types.Bool<1>
    ne(this: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Bpchar<number>, a1: Types.Bpchar<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~~"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~"](...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    notlike(this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    notlike(this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notlike(this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notlike(...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~"](...args: unknown[]) {
        return sqlFunction("~", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~"](this: Types.Bpchar<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~"](this: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~"](this: Types.Bpchar<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~"](...args: unknown[]) {
        return sqlFunction("!~", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
