// Doc-extraction contract for the SQLite signature pipeline.
//
// Each vendored .html page (see fetch.sh) has a sibling .json holding
// the FACTS extracted from that page — one file per page, 1:1, so a
// SQLite version bump is: re-run fetch.sh, re-extract the changed
// page(s) with EXTRACTION_PROMPT, review a tight JSON diff, re-verify.
//
// The JSONs hold doc-derived facts ONLY — and the library surface is
// DERIVED from them by global rules in ../emit.ts (args in exact SQL
// call order; method receivers = the FIRST argument's documented
// domain; names = camelCase(sql) / operator symbol + alias).
// There is no per-function policy layer: the only remaining judgment
// lives in ../emit.ts's EXCLUSIONS list and the emit rules
// themselves. This keeps the 1:1 claim strict — an extraction file is
// checkable against its page alone — and makes extraction fidelity
// load-bearing: the receiver argument's documented domain is what
// decides which typed views surface a method.
//
// The structural schema is shared with postgres (emission/facts.ts);
// this file adds the sqlite-only refinements and the extraction
// prompt. ../emit.ts loads + zod-validates every JSON at module load
// into SIGNATURES. The property verifier (signatures.verify.test.ts)
// remains the correctness oracle for every claim in these files.

import z from "zod";
import {
  EmitFnSchema,
  type EmitArg,
  type EmitOverload,
  type EmitFn,
} from "../../emission/facts.ts";
export type { Nullability } from "../../emission/facts.ts";

// --- schema ---------------------------------------------------------------
// The structural schema is the SHARED facts contract
// (../../emission/facts.ts) — the same shape postgres produces from
// its catalog. What's sqlite-specific is the extra validation the
// LLM-extracted JSONs get: the storage-class and hint vocabularies,
// required docs, and pg-only fields rejected.

export const SqlTSchema = z.enum(["integer", "real", "text", "blob", "bool", "any"]);

// Semantic domain of an argument, when the docs constrain it beyond a
// storage class. Drives the verifier's input generators.
export const HintSchema = z.enum([
  "json", "jsonpath", "json-array", "jsonpath-element", "plain",
  "datetime", "datetime-modifier", "strftime-format",
  "printf-format", "like-pattern", "escape-char",
  "percent", "fraction", "unit-interval", "byte-count",
]);

export const DocPageSchema = z
  .object({
    page: z.string(),               // the .html this was extracted from
    functions: z.array(EmitFnSchema),
  })
  .superRefine((page, ctx) => {
    page.functions.forEach((f, fi) => {
      const issue = (message: string, path: (string | number)[]): void => {
        ctx.addIssue({ code: "custom", message, path: ["functions", fi, ...path] });
      };
      if (!f.doc) { issue(`${f.sql}: doc is required`, ["doc"]); }
      if (f.isSrf) {
        if (!f.outColumns?.length) { issue(`${f.sql}: isSrf requires outColumns`, ["outColumns"]); }
        for (const [ci, c] of (f.outColumns ?? []).entries()) {
          if (!SqlTSchema.safeParse(c.type).success) { issue(`${f.sql}: unknown storage class '${c.type}'`, ["outColumns", ci, "type"]); }
        }
      } else if (f.outColumns) {
        issue(`${f.sql}: outColumns without isSrf`, ["outColumns"]);
      }
      f.overloads.forEach((o, oi) => {
        const at = (rest: (string | number)[]): (string | number)[] => ["overloads", oi, ...rest];
        if (o.nullability === "maybe_null") { issue(`${f.sql}: maybe_null is pg-only`, at(["nullability"])); }
        const retOk = f.isSrf
          ? o.returns === null  // the SRF row shape lives in outColumns
          : o.returns === "arg0" || SqlTSchema.safeParse(o.returns).success;
        if (!retOk) { issue(`${f.sql}: invalid returns '${o.returns}'`, at(["returns"])); }
        o.args.forEach((arg, ai) => {
          if (arg.type === null || !SqlTSchema.safeParse(arg.type).success) {
            issue(`${f.sql}: unknown storage class '${arg.type}'`, at(["args", ai, "type"]));
          }
          if (arg.hint !== undefined && !HintSchema.safeParse(arg.hint).success) {
            issue(`${f.sql}: unknown hint '${arg.hint}'`, at(["args", ai, "hint"]));
          }
        });
      });
    });
  });

export type SqlT = z.infer<typeof SqlTSchema>;
export type Hint = z.infer<typeof HintSchema>;
export type ArgDef = EmitArg;
export type Overload = EmitOverload;
export type DocFunction = EmitFn;
export type DocPage = z.infer<typeof DocPageSchema>;

