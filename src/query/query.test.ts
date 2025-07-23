import { describe, expect, it } from "vitest";
import { Int4, Jsonb, Numeric, Text, Record, Int2 } from "../types/index";
import { values } from "./values";
import { assert, Equals } from "tsafe";
import { withDb } from "../test/db";
import { db } from "../gen/tables";
import { testDb } from "../db.test";

const strings = values(
  { a: Text.new("foo"), b: Numeric.new(1.1), c: Int4.new(1) },
  { a: Text.new("baz"), b: Numeric.new("1.2"), c: Int4.new(3) },
);

describe("Queries", () => {
  it("can select from values", async () => {
    const res = await strings
      .select((s) => ({
        x: s.a.textcat(Text.new("s")),
        y: s.b.numericAdd(Numeric.new("1")),
        z: s.c.int4Gt(Int4.new(2)),
      }))
      .execute(testDb);

    assert<Equals<typeof res, { x: string; y: string; z: boolean }[]>>();

    expect(res).toEqual([
      { x: "foos", y: "2.1", z: false },
      { x: "bazs", y: "2.2", z: true },
    ]);
  });

  it("can use operators", async () => {
    const res = await strings
      .select((s) => ({
        x: s.a[">"](Text.new("fo")),
        y: s.b[">"](Numeric.new("1")),
        z: s.c[">"](Int4.new(2)),
        t: Numeric.new("1")["+"](Numeric.new("2"))["="](Numeric.new("3")),
      }))
      .execute(testDb);

    assert<
      Equals<typeof res, { x: boolean; y: boolean; z: boolean; t: boolean }[]>
    >();

    expect(res).toEqual([
      { x: true, y: true, z: false, t: true },
      { x: false, y: true, z: true, t: true },
    ]);
  });

  it("can select from db", async () => {
    await withDb(testDb, async (kdb) => {
      const res = await db.pet
        .select((p) => ({
          name: p.name.textcat(Text.new("!!")),
          age: p.age.int4Pl(1),
        }))
        .execute(kdb);

      assert<Equals<typeof res, { name: string; age: number }[]>>();

      expect(
        res.toSorted((p1, p2) => String(p1.age).localeCompare(String(p2.age))),
      ).toEqual([
        { name: "John's pet!!", age: 2 },
        { name: "Alice's pet!!", age: 3 },
        { name: "Jane's pet!!", age: 4 },
      ]);
    });
  });

  it("can where and select from db", async () => {
    await withDb(testDb, async (kdb) => {
      const res = await db.pet
        .select((p) => ({
          name: p.name.textcat(Text.new("!!")),
          age: p.age.numeric().numericAdd(Numeric.new("1")),
        }))
        .where((p) => p.age.numeric().numericGt(Numeric.new("1")))
        .execute(kdb);

      assert<Equals<typeof res, { name: string; age: string }[]>>();

      expect(res.toSorted((p1, p2) => p1.age.localeCompare(p2.age))).toEqual([
        { name: "Alice's pet!!", age: "3" },
        { name: "Jane's pet!!", age: "4" },
      ]);
    });
  });

  it("can chain where's", async () => {
    await withDb(testDb, async (kdb) => {
      const res = await db.pet
        .select((p) => ({
          name: p.name.textcat(Text.new("!!")),
          age: p.age.int4Pl(1),
        }))
        .where((p) => p.age.int4Gt(1))
        .where((p) => p.age.int4Lt(3))
        .execute(kdb);

      assert<Equals<typeof res, { name: string; age: number }[]>>();

      expect(
        res.toSorted((p1, p2) => String(p1.age).localeCompare(String(p2.age))),
      ).toEqual([{ name: "Alice's pet!!", age: 3 }]);
    });
  });

  it("can select a scalar", async () => {
    const res = await values({ a: Numeric.new("1") })
      .select(({ a }) => a)
      .execute(testDb);
    assert<Equals<typeof res, string[]>>;

    expect(res).toEqual(["1"]);
  });

  it("can select from set returning function (returning a record)", async () => {
    const res = await Jsonb.new(JSON.stringify({ a: 1, b: 2 }))
      .jsonbEach()
      .select(({ key, value }) => ({
        key: key.textcat(Text.new("!!")),
        value: value.jsonbTypeof().textcat(Text.new("!!")),
      }))
      .execute(testDb);

    assert<Equals<typeof res, { key: string; value: string }[]>>();

    expect(res.toSorted((a, b) => a.key.localeCompare(b.key))).toEqual([
      { key: "a!!", value: "number!!" },
      { key: "b!!", value: "number!!" },
    ]);
  });

  it("can select from set returning function (returning a scalar)", async () => {
    const res = await Jsonb.new(JSON.stringify([{ a: 1, b: 2 }, 1]))
      .jsonbArrayElements()
      .select(({ value }) => ({
        value: value.jsonbTypeof().textcat(Text.new("!!")),
      }))

      .execute(testDb);

    assert<Equals<typeof res, { value: string }[]>>();

    expect(res.toSorted((a, b) => a.value.localeCompare(b.value))).toEqual([
      { value: "number!!" },
      { value: "object!!" },
    ]);
  });

  it("group by", async () => {
    const v = values(
      { a: Text.new("foo"), b: Numeric.new("1.1"), c: Int4.new(1) },
      { a: Text.new("baz"), b: Numeric.new("1.2"), c: Int4.new(3) },
      { a: Text.new("baz"), b: Numeric.new("1.2"), c: Int4.new(4) },
    );

    const res = await v
      .groupBy((s) => [s.a, s.b] as const)
      .select((s, [a, b]) => {
        assert<
          Equals<
            typeof s,
            {
              a: Text<number>;
              b: Numeric<number>;
              c: Int4<number>;
            }
          >
        >();

        return {
          a,
          b,
          avg: s.c.avg().float8(),
          cnt: s.c.count(),
          t: s.c.int4Pl(1).sum(),
        };
      })
      .debug()
      .execute(testDb);

    assert<
      Equals<
        typeof res,
        {
          a: string;
          b: string;
          avg: number | null;
          cnt: bigint;
          t: bigint | null;
        }[]
      >
    >();

    expect(res.toSorted((a, b) => a.a.localeCompare(b.a))).toEqual([
      { a: "baz", b: "1.2", avg: 3.5, cnt: 2n, t: 9n },
      { a: "foo", b: "1.1", avg: 1, cnt: 1n, t: 2n },
    ]);
  });

  it("can't return aggregate in select clause", async () => {
    const v = values(
      { a: Text.new("foo"), b: Numeric.new("1.1"), c: Int4.new(1) },
      { a: Text.new("baz"), b: Numeric.new("1.2"), c: Int4.new(3) },
      { a: Text.new("baz"), b: Numeric.new("1.2"), c: Int4.new(4) },
    );

    // @ts-expect-error
    v.groupBy((s) => [s.a, s.b] as const).select((s) => {
      assert<
        Equals<
          typeof s,
          {
            a: Text<number>;
            b: Numeric<number>;
            c: Int4<number>;
          }
        >
      >();

      return {
        x: s.c,
      };
    });
  });

  it("basic join", async () => {
    const strings2 = values(
      { a: Text.new("foo"), b: Numeric.new("100") },
      { a: Text.new("baz"), b: Numeric.new("200") },
    );

    const res = await strings
      .join(strings2, "s2", (s1, { s2 }) => {
        console.log("s1", s1);
        console.log("s2", s2);
        return s1.a.texteq(s2.a);
      })
      .select((s, { s2 }) => ({
        a1: s.a,
        a2: s2.a,
        sum: s.c.int4Pl(s2.b.int4()),
      }))
      .debug()
      .execute(testDb);

    assert<Equals<typeof res, { a1: string; a2: string; sum: number }[]>>();

    expect(res.toSorted((a, b) => b.a1.localeCompare(a.a1))).toEqual([
      { a1: "foo", a2: "foo", sum: 101 },
      { a1: "baz", a2: "baz", sum: 203 },
    ]);
  });

  it("can compose setof scalars", async () => {
    const res = await values({ a: Numeric.new("1") })
      .select(({ a }) => a["+"](Numeric.new("1")))
      .subquery()
      .select((x) => x["+"](Numeric.new("1")))
      .execute(testDb);

    assert<Equals<typeof res, string[]>>();

    expect(res).toEqual(["3"]);
  });

  it("can select a record", async () => {
    const res = await values({
      a: Record.of({ a: Text }).new('("1")'),
    })
      .select(({ a }) => a)
      .execute(testDb);

    assert<Equals<typeof res, { a: string | null }[]>>();

    expect(res).toEqual([{ a: "1" }]);
  });

  it("can parse a nested record", async () => {
    const res = await values({
      a: Record.of({ a: Text, b: Record.of({ c: Numeric, d: Int2 }) }).new(
        '(1,"(2,3)")',
      ),
    })
      .select(({ a }) => a)
      .execute(testDb);

    assert<
      Equals<
        typeof res,
        {
          a: string | null;
          b: { c: string | undefined; d: number | undefined } | null;
        }[]
      >
    >();

    expect(res).toEqual([{ a: "1", b: { c: "2", d: 3 } }]);
  });

  // Skipped because it doesn't seem that postgres supports nested anonymous records
  // in a select statement. I get: "error: record type has not been registered"
  it.skip("can select from a nested record", async () => {
    const res = await values({
      x: Record.of({ a: Text, b: Record.of({ c: Numeric, d: Int2 }) }).new(
        '(1,"(2,3)")',
      ),
    })
      .select(({ x }) => x.b.c)
      .execute(testDb);

    assert<Equals<typeof res, (string | null)[]>>();

    expect(res).toEqual([{ c: "2" }]);
  });

  it("select accepts deserialized values", async () => {
    const res = await values({ a: Numeric.new("1") })
      .select(({ a }) => ({
        v1: a["+"](Numeric.new("1")),
        v2: 2,
        v3: "3",
        v4: true,
        v5: 5n,
      }))
      .where(() => true)
      .execute(testDb);

    assert<
      Equals<
        typeof res,
        { v1: string; v2: number; v3: string; v4: boolean; v5: string }[]
      >
    >();

    expect(res).toEqual([{ v1: "2", v2: 2, v3: "3", v4: true, v5: "5" }]);
  });

  it("row acts as a record type", async () => {
    const res = await values(
      { val: Numeric.new("1") },
      { val: Numeric.new("2") },
    )
      .select((r) => ({
        o: r.rowToJson(),
      }))
      .execute(testDb);

    assert<Equals<typeof res, { o: string }[]>>();

    expect(res).toEqual([{ o: '{"val":1}' }, { o: '{"val":2}' }]);
  });
});

