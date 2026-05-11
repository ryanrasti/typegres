// End-to-end test that the README's Usage snippet actually runs against
// a fresh `npm install`. Catches drift between the README and the API
// surface — anything that breaks the snippet (renamed export, changed
// init signature, decorator semantics) fails this test in CI before the
// README ever gets to a reader.
//
// Two install modes:
//   - working-tree (default): `npm install file:<repo>`, which packs the
//     local repo internally and honors the package.json `files`
//     manifest. Tests what the README *will* be when this code
//     publishes — catches drift in PRs. Requires dist/ to be built.
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
import { sql } from "./builder/sql";
import { setupDb, db } from "./test-helpers";
import { requireDatabaseUrl } from "./pg";

const execFileP = promisify(execFile);
const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const README_PATH = path.join(REPO_ROOT, "README.md");

setupDb();

type InstallMode = "working-tree" | "registry";

const runReadmeUsage = async (mode: InstallMode): Promise<void> => {
  const readme = fs.readFileSync(README_PATH, "utf8");
  // Scope to the Usage section so we don't pick up code blocks from
  // other sections (Development, Status, etc.).
  const usageSection = /## Usage[\s\S]*?(?=\n## |$)/.exec(readme)?.[0] ?? "";
  const bashSnippet = /```bash\n([\s\S]*?)```/.exec(usageSection)?.[1]?.trim();
  const tsSnippet = /```typescript\n([\s\S]*?)```/.exec(usageSection)?.[1];
  if (!bashSnippet || !tsSnippet) {
    throw new Error(
      "README: couldn't find both ```bash``` and ```typescript``` blocks under ## Usage",
    );
  }

  // working-tree mode installs from the repo via a file: reference,
  // which honors `files: ["dist"]` — so dist/ must be built.
  if (mode === "working-tree" && !fs.existsSync(path.join(REPO_ROOT, "dist", "index.mjs"))) {
    throw new Error("working-tree mode needs dist/ — run `npm run build` first");
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `typegres-readme-${mode}-`));
  try {
    fs.writeFileSync(
      path.join(tmpDir, "package.json"),
      JSON.stringify({ name: "readme-test", type: "module", private: true }),
    );

    // working-tree: file: reference to the repo. npm packs the local
    // directory using the `files` manifest internally — same effect as
    // `npm pack && npm install <tarball>`, no tarball management.
    // registry: install verbatim from npm.
    //
    // Flags shave ~3-5s off install: skip the security audit (we're a
    // disposable tmp dir), skip funding messages, prefer the offline
    // cache before hitting the registry.
    const installCmd = (
      mode === "working-tree"
        ? bashSnippet.replace(/\btypegres\b/, JSON.stringify(`file:${REPO_ROOT}`))
        : bashSnippet
    ).replace(/\bnpm install\b/, `npm install --no-audit --no-fund ${mode === 'working-tree' ? '--prefer-offline' : ''}`);
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

    // Seed the per-worker schema with what the snippet expects.
    await db.execute(sql`CREATE TABLE users (
      id         int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      first_name text NOT NULL,
      last_name  text NOT NULL
    )`);
    await db.execute(sql`INSERT INTO users (first_name, last_name) VALUES
      ('Alice', 'Smith'),
      ('Bob', 'Jones')`);

    // Same DB; PGOPTIONS pins search_path to the worker schema so bare
    // `users` resolves into the test's namespace.
    const schema = `test_w${process.env["VITEST_WORKER_ID"] ?? "1"}`;
    const { stdout } = await execFileP("node", ["main.mjs"], {
      cwd: tmpDir,
      env: {
        ...process.env,
        DATABASE_URL: requireDatabaseUrl(),
        PGOPTIONS: `-csearch_path=${schema}`,
      },
    });

    expect(stdout).toContain("Alice Smith");
    expect(stdout).toContain("Bob Jones");
  } finally {
    await db.execute(sql`DROP TABLE IF EXISTS users`).catch(() => {});
  }
  // Only delete the temp dir if everything succeeded:
  fs.rmSync(tmpDir, { recursive: true, force: true });
};

test(
  "README.md Usage snippet — working tree (file:)",
  () => runReadmeUsage("working-tree"),
  30_000, // typical: ~2s; generous for slow npm cache misses.
);

// Registry mode: opt-in via env var. Tests the currently-published
// `typegres` against the README — useful post-release. Skipped by
// default so PR CI doesn't fail on registry hiccups or version drift.
test.runIf(process.env["TYPEGRES_README_TEST_REGISTRY"] === "1")(
  "README.md Usage snippet — registry (npm install typegres)",
  () => runReadmeUsage("registry"),
  120_000,
);
