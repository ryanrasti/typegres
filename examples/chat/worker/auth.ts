// Password hashing with WebCrypto PBKDF2 — no node deps, runs in workerd.
// Demo-honest: fine for claiming usernames on a toy deployment, not a
// substitute for real auth (no rate limiting, no lockout, no tokens).

const ITERATIONS = 100_000;

const b64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));
const unb64 = (s: string): Uint8Array => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

const derive = async (password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> => {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    key,
    256,
  );
  return new Uint8Array(bits);
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, ITERATIONS);
  return `pbkdf2:${ITERATIONS}:${b64(salt)}:${b64(hash)}`;
};

export const verifyPassword = async (password: string, stored: string): Promise<boolean> => {
  const [scheme, iterStr, saltB64, hashB64] = stored.split(":");
  if (scheme !== "pbkdf2" || !iterStr || !saltB64 || !hashB64) {
    return false;
  }
  const expected = unb64(hashB64);
  const actual = await derive(password, unb64(saltB64), Number(iterStr));
  if (expected.length !== actual.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected[i]! ^ actual[i]!;
  }
  return diff === 0;
};
