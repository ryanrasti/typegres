import { ParserInfo, Node } from "./node";

export class Todo extends Node {
  type = "todo";
  text: string;

  constructor(text: string, optional = false) {
    super(optional);
    this.text = text;
  }

  toParserInfo(): ParserInfo {
    return {
      params: { type: "identifier", value: "never" },
      parse: () => {
        throw new Error("TODO: " + this.text + " not implemented yet");
      },
    };
  }
}
