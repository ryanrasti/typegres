import type { RowLike, Scalar } from "../query/values";
import type Any from "./any";

export type Aggregate<T> = T extends Any
  ? NonNullable<ReturnType<T["asAggregate"]>>
  : never;

export type AggregateOfRow<T extends RowLike | Scalar> = T extends Scalar
  ? Aggregate<T>
  : {
      [K in keyof T]: Aggregate<T[K]>;
    };
