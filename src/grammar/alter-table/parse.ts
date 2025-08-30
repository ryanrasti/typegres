import * as fs from "fs";
import * as path from "path";
import invariant from "tiny-invariant";

// Base Node class
abstract class Node<T> {
  abstract type: string;
  constructor(public value: T) {}
}

const doMatch = (input: string, pattern: RegExp) => {
  const m = input.match(pattern);
  if (m && m.index === 0) {
    invariant(m[0] !== undefined);
    return { match: m[0], remaining: input.slice(m[0].length).trimStart() };
  }
  return { match: null, remaining: input };
};

// Node types
class KeywordNode extends Node<string> {
  type = "keyword" as const;

  static parse(input: string) {
    // Match contiguous uppercase words (e.g., "ALTER TABLE", "IF EXISTS")
    const { match, remaining } = doMatch(input, /^([A-Z]+(\s+[A-Z]+)*)/);
    if (match) {
      return {
        node: new KeywordNode(match),
        remaining,
      };
    }
    return null;
  }
}

class ExplicitParametersNode extends Node<string> {
  type = "parameter" as const;

  static parse(input: string) {
    const { remaining, match } = doMatch(input, /^`\(([^)]+)\)`/);
    if (match) {
      return {
        node: new ExplicitParametersNode(remaining),
        remaining: remaining,
      };
    }
    return null;
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
    ? { content: input.slice(0, i).trim(), remaining: input.slice(i).trimStart() }
    : { content: null, remaining: input };
};

class OptionalNode extends Node<Node<unknown>[]> {
  type = "optional" as const;

  static parse(input: string): { node: OptionalNode | RepetitionNode; remaining: string } | null {
    const { content, remaining } = balanceBrackets(input, "[", "]");
    if (!content) {
      return null;
    }

    const { nodes, remaining: rem } = parseNodes(content);
    if (rem) {
      return null;
    }
    return {
      node: new OptionalNode(nodes),
      remaining,
    };
  }
}

class RepetitionNode extends Node<" " | ","> {
  type = "repetition" as const;

  static parse(input: string) {
    const { content, remaining } = balanceBrackets(input, "[", "]");
    if (!content) {
      return null;
    }

    // Check for repetition pattern
    if (content === "..." || content === ", ...") {
      return {
        node: new RepetitionNode(content === "..." ? " " : ","),
        remaining,
      };
    }
  }
}

class ChoiceNode extends Node<Node<unknown>[][]> {
  type = "choice" as const;

  static parse(input: string): { node: ChoiceNode; remaining: string } | null {
    // Optionally, match surrounding {}:
    const { content, remaining } = balanceBrackets(input, "{", "}");

    const {
      nodes,
      remaining: [divider, ...rest],
    } = parseNodes(content ?? input);
    if (nodes.length === 0 || divider !== "|") {
      return null;
    }
    const restParsed = ChoiceNode.parse(rest);
    if (!restParsed) {
      return null;
    }

    return {
      node: new ChoiceNode([nodes, ...restParsed.node.value]),
      remaining,
    };
  }
}

class ReferenceNode extends Node<string> {
  type = "reference" as const;

  static parse(input: string): { node: ReferenceNode; remaining: string } | null {
    const match = input.match(/^([a-z][a-z_]*)/);
    if (match) {
      return {
        node: new ReferenceNode(match[1]),
        remaining: input.slice(match[0].length).trimStart(),
      };
    }
    return null;
  }
}

// Parse a sequence of nodes
function parseNodes(input: string, parseFully = false) {
  const nodes: Node<unknown>[] = [];
  let remaining = input.trim();

  while (remaining) {
    // Try each parser in order
    const parsers = [
      ExplicitParametersNode.parse,
      ChoiceNode.parse,
      RepetitionNode.parse,
      OptionalNode.parse,
      KeywordNode.parse,
      ReferenceNode.parse,
    ];

    for (const parser of parsers) {
      const result = parser(remaining);
      if (result) {
        nodes.push(result.node);
        remaining = result.remaining;
        break;
      }
    }
  }

  if (parseFully) {
    invariant(remaining === "", `Failed to fully parse input: ${input} -> '${remaining}'`);
  }

  return { nodes, remaining };
}

type Block = {
  lines: string[];
  isOneOf: boolean;
};

// Preprocess the file
function preprocess(content: string): { [key: string]: Block } & { $root: Block } {
  const blocks: { [key: string]: Block } & { $root: Block } = {
    $root: {
      lines: [],
      isOneOf: true,
    },
  };
  let currentBlock = "__root__";

  for (const line of normalizeLines(content.split("\n"))) {
    // Check for block header
    const blockMatch = line.match(/^(?:where |and )?`([^`]+)` is(?: one of)?:/);
    if (blockMatch) {
      const currentBlock = blockMatch[1];
      blocks[currentBlock] = {
        lines: [],
        isOneOf: line.includes("one of"),
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
    const baseIndent = line.match(/^(\s*)/)?.[1].length || 0;
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

// Main parse function
const parse = (filePath?: string) => {
  const file = filePath || path.join(__dirname, "alter-table.md");
  const content = fs.readFileSync(file, "utf-8");

  const blocks = preprocess(content);
  return Object.fromEntries(
    Object.entries(blocks).map(([k, v]) => {
        const parsed = v.lines.map((l) => parseNodes(l, true).nodes);
        return [k, v.isOneOf ? [new ChoiceNode(parsed)] : parsed.flat()];
    }),
  );
};

// Test
if (require.main === module) {
  const result = parse();
  console.log(JSON.stringify(result, null, 2));
}
