// Minimal duck-typed declarations for the workerd virtual modules the
// *.do-test.ts suite imports — same philosophy as DoSqliteDriver's
// SqlStorageLike: declare only the surface we use, so these files
// typecheck under the MAIN tsconfig (node ambient globals) instead of
// needing a second TS project with @cloudflare/workers-types (whose
// globals conflict with @types/node). The real implementations are
// provided at runtime by @cloudflare/vitest-pool-workers / workerd.

declare module "cloudflare:test" {
  import type { DoStorageLike } from "../../drivers/do";

  export const env: {
    TEST_DO: { getByName(name: string): DurableObjectStubLike };
  };
  export interface DurableObjectStubLike {
    readonly __brand?: "DurableObjectStub";
  }
  export function runInDurableObject<T>(
    stub: DurableObjectStubLike,
    callback: (instance: unknown, state: { storage: DoStorageLike }) => T | Promise<T>,
  ): Promise<T>;
}

declare module "cloudflare:workers" {
  export class DurableObject {}
}
