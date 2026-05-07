import { describe, test, expect } from "vitest";
import { generateTable, type ColumnInfo, type Relation } from "./generate";

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

describe("generateTable — new file", () => {
  test("default emit: @tool on every column + relation, scope+contextOf, full file shape", () => {
    const out = generateTable(
      "dogs",
      [
        col("id", "int8", { identity_generation: "ALWAYS" }),
        col("name", "text"),
      ],
      [rel("teams", "teams", { cardinality: "one", fromColumn: "team_id", toColumn: "id" })],
      { dbImport: "../db" },
    );
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, tool } from "typegres";
      import { Teams } from "./teams";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
        @tool() name = (Text<1>).column({ nonNull: true });
        // relations
        @tool() teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("column options: nullable, default, generated", () => {
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
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, Timestamptz, sql, tool } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
        @tool() breed = (Text<0 | 1>).column();
        @tool() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql\`now()\` });
        // @generated-end
      }
      "
    `);
  });
});

describe("generateTable — update mode preserves @tool() state", () => {
  const cols: ColumnInfo[] = [col("id", "int8", { identity_generation: "ALWAYS" }), col("name", "text")];
  const rels: Relation[] = [rel("teams", "teams", { cardinality: "one", fromColumn: "team_id", toColumn: "id" })];

  test("entries the user stripped stay stripped on regen", () => {
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

  test("entries the user decorated stay decorated on regen", () => {
    const existing = `import { db } from "../db";
import { Int8, Text } from "typegres";
import { tool } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  // relations
  @tool() teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { dbImport: "../db", existing });
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text } from "typegres";
      import { tool } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
        @tool() name = (Text<1>).column({ nonNull: true });
        // relations
        @tool() teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("mixed: per-entry preservation", () => {
    const existing = `import { db } from "../db";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  // relations
  teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { dbImport: "../db", existing });
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
        // relations
        teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("decorator on previous line is recognized", () => {
    const existing = `import { db } from "../db";
import { tool } from "typegres";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @tool()
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  // @generated-end
}
`;
    const out = generateTable("dogs", [col("id", "int8", { identity_generation: "ALWAYS" }), col("name", "text")], [], {
      dbImport: "../db",
      existing,
    });
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { tool } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
        // @generated-end
      }
      "
    `);
  });

  test("schema migration adds new column → new entry decorated by default", () => {
    const existingNoTool = `import { db } from "../db";

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
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = (Int8<1>).column({ nonNull: true, generated: true });
        @tool() breed = (Text<0 | 1>).column();
        // @generated-end
      }
      "
    `);
  });

  test("update mode does not touch imports / preserves custom comments", () => {
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

  test("missing markers throws", () => {
    const existing = `export class Dogs extends db.Table("dogs") {}\n`;
    expect(() => generateTable("dogs", cols, rels, { dbImport: "../db", existing })).toThrow(
      /Missing @generated-start/,
    );
  });
});
