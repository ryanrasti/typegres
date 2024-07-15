import { describe, expect, it } from "vitest";
import { Array, Int4, Text, Circle } from "./index";
import { assert, Equals } from "tsafe";

const TextArray = Array.of(Text);
const IntegerArray = Array.of(Int4);
const CircleArray = Array.of(Circle);

describe("Types & functions", () => {
  it("composes and runs a basic expression", async () => {
    expect(await Text.new("foo").textcat(Text.new("bar")).length()).toEqual(6);
  });

  it("infers return type basic", async () => {
    const t = await Text.new("foo").textcat(Text.new("bar"));
    expect(t).toEqual("foobar");
    assert<Equals<typeof t, string>>;
  });

  it("works with generic output", async () => {
    const res = await Text.new("foo")
      .arrayFill(IntegerArray.new("{2}"))
      .arrayAppend(Text.new("bar"))
      .arrayCat(TextArray.new("{baz, buz}"));

    expect(res).toEqual(["foo", "foo", "bar", "baz", "buz"]);
    assert<Equals<typeof res, string[]>>;
  });

  it("null method call example", async () => {
    const foo = Text.new("foo");
    const awaitedFoo = await foo;
    assert<Equals<typeof awaitedFoo, string>>;

    const bar = Text.new(null);
    const awaitedBar = await bar;
    assert<Equals<typeof awaitedBar, null>>;

    const cat = bar.textcat(foo).textcat(foo);
    const awaitedCat = await cat;
    assert<Equals<typeof awaitedCat, string | null>>;
  });

  it("null element example", async () => {
    // TODO(TYP-54): fix `Text.new(null) as unknown as Text<1>`
    //   - the issue is that generally null arg will make the return type
    //     null, but that's not the case for `array_fill` or probably functions
    //     taking `anyelement` or `anycompatible` as input
    const res = await (Text.new(null) as unknown as Text<1>)
      .arrayFill(IntegerArray.new("{2}"))
      .arrayAppend(Text.new("bar"))
      .arrayCat(TextArray.new("{baz, buz}"));

    expect(res).toEqual([null, null, "bar", "baz", "buz"]);

    // TODO(TYP-54): enable this:
    // assert<Equals<typeof res, (string | null)[]>>;
  });

  it("parses a circle array", async () => {
    const res = await Circle.new("<(1,2),3>")
      .arrayFill(IntegerArray.new("{2}"))
      .arrayAppend(Circle.new("<(3,4),5>"))
      .arrayCat(CircleArray.new('{"<(8,9),10>"}'));

    expect(res).toEqual(["<(1,2),3>", "<(1,2),3>", "<(3,4),5>", "<(8,9),10>"]);
    assert<Equals<typeof res, string[]>>;
  });

  it("uses serialized type for `new`", async () => {
    const res = await Circle.new("<(1,2),3>")
      .arrayFill(IntegerArray.new("{2}"))
      .arrayAppend(Circle.new("<(3,4),5>"))
      .arrayCat(CircleArray.new('{"<(8,9),10>"}'));

    expect(res).toEqual(["<(1,2),3>", "<(1,2),3>", "<(3,4),5>", "<(8,9),10>"]);
    assert<Equals<typeof res, string[]>>;
  });

  it("can use serialized type in function calls -- text", async () => {
    const t = await Text.new("foo").textcat("bar");
    expect(t).toEqual("foobar");
    assert<Equals<typeof t, string>>;
  });

  it("can use serialized type in function calls -- int4", async () => {
    const t = await Text.new("foo").length().int4Pl(1);
    expect(t).toEqual(4);
    assert<Equals<typeof t, number>>;
  });

  it("can use serialized type in function calls -- with generic text", async () => {
    const res = await Text.new("foo")
      .arrayFill(IntegerArray.new("{2}"))
      .arrayAppend("bar");

    expect(res).toEqual(["foo", "foo", "bar"]);
    assert<Equals<typeof res, string[]>>;
  });
});
