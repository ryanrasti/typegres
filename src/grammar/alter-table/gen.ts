import invariant from "tiny-invariant";
import { ParsedBlocks, ParsedBlock, KeywordNode, ExplicitParametersNode, IdentifierNode } from "./parse";
import { Node, parse } from "./parse";
import camelCase from "camelcase";
import { inspect } from "cross-inspect";

type Transition = {
  params: (ExplicitParametersNode | IdentifierNode)[];
  to: KeywordNode;
  as: string;
};

type TransitionGraph = {
  roots: Transition[];
  map: Map<KeywordNode, Transition[]>;
};

const buildTransitions = (nodes: Node<unknown>[]): TransitionGraph => {
  const names: { [key in string]: number } = {};
  const keywordMapping = new Map<KeywordNode, string>();

  const registerKeyword = (node: KeywordNode) => {
    names[node.value] = names[node.value] ?? 0;
    const name = `${camelCase(node.value)}_${names[node.value]}`;
    names[node.value]++;
    keywordMapping.set(node, name);
    return name;
  };

  const ret = new Map<KeywordNode, Transition[]>();
  const traverse = (nodes: Node<unknown>[]): Transition[] => {
    const [first, ...rest] = nodes;
    if (!first) {
      return [];
    }

    const restTransitions = traverse(rest);

    const node = first.asNodeType();
    if (node.type === "nodelist") {
      return traverse(node.value);
    } else if (node.type === "optional") {
      return traverse(node.value.value).concat(restTransitions);
    } else if (node.type === "group") {
      return traverse(node.value.value);
    } else if (node.type === "keyword") {
      const name = registerKeyword(node);
      ret.set(node, restTransitions);
      return [{ to: node, params: [], as: name }];
    } else if (node.type === "choice") {
      return node.value.flatMap((choice) => traverse(choice.value));
    } else if (node.type === "identifier" || node.type === "parameter") {
      return restTransitions.map((t) => ({
        ...t,
        params: [node, ...t.params],
      }));
    } else if (node.type === "repetition") {
      // TODO
      return restTransitions;
    } else {
      node satisfies never;
      invariant(false, `Unhandled node type: ${inspect(node)}`);
    }
  };

  const roots = traverse(nodes);
  return { roots, map: ret };
};

const transitionToMethod = (from: Transition, to: Transition[]) => {
  return `  ${from.as}(${from.params
    .map((p, i) => (p.type === "identifier" ? `name${i}` : `param${i}: ${p.value}`))
    .join(", ")}) {
    return {${to.map((t) => `${camelCase(t.to.value)}: this.${t.as}`).join(", ")}};
  }`;
};

function* traverseGraph(graph: TransitionGraph, start: Transition): Generator<[Transition, Transition[]]> {
  const transitions = graph.map.get(start.to) ?? [];
  yield [start, transitions] as const;
  for (const t of transitions) {
    yield* traverseGraph(graph, t);
  }
}

// Generate a builder class for a block
const generateBuilderClass = (name: string, block: ParsedBlock) => {
  const className = `${name === "$root" ? "" : camelCase(name, { pascalCase: true })}Builder`;

  console.log(`export class ${className} extends Builder {`);

  const graph = buildTransitions([block.parsed]);
  for (const root of graph.roots) {
    console.log(`  // ${root.to.value}`);
    for (const [head, tails] of traverseGraph(graph, root)) {
      console.log(transitionToMethod(head, tails));
    }
    console.log();
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
