import camelcase from "camelcase";
import { ChoiceNode, ParsedBlocks } from "./parse";

export const generateClasses = (blocks: ParsedBlocks) => {
  for (const [name, { parsed }] of Object.entries(blocks)) {
    const definitions = parsed instanceof ChoiceNode ? parsed.value : [parsed];

    console.log(`// ${name}`);
  }
};
