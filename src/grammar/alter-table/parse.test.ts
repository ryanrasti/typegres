import { describe, it, expect } from "vitest";
import { rawGrammar, parse, replay } from "./parse";

const splitWhitespace = (str: string) => str.split(/\s+/).filter((s) => s.length > 0);

describe("rerender test", () => {
  it("should render the same markdown", () => {
    const raw = rawGrammar();
    const parsed = parse(raw);
    const replayed = [...replay(parsed)].join("\n");

    expect(splitWhitespace(replayed)).toEqual(splitWhitespace(raw.replace('[...]', '[ ... ]')))
  });

});
