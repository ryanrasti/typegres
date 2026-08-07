// End-to-end test that the README's Usage snippet actually runs against
// a fresh `npm install`. Catches drift between the README and the API
// surface — anything that breaks the snippet (renamed export, changed
// init signature, decorator semantics) fails this test in CI before the
// README ever gets to a reader.
//
// The snippet is fully self-contained: it spins up an in-memory SQLite
// database, creates its own table, inserts, and queries — so this test
// needs no database fixture at all. That's the point of the snippet:
// `npm install`, paste, run.
//
// Two install modes:
//   - working-tree (default): `npm pack` the repo and install the tarball.
//     Tests what the README *will* be when this code publishes — both that
//     the snippet runs and that the published artifact resolves. Requires
//     dist/ to be built.
//   - registry (TYPEGRES_README_TEST_REGISTRY=1): install `typegres`
//     from npm. Tests what the README *currently is* for someone
//     running it against the latest published version. Useful
//     post-release.
//
// Why swc and not tsx / node strip-types: Node can strip TS types but
// doesn't transform stage-3 decorators yet, and the snippet uses
// `@expose()` on every column. We compile via @swc/core (already a dep)
// and run the JS output with plain node — no extra runner to install.

import { test, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import * as swc from "@swc/core";

const execFileP = promisify(execFile);
const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const README_PATH = path.join(REPO_ROOT, "README.md");

type InstallMode = "working-tree" | "registry";

// Working-tree mode installs a real tarball, not `file:${REPO_ROOT}`.
//
// That distinction is load-bearing. npm resolves a `file:` directory dep by
// symlinking, and Node resolves through the symlink's real path — so the
// consumer transitively sees the *repo's own* node_modules, and a dependency
// the published package can't actually resolve still works. That is exactly
// how `typegres/capnweb` shipped importable-but-unloadable while this suite
// stayed green. Only a tarball install reproduces what a registry consumer
// gets.
//
// Packed once and shared: `npm pack` costs a second or two, and every
// section installs the same artifact.
let packed: Promise<string> | undefined;
const packTypegres = (): Promise<string> => {
  packed ??= (async () => {
    if (!fs.existsSync(path.join(REPO_ROOT, "dist", "index.mjs"))) {
      throw new Error("working-tree mode needs dist/ — run `npm run build` first");
    }
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "typegres-pack-"));
    const { stdout } = await execFileP(
      "npm",
      ["pack", "--pack-destination", dir, "--silent"],
      { cwd: REPO_ROOT },
    );
    return path.join(dir, stdout.trim().split("\n").pop()!);
  })();
  return packed;
};

// A runnable README section owns an install line and a program, so the
// install line stays honest — whatever the snippet imports has to appear in
// the `npm install` a reader would actually run.
const runReadmeSection = async (
  heading: string,
  mode: InstallMode,
  expected: string[],
  unexpected: string[] = [],
): Promise<void> => {
  const readme = fs.readFileSync(README_PATH, "utf8");
  // Scope to one section so we don't pick up code blocks from the others
  // (Backends, Development, ...).
  const section =
    new RegExp(`## ${heading}[\\s\\S]*?(?=\\n## |$)`).exec(readme)?.[0] ?? "";
  const bashSnippet = /```bash\n([\s\S]*?)```/.exec(section)?.[1]?.trim();
  const tsSnippet = /```typescript\n([\s\S]*?)```/.exec(section)?.[1];
  if (!bashSnippet || !tsSnippet) {
    throw new Error(
      `README: couldn't find both \`\`\`bash\`\`\` and \`\`\`typescript\`\`\` blocks under ## ${heading}`,
    );
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `typegres-readme-${mode}-`));

  fs.writeFileSync(
    path.join(tmpDir, "package.json"),
    JSON.stringify({ name: "readme-test", type: "module", private: true }),
  );

  // working-tree: swap the `typegres` package name for the packed tarball,
  // leaving the rest of the README's install line intact (better-sqlite3,
  // zod, ...). registry: install verbatim from npm.
  //
  // --no-audit/--no-fund shave a few seconds off a disposable tmp dir.
  //
  // Deliberately NOT --prefer-offline: it makes npm trust a cached
  // packument, so a developer whose cache predates a peer's current
  // versions gets ETARGET on a range that resolves fine against the
  // registry. That's a failure about the machine, not the change under
  // test, and it costs more in confusion than the flag saves in seconds.
  const installCmd = (
    mode === "working-tree"
      ? bashSnippet.replace(/\btypegres\b/, JSON.stringify(await packTypegres()))
      : bashSnippet
  ).replace(/\bnpm install\b/, "npm install --no-audit --no-fund");
  await execFileP("sh", ["-c", installCmd], { cwd: tmpDir });

  // Compile the snippet via swc — handles stage-3 decorators that
  // node's strip-types alone can't transform.
  const compiled = await swc.transform(tsSnippet, {
    filename: "main.ts",
    jsc: {
      target: "es2022",
      parser: { syntax: "typescript", decorators: true },
      transform: { decoratorVersion: "2022-03" },
    },
    module: { type: "es6" },
    isModule: true,
  });
  fs.writeFileSync(path.join(tmpDir, "main.mjs"), compiled.code);

  const { stdout } = await execFileP("node", ["main.mjs"], { cwd: tmpDir });

  for (const want of expected) {
    expect(stdout).toContain(want);
  }
  for (const avoid of unexpected) {
    expect(stdout).not.toContain(avoid);
  }

  // Only delete the temp dir if everything succeeded — leave it behind
  // for debugging on failure.
  fs.rmSync(tmpDir, { recursive: true, force: true });
};

// The Usage snippet runs the whole arc in one program: a direct server-side
// query, then the same data model reached by a client over RPC. The negative
// assertions are what make it meaningful — `Carol` absent proves feedFor's
// team scoping survived a client-authored group-by (she's on another team and
// is deliberately inserted only after the direct query, so she can't leak in
// via that), `not yours` absent proves her post never crossed the wire, and
// `team_token` absent proves the un-@expose'd column stayed invisible even
// though the server filtered on it.
test(
  "README.md Usage snippet — working tree (packed tarball)",
  () =>
    runReadmeSection(
      "Usage",
      "working-tree",
      [
        // "Alice Smith" (not "Alice") pins the derived column: the client
        // grouped by a method, so a plain column read prints the wrong string.
        "Alice Smith",
        "Bob Jones",
        // Pins the aggregate itself — without it the test would pass on any
        // query that merely returned both names.
        "posts: 2",
        // The relation walk — Alice's two posts and only hers.
        "body: 'one'",
        "body: 'two'",
      ],
      ["Carol", "Vance", "t-acme", "team_token", "not yours", "three"],
    ),
  60_000, // typical: ~5s; generous for better-sqlite3 prebuilt download on cache misses.
);

// Registry mode: opt-in via env var. Tests the currently-published
// `typegres` against the README — useful post-release. Skipped by
// default so PR CI doesn't fail on registry hiccups or version drift.
test.runIf(process.env["TYPEGRES_README_TEST_REGISTRY"] === "1")(
  "README.md Usage snippet — registry (npm install typegres)",
  () => runReadmeSection("Usage", "registry", ["Alice Smith", "Bob Jones"]),
  120_000,
);
