// Minimal worker entry for the workerd vitest project: exports the
// SQLite-backed DO class bound as TEST_DO. The *.do-test.ts tests never
// route requests through fetch — they enter the DO via cloudflare:test's
// runInDurableObject and drive typegres against its storage directly.
import { DurableObject } from "cloudflare:workers";

export class TestDO extends DurableObject {}

export default {
  fetch(): Response {
    return new Response("test worker");
  },
};
