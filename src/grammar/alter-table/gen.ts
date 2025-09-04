import invariant from "tiny-invariant";
import { NodeList, KeywordNode, parseSingle, ChoiceNode } from "./parse";
import { Node } from "./parse";
import camelCase from "camelcase";
import { inspect } from "cross-inspect";
import { Builder, root } from "./alter-table";

type BaseNode = KeywordNode | FunctionNode;

type FunctionNode = {
  type: "function";
  parameters: Node[];
};

const functionNodeParameters = (node: FunctionNode) => {
  return node.parameters
    .map((p, i) => {
      const param = p.asNodeType();
      const name = param.type === "identifier" ? param.value : `param${i}`;
      return `${name}: Raw`;
    })
    .join(", ");
};

type FunctionTransition = { to: FunctionNode; as: string };
type KeywordTransition = { to: KeywordNode; as: string };

type Transition = FunctionTransition | KeywordTransition;

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
  const nodeMapping = new Map<BaseNode, string>();

  const registerName = (name: string) => {
    names[name] = names[name] ?? 0;
    const ret = `${name} ${names[name]}`;
    names[name]++;
    return ret;
  };

  const registerKeyword = (node: KeywordNode) => {
    const name = registerName(node.value);
    nodeMapping.set(node, name);
    return name;
  };

  const registerFunction = (node: FunctionNode) => {
    const mapping = nodeMapping.get(node);
    if (mapping) {
      return mapping;
    }
    const name = registerName("$fn");
    nodeMapping.set(node, name);
    return name;
  };

  const ret = new Map<BaseNode, Transition[]>();
  const traverse = (nodes: Node<unknown>[], next: Transition[]): Transition[] => {
    const [first, ...rest] = nodes;
    if (!first) {
      return next;
    }

    const restTransitions = traverse(rest, next);

    const node = first.asNodeType();
    if (node.type === "identifier" || node.type === "explicitParameters" || isParameterLike(node)) {
      // Gather all parameter-like nodes into a single function:
      const nextNodeIdx = nodes.findIndex((n) => !isParameterLike(n));
      const fnNodes = nodes.slice(0, nextNodeIdx === -1 ? nodes.length : nextNodeIdx);
      invariant(fnNodes.length > 0, `Expected at least one parameter-like node: ${inspect(nodes)}`);
      const asFunctionNode: FunctionTransition = {
        to: { type: "function" as const, parameters: fnNodes },
        as: registerName("$fn"),
      };
      console.warn(
        "fnNodes.length",
        fnNodes.length,
        fnNodes.map((n) => n.asNodeType().type),
      );
      const nextTransitions = traverse(nodes.slice(fnNodes.length), next);
      ret.set(asFunctionNode.to, nextTransitions);
      console.warn("nextTransitions", node.value, restTransitions);

      return [asFunctionNode, ...nextTransitions];
    } else if (node.type === "nodelist") {
      return traverse(node.value, restTransitions);
    } else if (node.type === "optional") {
      return traverse(node.value.value, restTransitions).concat(restTransitions);
    } else if (node.type === "group") {
      return traverse([node.value], restTransitions);
    } else if (node.type === "keyword") {
      const name = registerKeyword(node);
      ret.set(node, restTransitions);
      return [{ to: node, as: name }];
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

  const roots = traverse(nodes, []);
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

type TerminalTransitionPath = [...KeywordTransition[], FunctionTransition];
const isTerminalTransitionPath = (path: Transition[]): path is TerminalTransitionPath => {
  if (path.length === 0) {
    return false;
  }
  return path[path.length - 1].to.type === "function";
};
const getTerminal = (path: TerminalTransitionPath): Transition & { to: FunctionNode } => {
  return path[path.length - 1] as Transition & { to: FunctionNode };
};
const getNonTerminals = (path: TerminalTransitionPath): KeywordTransition[] => {
  return path.slice(0, -1) as KeywordTransition[];
};
const pathValue = (paths: TerminalTransitionPath[]): string => {
  const entry = paths.map((path) => {
    const origNames = getNonTerminals(path).map((p) => p.to.value);
    const aliasNames = getNonTerminals(path).map((p) => p.as);
    const last = getTerminal(path);
    if (aliasNames.length === 0) {
      // Special case: a second function after a function (that wasn't combined since they are on different hierarchical levels)
      return `$: this.${methodName(last.as)}`;
    }
    return `${camelCase(origNames)}: this.${aliasNames.map((n) => `${methodName(n)}()`).join(".")}.${methodName(last.as)}`;
  });
  return `{ ${entry.join(", ")} }`;
};
const isFunctionTransition = (t: Transition): t is FunctionTransition => {
  return t.to.type === "function";
};

function* transitionToMethods(
  from: FunctionTransition,
  map: Map<BaseNode, Transition[]>,
  emitted: Set<string>,
): Generator<string> {
  if (emitted.has(from.as)) {
    return;
  }
  // Methods for transitions:
  // 1. Find all paths to a terminal (a function or no further transitions)
  // 2. For each path, create a concatenated chain to the terminal
  const paths: TerminalTransitionPath[] = [];
  const findPaths = (node: BaseNode, path: KeywordTransition[] = []) => {
    const to = map.get(node);
    if (!to || to.length === 0) {
      if (path.length > 0) {
        if (isTerminalTransitionPath(path)) {
          paths.push(path);
        } else {
          paths.push([...path, { to: { type: "function" as const, parameters: [] }, as: "$end" }]);
        }
      }
      return;
    }
    for (const t of to) {
      if (isFunctionTransition(t)) {
        paths.push([...path, { ...t, to: t.to }]);
        continue;
      }

      findPaths(t.to, [...path, t]);
    }
  };
  findPaths(from.to);

  const fromNode = from.to;
  invariant(fromNode.type === "function", `Expected from to be a function, got ${inspect(from)}`);
  yield `  ${methodName(from.as)} = (${functionNodeParameters(from.to)}) => (${pathValue(paths)})`;
  console.warn("emitted", from.as);
  emitted.add(from.as);

  // Methods for helpers:
  // 1. Each non-terminal transition becomes a method -- but they shouldn't be duplicated
  for (const p of paths) {
    for (const t of getNonTerminals(p)) {
      if (emitted.has(t.as)) {
        continue;
      }
      yield ` ${methodName(t.as)} = () => this`;
      emitted.add(t.as);
    }
  }

  // Recurse into next roots
  for (const p of paths) {
    const t = getTerminal(p);
    yield* transitionToMethods(t, map, emitted);
  }
}

function* rootsToMethods(
  roots: Transition[],
  map: Map<BaseNode, Transition[]>,
  emitted: Set<string>,
): Generator<string> {
  const root: FunctionTransition = { to: { type: "function", parameters: [] }, as: "$start" };
  map.set(root.to, roots);
  yield* transitionToMethods(root, map, emitted);
}

// Generate a builder class for a block
const generateBuilderClass = (name: string, block: ChoiceNode | NodeList) => {
  const className = `${camelCase(name, { pascalCase: true })}Builder`;

  console.log(`export class ${className} extends Builder {`);

  const graph = buildTransitions([block]);
  const emitted = new Set<string>();
  for (const line of rootsToMethods(graph.roots, graph.map, emitted)) {
    console.log(line);
  }

  console.log(`}`);
};

function* collectGrammars(root: Builder, name = "Root"): Generator<[string, string]> {
  yield [name, root.grammar];
  console.warn(`// References for ${Object.values(root.references?.() ?? {})}`);
  for (const [name, ref] of Object.entries(root.references?.() ?? {})) {
    yield* collectGrammars(ref, name);
  }
}

export const generateClasses = () => {
  // Generate a class for each block
  for (const [name, grammar] of collectGrammars(root)) {
    console.warn(`// Grammar for ${grammar}`);
    generateBuilderClass(name, parseSingle(grammar));
    console.log("\n");
  }
};

// Test
if (require.main === module) {
  generateClasses();
}
