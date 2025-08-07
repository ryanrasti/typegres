import { describe, expect, it, beforeEach } from "vitest";
import { values } from "./values";
import { Int4, Text } from "../types";
import { testDb } from "../db.test";
import { TypegresTransaction } from "../db";
import { database } from "./db";
import { select } from "../grammar/generated/select";
import { insert } from "../grammar/generated/insert";
import { update } from "../grammar/generated/update";

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
        const selectQuery = select(
          (v) => ({
            name: v.name,
            balance: v.balance,
          }),
          {
            from: values(
              { name: Text.new("Alice"), balance: Int4.new(100) },
              { name: Text.new("Bob"), balance: Int4.new(200) },
            ),
          },
        );

        await insert(
          "into",
          db.test_users,
          [["name", "balance"]],
          selectQuery,
          {},
        ).execute(tx);
      });

      const users = await select(
        (u) => ({ name: u.name, balance: u.balance }),
        {
          from: db.test_users,
          orderBy: (u) => u.name,
        },
      ).execute(testDb);

      expect(users).toEqual([
        { name: "Alice", balance: 100 },
        { name: "Bob", balance: 200 },
      ]);
    });

    it("rolls back transaction on error", async () => {
      try {
        await testDb.transaction(async (tx) => {
          const selectQuery = select(
            (v) => ({
              name: v.name,
              balance: v.balance,
            }),
            {
              from: values({ name: Text.new("Alice"), balance: Int4.new(100) }),
            },
          );

          await insert(
            "into",
            db.test_users,
            [["name", "balance"]],
            selectQuery,
            {},
          ).execute(tx);

          throw new Error("Transaction error");

          // This code won't be reached
          const selectQuery2 = select(
            (v) => ({
              name: v.name,
              balance: v.balance,
            }),
            {
              from: values({ name: Text.new("Bob"), balance: Int4.new(200) }),
            },
          );

          await insert(
            "into",
            db.test_users,
            [["name", "balance"]],
            selectQuery2,
            {},
          ).execute(tx);
        });
      } catch (e) {
        expect((e as Error).message).toBe("Transaction error");
      }

      const users = await select(
        (u) => ({ name: u.name, balance: u.balance }),
        {
          from: db.test_users,
        },
      ).execute(testDb);
      expect(users).toHaveLength(0);
    });

    it("works with query builders", async () => {
      await testDb.transaction(async (tx) => {
        // Insert using new syntax
        const selectQuery = select(
          (v) => ({
            name: v.name,
            balance: v.balance,
          }),
          {
            from: values({ name: Text.new("Alice"), balance: Int4.new(100) }),
          },
        );

        await insert(
          "into",
          db.test_users,
          [["name", "balance"]],
          selectQuery,
          {},
        ).execute(tx);

        // Query using new select syntax
        const txResult = await select(
          (u) => ({ name: u.name, balance: u.balance }),
          {
            from: db.test_users,
            where: (u) => u.balance[">="](Int4.new(50)),
          },
        ).execute(tx);

        expect(txResult).toEqual([{ name: "Alice", balance: 100 }]);

        // But we should not see Alice yet in the main db:
        const mainResult = await select(
          (u) => ({ name: u.name, balance: u.balance }),
          {
            from: db.test_users,
            where: (u) => u.balance[">="](Int4.new(50)),
          },
        ).execute(testDb);

        expect(mainResult).toEqual([]);
      });
    });

    it("can return values from transaction", async () => {
      const users = await testDb.transaction(async (tx) => {
        const selectQuery = select(
          (v) => ({
            name: v.name,
            balance: v.balance,
          }),
          {
            from: values({ name: Text.new("Alice"), balance: Int4.new(100) }),
          },
        );

        const result = await insert(
          "into",
          db.test_users,
          [["name", "balance"]],
          selectQuery,
          {
            returning: (u) => ({
              id: u.id,
              name: u.name,
              balance: u.balance,
            }),
          },
        ).execute(tx);
        return result;
      });

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe("Alice");
      expect(users[0].balance).toBe(100);

      const user = await select(
        (u) => ({ id: u.id, name: u.name, balance: u.balance }),
        {
          from: db.test_users,
          where: (u) => u.id["="](Int4.new(users[0].id)),
        },
      ).execute(testDb);

      // Verify the user was created correctly
      expect(user).toHaveLength(1);
      expect(user[0].name).toBe("Alice");
      expect(user[0].balance).toBe(100);
    });

    it("can use update within transaction", async () => {
      // First insert some data
      const selectQuery = select(
        (v) => ({
          name: v.name,
          balance: v.balance,
        }),
        {
          from: values(
            { name: Text.new("Alice"), balance: Int4.new(100) },
            { name: Text.new("Bob"), balance: Int4.new(200) },
          ),
        },
      );

      await insert(
        "into",
        db.test_users,
        [["name", "balance"]],
        selectQuery,
        {},
      ).execute(testDb);

      // Use transaction to update
      await testDb.transaction(async (tx) => {
        await update(db.test_users, {
          set: (u) => ({ balance: u.balance["+"](Int4.new(50)) }),
          where: (u) => u.name["="](Text.new("Alice")),
        }).execute(tx);
      });

      const alice = await select(
        (u) => ({ name: u.name, balance: u.balance }),
        {
          from: db.test_users,
          where: (u) => u.name["="](Text.new("Alice")),
        },
      ).execute(testDb);

      expect(alice).toHaveLength(1);
      expect(alice[0].balance).toBe(150);
    });

    it("supports nested query operations", async () => {
      await testDb.transaction(async (tx) => {
        // Insert initial data
        const selectQuery = select(
          (v) => ({
            name: v.name,
            balance: v.balance,
          }),
          {
            from: values(
              { name: Text.new("Alice"), balance: Int4.new(100) },
              { name: Text.new("Bob"), balance: Int4.new(200) },
              { name: Text.new("Charlie"), balance: Int4.new(50) },
            ),
          },
        );

        await insert(
          "into",
          db.test_users,
          [["name", "balance"]],
          selectQuery,
          {},
        ).execute(tx);

        // Complex query within transaction
        const richUsers = await select(
          (u) => ({
            name: u.name,
            balance: u.balance,
            isRich: u.balance[">="](Int4.new(150)),
          }),
          {
            from: db.test_users,
            where: (u) => u.balance[">="](Int4.new(100)),
            orderBy: [(u) => u.balance, { desc: true }],
          },
        ).execute(tx);

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
