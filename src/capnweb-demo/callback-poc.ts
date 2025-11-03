/**
 * POC for extending Cap'n Web to support callbacks in any method
 * 
 * The idea: 
 * 1. Detect when a method is called with a function argument
 * 2. Use the map() machinery to record/replay the callback
 * 3. On server, call the actual method with a replay function
 */

import { RpcPromise, RpcStub } from "capnweb";

// Monkey-patch RpcPromise to add our callback detection
const OriginalRpcPromise = RpcPromise as any;

// Store the original apply handler
const originalApply = (OriginalRpcPromise.prototype.constructor as any).apply;

// List of methods we know take callbacks (hardcoded for POC)
const CALLBACK_METHODS = new Set(['where', 'select', 'orderBy', 'groupBy', 'having']);

// Override the proxy apply handler to detect callbacks
export function enableCallbackMethods() {
  // We need to patch the PROXY_HANDLERS apply function
  // This is tricky because it's internal to Cap'n Web
  
  // For POC, let's add a special method to RpcPromise that wraps callback methods
  (RpcPromise as any).prototype.callWithCallback = function(
    methodName: string, 
    callback: (arg: any) => any
  ) {
    console.log(`Intercepted ${methodName} with callback`);
    
    // Get the underlying stub
    const stub = (this as any)[Symbol.for("realStub")] || this;
    
    // Use map machinery but include the method name
    // This is a hack - we're encoding the method name in the path
    const encodedPath = [`__callback_method__${methodName}`];
    
    // Call map with our callback
    // The map machinery will record all operations
    return (this as any).map(callback);
  };
  
  console.log("Callback methods enabled");
}

// Helper to check if a value is a function
export function isCallback(value: any): boolean {
  return typeof value === 'function';
}

// Server-side: decode and replay
export function replayCallbackMethod(
  target: any,
  encodedPath: string[],
  recordedOps: any
) {
  // Extract method name from encoded path
  const methodName = encodedPath[0]?.replace('__callback_method__', '');
  
  if (!methodName) {
    throw new Error('Invalid callback method encoding');
  }
  
  console.log(`Replaying ${methodName} on server`);
  
  // Call the actual method with a function that replays operations
  return target[methodName]((arg: any) => {
    // Replay recorded operations on arg
    // This is simplified - real implementation needs proper replay logic
    return recordedOps;
  });
}