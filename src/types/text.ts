import { Text as PgText } from "../gen/types/text";
import * as Types from "../types";

export default class Text<N extends number> extends PgText<N> {
  /**
   * Case-insensitive LIKE pattern matching
   */
  ilike(this: Types.Text<1>, pattern: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
  ilike(this: Types.Text<0 | 1>, pattern: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
  ilike(this: Types.Text<number>, pattern: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<number>
  ilike(pattern: any) {
    return this["~~*"](pattern);
  }

  /**
   * Case-insensitive NOT LIKE pattern matching
   */
  notilike(this: Types.Text<1>, pattern: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
  notilike(this: Types.Text<0 | 1>, pattern: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
  notilike(this: Types.Text<number>, pattern: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<number>
  notilike(pattern: any) {
    return this["!~~*"](pattern);
  }
}