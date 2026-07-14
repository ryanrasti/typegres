import { test, expect, beforeAll, afterEach } from "vitest";
import { Int8, Text } from "../types/postgres";
import { sql } from "../builder/sql";
import { conn, db, setupDb } from "../test-helpers";
import { TypegresLiveEvents } from "./events";
import { setupLiveEvents } from "./test-helpers";

setupDb();
setupLiveEvents();

class Foos extends db.Table("foos", { transformer: TypegresLiveEvents.makeTransformer() }) {
  id = Int8.column({ nonNull: true, generated: true });
  name = Text.column({ nonNull: true });
  qty = Int8.column();
}

beforeAll(async () => {
  await conn.execute(sql`CREATE TABLE foos (
    id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    qty int8
  )`);
});

afterEach(async () => {
  // RESTART IDENTITY keeps generated ids stable across tests so each
  // test can assert id="1", id="2" without depending on order.
  await conn.execute(sql`TRUNCATE foos RESTART IDENTITY`);
});

type EventRow = { xid: string; table: string; before: string | null; after: string | null };
const fetchEvents = async (): Promise<EventRow[]> => {
  // Raw pg jsonb comes back as a JSON-encoded string. Parsing here keeps
  // the assertions readable.
  const r = await conn.execute(
    sql`SELECT xid::text, "table", before, after FROM _typegres_live_events ORDER BY id`,
  );
  return r.rows as unknown as EventRow[];
};
const parse = (j: string | null) => (j === null ? null : JSON.parse(j));

test("insert emits one event per inserted row with after-image", async () => {
  await Foos.insert({ name: "Rex" }, { name: "Fido" }).execute(conn);

  const events = await fetchEvents();
  expect(events).toHaveLength(2);
  expect(events.every((e) => e.table === "foos")).toBe(true);
  expect(events.every((e) => e.before === null)).toBe(true);
  expect(events[0]!.xid).toEqual(events[1]!.xid); // single txn
  expect(parse(events[0]!.after)).toEqual({ id: "1", name: "Rex", qty: null });
  expect(parse(events[1]!.after)).toEqual({ id: "2", name: "Fido", qty: null });
});

test("insert RETURNING surfaces user columns through the wrap", async () => {
  const rows = await Foos.insert({ name: "hello" })
    .returning(({ foos }) => ({ id: foos.id, name: foos.name }))
    .execute(conn);
  expect(rows).toEqual([{ id: "1", name: "hello" }]);
});

test("delete emits one event per deleted row with before-image", async () => {
  // Seed via raw SQL so the transformer doesn't fire for the setup rows.
  await conn.execute(sql`INSERT INTO foos (id, name) OVERRIDING SYSTEM VALUE VALUES (10, 'a'), (11, 'b'), (12, 'c')`);

  await Foos.delete().where(({ foos }) => foos.id.lt("12")).execute(conn);

  const events = await fetchEvents();
  expect(events).toHaveLength(2);
  expect(events.every((e) => e.table === "foos")).toBe(true);
  expect(events.every((e) => e.after === null)).toBe(true);
  expect(events[0]!.xid).toEqual(events[1]!.xid);
  expect(parse(events[0]!.before)).toEqual({ id: "10", name: "a", qty: null });
  expect(parse(events[1]!.before)).toEqual({ id: "11", name: "b", qty: null });
});

test("delete RETURNING surfaces user columns through the wrap", async () => {
  await conn.execute(sql`INSERT INTO foos (name) VALUES ('keep'), ('drop')`);

  const rows = await Foos.delete()
    .where(({ foos }) => foos.name.eq("drop"))
    .returning(({ foos }) => ({ id: foos.id, name: foos.name }))
    .execute(conn);
  expect(rows).toEqual([{ id: "2", name: "drop" }]);
});

test("update pairs before and after via ctid", async () => {
  await conn.execute(sql`INSERT INTO foos (id, name, qty) OVERRIDING SYSTEM VALUE VALUES (1, 'a', 10), (2, 'b', 20), (3, 'c', 30)`);

  await Foos.update()
    .set(() => ({ qty: "999" }))
    .where(({ foos }) => foos.qty.lt("30"))
    .execute(conn);

  const events = await fetchEvents();
  expect(events).toHaveLength(2);
  expect(events.every((e) => e.table === "foos")).toBe(true);
  expect(events[0]!.xid).toEqual(events[1]!.xid);
  expect(parse(events[0]!.before)).toEqual({ id: "1", name: "a", qty: "10" });
  expect(parse(events[0]!.after)).toEqual({ id: "1", name: "a", qty: "999" });
  expect(parse(events[1]!.before)).toEqual({ id: "2", name: "b", qty: "20" });
  expect(parse(events[1]!.after)).toEqual({ id: "2", name: "b", qty: "999" });
});

test("update RETURNING surfaces user columns through the wrap", async () => {
  await conn.execute(sql`INSERT INTO foos (name) VALUES ('old')`);

  const rows = await Foos.update()
    .set(() => ({ name: "new" }))
    .where(true)
    .returning(({ foos }) => ({ id: foos.id, name: foos.name }))
    .execute(conn);
  expect(rows).toEqual([{ id: "1", name: "new" }]);
});
