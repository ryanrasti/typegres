#!/usr/bin/env node
import { main as generateTables } from "./tables/generate.ts";

const command = process.argv[2];

if (command === "generate") {
  await generateTables();
} else {
  console.error(`Usage: tg generate`);
  process.exit(1);
}
