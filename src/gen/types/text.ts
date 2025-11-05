import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["text"]['parse']>
type SerializeParam = Parameters<typeof typeMap["text"]['serialize']>[0]
export class Text<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Text<1>;
    static new(v: null): Text<0>;
    static new(v: Expression): Text<0 | 1>;
    static new(v: SerializeParam | null | Expression): Text<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["text"].parse(v); }
    static typeString(): string | undefined  { return "text" } 
    asAggregate(): Types.Text<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Text<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Text<1> | undefined {
          return undefined;
        }
       
    ascii(this: Types.Text<1>): Types.Int4<1>
    ascii(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    ascii(this: Types.Text<number>): Types.Int4<0 | 1>
    ascii(...args: unknown[]) {
        return sqlFunction("ascii", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeAddSubRelState(this: Types.Text<1>, a1: Types.Oid<1>, a2: Types.Char<1>, a3: Types.PgLsn<1>): Types.Void<1>
    binaryUpgradeAddSubRelState(this: Types.Text<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Char<0 | 1>, a3: Types.PgLsn<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeAddSubRelState(this: Types.Text<number>, a1: Types.Oid<number>, a2: Types.Char<number>, a3: Types.PgLsn<number>): Types.Void<0 | 1>
    binaryUpgradeAddSubRelState(...args: unknown[]) {
        return sqlFunction("binary_upgrade_add_sub_rel_state", [{args: [Types.Text<0 | 1>, Types.Oid<0 | 1>, Types.Char<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeCreateEmptyExtension(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a4: Types.Array<1, Types.Oid<0 | 1>>, a5: Types.Array<1, Types.Text<0 | 1>>, a6: Types.Array<1, Types.Text<0 | 1>>): Types.Void<1>
    binaryUpgradeCreateEmptyExtension(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a4: Types.Array<0 | 1, Types.Oid<0 | 1>>, a5: Types.Array<0 | 1, Types.Text<0 | 1>>, a6: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Void<0 | 1>
    binaryUpgradeCreateEmptyExtension(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a4: Types.Array<number, Types.Oid<0 | 1>>, a5: Types.Array<number, Types.Text<0 | 1>>, a6: Types.Array<number, Types.Text<0 | 1>>): Types.Void<0 | 1>
    binaryUpgradeCreateEmptyExtension(...args: unknown[]) {
        return sqlFunction("binary_upgrade_create_empty_extension", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>, Types.Array.of(Types.Oid<0 | 1>), Types.Array.of(Types.Text<0 | 1>), Types.Array.of(Types.Text<0 | 1>)], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeReploriginAdvance(this: Types.Text<1>, a1: Types.PgLsn<1>): Types.Void<1>
    binaryUpgradeReploriginAdvance(this: Types.Text<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeReploriginAdvance(this: Types.Text<number>, a1: Types.PgLsn<number>): Types.Void<0 | 1>
    binaryUpgradeReploriginAdvance(...args: unknown[]) {
        return sqlFunction("binary_upgrade_replorigin_advance", [{args: [Types.Text<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitLength(this: Types.Text<1>): Types.Int4<1>
    bitLength(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    bitLength(this: Types.Text<number>): Types.Int4<0 | 1>
    bitLength(...args: unknown[]) {
        return sqlFunction("bit_length", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btrim(this: Types.Text<1>): Types.Text<1>
    btrim(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    btrim(this: Types.Text<number>): Types.Text<0 | 1>
    btrim(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    btrim(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    btrim(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    btrim(...args: unknown[]) {
        return sqlFunction("btrim", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bttextPatternCmp(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    bttextPatternCmp(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    bttextPatternCmp(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    bttextPatternCmp(...args: unknown[]) {
        return sqlFunction("bttext_pattern_cmp", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bttextcmp(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    bttextcmp(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    bttextcmp(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    bttextcmp(...args: unknown[]) {
        return sqlFunction("bttextcmp", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bttextnamecmp(this: Types.Text<1>, a1: Types.Name<1>): Types.Int4<1>
    bttextnamecmp(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Int4<0 | 1>
    bttextnamecmp(this: Types.Text<number>, a1: Types.Name<number>): Types.Int4<0 | 1>
    bttextnamecmp(...args: unknown[]) {
        return sqlFunction("bttextnamecmp", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    char(this: Types.Text<1>): Types.Char<1>
    char(this: Types.Text<0 | 1>): Types.Char<0 | 1>
    char(this: Types.Text<number>): Types.Char<0 | 1>
    char(...args: unknown[]) {
        return sqlFunction("char", [{args: [Types.Text<0 | 1>], ret: Types.Char<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    charLength(this: Types.Text<1>): Types.Int4<1>
    charLength(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    charLength(this: Types.Text<number>): Types.Int4<0 | 1>
    charLength(...args: unknown[]) {
        return sqlFunction("char_length", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    characterLength(this: Types.Text<1>): Types.Int4<1>
    characterLength(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    characterLength(this: Types.Text<number>): Types.Int4<0 | 1>
    characterLength(...args: unknown[]) {
        return sqlFunction("character_length", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    concatWs(this: Types.Text<1>, a1: Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<1>
    concatWs(this: Types.Text<0 | 1>, a1: Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<0 | 1>
    concatWs(this: Types.Text<number>, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<0 | 1>
    concatWs(...args: unknown[]) {
        return sqlFunction("concat_ws", [{args: [Types.Text<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    convertTo(this: Types.Text<1>, a1: Types.Name<1>): Types.Bytea<1>
    convertTo(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bytea<0 | 1>
    convertTo(this: Types.Text<number>, a1: Types.Name<number>): Types.Bytea<0 | 1>
    convertTo(...args: unknown[]) {
        return sqlFunction("convert_to", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    currentSetting(this: Types.Text<1>): Types.Text<1>
    currentSetting(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    currentSetting(this: Types.Text<number>): Types.Text<0 | 1>
    currentSetting(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    currentSetting(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    currentSetting(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    currentSetting(...args: unknown[]) {
        return sqlFunction("current_setting", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    currtid2(this: Types.Text<1>, a1: Types.Tid<1>): Types.Tid<1>
    currtid2(this: Types.Text<0 | 1>, a1: Types.Tid<0 | 1>): Types.Tid<0 | 1>
    currtid2(this: Types.Text<number>, a1: Types.Tid<number>): Types.Tid<0 | 1>
    currtid2(...args: unknown[]) {
        return sqlFunction("currtid2", [{args: [Types.Text<0 | 1>, Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    datePart(this: Types.Text<1>, a1: Types.Date<1>): Types.Float8<1>
    datePart(this: Types.Text<0 | 1>, a1: Types.Date<0 | 1>): Types.Float8<0 | 1>
    datePart(this: Types.Text<number>, a1: Types.Date<number>): Types.Float8<0 | 1>
    datePart(this: Types.Text<1>, a1: Types.Interval<1>): Types.Float8<1>
    datePart(this: Types.Text<0 | 1>, a1: Types.Interval<0 | 1>): Types.Float8<0 | 1>
    datePart(this: Types.Text<number>, a1: Types.Interval<number>): Types.Float8<0 | 1>
    datePart(this: Types.Text<1>, a1: Types.Time<1>): Types.Float8<1>
    datePart(this: Types.Text<0 | 1>, a1: Types.Time<0 | 1>): Types.Float8<0 | 1>
    datePart(this: Types.Text<number>, a1: Types.Time<number>): Types.Float8<0 | 1>
    datePart(this: Types.Text<1>, a1: Types.Timestamp<1>): Types.Float8<1>
    datePart(this: Types.Text<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Float8<0 | 1>
    datePart(this: Types.Text<number>, a1: Types.Timestamp<number>): Types.Float8<0 | 1>
    datePart(this: Types.Text<1>, a1: Types.Timestamptz<1>): Types.Float8<1>
    datePart(this: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Float8<0 | 1>
    datePart(this: Types.Text<number>, a1: Types.Timestamptz<number>): Types.Float8<0 | 1>
    datePart(this: Types.Text<1>, a1: Types.Timetz<1>): Types.Float8<1>
    datePart(this: Types.Text<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Float8<0 | 1>
    datePart(this: Types.Text<number>, a1: Types.Timetz<number>): Types.Float8<0 | 1>
    datePart(...args: unknown[]) {
        return sqlFunction("date_part", [{args: [Types.Text<0 | 1>, Types.Date<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Interval<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Time<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateTrunc(this: Types.Text<1>, a1: Types.Interval<1>): Types.Interval<1>
    dateTrunc(this: Types.Text<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    dateTrunc(this: Types.Text<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    dateTrunc(this: Types.Text<1>, a1: Types.Timestamp<1>): Types.Timestamp<1>
    dateTrunc(this: Types.Text<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
    dateTrunc(this: Types.Text<number>, a1: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    dateTrunc(this: Types.Text<1>, a1: Types.Timestamptz<1>): Types.Timestamptz<1>
    dateTrunc(this: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
    dateTrunc(this: Types.Text<number>, a1: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    dateTrunc(this: Types.Text<1>, a1: Types.Timestamptz<1>, a2: Types.Text<1>): Types.Timestamptz<1>
    dateTrunc(this: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Text<0 | 1>): Types.Timestamptz<0 | 1>
    dateTrunc(this: Types.Text<number>, a1: Types.Timestamptz<number>, a2: Types.Text<number>): Types.Timestamptz<0 | 1>
    dateTrunc(...args: unknown[]) {
        return sqlFunction("date_trunc", [{args: [Types.Text<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    decode(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bytea<1>
    decode(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bytea<0 | 1>
    decode(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bytea<0 | 1>
    decode(...args: unknown[]) {
        return sqlFunction("decode", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    extract(this: Types.Text<1>, a1: Types.Date<1>): Types.Numeric<1>
    extract(this: Types.Text<0 | 1>, a1: Types.Date<0 | 1>): Types.Numeric<0 | 1>
    extract(this: Types.Text<number>, a1: Types.Date<number>): Types.Numeric<0 | 1>
    extract(this: Types.Text<1>, a1: Types.Interval<1>): Types.Numeric<1>
    extract(this: Types.Text<0 | 1>, a1: Types.Interval<0 | 1>): Types.Numeric<0 | 1>
    extract(this: Types.Text<number>, a1: Types.Interval<number>): Types.Numeric<0 | 1>
    extract(this: Types.Text<1>, a1: Types.Time<1>): Types.Numeric<1>
    extract(this: Types.Text<0 | 1>, a1: Types.Time<0 | 1>): Types.Numeric<0 | 1>
    extract(this: Types.Text<number>, a1: Types.Time<number>): Types.Numeric<0 | 1>
    extract(this: Types.Text<1>, a1: Types.Timestamp<1>): Types.Numeric<1>
    extract(this: Types.Text<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Numeric<0 | 1>
    extract(this: Types.Text<number>, a1: Types.Timestamp<number>): Types.Numeric<0 | 1>
    extract(this: Types.Text<1>, a1: Types.Timestamptz<1>): Types.Numeric<1>
    extract(this: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Numeric<0 | 1>
    extract(this: Types.Text<number>, a1: Types.Timestamptz<number>): Types.Numeric<0 | 1>
    extract(this: Types.Text<1>, a1: Types.Timetz<1>): Types.Numeric<1>
    extract(this: Types.Text<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Numeric<0 | 1>
    extract(this: Types.Text<number>, a1: Types.Timetz<number>): Types.Numeric<0 | 1>
    extract(...args: unknown[]) {
        return sqlFunction("extract", [{args: [Types.Text<0 | 1>, Types.Date<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Interval<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Time<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    format(this: Types.Text<1>): Types.Text<1>
    format(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    format(this: Types.Text<number>): Types.Text<0 | 1>
    format(this: Types.Text<1>, a1: Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<1>
    format(this: Types.Text<0 | 1>, a1: Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<0 | 1>
    format(this: Types.Text<number>, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<0 | 1>
    format(...args: unknown[]) {
        return sqlFunction("format", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: true}], [this, ...args]);
    }

    ginCmpTslexeme(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    ginCmpTslexeme(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    ginCmpTslexeme(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    ginCmpTslexeme(...args: unknown[]) {
        return sqlFunction("gin_cmp_tslexeme", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ginCompareJsonb(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    ginCompareJsonb(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    ginCompareJsonb(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    ginCompareJsonb(...args: unknown[]) {
        return sqlFunction("gin_compare_jsonb", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasAnyColumnPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasAnyColumnPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(...args: unknown[]) {
        return sqlFunction("has_any_column_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasColumnPrivilege(this: Types.Text<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Text<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Text<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(...args: unknown[]) {
        return sqlFunction("has_column_privilege", [{args: [Types.Text<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasDatabasePrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasDatabasePrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(...args: unknown[]) {
        return sqlFunction("has_database_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasForeignDataWrapperPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasForeignDataWrapperPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(...args: unknown[]) {
        return sqlFunction("has_foreign_data_wrapper_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasFunctionPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasFunctionPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(...args: unknown[]) {
        return sqlFunction("has_function_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasLanguagePrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasLanguagePrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(...args: unknown[]) {
        return sqlFunction("has_language_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasParameterPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasParameterPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasParameterPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasParameterPrivilege(...args: unknown[]) {
        return sqlFunction("has_parameter_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasSchemaPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSchemaPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(...args: unknown[]) {
        return sqlFunction("has_schema_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasSequencePrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSequencePrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(...args: unknown[]) {
        return sqlFunction("has_sequence_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasServerPrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasServerPrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(...args: unknown[]) {
        return sqlFunction("has_server_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTablePrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablePrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(...args: unknown[]) {
        return sqlFunction("has_table_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTablespacePrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablespacePrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(...args: unknown[]) {
        return sqlFunction("has_tablespace_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTypePrivilege(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTypePrivilege(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(...args: unknown[]) {
        return sqlFunction("has_type_privilege", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashtext(this: Types.Text<1>): Types.Int4<1>
    hashtext(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    hashtext(this: Types.Text<number>): Types.Int4<0 | 1>
    hashtext(...args: unknown[]) {
        return sqlFunction("hashtext", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashtextextended(this: Types.Text<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashtextextended(this: Types.Text<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashtextextended(this: Types.Text<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashtextextended(...args: unknown[]) {
        return sqlFunction("hashtextextended", [{args: [Types.Text<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    initcap(this: Types.Text<1>): Types.Text<1>
    initcap(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    initcap(this: Types.Text<number>): Types.Text<0 | 1>
    initcap(...args: unknown[]) {
        return sqlFunction("initcap", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isNormalized(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    isNormalized(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    isNormalized(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    isNormalized(...args: unknown[]) {
        return sqlFunction("is_normalized", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    left(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    left(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    left(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    left(...args: unknown[]) {
        return sqlFunction("left", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    length(this: Types.Text<1>): Types.Int4<1>
    length(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    length(this: Types.Text<number>): Types.Int4<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    like(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    like(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    like(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    like(...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    likeEscape(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    likeEscape(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    likeEscape(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    likeEscape(...args: unknown[]) {
        return sqlFunction("like_escape", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loImport(this: Types.Text<1>): Types.Oid<1>
    loImport(this: Types.Text<0 | 1>): Types.Oid<0 | 1>
    loImport(this: Types.Text<number>): Types.Oid<0 | 1>
    loImport(this: Types.Text<1>, a1: Types.Oid<1>): Types.Oid<1>
    loImport(this: Types.Text<0 | 1>, a1: Types.Oid<0 | 1>): Types.Oid<0 | 1>
    loImport(this: Types.Text<number>, a1: Types.Oid<number>): Types.Oid<0 | 1>
    loImport(...args: unknown[]) {
        return sqlFunction("lo_import", [{args: [Types.Text<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lower(this: Types.Text<1>): Types.Text<1>
    lower(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    lower(this: Types.Text<number>): Types.Text<0 | 1>
    lower(...args: unknown[]) {
        return sqlFunction("lower", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lpad(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    lpad(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    lpad(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    lpad(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    lpad(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    lpad(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    lpad(...args: unknown[]) {
        return sqlFunction("lpad", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ltrim(this: Types.Text<1>): Types.Text<1>
    ltrim(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    ltrim(this: Types.Text<number>): Types.Text<0 | 1>
    ltrim(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    ltrim(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    ltrim(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    ltrim(...args: unknown[]) {
        return sqlFunction("ltrim", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Text<number>): Types.Text<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    md5(this: Types.Text<1>): Types.Text<1>
    md5(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    md5(this: Types.Text<number>): Types.Text<0 | 1>
    md5(...args: unknown[]) {
        return sqlFunction("md5", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    name(this: Types.Text<1>): Types.Name<1>
    name(this: Types.Text<0 | 1>): Types.Name<0 | 1>
    name(this: Types.Text<number>): Types.Name<0 | 1>
    name(...args: unknown[]) {
        return sqlFunction("name", [{args: [Types.Text<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    normalize(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    normalize(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    normalize(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    normalize(...args: unknown[]) {
        return sqlFunction("normalize", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    notlike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    notlike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notlike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notlike(...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    octetLength(this: Types.Text<1>): Types.Int4<1>
    octetLength(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    octetLength(this: Types.Text<number>): Types.Int4<0 | 1>
    octetLength(...args: unknown[]) {
        return sqlFunction("octet_length", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlay(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    overlay(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    overlay(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    overlay(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    overlay(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    overlay(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    overlay(...args: unknown[]) {
        return sqlFunction("overlay", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    parseIdent(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    parseIdent(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    parseIdent(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    parseIdent(...args: unknown[]) {
        return sqlFunction("parse_ident", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgBackupStart(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<1>
    pgBackupStart(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgBackupStart(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgBackupStart(...args: unknown[]) {
        return sqlFunction("pg_backup_start", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCreateRestorePoint(this: Types.Text<1>): Types.PgLsn<1>
    pgCreateRestorePoint(this: Types.Text<0 | 1>): Types.PgLsn<0 | 1>
    pgCreateRestorePoint(this: Types.Text<number>): Types.PgLsn<0 | 1>
    pgCreateRestorePoint(...args: unknown[]) {
        return sqlFunction("pg_create_restore_point", [{args: [Types.Text<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCurrentLogfile(this: Types.Text<1>): Types.Text<1>
    pgCurrentLogfile(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    pgCurrentLogfile(this: Types.Text<number>): Types.Text<0 | 1>
    pgCurrentLogfile(...args: unknown[]) {
        return sqlFunction("pg_current_logfile", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetObjectAddress(this: Types.Text<1>, a1: Types.Array<1, Types.Text<0 | 1>>, a2: Types.Array<1, Types.Text<0 | 1>>): Types.Record<1, {classid: Types.Oid<1>, objid: Types.Oid<1>, objsubid: Types.Int4<1>}>
    pgGetObjectAddress(this: Types.Text<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Record<0 | 1, {classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>}>
    pgGetObjectAddress(this: Types.Text<number>, a1: Types.Array<number, Types.Text<0 | 1>>, a2: Types.Array<number, Types.Text<0 | 1>>): Types.Record<0 | 1, {classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>}>
    pgGetObjectAddress(...args: unknown[]) {
        return sqlFunction("pg_get_object_address", [{args: [Types.Text<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Array.of(Types.Text<0 | 1>)], ret: Types.Record.of({classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetSerialSequence(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    pgGetSerialSequence(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    pgGetSerialSequence(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    pgGetSerialSequence(...args: unknown[]) {
        return sqlFunction("pg_get_serial_sequence", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetViewdef(this: Types.Text<1>): Types.Text<1>
    pgGetViewdef(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Text<number>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetViewdef(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetViewdef(...args: unknown[]) {
        return sqlFunction("pg_get_viewdef", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgInputErrorInfo(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Record<1, {message: Types.Text<1>, detail: Types.Text<1>, hint: Types.Text<1>, sql_error_code: Types.Text<1>}>
    pgInputErrorInfo(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Record<0 | 1, {message: Types.Text<0 | 1>, detail: Types.Text<0 | 1>, hint: Types.Text<0 | 1>, sql_error_code: Types.Text<0 | 1>}>
    pgInputErrorInfo(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Record<0 | 1, {message: Types.Text<0 | 1>, detail: Types.Text<0 | 1>, hint: Types.Text<0 | 1>, sql_error_code: Types.Text<0 | 1>}>
    pgInputErrorInfo(...args: unknown[]) {
        return sqlFunction("pg_input_error_info", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Record.of({message: Types.Text<0 | 1>, detail: Types.Text<0 | 1>, hint: Types.Text<0 | 1>, sql_error_code: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgInputIsValid(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgInputIsValid(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgInputIsValid(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgInputIsValid(...args: unknown[]) {
        return sqlFunction("pg_input_is_valid", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsDir(this: Types.Text<1>): Types.FromItem<{}>
    pgLsDir(this: Types.Text<0 | 1>): Types.FromItem<{}>
    pgLsDir(this: Types.Text<number>): Types.FromItem<{}>
    pgLsDir(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    pgLsDir(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    pgLsDir(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    pgLsDir(...args: unknown[]) {
        return sqlFunction("pg_ls_dir", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsReplslotdir(this: Types.Text<1>): Types.FromItem<{name: Types.Text<1>, size: Types.Int8<1>, modification: Types.Timestamptz<1>}>
    pgLsReplslotdir(this: Types.Text<0 | 1>): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
    pgLsReplslotdir(this: Types.Text<number>): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
    pgLsReplslotdir(...args: unknown[]) {
        return sqlFunction("pg_ls_replslotdir", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgNotify(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Void<1>
    pgNotify(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
    pgNotify(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
    pgNotify(...args: unknown[]) {
        return sqlFunction("pg_notify", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReadBinaryFile(this: Types.Text<1>): Types.Bytea<1>
    pgReadBinaryFile(this: Types.Text<0 | 1>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<number>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<1>
    pgReadBinaryFile(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bytea<1>
    pgReadBinaryFile(this: Types.Text<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<1>
    pgReadBinaryFile(this: Types.Text<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<0 | 1>
    pgReadBinaryFile(this: Types.Text<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<0 | 1>
    pgReadBinaryFile(...args: unknown[]) {
        return sqlFunction("pg_read_binary_file", [{args: [Types.Text<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReadFile(this: Types.Text<1>): Types.Text<1>
    pgReadFile(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<number>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgReadFile(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<1>
    pgReadFile(this: Types.Text<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgReadFile(this: Types.Text<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgReadFile(this: Types.Text<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgReadFile(...args: unknown[]) {
        return sqlFunction("pg_read_file", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginAdvance(this: Types.Text<1>, a1: Types.PgLsn<1>): Types.Void<1>
    pgReplicationOriginAdvance(this: Types.Text<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Void<0 | 1>
    pgReplicationOriginAdvance(this: Types.Text<number>, a1: Types.PgLsn<number>): Types.Void<0 | 1>
    pgReplicationOriginAdvance(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_advance", [{args: [Types.Text<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginCreate(this: Types.Text<1>): Types.Oid<1>
    pgReplicationOriginCreate(this: Types.Text<0 | 1>): Types.Oid<0 | 1>
    pgReplicationOriginCreate(this: Types.Text<number>): Types.Oid<0 | 1>
    pgReplicationOriginCreate(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_create", [{args: [Types.Text<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginDrop(this: Types.Text<1>): Types.Void<1>
    pgReplicationOriginDrop(this: Types.Text<0 | 1>): Types.Void<0 | 1>
    pgReplicationOriginDrop(this: Types.Text<number>): Types.Void<0 | 1>
    pgReplicationOriginDrop(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_drop", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginOid(this: Types.Text<1>): Types.Oid<1>
    pgReplicationOriginOid(this: Types.Text<0 | 1>): Types.Oid<0 | 1>
    pgReplicationOriginOid(this: Types.Text<number>): Types.Oid<0 | 1>
    pgReplicationOriginOid(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_oid", [{args: [Types.Text<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginProgress(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<1>
    pgReplicationOriginProgress(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgReplicationOriginProgress(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgReplicationOriginProgress(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_progress", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginSessionSetup(this: Types.Text<1>): Types.Void<1>
    pgReplicationOriginSessionSetup(this: Types.Text<0 | 1>): Types.Void<0 | 1>
    pgReplicationOriginSessionSetup(this: Types.Text<number>): Types.Void<0 | 1>
    pgReplicationOriginSessionSetup(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_session_setup", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSettingsGetFlags(this: Types.Text<1>): Types.Array<1, Types.Text<0 | 1>>
    pgSettingsGetFlags(this: Types.Text<0 | 1>): Types.Array<0 | 1, Types.Text<0 | 1>>
    pgSettingsGetFlags(this: Types.Text<number>): Types.Array<0 | 1, Types.Text<0 | 1>>
    pgSettingsGetFlags(...args: unknown[]) {
        return sqlFunction("pg_settings_get_flags", [{args: [Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSizeBytes(this: Types.Text<1>): Types.Int8<1>
    pgSizeBytes(this: Types.Text<0 | 1>): Types.Int8<0 | 1>
    pgSizeBytes(this: Types.Text<number>): Types.Int8<0 | 1>
    pgSizeBytes(...args: unknown[]) {
        return sqlFunction("pg_size_bytes", [{args: [Types.Text<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSplitWalfileName(this: Types.Text<1>): Types.Record<1, {segment_number: Types.Numeric<1>, timeline_id: Types.Int8<1>}>
    pgSplitWalfileName(this: Types.Text<0 | 1>): Types.Record<0 | 1, {segment_number: Types.Numeric<0 | 1>, timeline_id: Types.Int8<0 | 1>}>
    pgSplitWalfileName(this: Types.Text<number>): Types.Record<0 | 1, {segment_number: Types.Numeric<0 | 1>, timeline_id: Types.Int8<0 | 1>}>
    pgSplitWalfileName(...args: unknown[]) {
        return sqlFunction("pg_split_walfile_name", [{args: [Types.Text<0 | 1>], ret: Types.Record.of({segment_number: Types.Numeric<0 | 1>, timeline_id: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatFile(this: Types.Text<1>): Types.Record<1, {size: Types.Int8<1>, access: Types.Timestamptz<1>, modification: Types.Timestamptz<1>, change: Types.Timestamptz<1>, creation: Types.Timestamptz<1>, isdir: Types.Bool<1>}>
    pgStatFile(this: Types.Text<0 | 1>): Types.Record<0 | 1, {size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}>
    pgStatFile(this: Types.Text<number>): Types.Record<0 | 1, {size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}>
    pgStatFile(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<1, {size: Types.Int8<1>, access: Types.Timestamptz<1>, modification: Types.Timestamptz<1>, change: Types.Timestamptz<1>, creation: Types.Timestamptz<1>, isdir: Types.Bool<1>}>
    pgStatFile(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}>
    pgStatFile(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}>
    pgStatFile(...args: unknown[]) {
        return sqlFunction("pg_stat_file", [{args: [Types.Text<0 | 1>], ret: Types.Record.of({size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetProgressInfo(this: Types.Text<1>): Types.FromItem<{pid: Types.Int4<1>, datid: Types.Oid<1>, relid: Types.Oid<1>, param1: Types.Int8<1>, param2: Types.Int8<1>, param3: Types.Int8<1>, param4: Types.Int8<1>, param5: Types.Int8<1>, param6: Types.Int8<1>, param7: Types.Int8<1>, param8: Types.Int8<1>, param9: Types.Int8<1>, param10: Types.Int8<1>, param11: Types.Int8<1>, param12: Types.Int8<1>, param13: Types.Int8<1>, param14: Types.Int8<1>, param15: Types.Int8<1>, param16: Types.Int8<1>, param17: Types.Int8<1>, param18: Types.Int8<1>, param19: Types.Int8<1>, param20: Types.Int8<1>}>
    pgStatGetProgressInfo(this: Types.Text<0 | 1>): Types.FromItem<{pid: Types.Int4<0 | 1>, datid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, param1: Types.Int8<0 | 1>, param2: Types.Int8<0 | 1>, param3: Types.Int8<0 | 1>, param4: Types.Int8<0 | 1>, param5: Types.Int8<0 | 1>, param6: Types.Int8<0 | 1>, param7: Types.Int8<0 | 1>, param8: Types.Int8<0 | 1>, param9: Types.Int8<0 | 1>, param10: Types.Int8<0 | 1>, param11: Types.Int8<0 | 1>, param12: Types.Int8<0 | 1>, param13: Types.Int8<0 | 1>, param14: Types.Int8<0 | 1>, param15: Types.Int8<0 | 1>, param16: Types.Int8<0 | 1>, param17: Types.Int8<0 | 1>, param18: Types.Int8<0 | 1>, param19: Types.Int8<0 | 1>, param20: Types.Int8<0 | 1>}>
    pgStatGetProgressInfo(this: Types.Text<number>): Types.FromItem<{pid: Types.Int4<0 | 1>, datid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, param1: Types.Int8<0 | 1>, param2: Types.Int8<0 | 1>, param3: Types.Int8<0 | 1>, param4: Types.Int8<0 | 1>, param5: Types.Int8<0 | 1>, param6: Types.Int8<0 | 1>, param7: Types.Int8<0 | 1>, param8: Types.Int8<0 | 1>, param9: Types.Int8<0 | 1>, param10: Types.Int8<0 | 1>, param11: Types.Int8<0 | 1>, param12: Types.Int8<0 | 1>, param13: Types.Int8<0 | 1>, param14: Types.Int8<0 | 1>, param15: Types.Int8<0 | 1>, param16: Types.Int8<0 | 1>, param17: Types.Int8<0 | 1>, param18: Types.Int8<0 | 1>, param19: Types.Int8<0 | 1>, param20: Types.Int8<0 | 1>}>
    pgStatGetProgressInfo(...args: unknown[]) {
        return sqlFunction("pg_stat_get_progress_info", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({pid: Types.Int4<0 | 1>, datid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, param1: Types.Int8<0 | 1>, param2: Types.Int8<0 | 1>, param3: Types.Int8<0 | 1>, param4: Types.Int8<0 | 1>, param5: Types.Int8<0 | 1>, param6: Types.Int8<0 | 1>, param7: Types.Int8<0 | 1>, param8: Types.Int8<0 | 1>, param9: Types.Int8<0 | 1>, param10: Types.Int8<0 | 1>, param11: Types.Int8<0 | 1>, param12: Types.Int8<0 | 1>, param13: Types.Int8<0 | 1>, param14: Types.Int8<0 | 1>, param15: Types.Int8<0 | 1>, param16: Types.Int8<0 | 1>, param17: Types.Int8<0 | 1>, param18: Types.Int8<0 | 1>, param19: Types.Int8<0 | 1>, param20: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetReplicationSlot(this: Types.Text<1>): Types.Record<1, {slot_name: Types.Text<1>, spill_txns: Types.Int8<1>, spill_count: Types.Int8<1>, spill_bytes: Types.Int8<1>, stream_txns: Types.Int8<1>, stream_count: Types.Int8<1>, stream_bytes: Types.Int8<1>, total_txns: Types.Int8<1>, total_bytes: Types.Int8<1>, stats_reset: Types.Timestamptz<1>}>
    pgStatGetReplicationSlot(this: Types.Text<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Text<0 | 1>, spill_txns: Types.Int8<0 | 1>, spill_count: Types.Int8<0 | 1>, spill_bytes: Types.Int8<0 | 1>, stream_txns: Types.Int8<0 | 1>, stream_count: Types.Int8<0 | 1>, stream_bytes: Types.Int8<0 | 1>, total_txns: Types.Int8<0 | 1>, total_bytes: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
    pgStatGetReplicationSlot(this: Types.Text<number>): Types.Record<0 | 1, {slot_name: Types.Text<0 | 1>, spill_txns: Types.Int8<0 | 1>, spill_count: Types.Int8<0 | 1>, spill_bytes: Types.Int8<0 | 1>, stream_txns: Types.Int8<0 | 1>, stream_count: Types.Int8<0 | 1>, stream_bytes: Types.Int8<0 | 1>, total_txns: Types.Int8<0 | 1>, total_bytes: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
    pgStatGetReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_stat_get_replication_slot", [{args: [Types.Text<0 | 1>], ret: Types.Record.of({slot_name: Types.Text<0 | 1>, spill_txns: Types.Int8<0 | 1>, spill_count: Types.Int8<0 | 1>, spill_bytes: Types.Int8<0 | 1>, stream_txns: Types.Int8<0 | 1>, stream_count: Types.Int8<0 | 1>, stream_bytes: Types.Int8<0 | 1>, total_txns: Types.Int8<0 | 1>, total_bytes: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatHaveStats(this: Types.Text<1>, a1: Types.Oid<1>, a2: Types.Oid<1>): Types.Bool<1>
    pgStatHaveStats(this: Types.Text<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgStatHaveStats(this: Types.Text<number>, a1: Types.Oid<number>, a2: Types.Oid<number>): Types.Bool<0 | 1>
    pgStatHaveStats(...args: unknown[]) {
        return sqlFunction("pg_stat_have_stats", [{args: [Types.Text<0 | 1>, Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatResetReplicationSlot(this: Types.Text<1>): Types.Void<1>
    pgStatResetReplicationSlot(this: Types.Text<0 | 1>): Types.Void<0 | 1>
    pgStatResetReplicationSlot(this: Types.Text<number>): Types.Void<0 | 1>
    pgStatResetReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_stat_reset_replication_slot", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatResetShared(this: Types.Text<1>): Types.Void<1>
    pgStatResetShared(this: Types.Text<0 | 1>): Types.Void<0 | 1>
    pgStatResetShared(this: Types.Text<number>): Types.Void<0 | 1>
    pgStatResetShared(...args: unknown[]) {
        return sqlFunction("pg_stat_reset_shared", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatResetSlru(this: Types.Text<1>): Types.Void<1>
    pgStatResetSlru(this: Types.Text<0 | 1>): Types.Void<0 | 1>
    pgStatResetSlru(this: Types.Text<number>): Types.Void<0 | 1>
    pgStatResetSlru(...args: unknown[]) {
        return sqlFunction("pg_stat_reset_slru", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    phrasetoTsquery(this: Types.Text<1>): Types.Tsquery<1>
    phrasetoTsquery(this: Types.Text<0 | 1>): Types.Tsquery<0 | 1>
    phrasetoTsquery(this: Types.Text<number>): Types.Tsquery<0 | 1>
    phrasetoTsquery(...args: unknown[]) {
        return sqlFunction("phraseto_tsquery", [{args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plaintoTsquery(this: Types.Text<1>): Types.Tsquery<1>
    plaintoTsquery(this: Types.Text<0 | 1>): Types.Tsquery<0 | 1>
    plaintoTsquery(this: Types.Text<number>): Types.Tsquery<0 | 1>
    plaintoTsquery(...args: unknown[]) {
        return sqlFunction("plainto_tsquery", [{args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    position(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    position(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    position(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    position(...args: unknown[]) {
        return sqlFunction("position", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    queryToXml(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    queryToXml(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    queryToXml(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    queryToXml(...args: unknown[]) {
        return sqlFunction("query_to_xml", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    queryToXmlAndXmlschema(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    queryToXmlAndXmlschema(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    queryToXmlAndXmlschema(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    queryToXmlAndXmlschema(...args: unknown[]) {
        return sqlFunction("query_to_xml_and_xmlschema", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    queryToXmlschema(this: Types.Text<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    queryToXmlschema(this: Types.Text<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    queryToXmlschema(this: Types.Text<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    queryToXmlschema(...args: unknown[]) {
        return sqlFunction("query_to_xmlschema", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    quoteIdent(this: Types.Text<1>): Types.Text<1>
    quoteIdent(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    quoteIdent(this: Types.Text<number>): Types.Text<0 | 1>
    quoteIdent(...args: unknown[]) {
        return sqlFunction("quote_ident", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    quoteLiteral(this: Types.Text<1>): Types.Text<1>
    quoteLiteral(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    quoteLiteral(this: Types.Text<number>): Types.Text<0 | 1>
    quoteLiteral(...args: unknown[]) {
        return sqlFunction("quote_literal", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    quoteNullable(this: Types.Text<1>): Types.Text<1>
    quoteNullable(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    quoteNullable(this: Types.Text<number>): Types.Text<0 | 1>
    quoteNullable(...args: unknown[]) {
        return sqlFunction("quote_nullable", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regclass(this: Types.Text<1>): Types.Regclass<1>
    regclass(this: Types.Text<0 | 1>): Types.Regclass<0 | 1>
    regclass(this: Types.Text<number>): Types.Regclass<0 | 1>
    regclass(...args: unknown[]) {
        return sqlFunction("regclass", [{args: [Types.Text<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpCount(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    regexpCount(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpCount(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpCount(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    regexpCount(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpCount(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpCount(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    regexpCount(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpCount(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpCount(...args: unknown[]) {
        return sqlFunction("regexp_count", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpInstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    regexpInstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    regexpInstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    regexpInstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    regexpInstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    regexpInstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a6: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    regexpInstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a6: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a6: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    regexpInstr(...args: unknown[]) {
        return sqlFunction("regexp_instr", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpLike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    regexpLike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    regexpLike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    regexpLike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    regexpLike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    regexpLike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    regexpLike(...args: unknown[]) {
        return sqlFunction("regexp_like", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpMatch(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    regexpMatch(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpMatch(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpMatch(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    regexpMatch(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpMatch(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpMatch(...args: unknown[]) {
        return sqlFunction("regexp_match", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpMatches(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpMatches(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpMatches(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpMatches(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpMatches(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpMatches(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpMatches(...args: unknown[]) {
        return sqlFunction("regexp_matches", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpReplace(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    regexpReplace(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    regexpReplace(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    regexpReplace(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    regexpReplace(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    regexpReplace(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpReplace(...args: unknown[]) {
        return sqlFunction("regexp_replace", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpSplitToArray(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    regexpSplitToArray(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpSplitToArray(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpSplitToArray(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    regexpSplitToArray(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpSplitToArray(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    regexpSplitToArray(...args: unknown[]) {
        return sqlFunction("regexp_split_to_array", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpSplitToTable(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpSplitToTable(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpSplitToTable(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpSplitToTable(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpSplitToTable(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpSplitToTable(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    regexpSplitToTable(...args: unknown[]) {
        return sqlFunction("regexp_split_to_table", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regexpSubstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    regexpSubstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    regexpSubstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    regexpSubstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    regexpSubstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a5: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    regexpSubstr(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a5: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a5: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    regexpSubstr(...args: unknown[]) {
        return sqlFunction("regexp_substr", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    repeat(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    repeat(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    repeat(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    repeat(...args: unknown[]) {
        return sqlFunction("repeat", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    replace(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    replace(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    replace(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    replace(...args: unknown[]) {
        return sqlFunction("replace", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    reverse(this: Types.Text<1>): Types.Text<1>
    reverse(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    reverse(this: Types.Text<number>): Types.Text<0 | 1>
    reverse(...args: unknown[]) {
        return sqlFunction("reverse", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    right(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    right(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    right(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    right(...args: unknown[]) {
        return sqlFunction("right", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    rowSecurityActive(this: Types.Text<1>): Types.Bool<1>
    rowSecurityActive(this: Types.Text<0 | 1>): Types.Bool<0 | 1>
    rowSecurityActive(this: Types.Text<number>): Types.Bool<0 | 1>
    rowSecurityActive(...args: unknown[]) {
        return sqlFunction("row_security_active", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rpad(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    rpad(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    rpad(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    rpad(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    rpad(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    rpad(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    rpad(...args: unknown[]) {
        return sqlFunction("rpad", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rtrim(this: Types.Text<1>): Types.Text<1>
    rtrim(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    rtrim(this: Types.Text<number>): Types.Text<0 | 1>
    rtrim(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    rtrim(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    rtrim(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    rtrim(...args: unknown[]) {
        return sqlFunction("rtrim", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setConfig(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    setConfig(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    setConfig(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    setConfig(...args: unknown[]) {
        return sqlFunction("set_config", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    similarEscape(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    similarEscape(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    similarEscape(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    similarEscape(...args: unknown[]) {
        return sqlFunction("similar_escape", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    similarToEscape(this: Types.Text<1>): Types.Text<1>
    similarToEscape(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    similarToEscape(this: Types.Text<number>): Types.Text<0 | 1>
    similarToEscape(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    similarToEscape(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    similarToEscape(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    similarToEscape(...args: unknown[]) {
        return sqlFunction("similar_to_escape", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    splitPart(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    splitPart(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    splitPart(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    splitPart(...args: unknown[]) {
        return sqlFunction("split_part", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    startsWith(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    startsWith(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    startsWith(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    startsWith(...args: unknown[]) {
        return sqlFunction("starts_with", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stringAgg(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    stringAgg(...args: unknown[]) {
        return sqlFunction("string_agg", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stringToArray(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    stringToArray(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    stringToArray(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    stringToArray(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Array<1, Types.Text<0 | 1>>
    stringToArray(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    stringToArray(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
    stringToArray(...args: unknown[]) {
        return sqlFunction("string_to_array", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stringToTable(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    stringToTable(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    stringToTable(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    stringToTable(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    stringToTable(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    stringToTable(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    stringToTable(...args: unknown[]) {
        return sqlFunction("string_to_table", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    strpos(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    strpos(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    strpos(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    strpos(...args: unknown[]) {
        return sqlFunction("strpos", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    substr(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    substr(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substr(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substr(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    substr(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substr(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substr(...args: unknown[]) {
        return sqlFunction("substr", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    substring(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    substring(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    substring(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    substring(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    substring(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    substring(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    substring(...args: unknown[]) {
        return sqlFunction("substring", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    textGe(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textGe(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textGe(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textGe(...args: unknown[]) {
        return sqlFunction("text_ge", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textGt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textGt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textGt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textGt(...args: unknown[]) {
        return sqlFunction("text_gt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textLarger(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    textLarger(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    textLarger(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    textLarger(...args: unknown[]) {
        return sqlFunction("text_larger", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textLe(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textLe(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textLe(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textLe(...args: unknown[]) {
        return sqlFunction("text_le", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textLt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textLt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textLt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textLt(...args: unknown[]) {
        return sqlFunction("text_lt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textPatternGe(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textPatternGe(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternGe(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternGe(...args: unknown[]) {
        return sqlFunction("text_pattern_ge", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textPatternGt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textPatternGt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternGt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternGt(...args: unknown[]) {
        return sqlFunction("text_pattern_gt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textPatternLe(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textPatternLe(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternLe(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternLe(...args: unknown[]) {
        return sqlFunction("text_pattern_le", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textPatternLt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textPatternLt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternLt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textPatternLt(...args: unknown[]) {
        return sqlFunction("text_pattern_lt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textSmaller(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    textSmaller(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    textSmaller(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    textSmaller(...args: unknown[]) {
        return sqlFunction("text_smaller", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textanycat<T extends Types.Any>(this: Types.Text<1>, a1: T | Types.Input<T>): Types.Text<1>
    textanycat<T extends Types.Any>(this: Types.Text<0 | 1>, a1: T | Types.Input<T>): Types.Text<0 | 1>
    textanycat<T extends Types.Any>(this: Types.Text<number>, a1: T | Types.Input<T>): Types.Text<0 | 1>
    textanycat(...args: unknown[]) {
        return sqlFunction("textanycat", [({T}) => ({args: [Types.Text<0 | 1>, T], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    textcat(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    textcat(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    textcat(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    textcat(...args: unknown[]) {
        return sqlFunction("textcat", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    texteq(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    texteq(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texteq(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texteq(...args: unknown[]) {
        return sqlFunction("texteq", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    texteqname(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    texteqname(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    texteqname(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    texteqname(...args: unknown[]) {
        return sqlFunction("texteqname", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textgename(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    textgename(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    textgename(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    textgename(...args: unknown[]) {
        return sqlFunction("textgename", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textgtname(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    textgtname(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    textgtname(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    textgtname(...args: unknown[]) {
        return sqlFunction("textgtname", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    texticlike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    texticlike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticlike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticlike(...args: unknown[]) {
        return sqlFunction("texticlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    texticnlike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    texticnlike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticnlike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticnlike(...args: unknown[]) {
        return sqlFunction("texticnlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    texticregexeq(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    texticregexeq(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticregexeq(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticregexeq(...args: unknown[]) {
        return sqlFunction("texticregexeq", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    texticregexne(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    texticregexne(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticregexne(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    texticregexne(...args: unknown[]) {
        return sqlFunction("texticregexne", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textlen(this: Types.Text<1>): Types.Int4<1>
    textlen(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    textlen(this: Types.Text<number>): Types.Int4<0 | 1>
    textlen(...args: unknown[]) {
        return sqlFunction("textlen", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textlename(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    textlename(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    textlename(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    textlename(...args: unknown[]) {
        return sqlFunction("textlename", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textlike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textlike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textlike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textlike(...args: unknown[]) {
        return sqlFunction("textlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textltname(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    textltname(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    textltname(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    textltname(...args: unknown[]) {
        return sqlFunction("textltname", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textne(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textne(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textne(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textne(...args: unknown[]) {
        return sqlFunction("textne", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textnename(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    textnename(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    textnename(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    textnename(...args: unknown[]) {
        return sqlFunction("textnename", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textnlike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textnlike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textnlike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textnlike(...args: unknown[]) {
        return sqlFunction("textnlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textregexeq(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textregexeq(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textregexeq(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textregexeq(...args: unknown[]) {
        return sqlFunction("textregexeq", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    textregexne(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    textregexne(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textregexne(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    textregexne(...args: unknown[]) {
        return sqlFunction("textregexne", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timezone(this: Types.Text<1>, a1: Types.Timestamptz<1>): Types.Timestamp<1>
    timezone(this: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
    timezone(this: Types.Text<number>, a1: Types.Timestamptz<number>): Types.Timestamp<0 | 1>
    timezone(this: Types.Text<1>, a1: Types.Timestamp<1>): Types.Timestamptz<1>
    timezone(this: Types.Text<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
    timezone(this: Types.Text<number>, a1: Types.Timestamp<number>): Types.Timestamptz<0 | 1>
    timezone(this: Types.Text<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    timezone(this: Types.Text<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    timezone(this: Types.Text<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    timezone(...args: unknown[]) {
        return sqlFunction("timezone", [{args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toAscii(this: Types.Text<1>): Types.Text<1>
    toAscii(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    toAscii(this: Types.Text<number>): Types.Text<0 | 1>
    toAscii(this: Types.Text<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    toAscii(this: Types.Text<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    toAscii(this: Types.Text<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    toAscii(this: Types.Text<1>, a1: Types.Name<1>): Types.Text<1>
    toAscii(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
    toAscii(this: Types.Text<number>, a1: Types.Name<number>): Types.Text<0 | 1>
    toAscii(...args: unknown[]) {
        return sqlFunction("to_ascii", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toDate(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Date<1>
    toDate(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Date<0 | 1>
    toDate(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Date<0 | 1>
    toDate(...args: unknown[]) {
        return sqlFunction("to_date", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toNumber(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Numeric<1>
    toNumber(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Numeric<0 | 1>
    toNumber(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Numeric<0 | 1>
    toNumber(...args: unknown[]) {
        return sqlFunction("to_number", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegclass(this: Types.Text<1>): Types.Regclass<1>
    toRegclass(this: Types.Text<0 | 1>): Types.Regclass<0 | 1>
    toRegclass(this: Types.Text<number>): Types.Regclass<0 | 1>
    toRegclass(...args: unknown[]) {
        return sqlFunction("to_regclass", [{args: [Types.Text<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegcollation(this: Types.Text<1>): Types.Regcollation<1>
    toRegcollation(this: Types.Text<0 | 1>): Types.Regcollation<0 | 1>
    toRegcollation(this: Types.Text<number>): Types.Regcollation<0 | 1>
    toRegcollation(...args: unknown[]) {
        return sqlFunction("to_regcollation", [{args: [Types.Text<0 | 1>], ret: Types.Regcollation<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegnamespace(this: Types.Text<1>): Types.Regnamespace<1>
    toRegnamespace(this: Types.Text<0 | 1>): Types.Regnamespace<0 | 1>
    toRegnamespace(this: Types.Text<number>): Types.Regnamespace<0 | 1>
    toRegnamespace(...args: unknown[]) {
        return sqlFunction("to_regnamespace", [{args: [Types.Text<0 | 1>], ret: Types.Regnamespace<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegoper(this: Types.Text<1>): Types.Regoper<1>
    toRegoper(this: Types.Text<0 | 1>): Types.Regoper<0 | 1>
    toRegoper(this: Types.Text<number>): Types.Regoper<0 | 1>
    toRegoper(...args: unknown[]) {
        return sqlFunction("to_regoper", [{args: [Types.Text<0 | 1>], ret: Types.Regoper<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegoperator(this: Types.Text<1>): Types.Regoperator<1>
    toRegoperator(this: Types.Text<0 | 1>): Types.Regoperator<0 | 1>
    toRegoperator(this: Types.Text<number>): Types.Regoperator<0 | 1>
    toRegoperator(...args: unknown[]) {
        return sqlFunction("to_regoperator", [{args: [Types.Text<0 | 1>], ret: Types.Regoperator<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegproc(this: Types.Text<1>): Types.Regproc<1>
    toRegproc(this: Types.Text<0 | 1>): Types.Regproc<0 | 1>
    toRegproc(this: Types.Text<number>): Types.Regproc<0 | 1>
    toRegproc(...args: unknown[]) {
        return sqlFunction("to_regproc", [{args: [Types.Text<0 | 1>], ret: Types.Regproc<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegprocedure(this: Types.Text<1>): Types.Regprocedure<1>
    toRegprocedure(this: Types.Text<0 | 1>): Types.Regprocedure<0 | 1>
    toRegprocedure(this: Types.Text<number>): Types.Regprocedure<0 | 1>
    toRegprocedure(...args: unknown[]) {
        return sqlFunction("to_regprocedure", [{args: [Types.Text<0 | 1>], ret: Types.Regprocedure<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegrole(this: Types.Text<1>): Types.Regrole<1>
    toRegrole(this: Types.Text<0 | 1>): Types.Regrole<0 | 1>
    toRegrole(this: Types.Text<number>): Types.Regrole<0 | 1>
    toRegrole(...args: unknown[]) {
        return sqlFunction("to_regrole", [{args: [Types.Text<0 | 1>], ret: Types.Regrole<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegtype(this: Types.Text<1>): Types.Regtype<1>
    toRegtype(this: Types.Text<0 | 1>): Types.Regtype<0 | 1>
    toRegtype(this: Types.Text<number>): Types.Regtype<0 | 1>
    toRegtype(...args: unknown[]) {
        return sqlFunction("to_regtype", [{args: [Types.Text<0 | 1>], ret: Types.Regtype<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toRegtypemod(this: Types.Text<1>): Types.Int4<1>
    toRegtypemod(this: Types.Text<0 | 1>): Types.Int4<0 | 1>
    toRegtypemod(this: Types.Text<number>): Types.Int4<0 | 1>
    toRegtypemod(...args: unknown[]) {
        return sqlFunction("to_regtypemod", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTimestamp(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<1>
    toTimestamp(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    toTimestamp(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    toTimestamp(...args: unknown[]) {
        return sqlFunction("to_timestamp", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTsquery(this: Types.Text<1>): Types.Tsquery<1>
    toTsquery(this: Types.Text<0 | 1>): Types.Tsquery<0 | 1>
    toTsquery(this: Types.Text<number>): Types.Tsquery<0 | 1>
    toTsquery(...args: unknown[]) {
        return sqlFunction("to_tsquery", [{args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTsvector(this: Types.Text<1>): Types.Tsvector<1>
    toTsvector(this: Types.Text<0 | 1>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Text<number>): Types.Tsvector<0 | 1>
    toTsvector(...args: unknown[]) {
        return sqlFunction("to_tsvector", [{args: [Types.Text<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    translate(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    translate(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    translate(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    translate(...args: unknown[]) {
        return sqlFunction("translate", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsDebug(this: Types.Text<1>): Types.FromItem<{alias: Types.Text<1>, description: Types.Text<1>, token: Types.Text<1>, dictionaries: Types.Array<1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<1>, lexemes: Types.Array<1, Types.Text<0 | 1>>}>
    tsDebug(this: Types.Text<0 | 1>): Types.FromItem<{alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array<0 | 1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    tsDebug(this: Types.Text<number>): Types.FromItem<{alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array<0 | 1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    tsDebug(...args: unknown[]) {
        return sqlFunction("ts_debug", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array.of(Types.Regdictionary<0 | 1>), dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsHeadline(this: Types.Text<1>, a1: Types.Tsquery<1>): Types.Text<1>
    tsHeadline(this: Types.Text<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Text<0 | 1>
    tsHeadline(this: Types.Text<number>, a1: Types.Tsquery<number>): Types.Text<0 | 1>
    tsHeadline(this: Types.Text<1>, a1: Types.Tsquery<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    tsHeadline(this: Types.Text<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    tsHeadline(this: Types.Text<number>, a1: Types.Tsquery<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    tsHeadline(...args: unknown[]) {
        return sqlFunction("ts_headline", [{args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsMatchTq(this: Types.Text<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsMatchTq(this: Types.Text<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsMatchTq(this: Types.Text<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsMatchTq(...args: unknown[]) {
        return sqlFunction("ts_match_tq", [{args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsMatchTt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    tsMatchTt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    tsMatchTt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    tsMatchTt(...args: unknown[]) {
        return sqlFunction("ts_match_tt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsParse(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<1>, token: Types.Text<1>}>
    tsParse(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}>
    tsParse(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}>
    tsParse(...args: unknown[]) {
        return sqlFunction("ts_parse", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsStat(this: Types.Text<1>): Types.FromItem<{word: Types.Text<1>, ndoc: Types.Int4<1>, nentry: Types.Int4<1>}>
    tsStat(this: Types.Text<0 | 1>): Types.FromItem<{word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}>
    tsStat(this: Types.Text<number>): Types.FromItem<{word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}>
    tsStat(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{word: Types.Text<1>, ndoc: Types.Int4<1>, nentry: Types.Int4<1>}>
    tsStat(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}>
    tsStat(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}>
    tsStat(...args: unknown[]) {
        return sqlFunction("ts_stat", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsTokenType(this: Types.Text<1>): Types.FromItem<{tokid: Types.Int4<1>, alias: Types.Text<1>, description: Types.Text<1>}>
    tsTokenType(this: Types.Text<0 | 1>): Types.FromItem<{tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
    tsTokenType(this: Types.Text<number>): Types.FromItem<{tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
    tsTokenType(...args: unknown[]) {
        return sqlFunction("ts_token_type", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    unicodeAssigned(this: Types.Text<1>): Types.Bool<1>
    unicodeAssigned(this: Types.Text<0 | 1>): Types.Bool<0 | 1>
    unicodeAssigned(this: Types.Text<number>): Types.Bool<0 | 1>
    unicodeAssigned(...args: unknown[]) {
        return sqlFunction("unicode_assigned", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    unistr(this: Types.Text<1>): Types.Text<1>
    unistr(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    unistr(this: Types.Text<number>): Types.Text<0 | 1>
    unistr(...args: unknown[]) {
        return sqlFunction("unistr", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    upper(this: Types.Text<1>): Types.Text<1>
    upper(this: Types.Text<0 | 1>): Types.Text<0 | 1>
    upper(this: Types.Text<number>): Types.Text<0 | 1>
    upper(...args: unknown[]) {
        return sqlFunction("upper", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    websearchToTsquery(this: Types.Text<1>): Types.Tsquery<1>
    websearchToTsquery(this: Types.Text<0 | 1>): Types.Tsquery<0 | 1>
    websearchToTsquery(this: Types.Text<number>): Types.Tsquery<0 | 1>
    websearchToTsquery(...args: unknown[]) {
        return sqlFunction("websearch_to_tsquery", [{args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xml(this: Types.Text<1>): Types.Xml<1>
    xml(this: Types.Text<0 | 1>): Types.Xml<0 | 1>
    xml(this: Types.Text<number>): Types.Xml<0 | 1>
    xml(...args: unknown[]) {
        return sqlFunction("xml", [{args: [Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    xmlIsWellFormed(this: Types.Text<1>): Types.Bool<1>
    xmlIsWellFormed(this: Types.Text<0 | 1>): Types.Bool<0 | 1>
    xmlIsWellFormed(this: Types.Text<number>): Types.Bool<0 | 1>
    xmlIsWellFormed(...args: unknown[]) {
        return sqlFunction("xml_is_well_formed", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xmlIsWellFormedContent(this: Types.Text<1>): Types.Bool<1>
    xmlIsWellFormedContent(this: Types.Text<0 | 1>): Types.Bool<0 | 1>
    xmlIsWellFormedContent(this: Types.Text<number>): Types.Bool<0 | 1>
    xmlIsWellFormedContent(...args: unknown[]) {
        return sqlFunction("xml_is_well_formed_content", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xmlIsWellFormedDocument(this: Types.Text<1>): Types.Bool<1>
    xmlIsWellFormedDocument(this: Types.Text<0 | 1>): Types.Bool<0 | 1>
    xmlIsWellFormedDocument(this: Types.Text<number>): Types.Bool<0 | 1>
    xmlIsWellFormedDocument(...args: unknown[]) {
        return sqlFunction("xml_is_well_formed_document", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xmlcomment(this: Types.Text<1>): Types.Xml<1>
    xmlcomment(this: Types.Text<0 | 1>): Types.Xml<0 | 1>
    xmlcomment(this: Types.Text<number>): Types.Xml<0 | 1>
    xmlcomment(...args: unknown[]) {
        return sqlFunction("xmlcomment", [{args: [Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xmlexists(this: Types.Text<1>, a1: Types.Xml<1>): Types.Bool<1>
    xmlexists(this: Types.Text<0 | 1>, a1: Types.Xml<0 | 1>): Types.Bool<0 | 1>
    xmlexists(this: Types.Text<number>, a1: Types.Xml<number>): Types.Bool<0 | 1>
    xmlexists(...args: unknown[]) {
        return sqlFunction("xmlexists", [{args: [Types.Text<0 | 1>, Types.Xml<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    xmltext(this: Types.Text<1>): Types.Xml<1>
    xmltext(this: Types.Text<0 | 1>): Types.Xml<0 | 1>
    xmltext(this: Types.Text<number>): Types.Xml<0 | 1>
    xmltext(...args: unknown[]) {
        return sqlFunction("xmltext", [{args: [Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xpath(this: Types.Text<1>, a1: Types.Xml<1>): Types.Array<1, Types.Xml<0 | 1>>
    xpath(this: Types.Text<0 | 1>, a1: Types.Xml<0 | 1>): Types.Array<0 | 1, Types.Xml<0 | 1>>
    xpath(this: Types.Text<number>, a1: Types.Xml<number>): Types.Array<0 | 1, Types.Xml<0 | 1>>
    xpath(this: Types.Text<1>, a1: Types.Xml<1>, a2: Types.Array<1, Types.Text<0 | 1>>): Types.Array<1, Types.Xml<0 | 1>>
    xpath(this: Types.Text<0 | 1>, a1: Types.Xml<0 | 1>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Xml<0 | 1>>
    xpath(this: Types.Text<number>, a1: Types.Xml<number>, a2: Types.Array<number, Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Xml<0 | 1>>
    xpath(...args: unknown[]) {
        return sqlFunction("xpath", [{args: [Types.Text<0 | 1>, Types.Xml<0 | 1>], ret: Types.Array.of(Types.Xml<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Xml<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Array.of(Types.Xml<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xpathExists(this: Types.Text<1>, a1: Types.Xml<1>): Types.Bool<1>
    xpathExists(this: Types.Text<0 | 1>, a1: Types.Xml<0 | 1>): Types.Bool<0 | 1>
    xpathExists(this: Types.Text<number>, a1: Types.Xml<number>): Types.Bool<0 | 1>
    xpathExists(this: Types.Text<1>, a1: Types.Xml<1>, a2: Types.Array<1, Types.Text<0 | 1>>): Types.Bool<1>
    xpathExists(this: Types.Text<0 | 1>, a1: Types.Xml<0 | 1>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    xpathExists(this: Types.Text<number>, a1: Types.Xml<number>, a2: Types.Array<number, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    xpathExists(...args: unknown[]) {
        return sqlFunction("xpath_exists", [{args: [Types.Text<0 | 1>, Types.Xml<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Xml<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["^@"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["^@"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["^@"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["^@"](...args: unknown[]) {
        return sqlFunction("^@", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    [">="](this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    gte(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    gte(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    [">"](this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    gt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    gt(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    ["<="](this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    lte(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    lte(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    ["<"](this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    lt(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    lt(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~>=~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~>=~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~>=~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~>=~"](...args: unknown[]) {
        return sqlFunction("~>=~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~>~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~>~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~>~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~>~"](...args: unknown[]) {
        return sqlFunction("~>~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~<=~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~<=~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~<=~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~<=~"](...args: unknown[]) {
        return sqlFunction("~<=~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~<~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~<~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~<~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~<~"](...args: unknown[]) {
        return sqlFunction("~<~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    ["="](this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    eq(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    eq(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~*"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~~*"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~*"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~*"](...args: unknown[]) {
        return sqlFunction("~~*", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ilike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ilike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ilike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ilike(...args: unknown[]) {
        return sqlFunction("~~*", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~*"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~~*"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~*"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~*"](...args: unknown[]) {
        return sqlFunction("!~~*", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    notilike(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    notilike(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notilike(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notilike(...args: unknown[]) {
        return sqlFunction("!~~*", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~*"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~*"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~*"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~*"](...args: unknown[]) {
        return sqlFunction("~*", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~*"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~*"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~*"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~*"](...args: unknown[]) {
        return sqlFunction("!~*", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~"](...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    ["<>"](this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ne(this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Text<1>, a1: Types.Name<1>): Types.Bool<1>
    ne(this: Types.Text<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Text<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~"](...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~"](...args: unknown[]) {
        return sqlFunction("~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~"](...args: unknown[]) {
        return sqlFunction("!~", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@@"](this: Types.Text<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["@@"](this: Types.Text<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["@@"](this: Types.Text<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["@@"](this: Types.Text<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["@@"](this: Types.Text<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["@@"](this: Types.Text<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["@@"](...args: unknown[]) {
        return sqlFunction("@@", [{args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
