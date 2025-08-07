import { Node, ParserInfo, toParserInfo } from "./node";

export class OneOf extends Node {
  type = "oneOf";
  options: Node[];

  constructor(options: Node[], optional = false) {
    super(optional);
    this.options = options;
  }

  toParserInfo(): ParserInfo {
    // For OneOf, we need to generate type as union and parser that tries each option
    const optionsInfo = this.options.map((opt) =>
      toParserInfo(opt, this.isOptional),
    );
    return {
      params: {
        type: "union",
        value: optionsInfo.map((info) =>
          info.params.type === "object"
            ? // If the option is an object, then its properties should be optional
              {
                ...info.params,
                value: Object.fromEntries(
                  Object.entries(info.params.value).map(([k, v]) => [
                    k,
                    { ...v, optional: v.optional || this.isOptional },
                  ]),
                ),
              }
            : info.params,
        ),
        exclusive: true,
      },
      parse: (value: any) => {
        for (const info of optionsInfo) {
          const parsed = info.parse(value);
          if (parsed !== null) {
            return parsed; // Return the first successful parse
          }
        }
        return null; // None of the options matched
      },
    };
  }
}
