import * as fs from "fs";
import * as path from "path";
import invariant from "tiny-invariant";

// Base Node class
export abstract class Node<T> {
  abstract type: string;
  constructor(public value: T) {}
  abstract render(): string;
  asNodeType(): NodeType {
    return this as NodeType;
  }
}

const doMatch = (input: string, pattern: RegExp) => {
  const m = input.match(pattern);
  if (m && m.index === 0) {
    invariant(m[0] !== undefined);
    return { match: m[0], remaining: input.slice(m[0].length).trimStart() };
  }
  return { match: null, remaining: input };
};

type NodeType =
  | KeywordNode
  | ExplicitParametersNode
  | OptionalNode
  | RepetitionNode
  | ChoiceNode
  | GroupNode
  | IdentifierNode
  | NodeList;

// Node types
export class KeywordNode extends Node<string> {
  type = "keyword" as const;

  static parse(input: string) {
    // Match contiguous uppercase words (e.g., "ALTER TABLE", "CURRENT_USER")
    const { match, remaining } = doMatch(input, /^([A-Z]+([ _]+[A-Z]+)*)/);
    if (match) {
      return {
        node: new KeywordNode(match),
        remaining,
      };
    }
    return null;
  }

  render() {
    return this.value;
  }
}

class ExplicitParametersNode extends Node<string> {
  type = "parameter" as const;

  static parse(input: string) {
    const { match, remaining } = doMatch(input, /^\(([^)]+)\)/);
    if (match) {
      return {
        node: new ExplicitParametersNode(match),
        remaining: remaining,
      };
    }
    return null;
  }

  render() {
    return `${this.value}`;
  }
}

const balanceBrackets = (input: string, open: string, close: string) => {
  let depth = 1;
  let i = 1;
  if (input[0] !== open) return { content: null, remaining: input };
  while (i < input.length) {
    if (input[i] === open) depth++;
    else if (input[i] === close) depth--;
    i++;
    if (depth === 0) break;
  }
  return depth === 0
    ? { content: input.slice(1, i - 1).trim(), remaining: input.slice(i).trimStart() }
    : { content: null, remaining: input };
};

class OptionalNode extends Node<NodeList> {
  type = "optional" as const;

  static parse(input: string): { node: OptionalNode | RepetitionNode; remaining: string } | null {
    const { content, remaining } = balanceBrackets(input, "[", "]");
    if (!content) {
      return null;
    }

    const { node, remaining: rem } = NodeList.parse(content);
    if (rem) {
      return null;
    }
    return {
      node: new OptionalNode(node),
      remaining,
    };
  }

  render(): string {
    return `[ ${this.value.render()} ]`;
  }
}

class RepetitionNode extends Node<" " | ", "> {
  type = "repetition" as const;

  static parse(input: string) {
    const { content, remaining } = balanceBrackets(input, "[", "]");
    if (!content) {
      return null;
    }

    // Check for repetition pattern
    if (content === "..." || content === ", ...") {
      return {
        node: new RepetitionNode(content === "..." ? " " : ", "),
        remaining,
      };
    }
  }

  render(): string {
    return this.value === " " ? `[ ... ]` : `[${this.value}... ]`;
  }
}

export class ChoiceNode extends Node<NodeList[]> {
  type = "choice" as const;
  constructor(
    value: NodeList[],
    public isTopLevel = false,
  ) {
    super(value);
  }

  static parse(input: string, allowSingle = false): { node: ChoiceNode; remaining: string } | null {
    const { node, remaining: rem } = NodeList.parse(input, false, [ChoiceNode.parse]);

    if (rem === "" && allowSingle) {
      return {
        node: new ChoiceNode([node]),
        remaining: "",
      };
    }

    if (node.value.length === 0 || rem[0] !== "|") {
      return null;
    }

    const restParsed = ChoiceNode.parse(rem.slice(1).trimStart(), true);
    if (!restParsed) {
      return null;
    }

    return {
      node: new ChoiceNode([node, ...restParsed.node.value]),
      remaining: restParsed.remaining,
    };
  }

  render(): string {
    return this.value.map((group) => group.render()).join(this.isTopLevel ? '\n' : " | ");
  }
}

export class GroupNode extends Node<NodeList> {
  type = "group" as const;

  static parse(input: string) {
    // Optionally, match surrounding {}:
    const { content, remaining } = balanceBrackets(input, "{", "}");
    if (!content) {
      return null;
    }

    const { node, remaining: rem } = NodeList.parse(content);
    if (rem !== "") {
      return null;
    }
    return {
      node: new GroupNode(node),
      remaining,
    };
  }

  render() {
    return `{ ${this.value.render()} }`;
  }
}

