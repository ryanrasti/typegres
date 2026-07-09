// Test-only helper shared by the codegen suites (generate.test.ts,
// sqlite.test.ts, postgres.test.ts).
//
// Validates generated code: (1) syntactically valid TS that swc can
// transform with the same decorator config typegres' build uses;
// (2) every `@<name>` decorator referenced in the body has a matching
// import. swc alone catches syntax/transform errors but happily emits
// `(0, expose)()` even when `expose` isn't imported — the import
// check closes that gap (caught a rename-drift bug otherwise invisible
// to inline snapshot tests).
import * as swc from "@swc/core";

export const validateGenerated = async (out: string): Promise<void> => {
  await swc.transform(out, {
    filename: "generated.ts",
    jsc: {
      target: "es2022",
      parser: { syntax: "typescript", decorators: true },
      transform: { decoratorVersion: "2022-03" },
    },
    module: { type: "es6" },
    isModule: true,
  });

  const decorators = new Set(
    [...out.matchAll(/@(\w+)(?:\.\w+)?\(/g)].map((m) => m[1]!),
  );
  const imported = new Set<string>();
  for (const m of out.matchAll(/import\s*\{([^}]*)\}/g)) {
    for (const raw of m[1]!.split(",")) {
      const id = raw.trim().split(/\s+as\s+/)[0]!.replace(/^type\s+/, "").trim();
      if (id) { imported.add(id); }
    }
  }
  for (const d of decorators) {
    if (!imported.has(d)) {
      throw new Error(
        `generated code uses @${d}() but doesn't import \`${d}\`. Imports: [${[...imported].join(", ")}]`,
      );
    }
  }
};
