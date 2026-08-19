export {};

process.env["ORACLE_URL"] ??= "oracle://typegres:typegres@localhost:1521/FREEPDB1";
process.env["PORT"] ??= "3001";

await import("./index.js");
