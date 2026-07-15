import { describe, test, expect } from "vitest";
import { generateTable, type ColumnInfo, type Relation } from "./generate";
import { validateGenerated as validate } from "./validate-generated";

// Helpers — terse fixtures so each test reads as a single intent.
const col = (
  name: string,
  className: string,
  overrides: Partial<ColumnInfo> = {},
): ColumnInfo => ({
  name,
  className,
  nullable: false,
  default: null,
  generated: false,
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
        col("id", "Int8", { generated: true }),
        col("name", "Text"),
      ],
      [rel("teams", "teams", { cardinality: "one", fromColumn: "team_id", toColumn: "id" })],
      { typeImportPath: "typegres/postgres", dbImport: "../db" },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose } from "typegres/core";
      import { Int8, Text } from "typegres/postgres";
      import { Teams } from "./teams";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        // relations
        @expose() teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id.eq(this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("column options: nullable, default, generated", async () => {
    const out = generateTable(
      "dogs",
      [
        col("id", "Int8", { generated: true }),
        col("breed", "Text", { nullable: true }),
        col("created_at", "Timestamptz", { default: "now()" }),
      ],
      [],
      { typeImportPath: "typegres/postgres", dbImport: "../db" },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose, sql } from "typegres/core";
      import { Int8, Text, Timestamptz } from "typegres/postgres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() breed = Text.column();
        @expose() created_at = Timestamptz.column({ nonNull: true, default: sql\`now()\` });
        // @generated-end
      }
      "
    `);
  });
});

describe("generateTable — update mode preserves @expose() state", async () => {
  const cols: ColumnInfo[] = [col("id", "Int8", { generated: true }), col("name", "Text")];
  const rels: Relation[] = [rel("teams", "teams", { cardinality: "one", fromColumn: "team_id", toColumn: "id" })];

  test("entries the user stripped stay stripped on regen", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text } from "typegres/core";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = Int8.column({ nonNull: true, generated: true });
  name = Text.column({ nonNull: true });
  // relations
  teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { typeImportPath: "typegres/postgres", dbImport: "../db", existing });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text } from "typegres/core";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
        // relations
        teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id.eq(this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("entries the user decorated stay decorated on regen", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text } from "typegres/core";
import { expose } from "typegres/core";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  // relations
  @expose() teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { typeImportPath: "typegres/postgres", dbImport: "../db", existing });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text } from "typegres/core";
      import { expose } from "typegres/core";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        // relations
        @expose() teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id.eq(this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("mixed: per-entry preservation", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text, expose } from "typegres/core";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  name = Text.column({ nonNull: true });
  // relations
  teams() { return Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one"); }
  // @generated-end
}
`;
    const out = generateTable("dogs", cols, rels, { typeImportPath: "typegres/postgres", dbImport: "../db", existing });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, expose } from "typegres/core";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
        // relations
        teams() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id.eq(this.team_id)).cardinality("one"); }
        // @generated-end
      }
      "
    `);
  });

  test("decorator on previous line is recognized", async () => {
    const existing = `import { db } from "../db";
import { expose } from "typegres/core";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose()
  id = Int8.column({ nonNull: true, generated: true });
  name = Text.column({ nonNull: true });
  // @generated-end
}
`;
    const out = generateTable("dogs", [col("id", "Int8", { generated: true }), col("name", "Text")], [], {
      typeImportPath: "typegres/postgres",
      dbImport: "../db",
      existing,
    });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { expose } from "typegres/core";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
        // @generated-end
      }
      "
    `);
  });

  test("schema migration adds new column → new entry decorated by default", async () => {
    const existingNoTool = `import { db } from "../db";
import { Int8, Text, expose } from "typegres/core";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = Int8.column({ nonNull: true, generated: true });
  // @generated-end
}
`;
    const out = generateTable(
      "dogs",
      [col("id", "Int8", { generated: true }), col("breed", "Text", { nullable: true })],
      [],
      { typeImportPath: "typegres/postgres", dbImport: "../db", existing: existingNoTool },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8, Text, expose } from "typegres/core";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = Int8.column({ nonNull: true, generated: true });
        @expose() breed = Text.column();
        // @generated-end
      }
      "
    `);
  });

  test("update mode does not touch imports / preserves custom comments", async () => {
    const existing = `import { db } from "../db";
import { Int8 } from "typegres/core";
// my custom comment

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = Int8.column({ nonNull: true, generated: true });
  // @generated-end
}
`;
    const out = generateTable("dogs", [col("id", "Int8", { generated: true })], [], {
      typeImportPath: "typegres/postgres",
      dbImport: "../db",
      existing,
    });
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Int8 } from "typegres/core";
      // my custom comment

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = Int8.column({ nonNull: true, generated: true });
        // @generated-end
      }
      "
    `);
  });

  test("missing markers throws", async () => {
    const existing = `export class Dogs extends db.Table("dogs") {}\n`;
    expect(() => generateTable("dogs", cols, rels, { typeImportPath: "typegres/postgres", dbImport: "../db", existing })).toThrow(
      /Missing @generated-start/,
    );
  });
});
