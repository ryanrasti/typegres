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
  direction: "inbound",
  ...overrides,
});

describe("generateTable — new file", async () => {
  test("default emit: @expose on every column + relation, Relation helpers, full file shape", async () => {
    const out = generateTable(
      "dogs",
      [
        col("id", "Int8", { generated: true }),
        col("name", "Text"),
      ],
      [rel("teams", "teams", {
        cardinality: "one",
        fromColumn: "team_id",
        toColumn: "id",
        direction: "outbound",
      })],
      { typeImportPath: "typegres/postgres", dbImport: "../db" },
    );
    await validate(out);
    expect(out).toMatchInlineSnapshot(`
      "import { db } from "../db";
      import { Relation, expose } from "typegres";
      import { Int8, Text } from "typegres/postgres";
      import { Teams } from "./teams";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        // relations
        @expose() teams() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
        // @generated-end
      }
      "
    `);
  });

  test("inbound has + outbound belongsTo emit card opts only when non-default", async () => {
    const out = generateTable(
      "teams",
      [col("id", "Int8", { generated: true })],
      [
        rel("dogs", "dogs", { cardinality: "many", fromColumn: "id", toColumn: "team_id", direction: "inbound" }),
        rel("collars", "collars", { cardinality: "one", fromColumn: "id", toColumn: "team_id", direction: "inbound" }),
        rel("badge", "badge", { cardinality: "maybe", fromColumn: "id", toColumn: "team_id", direction: "inbound" }),
        rel("owner", "users", {
          cardinality: "maybe",
          fromColumn: "owner_id",
          toColumn: "id",
          direction: "outbound",
        }),
        rel("captain", "users", {
          cardinality: "one",
          fromColumn: "captain_id",
          toColumn: "id",
          direction: "outbound",
        }),
      ],
      { typeImportPath: "typegres/postgres", dbImport: "../db" },
    );
    await validate(out);
    // has defaults to "many" — omit opts
    expect(out).toContain(`Relation.has(this, Dogs, { team_id: this.id })`);
    expect(out).toContain(`Relation.has(this, Collars, { team_id: this.id }, { card: "one" })`);
    expect(out).toContain(`Relation.has(this, Badge, { team_id: this.id }, { card: "maybe" })`);
    // belongsTo defaults to "one" — omit opts; nullable outbound passes maybe
    expect(out).toContain(`Relation.belongsTo(this, Users, { id: this.owner_id }, { card: "maybe" })`);
    expect(out).toContain(`Relation.belongsTo(this, Users, { id: this.captain_id })`);
    expect(out).not.toContain(`captain_id }, { card`);
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
      import { expose, sql } from "typegres";
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
  const rels: Relation[] = [rel("teams", "teams", {
    cardinality: "one",
    fromColumn: "team_id",
    toColumn: "id",
    direction: "outbound",
  })];

  test("entries the user stripped stay stripped on regen", async () => {
    const existing = `import { db } from "../db";
import { Int8, Text } from "typegres";

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
      import { Int8, Text } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
        // relations
        teams() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
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
      import { Int8, Text } from "typegres";
      import { expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        @expose() name = Text.column({ nonNull: true });
        // relations
        @expose() teams() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
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
      import { Int8, Text, expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        @expose() id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
        // relations
        teams() { return Relation.belongsTo(this, Teams, { id: this.team_id }); }
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
      import { expose } from "typegres";

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
import { Int8, Text, expose } from "typegres";

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
      import { Int8, Text, expose } from "typegres";

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = Int8.column({ nonNull: true, generated: true });
        @expose() breed = Text.column();
        // @generated-end
      }
      "
    `);
  });

  test("update mode preserves header and post-block methods; only the block changes", async () => {
    // Stale imports + a hand-written method after the generated block.
    // Header (including comments) is byte-preserved; only the generated interior is rewritten.
    const existing = `import { db } from "../db";
import { Int8 } from "typegres";
// my custom comment (header comments are not preserved)

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = Int8.column({ nonNull: true, generated: true });
  // @generated-end

  bark() { return "woof"; }
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
      import { Int8 } from "typegres";
      // my custom comment (header comments are not preserved)

      export class Dogs extends db.Table("dogs") {
        // @generated-start
        id = Int8.column({ nonNull: true, generated: true });
        // @generated-end

        bark() { return "woof"; }
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