export class IdentifierNode extends Node<string> {
  type = "identifier" as const;

  static parse(input: string): { node: IdentifierNode; remaining: string } | null {
    // Try backticked parameter first
    const backtickMatch = input.match(/^`([^`]+)`/);
    if (backtickMatch) {
      return {
        node: new IdentifierNode(backtickMatch[1]),
        remaining: input.slice(backtickMatch[0].length).trimStart(),
      };
    }

    // Also match * as a identifier
    if (input.startsWith("*")) {
      return {
        node: new IdentifierNode("*"),
        remaining: input.slice(1).trimStart(),
      };
    }

    return null;
  }

  render() {
    return this.value === "*" ? this.value : `\`${this.value}\``;
  }
}

export class NodeList extends Node<Node<unknown>[]> {
  type = "nodelist" as const;

  static parse(input: string, parseFully = false, omitParsers: ((...a: any) => any)[] = []) {
    const nodes: Node<unknown>[] = [];
    let remaining = input.trim();

    while (remaining) {
      // Try each parser in order
      const parsers = [
        ChoiceNode.parse,
        ExplicitParametersNode.parse,
        GroupNode.parse,
        RepetitionNode.parse,
        OptionalNode.parse,
        KeywordNode.parse,
        IdentifierNode.parse,
      ].filter((p) => !omitParsers.includes(p));

      let matched = false;
      for (const parser of parsers) {
        const result = parser(remaining);
        if (result) {
          nodes.push(result.node);
          remaining = result.remaining;
          matched = true;
          break;
        }
      }

      // If nothing matched, break to avoid infinite loop
      if (!matched) {
        break;
      }
    }

    if (parseFully) {
      invariant(remaining === "", `Failed to fully parse input: ${input} \n\n\t->'${remaining}'`);
    }

    return { node: new NodeList(nodes), remaining };
  }

  render(joiner = " ") {
    return this.value.map((v) => v.render()).join(joiner);
  }
}

type Block = {
  lines: string[];
  isOneOf: boolean;
  header?: string;
};

// Preprocess the file
function preprocess(content: string): { [key: string]: Block } & { $root: Block } {
  const blocks: { [key: string]: Block } & { $root: Block } = {
    $root: {
      lines: [],
      isOneOf: true,
    },
  };
  let currentBlock = "$root";

  for (const line of normalizeLines(content.split("\n"))) {
    // Check for block header
    const blockMatch = line.match(/^(?:where |and )?`([^`]+)` .*(of|is|are):/);
    if (blockMatch) {
      currentBlock = blockMatch[1];
      blocks[currentBlock] = {
        lines: [],
        isOneOf: line.includes("one of"),
        header: line.trim(),
      };
      continue;
    }

    // Skip empty lines and description lines
    if (!line.trim()) {
      continue;
    }

    // Add line to current block
    blocks[currentBlock].lines.push(line);
  }

  return blocks;
}

// Normalize lines (join continuations)
function normalizeLines(lines: string[]): string[] {
  const normalized: string[] = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i];
    const baseIndent = line.match(/^(\s*)[^ ]/)?.[1].length ?? Infinity;
    i++;

    // Check for continuation lines (more indented)
    while (i < lines.length) {
      const nextLine = lines[i];
      const nextIndent = nextLine.match(/^(\s*)/)?.[1].length || 0;

      if (nextIndent > baseIndent) {
        // Continuation line - append to current
        line += " " + nextLine.trim();
        i++;
      } else {
        break;
      }
    }

    normalized.push(line);
  }

  return normalized;
}

export const rawGrammar = (filePath?: string) => {
    const file = filePath || path.join(__dirname, "alter-table.md");
    return fs.readFileSync(file, "utf-8");
}

// Main parse function
export const parse = (content: string = rawGrammar()) => {
  const blocks = preprocess(content);
  return Object.fromEntries(
    Object.entries(blocks).map(([k, v]) => {
      const parsed = v.isOneOf
        ? new ChoiceNode(
            v.lines.map((l) => NodeList.parse(l, true).node),
            true,
          )
        : NodeList.parse(v.lines.join(" "), true).node;
      return [k, { ...v, parsed }];
    }),
  );
};

export type ParsedBlock = Block & { parsed: NodeList | ChoiceNode };
export type ParsedBlocks = { [k in string]: ParsedBlock };

export function* replay(blocks: ParsedBlocks)  {
  for (const [name, { parsed, header }] of Object.entries(blocks)) {
    if (header) {
      yield header;
    }
    yield parsed.render()
  }
};

// Test
if (require.main === module) {
  const result = parse(rawGrammar());
  for (const line of replay(result)) {
    console.log(line);
  }
}
