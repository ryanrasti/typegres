import { test, expect, expectTypeOf } from "vitest";
import { Int8, Text } from "../types";
import { sql } from "./sql";
import { exec, db, withinTransaction } from "./test-helper";

test("update with where", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE users (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      active text NOT NULL DEFAULT 'yes'
    )`);
    await exec.execute(sql`INSERT INTO users (name) VALUES ('Alice'), ('Bob')`);

    class Users extends db.Table("users") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
      active = (Text<1>).column({ nonNull: true, default: sql`'yes'` });
    }

    await Users.update()
      .where(({ users }) => users.name["="]("Bob"))
      .set(() => ({ active: "no" }))
      .execute();

    const rows = await Users.from()
      .select(({ users }) => ({ name: users.name, active: users.active }))
      .orderBy(({ users }) => users.name)
      .execute();

    expect(rows).toEqual([
      { name: "Alice", active: "yes" },
      { name: "Bob", active: "no" },
    ]);
  });
});

test("update all with where(true)", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE flags (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      active text NOT NULL DEFAULT 'yes'
    )`);
    await exec.execute(sql`INSERT INTO flags (active) VALUES ('yes'), ('yes')`);

    class Flags extends db.Table("flags") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      active = (Text<1>).column({ nonNull: true, default: sql`'yes'` });
    }

    await Flags.update().where(true).set(() => ({ active: "no" })).execute();

    const rows = await Flags.from()
      .select(({ flags }) => ({ active: flags.active }))
      .execute();

    expect(rows).toEqual([{ active: "no" }, { active: "no" }]);
  });
});

test("update returning", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE scores (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      score text NOT NULL DEFAULT '0'
    )`);
    await exec.execute(sql`INSERT INTO scores (name) VALUES ('Alice'), ('Bob')`);

    class Scores extends db.Table("scores") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
      score = (Text<1>).column({ nonNull: true, default: sql`'0'` });
    }

    const rows = await Scores.update()
      .where(({ scores }) => scores.name["="]("Alice"))
      .set(() => ({ score: "100" }))
      .returning(({ scores }) => ({ name: scores.name, score: scores.score }))
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{ name: string; score: string }[]>();
    expect(rows).toEqual([{ name: "Alice", score: "100" }]);
  });
});

test("update without where throws", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE noop (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY)`);

    class Noop extends db.Table("noop") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
    }

    await expect(
      Noop.update().set(() => ({})).execute()
    ).rejects.toThrow("requires .where()");
  });
});