// --- extraction prompt ------------------------------------------------------
// Hand this, word for word, to a subagent along with ONE vendored
// .html page. Substitute {PAGE} with the page filename (e.g.
// "lang_corefunc.html"). The output replaces the sibling
// {PAGE_BASENAME}.json.

export const EXTRACTION_PROMPT = `
You are extracting SQLite function/operator signatures from one page
of the official SQLite documentation into a JSON facts file. Read the
file docs/{PAGE} completely, then output a single JSON document — no
prose, no markdown fences — conforming to the DocPage schema in
docs/index.ts (fields: page, functions[]; each function: sql, kind,
doc, deterministic?, isSrf?, outColumns?, overloads[]; each overload:
args[], variadic?, returns, nullability, nullPositions?; each arg:
type, hint?, optional?).

Rules:

1. FACTS ONLY, from this page alone. Do not decide which typegres
   views expose a method, naming, or anything else about the
   library — that is policy and lives elsewhere. If the page
   documents it, extract it; if not, don't invent it.

2. One entry per documented function or operator, keyed by its exact
   SQL spelling in "sql" (lowercase function names; operator symbols
   verbatim, e.g. "->>", "IS NOT"). kind: "scalar" | "aggregate" for
   functions, "binop" | "unaryop" for operators. List args in the
   function's EXACT documented call order — never reorder. The FIRST
   argument is the method receiver, so its documented domain
   determines which typed views surface the method; extract every
   arg's domain faithfully: a function the page documents for JSON
   values (text or JSONB blob) gets one overload per receiver class,
   not a single "any". For lang_expr.html,
   enumerate EVERY operator in the precedence table (that table is
   the completeness inventory for operators) — except operators that
   are query-builder syntax rather than value expressions (AND, OR,
   NOT, IN, BETWEEN, CASE, CAST, COLLATE, EXISTS, LIKE/GLOB/REGEXP/
   MATCH keyword forms — LIKE and GLOB are extracted from
   lang_corefunc.html as their function forms instead).

3. Overloads: one per distinct arity/argument-type combination with
   observable meaning. Use storage classes ("integer", "real",
   "text", "blob") when the docs are specific; "any" when the
   function accepts any value; "bool" only for true/false-valued
   parameters and returns. For numeric functions documented for both
   integer and real inputs with input-dependent returns, emit one
   overload per input class. Mark trailing optional parameters with
   "optional": true; mark "last argument repeats" with
   "variadic": true.
   Pairwise-repeating tails (json_set's path,value pairs) cannot be
   expressed — cover one pair and note it in "doc".

4. returns: the storage class the page says comes back; "arg0" when
   the return type follows the first argument (abs, min/max
   aggregates).

5. For functions (not operators), set "deterministic": true unless the
   page describes the result as random, connection-dependent, or
   changing between identical calls (random, changes,
   last_insert_rowid, ...). Statement-time 'now' counts as
   deterministic. The verifier cross-checks this against the engine's
   SQLITE_DETERMINISTIC flag, and non-deterministic functions are not
   emitted to the typed surface.

6. nullability — commit to exactly one, this is the hardest judgment
   and the property verifier will catch mistakes:
   - "propagates": NULL in → NULL out AND non-null valid in →
     non-null out.
   - "never": non-null even for NULL inputs (hex, quote, typeof).
   - "always": can be NULL on valid non-null input (aggregates over
     the empty set, nullif).
   - "on_error": NULL is the error signal (date parsing, JSON paths,
     domain errors like sqrt(-1), division by zero).
   Use nullPositions (0-based) when only SOME argument positions
   participate in NULL semantics (concat_ws: only the separator
   propagates; json_object: labels may not be NULL at all).

7. hint: attach the semantic domain the docs state for constrained
   arguments — time values ("datetime"), modifiers
   ("datetime-modifier"), strftime/printf format strings, JSON
   documents ("json") and paths ("jsonpath"), LIKE patterns, ESCAPE
   chars ("escape-char"), bounded fractions ("percent" 0..100,
   "fraction" 0..1), allocation sizes ("byte-count" — zeroblob,
   randomblob), and "plain" for JSON value positions (JSON cannot
   hold BLOBs). Arguments to array-element operations use
   "json-array" / "jsonpath-element".

8. doc: one sentence, present tense, from the page's description —
   include version notes the page states (e.g. "(3.44+)").

9. Table-valued (set-returning) functions the page documents
   (json_each, json_tree): kind "scalar" with "isSrf": true and
   "outColumns" listing the projected columns in order with their
   storage classes ("any" where the class depends on the data). Their
   overloads describe the CALL arguments as usual, with
   "returns": null — the row shape lives in outColumns.

Output only the JSON document.
`.trim();
