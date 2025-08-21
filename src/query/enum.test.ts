import { describe, expect, it } from "vitest";
import { Int4, Text } from "../types/index";
import { assert, Equals } from "tsafe";
import { withDb } from "../test/db";
import * as db from "../gen/tables";
import { testDb } from "../db.test";
import { select, insert, update } from "../grammar";
import { values } from "./values";

describe("Enum types", () => {
  it("can use enum types in queries", async () => {
    // Test that Mood is correctly typed with literal union
    const mood = new db.Mood();
    
    // The type should be 'happy' | 'sad' | 'neutral'
    assert<Equals<typeof mood.resultType, 'happy' | 'sad' | 'neutral' | undefined>>();
  });

  it("can select users with enum values", () =>
    withDb(testDb, async (tg) => {
      // Select users with their mood
      const result = await select(
        (u) => ({
          name: u.name,
          mood: u.mood,
        }),
        {
          from: db.Users,
          orderBy: (u) => u.name,
        },
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof result, Array<{ name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>>();

      // Runtime assertion - check we got all seeded users
      expect(result).toEqual([
        { name: 'Happy User', mood: 'happy' },
        { name: 'Neutral User', mood: 'neutral' },
        { name: 'No Mood User', mood: null },
        { name: 'Sad User', mood: 'sad' },
      ]);
    }));

  it("can filter by enum values", () =>
    withDb(testDb, async (tg) => {
      // Select only happy users
      const happyUsers = await select(
        (u) => ({
          name: u.name,
          mood: u.mood,
        }),
        {
          from: db.Users,
          where: (u) => u.mood?.eq(db.Mood.new('happy')),
          orderBy: (u) => u.name,
        },
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof happyUsers, Array<{ name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>>();

      // Runtime assertion
      expect(happyUsers).toEqual([
        { name: 'Happy User', mood: 'happy' },
      ]);
    }));

  it("can insert with enum values", () =>
    withDb(testDb, async (tg) => {
      // Insert a new user with a mood
      const inserted = await insert(
        { into: db.Users, columns: ['name', 'email', 'mood'] },
        values({
          name: Text.new('Test Insert User'),
          email: Text.new('testinsert@example.com'),
          mood: db.Mood.new('neutral'),
        }),
        {
          returning: (row) => ({ name: row.name, mood: row.mood }),
        }
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof inserted, Array<{ name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>>();

      // Runtime assertion
      expect(inserted).toEqual([
        { name: 'Test Insert User', mood: 'neutral' },
      ]);
    }));

  it("can update enum values", () =>
    withDb(testDb, async (tg) => {
      // First insert a user
      const [user] = await insert(
        { into: db.Users, columns: ['name', 'email', 'mood'] },
        values({
          name: Text.new('Update Test User'),
          email: Text.new('updatetest@example.com'),
          mood: db.Mood.new('sad'),
        }),
        {
          returning: (row) => ({ id: row.id, name: row.name, mood: row.mood }),
        }
      ).execute(tg);

      // Type assertion for insert
      assert<Equals<typeof user, { id: number; name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>();
      
      // Verify insert worked
      expect(user).toEqual({
        id: expect.any(Number),
        name: 'Update Test User',
        mood: 'sad',
      });

      // Update their mood
      const updated = await update(db.Users, {
        set: () => ({
          mood: db.Mood.new('happy'),
        }),
        where: (u) => u.id.eq(Int4.new(user.id)),
        returning: (row) => ({ name: row.name, mood: row.mood }),
      }).execute(tg);

      // Type assertion for update
      assert<Equals<typeof updated, Array<{ name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>>();

      // Runtime assertion
      expect(updated).toEqual([
        { name: 'Update Test User', mood: 'happy' },
      ]);
    }));

  it("supports enum type checking at compile time", () => {
    // This test verifies that TypeScript properly type-checks enum values
    
    // Should compile: valid enum value
    const validMood = db.Mood.new('happy');
    assert<Equals<typeof validMood.resultType, 'happy' | 'sad' | 'neutral' | undefined>>();
    
    // The following would cause TypeScript errors if uncommented:
    // const invalidMood = db.Mood.new('angry'); // Error: Argument of type '"angry"' is not assignable
    
    // Test nullable enum
    const nullableMood = db.Mood.new(null);
    assert<Equals<typeof nullableMood.nullability, 0>>();
  });

  it("can use enum comparison operators", () =>
    withDb(testDb, async (tg) => {
      // Get users and compare moods
      const usersWithComparison = await select(
        (u) => ({
          name: u.name,
          mood: u.mood,
          isHappy: u.mood?.eq(db.Mood.new('happy')),
          isNotSad: u.mood?.ne(db.Mood.new('sad')),
        }),
        {
          from: db.Users,
          where: (u) => u.mood.isNotNull(),
          orderBy: (u) => u.name,
        },
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof usersWithComparison, Array<{
        name: string;
        mood: 'happy' | 'sad' | 'neutral' | null;
        isHappy: boolean | null;
        isNotSad: boolean | null;
      }>>>();

      // Runtime assertion
      expect(usersWithComparison).toEqual([
        { name: 'Happy User', mood: 'happy', isHappy: true, isNotSad: true },
        { name: 'Neutral User', mood: 'neutral', isHappy: false, isNotSad: true },
        { name: 'Sad User', mood: 'sad', isHappy: false, isNotSad: false },
      ]);
    }));

  it("can use values() with enum types", () =>
    withDb(testDb, async (tg) => {
      // Create values with enum types
      const moodValues = values(
        { id: Int4.new(1), status: db.Mood.new('happy') },
        { id: Int4.new(2), status: db.Mood.new('sad') },
        { id: Int4.new(3), status: db.Mood.new('neutral') },
      );

      const result = await select(
        (v) => ({
          id: v.id,
          status: v.status,
          isHappy: v.status.eq(db.Mood.new('happy')),
        }),
        {
          from: moodValues,
        },
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof result, Array<{
        id: number;
        status: 'happy' | 'sad' | 'neutral';
        isHappy: boolean;
      }>>>();

      // Runtime assertion
      expect(result).toEqual([
        { id: 1, status: 'happy', isHappy: true },
        { id: 2, status: 'sad', isHappy: false },
        { id: 3, status: 'neutral', isHappy: false },
      ]);
    }));

  it("can handle null enum values", () =>
    withDb(testDb, async (tg) => {
      // Insert a user with null mood
      const [insertedNull] = await insert(
        { into: db.Users, columns: ['name', 'email', 'mood'] },
        values({
          name: Text.new('Null Mood User'),
          email: Text.new('nullmood@example.com'),
          mood: db.Mood.new(null),
        }),
        {
          returning: (row) => ({ name: row.name, mood: row.mood }),
        }
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof insertedNull, { name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>();

      // Runtime assertion
      expect(insertedNull).toEqual({
        name: 'Null Mood User',
        mood: null,
      });

      // Select users with null mood
      const nullMoodUsers = await select(
        (u) => ({
          name: u.name,
          mood: u.mood,
        }),
        {
          from: db.Users,
          where: (u) => u.mood.isNull(),
          orderBy: (u) => u.name,
        },
      ).execute(tg);

      // Type assertion
      assert<Equals<typeof nullMoodUsers, Array<{ name: string; mood: 'happy' | 'sad' | 'neutral' | null }>>>();

      // Check there are at least 2 users with null mood (No Mood User from seeds and our new one)
      expect(nullMoodUsers.length).toBeGreaterThanOrEqual(2);
      expect(nullMoodUsers.some(u => u.name === 'Null Mood User')).toBe(true);
      expect(nullMoodUsers.some(u => u.name === 'No Mood User')).toBe(true);
    }));
});