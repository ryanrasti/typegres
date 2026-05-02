import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "./types";
import { sql } from "./builder/sql";
import { setupDb, db, withinTransaction } from "./test-helpers";
import type { Fromable } from "./builder/query";

setupDb();

test("Table.from().select()", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
    await tx.execute(sql`CREATE TABLE dogs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      breed text
    )`);
    await tx.execute(sql`INSERT INTO dogs (name, breed) VALUES ('Rex', 'Labrador'), ('Fido', NULL)`);

    class Dogs extends db.Table("dogs") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });      breed = (Text<0 | 1>).column();    }

    const rows = await tx.execute(Dogs.from()
      .select(({ dogs }) => ({ id: dogs.id, name: dogs.name, breed: dogs.breed }))
      );

    expectTypeOf(rows).toEqualTypeOf<{ id: string; name: string; breed: string | null }[]>();
    expect(rows).toEqual([
      { id: "1", name: "Rex", breed: "Labrador" },
      { id: "2", name: "Fido", breed: null },
    ]);
  });
});

test("Table.as() alias", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
    await tx.execute(sql`CREATE TABLE dogs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      breed text
    )`);
    await tx.execute(sql`INSERT INTO dogs (name, breed) VALUES ('Rex', 'Labrador'), ('Fido', NULL)`);

    class Dogs extends db.Table("dogs") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });      breed = (Text<0 | 1>).column();    }

    const rows = await tx.execute(Dogs.as("d").from()
      .select(({ d }) => ({ id: d.id, name: d.name, breed: d.breed }))
      );

    expectTypeOf(rows).toEqualTypeOf<{ id: string; name: string; breed: string | null }[]>();
    expect(rows).toEqual([
      { id: "1", name: "Rex", breed: "Labrador" },
      { id: "2", name: "Fido", breed: null },
    ]);
  });
});

// Covers the core class-as-Fromable contract: the Table class itself
// structurally satisfies Fromable (via statics), db.from(Class) works, and
// .as() produces a fresh subclass with an independent alias so the same
// table can self-join without a double-register error.
test("Table class is a Fromable and self-joins via .as()", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`DROP TABLE IF EXISTS employees CASCADE`);
    await tx.execute(sql`CREATE TABLE employees (
      id int8 PRIMARY KEY,
      name text NOT NULL,
      manager_id int8
    )`);
    await tx.execute(sql`
      INSERT INTO employees (id, name, manager_id) VALUES
        (1, 'Alice', NULL),
        (2, 'Bob', 1),
        (3, 'Carol', 1)
    `);

    class Employees extends db.Table("employees") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });      manager_id = (Int8<0 | 1>).column();    }

    // 1. The class itself has the Fromable-shaped statics.
    expect(Employees.tsAlias).toBe("employees");
    expect(Employees.rowType()).toBeInstanceOf(Employees);
    expect(typeof Employees.bind).toBe("function");
    // Type-level: `typeof Employees` satisfies Fromable via its statics.
    //   (The `satisfies Fromable` on TableBase in src/table.ts asserts this
    //    for the base; repeating here ensures user subclasses preserve it.)
    const _fromableCheck: Fromable = Employees as unknown as Fromable;
    void _fromableCheck;

    // 2. db.from(Class) / Class.from() consume the statics directly.
    const allNames = await tx.execute(
      Employees.from().select(({ employees }) => ({ name: employees.name })).orderBy(({ employees }) => employees.id),
    );
    expect(allNames.map((r) => r.name)).toEqual(["Alice", "Bob", "Carol"]);

    // 3. Self-join via .as() — the same table used twice must register as
    //    two independent aliases. Without .as() (same class, same static
    //    alias), the scope would throw on double-register.
    const Mgr = Employees.as("mgr");
    expect(Mgr.tsAlias).toBe("mgr");
    expect(Mgr.tsAlias).not.toBe(Employees.tsAlias); // fresh identity

    // Pass classes to .join, not `.from()` subqueries — the class IS the
    //    Fromable, so this emits `JOIN employees AS mgr ON ...` directly.
    const reports = await tx.execute(
      Employees.from()
        .join(Mgr, ({ employees, mgr }) => employees.manager_id["="](mgr.id))
        .select(({ employees, mgr }) => ({
          employee: employees.name,
          manager: mgr.name,
        }))
        .orderBy(({ employees }) => employees.id),
    );
    expect(reports).toEqual([
      { employee: "Bob", manager: "Alice" },
      { employee: "Carol", manager: "Alice" },
    ]);
  });
});
