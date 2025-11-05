import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Date<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Date<1>;
    static new(v: null): Date<0>;
    static new(v: Expression): Date<0 | 1>;
    static new(v: SerializeParam | null | Expression): Date<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "date" } 
    asAggregate(): Types.Date<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Date<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Date<1> | undefined {
          return undefined;
        }
       
    dateCmp(this: Types.Date<1>, a1: Types.Date<1>): Types.Int4<1>
    dateCmp(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
    dateCmp(this: Types.Date<number>, a1: Types.Date<number>): Types.Int4<0 | 1>
    dateCmp(...args: unknown[]) {
        return sqlFunction("date_cmp", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateCmpTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Int4<1>
    dateCmpTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
    dateCmpTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Int4<0 | 1>
    dateCmpTimestamp(...args: unknown[]) {
        return sqlFunction("date_cmp_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateCmpTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Int4<1>
    dateCmpTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Int4<0 | 1>
    dateCmpTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Int4<0 | 1>
    dateCmpTimestamptz(...args: unknown[]) {
        return sqlFunction("date_cmp_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateEq(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    dateEq(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    dateEq(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    dateEq(...args: unknown[]) {
        return sqlFunction("date_eq", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateEqTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    dateEqTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    dateEqTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    dateEqTimestamp(...args: unknown[]) {
        return sqlFunction("date_eq_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateEqTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    dateEqTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    dateEqTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    dateEqTimestamptz(...args: unknown[]) {
        return sqlFunction("date_eq_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateGe(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    dateGe(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    dateGe(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    dateGe(...args: unknown[]) {
        return sqlFunction("date_ge", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateGeTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    dateGeTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    dateGeTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    dateGeTimestamp(...args: unknown[]) {
        return sqlFunction("date_ge_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateGeTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    dateGeTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    dateGeTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    dateGeTimestamptz(...args: unknown[]) {
        return sqlFunction("date_ge_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateGt(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    dateGt(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    dateGt(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    dateGt(...args: unknown[]) {
        return sqlFunction("date_gt", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateGtTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    dateGtTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    dateGtTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    dateGtTimestamp(...args: unknown[]) {
        return sqlFunction("date_gt_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateGtTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    dateGtTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    dateGtTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    dateGtTimestamptz(...args: unknown[]) {
        return sqlFunction("date_gt_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLarger(this: Types.Date<1>, a1: Types.Date<1>): Types.Date<1>
    dateLarger(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
    dateLarger(this: Types.Date<number>, a1: Types.Date<number>): Types.Date<0 | 1>
    dateLarger(...args: unknown[]) {
        return sqlFunction("date_larger", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLe(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    dateLe(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    dateLe(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    dateLe(...args: unknown[]) {
        return sqlFunction("date_le", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLeTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    dateLeTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    dateLeTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    dateLeTimestamp(...args: unknown[]) {
        return sqlFunction("date_le_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLeTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    dateLeTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    dateLeTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    dateLeTimestamptz(...args: unknown[]) {
        return sqlFunction("date_le_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLt(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    dateLt(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    dateLt(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    dateLt(...args: unknown[]) {
        return sqlFunction("date_lt", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLtTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    dateLtTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    dateLtTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    dateLtTimestamp(...args: unknown[]) {
        return sqlFunction("date_lt_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateLtTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    dateLtTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    dateLtTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    dateLtTimestamptz(...args: unknown[]) {
        return sqlFunction("date_lt_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateMi(this: Types.Date<1>, a1: Types.Date<1>): Types.Int4<1>
    dateMi(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
    dateMi(this: Types.Date<number>, a1: Types.Date<number>): Types.Int4<0 | 1>
    dateMi(...args: unknown[]) {
        return sqlFunction("date_mi", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateMiInterval(this: Types.Date<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    dateMiInterval(this: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    dateMiInterval(this: Types.Date<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    dateMiInterval(...args: unknown[]) {
        return sqlFunction("date_mi_interval", [{args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateMii(this: Types.Date<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<1>
    dateMii(this: Types.Date<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
    dateMii(this: Types.Date<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
    dateMii(...args: unknown[]) {
        return sqlFunction("date_mii", [{args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateNe(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    dateNe(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    dateNe(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    dateNe(...args: unknown[]) {
        return sqlFunction("date_ne", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateNeTimestamp(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    dateNeTimestamp(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    dateNeTimestamp(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    dateNeTimestamp(...args: unknown[]) {
        return sqlFunction("date_ne_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateNeTimestamptz(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    dateNeTimestamptz(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    dateNeTimestamptz(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    dateNeTimestamptz(...args: unknown[]) {
        return sqlFunction("date_ne_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    datePlInterval(this: Types.Date<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    datePlInterval(this: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    datePlInterval(this: Types.Date<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    datePlInterval(...args: unknown[]) {
        return sqlFunction("date_pl_interval", [{args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    datePli(this: Types.Date<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<1>
    datePli(this: Types.Date<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
    datePli(this: Types.Date<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
    datePli(...args: unknown[]) {
        return sqlFunction("date_pli", [{args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateSmaller(this: Types.Date<1>, a1: Types.Date<1>): Types.Date<1>
    dateSmaller(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
    dateSmaller(this: Types.Date<number>, a1: Types.Date<number>): Types.Date<0 | 1>
    dateSmaller(...args: unknown[]) {
        return sqlFunction("date_smaller", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    daterange(this: Types.Date<1>, a1: Types.Date<1>): Types.Daterange<1>
    daterange(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Daterange<0 | 1>
    daterange(this: Types.Date<number>, a1: Types.Date<number>): Types.Daterange<0 | 1>
    daterange(this: Types.Date<1>, a1: Types.Date<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Daterange<1>
    daterange(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Daterange<0 | 1>
    daterange(this: Types.Date<number>, a1: Types.Date<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Daterange<0 | 1>
    daterange(...args: unknown[]) {
        return sqlFunction("daterange", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Daterange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Date<0 | 1>, Types.Text<0 | 1>], ret: Types.Daterange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    daterangeSubdiff(this: Types.Date<1>, a1: Types.Date<1>): Types.Float8<1>
    daterangeSubdiff(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Float8<0 | 1>
    daterangeSubdiff(this: Types.Date<number>, a1: Types.Date<number>): Types.Float8<0 | 1>
    daterangeSubdiff(...args: unknown[]) {
        return sqlFunction("daterange_subdiff", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    datetimePl(this: Types.Date<1>, a1: Types.Time<1>): Types.Timestamp<1>
    datetimePl(this: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamp<0 | 1>
    datetimePl(this: Types.Date<number>, a1: Types.Time<number>): Types.Timestamp<0 | 1>
    datetimePl(...args: unknown[]) {
        return sqlFunction("datetime_pl", [{args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    datetimetzPl(this: Types.Date<1>, a1: Types.Timetz<1>): Types.Timestamptz<1>
    datetimetzPl(this: Types.Date<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timestamptz<0 | 1>
    datetimetzPl(this: Types.Date<number>, a1: Types.Timetz<number>): Types.Timestamptz<0 | 1>
    datetimetzPl(...args: unknown[]) {
        return sqlFunction("datetimetz_pl", [{args: [Types.Date<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Date<1>, a1: Types.Date<1>, a2: Types.Interval<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Date<number>, a1: Types.Date<number>, a2: Types.Interval<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isfinite(this: Types.Date<1>): Types.Bool<1>
    isfinite(this: Types.Date<0 | 1>): Types.Bool<0 | 1>
    isfinite(this: Types.Date<number>): Types.Bool<0 | 1>
    isfinite(...args: unknown[]) {
        return sqlFunction("isfinite", [{args: [Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Date<number>): Types.Date<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamp(this: Types.Date<1>): Types.Timestamp<1>
    timestamp(this: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    timestamp(this: Types.Date<number>): Types.Timestamp<0 | 1>
    timestamp(this: Types.Date<1>, a1: Types.Time<1>): Types.Timestamp<1>
    timestamp(this: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamp<0 | 1>
    timestamp(this: Types.Date<number>, a1: Types.Time<number>): Types.Timestamp<0 | 1>
    timestamp(...args: unknown[]) {
        return sqlFunction("timestamp", [{args: [Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timestamptz(this: Types.Date<1>): Types.Timestamptz<1>
    timestamptz(this: Types.Date<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Date<number>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Date<1>, a1: Types.Time<1>): Types.Timestamptz<1>
    timestamptz(this: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Date<number>, a1: Types.Time<number>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Date<1>, a1: Types.Timetz<1>): Types.Timestamptz<1>
    timestamptz(this: Types.Date<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Date<number>, a1: Types.Timetz<number>): Types.Timestamptz<0 | 1>
    timestamptz(...args: unknown[]) {
        return sqlFunction("timestamptz", [{args: [Types.Date<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    ["="](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["="](this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["="](this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["="](this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["="](this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    eq(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    eq(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    eq(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    eq(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    eq(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    [">="](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    [">="](this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    [">="](this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    [">="](this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    [">="](this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    gte(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    gte(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    gte(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    gte(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    gte(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    [">"](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    [">"](this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    [">"](this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    [">"](this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    [">"](this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    gt(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    gt(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    gt(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    gt(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    gt(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<="](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<="](this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<="](this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    lte(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    lte(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    lte(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    lte(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    lte(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<"](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<"](this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<"](this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    lt(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    lt(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    lt(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    lt(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    lt(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Date<1>, a1: Types.Date<1>): Types.Int4<1>
    ["-"](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
    ["-"](this: Types.Date<number>, a1: Types.Date<number>): Types.Int4<0 | 1>
    ["-"](this: Types.Date<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    ["-"](this: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    ["-"](this: Types.Date<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    ["-"](this: Types.Date<1>, a1: Types.Int4<1>): Types.Date<1>
    ["-"](this: Types.Date<0 | 1>, a1: Types.Int4<0 | 1>): Types.Date<0 | 1>
    ["-"](this: Types.Date<number>, a1: Types.Int4<number>): Types.Date<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Date<1>, a1: Types.Date<1>): Types.Int4<1>
    minus(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
    minus(this: Types.Date<number>, a1: Types.Date<number>): Types.Int4<0 | 1>
    minus(this: Types.Date<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    minus(this: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    minus(this: Types.Date<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    minus(this: Types.Date<1>, a1: Types.Int4<1>): Types.Date<1>
    minus(this: Types.Date<0 | 1>, a1: Types.Int4<0 | 1>): Types.Date<0 | 1>
    minus(this: Types.Date<number>, a1: Types.Int4<number>): Types.Date<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<>"](this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<>"](this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<>"](this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Date<1>, a1: Types.Date<1>): Types.Bool<1>
    ne(this: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Date<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ne(this: Types.Date<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ne(this: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Date<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ne(this: Types.Date<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ne(this: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Date<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Date<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    ["+"](this: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Date<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Date<1>, a1: Types.Int4<1>): Types.Date<1>
    ["+"](this: Types.Date<0 | 1>, a1: Types.Int4<0 | 1>): Types.Date<0 | 1>
    ["+"](this: Types.Date<number>, a1: Types.Int4<number>): Types.Date<0 | 1>
    ["+"](this: Types.Date<1>, a1: Types.Time<1>): Types.Timestamp<1>
    ["+"](this: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Date<number>, a1: Types.Time<number>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Date<1>, a1: Types.Timetz<1>): Types.Timestamptz<1>
    ["+"](this: Types.Date<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timestamptz<0 | 1>
    ["+"](this: Types.Date<number>, a1: Types.Timetz<number>): Types.Timestamptz<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Date<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    plus(this: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    plus(this: Types.Date<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    plus(this: Types.Date<1>, a1: Types.Int4<1>): Types.Date<1>
    plus(this: Types.Date<0 | 1>, a1: Types.Int4<0 | 1>): Types.Date<0 | 1>
    plus(this: Types.Date<number>, a1: Types.Int4<number>): Types.Date<0 | 1>
    plus(this: Types.Date<1>, a1: Types.Time<1>): Types.Timestamp<1>
    plus(this: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamp<0 | 1>
    plus(this: Types.Date<number>, a1: Types.Time<number>): Types.Timestamp<0 | 1>
    plus(this: Types.Date<1>, a1: Types.Timetz<1>): Types.Timestamptz<1>
    plus(this: Types.Date<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timestamptz<0 | 1>
    plus(this: Types.Date<number>, a1: Types.Timetz<number>): Types.Timestamptz<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
