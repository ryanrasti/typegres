import { expect } from "vitest";
import type { RpcTarget } from "capnweb";
import { RpcSession, type RpcTransport } from "capnweb";
import { toRpc, type ShimStub } from "./shim";

// Test-only in-memory capnweb wiring (mirrors capnweb's own test transport):
// a client/server RpcSession pair joined by paired message queues, with the
// server's main capability run through the @expose shim.

export class InMemoryTransport implements RpcTransport {
  constructor(private partner?: InMemoryTransport) {
    if (partner) {
      partner.partner = this;
    }
  }

  private queue: string[] = [];
  private waiter?: (() => void) | undefined;

  async send(message: string): Promise<void> {
    this.partner!.queue.push(message);
    if (this.partner!.waiter) {
      this.partner!.waiter();
      this.partner!.waiter = undefined;
    }
  }

  async receive(): Promise<string> {
    while (this.queue.length === 0) {
      await new Promise<void>((resolve) => {
        this.waiter = resolve;
      });
    }
    return this.queue.shift()!;
  }
}

// Spin the microtask queue a bit to give in-flight messages time to be
// delivered and handled (e.g. dispose/release messages during teardown).
export const pumpMicrotasks = async () => {
  for (let i = 0; i < 16; i++) {
    await Promise.resolve();
  }
};

export class CapnwebHarness<T extends object> {
  client: RpcSession;
  server: RpcSession;
  stub: ShimStub<T>;

  constructor(main: T) {
    const clientTransport = new InMemoryTransport();
    const serverTransport = new InMemoryTransport(clientTransport);
    this.client = new RpcSession(clientTransport);
    this.server = new RpcSession(serverTransport, toRpc(main) as RpcTarget);
    this.stub = this.client.getRemoteMain() as ShimStub<T>;
  }

  async [Symbol.asyncDispose]() {
    this.stub[Symbol.dispose]();
    await pumpMicrotasks();
    // Leak guard (mirrors capnweb's own TestHarness): once the main stub is
    // disposed and in-flight dispose messages have drained, each session
    // should hold only its single main import/export. A residue means a
    // capability crossed the wire and was never released -- exactly what the
    // shim's dup()/FinalizationRegistry/wrap caches exist to prevent.
    expect(this.client.getStats(), "client leak").toEqual({ imports: 1, exports: 1 });
    expect(this.server.getStats(), "server leak").toEqual({ imports: 1, exports: 1 });
  }
}
