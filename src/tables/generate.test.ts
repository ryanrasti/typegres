import { describe, test, expect } from "vitest";
import * as swc from "@swc/core";
import { generateTable, type ColumnInfo, type Relation } from "./generate";

// Validate generated code: (1) syntactically valid TS that swc can
// transform with the same decorator config typegres' build uses;
// (2) every `@<name>` decorator referenced in the body has a matching
// import. swc alone catches syntax/transform errors but happily emits
// `(0, expose)()` even when `expose` isn't imported — the import
// check closes that gap (caught a rename-drift bug otherwise invisible
// to inline snapshot tests).
const validate = async (out: string): Promise<void> => {
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
      if (id) {imported.add(id);}
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

// Helpers — terse fixtures so each test reads as a single intent.
const col = (
  column_name: string,
  udt_name: string,
  overrides: Partial<ColumnInfo> = {},
): ColumnInfo => ({
  column_name,
  udt_name,
  is_nullable: "NO",
  column_default: null,
  is_generated: "NEVER",
  identity_generation: null,
  ...overrides,
});

const rel = (name: string, targetTable: string, overrides: Partial<Relation> = {}): Relation => ({
  name,
  targetTable,
  cardinality: "many",
  fromColumn: "id",
  toColumn: `${targetTable}_id`,
  ...overrides,
});

describe("generateTable — new file", async () => {
  test("default emit: @expose on every column + relation, scope+contextOf, full file shape", async () => {
    const out = generateTable(
      "dogs",
      [
        col("id", "int8", { identity_generation: "ALWAYS" }),
        col("name", "text"),
      ],
      [rel("teams", "teams", { cardinality: "one", fromColumn: "team_id", toColumn: "id" })],
      { dbImport: "../db" },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, expose } from "typegres";
      import { Teams } from "./teams";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
        @expose() name = (Text<1>).column({ nonNull: true });
        // relations
        @expose() teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("column options: nullable, default, generated", async () => {
    const out = generateTable(
      "dogs",
      [
        col("id", "int8", { identity_generation: "ALWAYS" }),
        col("breed", "text", { is_nullable: "YES" }),
        col("created_at", "timestamptz", { column_default: "now()" }),
      ],
      [],
      { dbImport: "../db" },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, Timestamptz, expose, sql } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
        @expose() breed = (Text<0 | 1>).column();
        @expose() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql\`now()\` });
        // @generated-end
      }
      "
    `);
  });
});

describe("generateTable — update mode preserves @expose() state", async () => {
  const cols: ColumnInfo[] = [col("id", "int8", { identity_generation: "ALWAYS" }), col("name", "text")];
  const rels: Relation[] = [rel("teams", "teams", { cardinality: "one", fromColumn: "team_id", toColumn: "id" })];

  test("entries the user stripped stay stripped on regen", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  // relations
  teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { dbImport: "../db", existing });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
        // relations
        teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("entries the user decorated stay decorated on regen", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text } from "typegres";
import { expose } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() name = (Text<1>).column({ nonNull: true });
  // relations
  @expose() teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { dbImport: "../db", existing });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text } from "typegres";
      import { expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
        @expose() name = (Text<1>).column({ nonNull: true });
        // relations
        @expose() teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("mixed: per-entry preservation", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text, expose } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  // relations
  teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { dbImport: "../db", existing });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
        // relations
        teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("decorator on previous line is recognized", async () => {
    const existing = `import { db } from "../db";
import { expose } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose()
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  // @generated-end
}
`;
    const out = generateTable("dogs", [col("id", "int8", { identity_generation: "ALWAYS" }), col("name", "text")], [], {
      dbImport: "../db",
      existing,
    });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
        // @generated-end
      }
      "
    `);
  });

  test("schema migration adds new column → new entry decorated by default", async () => {
    const existingNoTool = `import { db } from "../db";
import { Int8, Text, expose } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  // @generated-end
}
`;
    const out = generateTable(
      "dogs",
      [col("id", "int8", { identity_generation: "ALWAYS" }), col("breed", "text", { is_nullable: "YES" })],
      [],
      { dbImport: "../db", existing: existingNoTool },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = (Int8<1>).column({ nonNull: true, generated: true });
        @expose() breed = (Text<0 | 1>).column();
        // @generated-end
      }
      "
    `);
  });

  test("update mode does not touch imports / preserves custom comments", async () => {
    const existing = `import { db } from "../db";
import { Int8 } from "typegres";
// my custom comment

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  // @generated-end
}
`;
    const out = generateTable("dogs", [col("id", "int8", { identity_generation: "ALWAYS" })], [], {
      dbImport: "../db",
      existing,
    });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8 } from "typegres";
      // my custom comment

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = (Int8<1>).column({ nonNull: true, generated: true });
        // @generated-end
      }
      "
    `);
  });

  test("missing markers throws", async () => {
    const existing = `export class Dogs extends db.Table("dogs") {}\n`;
    expect(() => generateTable("dogs", cols, rels, { dbImport: "../db", existing })).toThrow(
      /Missing @generated-start/,
    );
  });
});
