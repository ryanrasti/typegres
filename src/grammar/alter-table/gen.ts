import invariant from "tiny-invariant";
import { ParsedBlocks, ParsedBlock, KeywordNode, ExplicitParametersNode, IdentifierNode } from "./parse";
import { Node, parse } from "./parse";
import camelCase from "camelcase";
import { inspect } from "cross-inspect";

type BaseNode = KeywordNode | ExplicitParametersNode | IdentifierNode;

type Transition = {
  to: BaseNode;
  as: string;
};

type TransitionGraph = {
  roots: Transition[];
  map: Map<BaseNode, Transition[]>;
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

  const ret = new Map<BaseNode, Transition[]>();
  const traverse = (nodes: Node<unknown>[], next: Transition[] = []): Transition[] => {
    const [first, ...rest] = nodes;
    if (!first) {
      return next;
    }

    const restTransitions = traverse(rest, next);

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
      return [{ to: node, as: name }];
    } else if (node.type === "choice") {
      return node.value.flatMap((choice) => traverse(choice.value, restTransitions));
    } else if (node.type === "identifier" || node.type === "explicitParameters") {
      ret.set(node, restTransitions);
      return [{ to: node, as: camelCase(node.type === "identifier" ? node.value : "params") }];
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

type MethodTransition = {
  to?: KeywordNode;
  as: string;
  params: (ExplicitParametersNode | IdentifierNode)[];
};

const transitionToMethod = (from: MethodTransition, to: MethodTransition[]) => {
  const ret =`{${to.map((t) => t.to ? `${camelCase(t.to.value)}: this.${t.as}` : '...this.$end()').join(", ")}}`;

  return `  ${from.as}(${from.params
    .map((p, i) => (p.type === "identifier" ? `name${i}` : `param${i}: ${p.value}`))
    .join(", ")}) {
    return ${ret};
  }`;
};

const resolveTransition = (t: Transition, graph: TransitionGraph): MethodTransition[] => {
  const to = t.to;
  if (to.type === "keyword") {
    return [{ to: to, params: [], as: t.as }];
  } else {
    const transitions = graph.map.get(to);
    if (transitions?.length) {
      return transitions.flatMap((nt) => {
        if (nt.to.type === "keyword") {
          return [{ to: nt.to, params: [to], as: nt.as }];
        } else {
          return resolveTransition(nt, graph).map((mt) => ({
            ...mt,
            params: [to, ...mt.params],
          }));
        }
      });
    } else {
      return [{ params: [to], as: t.as }];
    }
  }
};

function* traverseGraph(graph: TransitionGraph, start: Transition): Generator<[MethodTransition, MethodTransition[]]> {
  const startTransitions = resolveTransition(start, graph);

  for (const start of startTransitions) {
    const next = start.to && graph.map.get(start.to);
    const nextTransitions = next?.flatMap((t) => resolveTransition(t, graph)) ?? [];
    yield [start, nextTransitions] as const;
    for (const t of nextTransitions) {
      if (t.to) {
        yield* traverseGraph(graph, {...t, to: t.to});
      }
    }
  }
}

// Generate a builder class for a block
const generateBuilderClass = (name: string, block: ParsedBlock) => {
  const className = `${name === "$root" ? "Root" : camelCase(name, { pascalCase: true })}Builder`;

  console.log(`export class ${className} extends Builder {`);

  const graph = buildTransitions([block.parsed]);
  const seen = new Set<BaseNode | undefined>();
  for (const root of graph.roots) {
    if (seen.has(root?.to)) {
      continue;
    }
    console.log(`  // ${root.to?.value}`);
    for (const [head, tails] of traverseGraph(graph, root)) {
      if (!head.to || seen.has(head.to)) {
        continue;
      }
      console.log(transitionToMethod(head, tails));
      seen.add(head.to);
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
