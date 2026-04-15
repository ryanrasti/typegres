#!/usr/bin/env -S node --experimental-strip-types

export {};
const command = process.argv[2];

if (command === "generate") {
  // eslint-disable-next-line no-restricted-syntax -- CLI command dispatch
  await import("./tables/generate.ts");
} else {
  console.error(`Usage: tg generate`);
  process.exit(1);
}
