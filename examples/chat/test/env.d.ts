import type { Env } from "../src/index";

// Types the `env` exported from cloudflare:test with our worker's bindings.
declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {}
}
