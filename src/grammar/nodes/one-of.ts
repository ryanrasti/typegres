import { Node } from "./node";

export class OneOf<O extends Node[]> extends Node {
  type = "oneOf";
  options: O;

  constructor(options: O, optional = false) {
    super(optional);
    this.options = options;
  }

  parse(value: O[number]) {
    for (const option of this.options) {
      const parsed = option.parse(value);
      if (parsed !== null) {
        return parsed; // Return the first successful parse
      }
    }
    return null; // None of the options matched
  }
}
