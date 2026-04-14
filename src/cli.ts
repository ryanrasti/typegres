#!/usr/bin/env -S node --experimental-strip-types

const command = process.argv[2];

if (command === "generate") {
  await import("./tables/generate.ts");
} else {
  console.error(`Usage: tg generate`);
  process.exit(1);
}
