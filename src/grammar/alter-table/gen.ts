import invariant from "tiny-invariant";
import { ChoiceNode, ParsedBlocks, ParsedBlock, KeywordNode, NodeList } from "./parse";
import { Node, parse } from "./parse";
import camelCase from "camelcase";
import { inspect } from "cross-inspect";
import { forEach } from "effect/Array";

const extractLeadingKeywordNode = (nodes: Node<unknown>[]) => {
  const [first] = nodes;
  invariant(first, "No nodes to extract keyword from");
  invariant(first instanceof KeywordNode, `First node is not a keyword: ${inspect(first)}`);
  return first;
};

type Clause = [KeywordNode, ...Node<unknown>[]];

const extractLeadingClauses = ({ parsed }: ParsedBlock): Map<Clause, string> => {
  const names: { [key in string]: number } = {};

  const ret: Map<Clause, string> = new Map();

  const registerKeyword = (node: KeywordNode, rest: Node<unknown>[]) => {
    names[node.value] = names[node.value] ?? 0;
    const name = `${camelCase(node.value)}_${names[node.value]}`;
    names[node.value]++;
    ret.set([node, ...rest], name);
  };

  const traverse = (nodeIn: Node<unknown>) => {
    const node = nodeIn.asNodeType();
    if (node.type === "nodelist") {
      const [first, ...rest] = node.value;
      invariant(first, "No nodes to extract keyword from");

      if (first instanceof KeywordNode) {
        registerKeyword(first, rest);
      } else {
        traverse(first);
      }
    } else if (node.type === "optional" || node.type === "group") {
      forEach(node.value.value, traverse);
    } else if (node.type === "keyword") {
      registerKeyword(node, []);
    } else if (node.type === "choice") {
      forEach(node.value, traverse);
    } else if (node.type === "repetition" || node.type === "identifier" || node.type === "parameter") {
      // Nothing for now
    } else {
      node satisfies never;
      invariant(false, `Unhandled node type: ${inspect(node)}`);
    }
  };

  forEach(parsed.value, traverse);
  return ret;
};

// Generate a builder class for a block
const generateBuilderClass = (name: string, block: ParsedBlock) => {
  const className = `${name === "$root" ? "" : camelCase(name, { pascalCase: true })}Builder`;

  console.log(`export class ${className} extends Builder {`);

  const leadingClauses = extractLeadingClauses(block);
  for (const [clause, name] of leadingClauses.entries()) {
    console.log(`  ${name} = () => {}`);
    
  }

  console.log(`}`);
};

export const generateClasses = (blocks: ParsedBlocks) => {
  // Generate a class for each block
  for (const [name, block] of Object.entries(blocks)) {
    generateBuilderClass(name, block);
    console.log("\n");
  }
};

// Test
if (require.main === module) {
  const blocks = parse();
  generateClasses(blocks);
}

