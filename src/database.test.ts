import { test, expect } from "vitest";
import { Int8, Text } from "./types";
import { sql } from "./builder/sql";
import { exec, db } from "./builder/test-helper";

test("transaction commits on success", async () => {
  await exec.execute(sql`CREATE TABLE txtest (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest extends db.Table("txtest") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    name = (Text<1>).column({ nonNull: true });
  }

  await db.transaction(async () => {
    await TxTest.insert({ name: "Alice" }).execute();
    await TxTest.insert({ name: "Bob" }).execute();
  });

  const rows = await TxTest.from()
    .select(({ txtest }) => ({ name: txtest.name }))
    .execute();

  expect(rows).toEqual([{ name: "Alice" }, { name: "Bob" }]);
  await exec.execute(sql`DROP TABLE txtest`);
});

test("transaction rollbacks on error", async () => {
  await exec.execute(sql`CREATE TABLE txtest2 (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest2 extends db.Table("txtest2") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    name = (Text<1>).column({ nonNull: true });
  }

  await expect(
    db.transaction(async () => {
      await TxTest2.insert({ name: "Alice" }).execute();
      throw new Error("rollback!");
    })
  ).rejects.toThrow("rollback!");

  const rows = await TxTest2.from()
    .select(({ txtest2 }) => ({ name: txtest2.name }))
    .execute();

  expect(rows).toEqual([]);
  await exec.execute(sql`DROP TABLE txtest2`);
});
