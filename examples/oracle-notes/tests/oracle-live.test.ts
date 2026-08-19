import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { OracleDriver } from "typegres/drivers/oracle";
import type { Connection } from "typegres";
import { Api, type Users, db } from "../server/api";
import { oraclePoolAttributes } from "../server/config";
import { migrate } from "../server/migrate";

const enabled = process.env["ORACLE_URL"] !== undefined;

describe.skipIf(!enabled)("Oracle Notes live", () => {
  let conn: Connection;
  let user: Users;

  beforeAll(async () => {
    conn = db.connect(await OracleDriver.create(oraclePoolAttributes()));
    await migrate(conn);
    user = await new Api().login({
      username: `notes-${crypto.randomUUID().slice(0, 8)}`,
      password: "test-password",
    });
  });

  afterAll(async () => {
    await conn.close();
  });

  test("accepts an empty body using Oracle's empty-string-is-NULL representation", async () => {
    const note = await user.createNote({ title: "Empty", body: "" });
    const rows = await user.notes()
      .where(({ notes }) => notes.id.eq(note.id))
      .select(({ notes }) => ({ body: notes.body }))
      .execute();
    expect(rows).toEqual([{ body: null }]);
    await note.delete().execute();
  });

  test("creates, edits, lists, and deletes through row capabilities", async () => {
    const created = await user.createNote({ title: "First", body: "A".repeat(3_000) });
    expect(await user.notes()
      .select(({ notes }) => ({ id: notes.id, title: notes.title, body: notes.body }))
      .execute()).toEqual([expect.objectContaining({ title: "First", body: "A".repeat(3_000) })]);

    await created.update({ title: "Updated", body: "short" }).execute();
    expect(await user.notes()
      .select(({ notes }) => ({ title: notes.title, body: notes.body }))
      .execute()).toEqual([{ title: "Updated", body: "short" }]);

    await created.delete().execute();
    expect(await user.notes()
      .select(({ notes }) => ({ id: notes.id }))
      .execute()).toEqual([]);
  });
});
