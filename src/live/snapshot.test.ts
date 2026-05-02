import { test, expect } from "vitest";
import { parseSnapshot, visible } from "./snapshot";

test("parseSnapshot: empty xip list", () => {
  const c = parseSnapshot("100:120:");
  expect(c.xmin).toBe(100n);
  expect(c.xmax).toBe(120n);
  expect(c.xip).toEqual(new Set());
});

test("parseSnapshot: with xip list", () => {
  const c = parseSnapshot("100:120:105,118");
  expect(c.xmin).toBe(100n);
  expect(c.xmax).toBe(120n);
  expect(c.xip).toEqual(new Set([105n, 118n]));
});

test("parseSnapshot: rejects malformed input", () => {
  expect(() => parseSnapshot("100:120")).toThrow(/3 colon-separated/);
});

test("visible: xid < xmin → committed before, visible", () => {
  const c = parseSnapshot("100:120:");
  expect(visible(c, 50n)).toBe(true);
  expect(visible(c, 99n)).toBe(true);
});

test("visible: xid >= xmax → not yet, invisible", () => {
  const c = parseSnapshot("100:120:");
  expect(visible(c, 120n)).toBe(false);
  expect(visible(c, 200n)).toBe(false);
});

test("visible: xid in [xmin, xmax) and in xip → in-flight, invisible", () => {
  const c = parseSnapshot("100:120:105,118");
  expect(visible(c, 105n)).toBe(false);
  expect(visible(c, 118n)).toBe(false);
});

test("visible: xid in [xmin, xmax) and not in xip → committed, visible", () => {
  const c = parseSnapshot("100:120:105,118");
  expect(visible(c, 100n)).toBe(true);
  expect(visible(c, 110n)).toBe(true);
  expect(visible(c, 119n)).toBe(true);
});
