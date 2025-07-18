// hierarchy:
//  any
//   anynonarray
//     all types
//   anyarray

import { Int2, Int4, Int8, Float4, Float8, Numeric } from "../gen/types";

//     all arrays
export * from "../gen/types";
export { default as Any, type WithNullability } from "./any";
export { default as Array } from "./array";
export { default as Bool } from "./bool";
export { default as Text } from "./text";
export { default as Record } from "./record";
export { Setof as Setof } from "../query/values";
export type { Aggregate } from "./aggregate";
export type { Input } from "./serialization";

export type NumericLike =
  | Int4<0 | 1>
  | Int2<0 | 1>
  | Int8<0 | 1>
  | Float4<0 | 1>
  | Float8<0 | 1>
  | Numeric<0 | 1>;
