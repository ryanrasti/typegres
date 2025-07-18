import { describe, expect, it, beforeEach } from "vitest";
import { values } from "./values";
import { Int4, Text } from "../types";
import { testDb } from "../db.test";
import { TypegresTransaction } from "../db";
import { database } from "./db";

// Define the schema for our test tables
const db = database({
  test_users: {
    id: Int4<1>,
    name: Text<1>,
    balance: Int4<1>,
  },
});

describe("Transactions", () => {
  // Helper to create test tables
  const setupTestTable = async () => {
    await testDb.sql`DROP TABLE IF EXISTS test_users`.execute();
    await testDb.sql`
      CREATE TABLE test_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        balance INT DEFAULT 0
      )
    `.execute();
  };

  beforeEach(async () => {
    await setupTestTable();
  });

  describe("Callback-based transaction API", () => {
    it("commits transaction on success", async () => {
      await testDb.transaction(async (tx) => {
        await db.test_users
          .insert(
            values(
              { name: Text.new("Alice"), balance: Int4.new(100) },
              { name: Text.new("Bob"), balance: Int4.new(200) },
            ),
          )
          .execute(tx);
      });

      const users = await db.test_users
        .select((u) => ({ name: u.name, balance: u.balance }))
        .orderBy((u) => u.name)
        .execute(testDb);

      expect(users).toEqual([
        { name: "Alice", balance: 100 },
        { name: "Bob", balance: 200 },
      ]);
    });

    it("rolls back transaction on error", async () => {
      try {
        await testDb.transaction(async (tx) => {
          await db.test_users
            .insert(values({ name: Text.new("Alice"), balance: Int4.new(100) }))
            .execute(tx);
          throw new Error("Transaction error");
          await db.test_users
            .insert(values({ name: Text.new("Bob"), balance: Int4.new(200) }))
            .execute(tx);
        });
      } catch (e) {
        expect((e as Error).message).toBe("Transaction error");
      }

      const users = await db.test_users.execute(testDb);
      expect(users).toHaveLength(0);
    });

    it("works with query builders", async () => {
      await testDb.transaction(async (tx) => {
        // Insert using schema
        await db.test_users
          .insert(values({ name: Text.new("Alice"), balance: Int4.new(100) }))
          .execute(tx);

        // Query using query builder
        const query = db.test_users
          .where((u) => u.balance[">="](50))
          .select((u) => ({ name: u.name, balance: u.balance }));

        expect(await query.execute(tx)).toEqual([
          { name: "Alice", balance: 100 },
        ]);

        // But we should not see Bob yet in the main db:
        expect(await query.execute(testDb)).toEqual([]);
      });
    });

    it("can return values from transaction", async () => {
      const users = await testDb.transaction(async (tx) => {
        const result = await db.test_users
          .insert(values({ name: Text.new("Alice"), balance: Int4.new(100) }))
          .execute(tx);
        return result;
      });

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe("Alice");
      expect(users[0].balance).toBe("100");

      const user = await db.test_users
        .where((u) => u.id["="](users[0].id))
        .execute(testDb);

      // Verify the user was created correctly
      expect(user[0].name).toBe("Alice");
      expect(user[0].balance).toBe(100);
    });

    it("can use update within transaction", async () => {
      // First insert some data
      await db.test_users
        .insert(
          values(
            { name: Text.new("Alice"), balance: Int4.new(100) },
            { name: Text.new("Bob"), balance: Int4.new(200) },
          ),
        )
        .execute(testDb);

      // Use transaction to update
      await testDb.transaction(async (tx) => {
        await db.test_users
          .update({ where: (u) => u.name["="]("Alice") })
          .set((u) => ({ balance: u.balance["+"](Int4.new(50)) }))
          .execute(tx);
      });

      const alice = await db.test_users
        .where((u) => u.name["="]("Alice"))
        .execute(testDb);

      expect(alice[0].balance).toBe(150);
    });

    it("supports nested query operations", async () => {
      await testDb.transaction(async (tx) => {
        // Insert initial data
        await db.test_users
          .insert(
            values(
              { name: Text.new("Alice"), balance: Int4.new(100) },
              { name: Text.new("Bob"), balance: Int4.new(200) },
              { name: Text.new("Charlie"), balance: Int4.new(50) },
            ),
          )
          .execute(tx);

        // Complex query within transaction
        const richUsers = await db.test_users
          .where((u) => u.balance[">="](100))
          .select((u) => ({
            name: u.name,
            balance: u.balance,
            isRich: u.balance[">="](150),
          }))
          .orderBy((u) => [u.balance, "desc"])
          .execute(tx);

        expect(richUsers).toEqual([
          { name: "Bob", balance: 200, isRich: true },
          { name: "Alice", balance: 100, isRich: false },
        ]);
      });
    });

    it("isTransaction property is true", async () => {
      await testDb.transaction(async (tx) => {
        expect(tx.isTransaction).toBe(true);
        expect((tx as TypegresTransaction).isTransaction).toBe(true);
      });
    });

    it("cannot close connection during transaction", async () => {
      await testDb.transaction(async (tx) => {
        await expect(tx.end()).rejects.toThrow(
          "Cannot close connection during transaction",
        );
      });
    });
  });
});
