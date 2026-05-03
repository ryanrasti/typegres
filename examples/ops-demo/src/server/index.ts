// Hono server: RPC over POST /rpc, live subscriptions over GET /live (SSE).
//
// Wire shape:
//   POST /rpc — body is a JS expression (exoeval subset) with `api` in
//     scope. Returned value is JSON-serialized and sent back.
//   GET /live?q=<encoded expression> — same wire, but the expression must
//     evaluate to a QueryBuilder. Server iterates `db.live(qb)` and pushes
//     each yield as an SSE `data:` frame. Client disconnect → for-await
//     throws → live()'s `finally` unsubscribes.

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { streamSSE } from "hono/streaming";
import { exoEval, safeStringify } from "typegres/exoeval";
import { db } from "../db";
import { Api } from "./api";

const api = new Api(db);

// TODO(live): re-enable once (a) `_typegres_live_events` is added to the
// migration and (b) generated tables get `Table(..., { transformer:
// TypegresLiveEvents.makeTransformer() })`. Until then live() polling
// errors at boot. See AGENTS.md.
// await db.startLive();

const app = new Hono();

app.post("/rpc", async (c) => {
  const code = await c.req.text();
  try {
    const result = await exoEval(code, { api });
    return c.body(safeStringify(result), 200, { "content-type": "application/json" });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 400);
  }
});

app.get("/live", (c) => {
  // TODO(live): see startLive note above. Wire when live is enabled.
  return c.text("live disabled — see AGENTS.md", 503);
});

// Suppress unused-import warnings while live is disabled.
void streamSSE;

const port = Number(process.env["PORT"] ?? 3000);
serve({ fetch: app.fetch, port });
console.log(`ops-demo server listening on http://localhost:${port}`);
