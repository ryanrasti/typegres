import { ParserInfo, Node } from "./node";

export class Recursive extends Node {
  type = "recursive";
  rule: () => Node;

  constructor(rule: () => Node, optional = false, repeated = false) {
    super(optional, repeated);
    this.rule = rule;
  }

  toParserInfo(): ParserInfo {
    // Avoid infinite recursion - just return a placeholder for recursive rules
    return {
      params: { type: "identifier", value: "never" },
      parse: () => {
        throw new Error("TODO: Recursive parsing not implemented yet");
      },
    };
  }
}