describe("Mutations", async () => {
  it("insert values", async () => {
    await withDb(testDb, async (kdb) => {
      const [john] = await db.person
        .where((p) => p.firstName.texteq(Text.new("John")))
        .execute(kdb);

      const res = await db.pet
        .insert(
          values(
            {
              ownerId: Int4.new(john.id ?? 0),
              name: Text.new("John's pet #2"),
              age: Int4.new(1),
              species: Text.new("dog"),
            },
            {
              ownerId: Int4.new(john.id ?? 0),
              name: Text.new("John's pet #3"),
              age: Int4.new(2),
              species: Text.new("cat"),
            },
          ),
        )
        .execute(kdb);

      assert<
        Equals<
          typeof res,
          {
            id: number;
            ownerId: number;
            name: string;
            age: number;
            species: string;
          }[]
        >
      >();

      const [p2, p3] = res.toSorted(
        (p1, p2) => String(p1.age).localeCompare(String(p2?.age)) ?? 0,
      );

      expect(p2).toMatchObject({ name: "John's pet #2", age: "1" });
      expect(p3).toMatchObject({ name: "John's pet #3", age: "2" });
    });
  });

  it("update basic", async () => {
    await withDb(testDb, async (kdb) => {
      const [john] = await db.person
        .where((p) => p.firstName.texteq(Text.new("John")))
        .execute(kdb);

      const res = await db.pet
        .update({
          where: (p) => p.ownerId.int4Eq(Int4.new(john.id ?? 0)),
        })
        .set((p) => ({
          name: p.name.textcat(Text.new(" II")),
          species: p.species.textcat(Text.new(" II")),
        }))
        .execute(kdb);

      assert<
        Equals<
          typeof res,
          {
            id: number;
            ownerId: number;
            name: string;
            age: number;
            species: string;
          }[]
        >
      >();

      expect(res).toHaveLength(1);
      expect(res[0]).toMatchObject({
        name: "John's pet II",
        species: "dog II",
      });
    });
  });

  it("update with from", async () => {
    await withDb(testDb, async (kdb) => {
      const [john] = await db.person
        .where((p) => p.firstName.texteq(Text.new("John")))
        .execute(kdb);

      const res = await db.pet
        .update({
          where: (p) => p.ownerId.int4Eq(Int4.new(john.id ?? 0)),
          from: () =>
            values({
              ownerId: Int4.new(john.id),
              name: Text.new("John's pet #2"),
              age: Numeric.new("1"),
              species: Text.new("dog"),
            }),
        })
        .set((p, v) => ({
          name: p.name.textcat(v.name),
          species: p.species.textcat(v.species),
        }))
        .execute(kdb);

      assert<
        Equals<
          typeof res,
          {
            id: number;
            ownerId: number;
            name: string;
            age: number;
            species: string;
          }[]
        >
      >();

      expect(res).toHaveLength(1);
      expect(res[0]).toMatchObject({
        name: "John's petJohn's pet #2",
        species: "dogdog",
      });
    });
  });
});

describe("Namespace sanitzation", () => {
  it("subquery can reference parent and self when alias overlaps", async () => {
    const v = values({ a: Text.new("foo"), b: Numeric.new("1.1") });

    const res = await v
      .select((s) => ({
        x: s.a,
        y: values({ a: Text.new("bar"), b: Numeric.new("2.2") })
          .select((s2) => s2.a)
          .scalar(),
      }))
      .execute(testDb);

    assert<Equals<typeof res, { x: string; y: string }[]>>();

    expect(res).toEqual([{ x: "foo", y: "bar" }]);
  });
});
