// PBKDF2 keeps the demo self-contained. A production login would also need
// rate limiting, lockout policy, password reset, and session management.
const ITERATIONS = 100_000;

const b64 = (bytes: Uint8Array): string => Buffer.from(bytes).toString("base64");
const unb64 = (value: string): Uint8Array => new Uint8Array(Buffer.from(value, "base64"));

const derive = async (
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
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
  const [scheme, iterText, saltText, hashText] = stored.split(":");
  if (scheme !== "pbkdf2" || !iterText || !saltText || !hashText) { return false; }
  const expected = unb64(hashText);
  const actual = await derive(password, unb64(saltText), Number(iterText));
  if (expected.length !== actual.length) { return false; }
  let difference = 0;
  for (let i = 0; i < expected.length; i++) {
    difference |= expected[i]! ^ actual[i]!;
  }
  return difference === 0;
};
