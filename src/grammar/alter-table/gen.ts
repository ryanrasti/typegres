import invariant from "tiny-invariant";
import { ParsedBlocks, ParsedBlock, KeywordNode } from "./parse";
import { Node, parse } from "./parse";
import camelCase from "camelcase";
import { inspect } from "cross-inspect";

type BaseNode = KeywordNode;

type Transition = {
  to: BaseNode;
  parameters: Node[];
  as: string;
};

type TransitionGraph = {
  roots: Transition[];
  map: Map<BaseNode, Transition[]>;
};

const isParameterLike = (nodeIn: Node): boolean => {
  const node = nodeIn.asNodeType();
  if (node.type === "explicitParameters" || node.type === "identifier") {
    return true;
  }
  if (node.type === "nodelist") {
    const [first, ...rest] = node.value;
    return first && !rest.length && isParameterLike(first);
  }
  if (node.type === "optional") {
    return isParameterLike(node.value);
  }
  if (node.type === "group") {
    return isParameterLike(node.value);
  }
  if (node.type === "choice") {
    return node.value.some((choice) => isParameterLike(choice));
  }
  return false;
};

const buildTransitions = (nodes: Node<unknown>[]): TransitionGraph => {
  const names: { [key in string]: number } = {};
  const keywordMapping = new Map<KeywordNode, string>();

  const registerKeyword = (node: KeywordNode) => {
    names[node.value] = names[node.value] ?? 0;
    const name = `${node.value} ${names[node.value]}`;
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
    if (node.type === "identifier" || node.type === "explicitParameters" || isParameterLike(node)) {
      return restTransitions.map((t) => ({ ...t, parameters: [node, ...t.parameters] }));
    } else if (node.type === "nodelist") {
      return traverse(node.value);
    } else if (node.type === "optional") {
      return traverse(
        node.value.value,
        restTransitions.map((t) => ({ ...t, parameters: [] })),
      ).concat(restTransitions);
    } else if (node.type === "group") {
      return traverse(node.value.value);
    } else if (node.type === "keyword") {
      const name = registerKeyword(node);
      ret.set(node, restTransitions);
      return [{ to: node, as: name, parameters: [] }];
    } else if (node.type === "choice") {
      return node.value.flatMap((choice) => traverse(choice.value, restTransitions));
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

const methodName = (keywordName: string) => {
  const val = camelCase(keywordName, { pascalCase: false });
  if (val === "in") {
    return '["in"]';
  }
  return val;
};

const className = (transition: Transition) => {
  return camelCase(transition.as, { pascalCase: true });
};

function* transitionToMethods(from: BaseNode, map: Map<BaseNode, Transition[]>): Generator<string> {
  const to = map.get(from) ?? [];
  const names: { [key: string]: Transition[] } = {};
  for (const t of to) {
    names[t.to.value] = [...(names[t.to.value] ?? []), t];
  }

  for (const [k, v] of Object.entries(names)) {
    yield `  ${methodName(k)} = () => this.$oneOf(${v.map((t) => `this.${className(t)}`).join(", ")})`;
  }
  yield "";

  for (const t of to) {
    const next = map.get(t.to) ?? [];
    const params = t.parameters.map((p, i) => `param${i}`).join(", ");

    yield `    ${className(t)} = class extends SubBuilder {`;
    yield `      $ = (${params}) => oneOf(${next.map((n) => `this.${className(n)}`).join(", ")})`;
    yield* transitionToMethods(t.to, map);
    yield `    }`;
  }
}

function* rootsToMethods(roots: Transition[], map: Map<BaseNode, Transition[]>): Generator<string> {
  const root: BaseNode = new KeywordNode("$");
  map.set(root, roots);
  yield* transitionToMethods(root, map);
}

// Generate a builder class for a block
const generateBuilderClass = (name: string, block: ParsedBlock) => {
  const className = `${name === "$root" ? "Root" : camelCase(name, { pascalCase: true })}Builder`;

  console.log(`export class ${className} extends Builder {`);

  const graph = buildTransitions([block.parsed]);
  for (const line of rootsToMethods(graph.roots, graph.map)) {
    console.log(line);
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
