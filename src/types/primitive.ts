import { Text, Float8, Numeric, Bool, Any } from ".";
import { RowLikeRelaxed } from "../query/values";
import { RecordInstance } from "./record";

export type Primitive = string | number | boolean | bigint;

export type PrimitiveToSqlType<T extends Primitive> = T extends string
  ? Text<1>
  : T extends number
    ? Float8<1>
    : T extends boolean
      ? Bool<1>
      : T extends bigint
        ? Numeric<1>
        : never;

export type MaybePrimitiveToSqlType<
  T extends Primitive | Any | RowLikeRelaxed,
> = T extends Primitive
  ? PrimitiveToSqlType<T>
  : T extends Any
    ? T
    : T extends RowLikeRelaxed
      ? RecordInstance<1, { [K in keyof T]: MaybePrimitiveToSqlType<T[K]> }>
      : never;

export const maybePrimitiveToSqlType = <
  T extends Primitive | Any | RowLikeRelaxed,
>(
  value: T,
): MaybePrimitiveToSqlType<T> => {
  if (typeof value === "string") {
    return Text.new(value) as MaybePrimitiveToSqlType<T>;
  } else if (typeof value === "number") {
    return Float8.new(value) as MaybePrimitiveToSqlType<T>;
  } else if (typeof value === "boolean") {
    return Bool.new(value) as MaybePrimitiveToSqlType<T>;
  } else if (typeof value === "bigint") {
    return Numeric.new(value) as MaybePrimitiveToSqlType<T>;
  }

  if (value instanceof Any) {
    return value as MaybePrimitiveToSqlType<T>;
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        maybePrimitiveToSqlType(val),
      ]),
    ) as MaybePrimitiveToSqlType<T>;
  }
  throw new Error(
    `Unsupported type for maybePrimitiveToSqlType: ${typeof value}`,
  );
};
