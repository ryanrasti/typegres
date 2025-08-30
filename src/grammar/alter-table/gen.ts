import invariant from "tiny-invariant";
import { ChoiceNode, ParsedBlocks, ParsedBlock, KeywordNode } from "./parse";
import { Node, parse } from "./parse";
import camelCase from "camelcase";
import { inspect } from "cross-inspect";

const definitions = (block: ParsedBlock): Node<unknown>[][] => {
  if (block.parsed instanceof ChoiceNode) {
    return block.parsed.value;
  }
  if (block.parsed[0] && block.parsed.length === 1 && block.parsed[0] instanceof ChoiceNode) {
    return block.parsed[0].value;
  }
  return [block.parsed];
};

const extractLeadingKeywordNode = (nodes: Node<unknown>[]) => {
  const [first] = nodes;
  invariant(first, "No nodes to extract keyword from");
  invariant(first instanceof KeywordNode, `First node is not a keyword: ${inspect(first)}`);
  return first;
};

const generateSubMethods = (nodes: Node<unknown>[], prefix: string) => {
  for (const node of nodes.map((n) => n.asNodeType())) {
    if (node.type === "keyword") {
      console.log(`${prefix}__${camelCase(node.value)}() {}`);
    } else if (node.type === "choice") {
      for (const choice of node.value) {
        generateSubMethods(choice, prefix);
      }
    } else if (node.type === "group" || node.type === "optional") {
      generateSubMethods(node.value, prefix);
    } else if (node.type === "identifier" || node.type === "parameter" || node.type === "repetition") {
      // Do nothing for now
    } else {
      node satisfies never;
      invariant(false, `Unhandled node type: ${(node as any).type}`);
    }
  }
};

// Generate a builder class for a block
const generateBuilderClass = (name: string, block: ParsedBlock) => {
  const className = `${name === "$root" ? "" : camelCase(name, { pascalCase: true })}Builder`;
  const defs = definitions(block);
  const entryPoints: { [key in string]: number } = {};

  console.log(`export class ${className} extends Builder {`);

  for (const def of defs) {
    const firstKeyword = extractLeadingKeywordNode(def);
    entryPoints[firstKeyword.value] = entryPoints[firstKeyword.value] ?? 0;
    const prefix = `${camelCase(firstKeyword.value)}__${entryPoints[firstKeyword.value]}`;
    console.log(`${prefix}() {}`);
    generateSubMethods(def.slice(1), prefix);

    entryPoints[firstKeyword.value]++;
  }

  for (const [entry, n] of Object.entries(entryPoints)) {
    console.log(`${camelCase(entry)}() {}`);
  }

  console.log(`}`);
};

export const generateClasses = (blocks: ParsedBlocks) => {
  // Generate a class for each block
  for (const [name, block] of Object.entries(blocks)) {
    generateBuilderClass(name, block);
    console.log("\n\n");
  }
};

// Test
if (require.main === module) {
  const blocks = parse();
  generateClasses(blocks);
}
