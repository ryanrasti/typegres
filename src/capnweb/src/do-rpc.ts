import type { RpcStub, RpcTarget, __RPC_STUB_BRAND } from "capnweb";
// Note we needed to manually make __RPC_STUB_BRAND public in capnweb's types.d.ts for typing to work.

// Define the types we need, matching Cap'n Web's internal types
// These mirror the Unstubify and Result types from capnweb's type definitions

// Unstubify: converts RpcStub<T> to T
type Unstubify<T> =  T extends { [__RPC_STUB_BRAND]: infer U } ? U : T;

// UnstubifyAll: converts arrays/tuples of stubs to unstubified types  
// Handle specific tuple lengths without recursion
type UnstubifyAll<A extends [...unknown[]]> =  {
    [I in keyof A]: Unstubify<A[I]>;
}

// Result: wraps return types in RPC promise/stub system
// Simplified version - matches Cap'n Web's Result<R> behavior
type Result<R> = R extends RpcTarget
  ? Promise<RpcStub<R>> & RpcStub<R>
  : Promise<R>;

/**
 * Execute a callback remotely with captured stubs.
 * 
 * The callback receives unstubified versions of the captures (real types),
 * allowing TypeScript to properly type-check the entire chain.
 * 
 * @param callback - Function to execute remotely. Receives unstubified captures.
 * @param captures - Array of remote stubs (StubBase<T> or RpcStub<T>) to pass to callback
 * @returns Promise that resolves to the callback's return value (wrapped in Result)
 * 
 * @example
 * ```typescript
 * const tg = api.getTg(); // RpcStub<Typegres>
 * const users = api.users(); // RpcStub<Select<...>>
 * 
 * const result = await doRpc(
 *   (tg, users) => {
 *     // Inside here, tg and users are typed as real Typegres and Select
 *     return users.select(...).where(...).execute(tg);
 *   },
 *   [tg, users]
 * );
 * // result is properly typed based on the select() return type
 * ```
 */
export function doRpc<T, C extends [...unknown[]]>(
  callback: (...captures: UnstubifyAll<C>) => T,
  captures: C
): Result<T> {
  // TODO: Real implementation using Cap'n Web's map() machinery
  // For now, just call it directly (POC)
  return callback(...(captures as any)) as any;
}

