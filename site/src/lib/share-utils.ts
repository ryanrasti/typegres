import pako from "pako";

/**
 * Compress and encode code for URL sharing
 */
export function compressCode(code: string): string {
  // Convert string to Uint8Array
  const textEncoder = new TextEncoder();
  const uint8Array = textEncoder.encode(code);

  // Compress with gzip
  const compressed = pako.gzip(uint8Array, { level: 9 });

  // Convert to base64
  const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)));

  // Make URL-safe (base64url encoding per RFC 4648)
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decompress and decode code from URL
 */
export function decompressCode(compressed: string): string {
  // Restore base64 from base64url
  let base64 = compressed.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  while (base64.length % 4) {
    base64 += "=";
  }

  // Decode base64 to binary string
  const binaryString = atob(base64);

  // Convert to Uint8Array
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Decompress
  const decompressed = pako.ungzip(uint8Array);

  // Convert back to string
  const textDecoder = new TextDecoder();
  return textDecoder.decode(decompressed);
}

/**
 * Update URL hash with compressed code
 */
export function updateURLWithCode(code: string): void {
  const compressed = compressCode(code);
  const url = new URL(window.location.href);
  url.hash = compressed;
  window.history.replaceState(null, "", url.toString());
}

/**
 * Get code from URL hash
 */
export function getCodeFromURL(): string | null {
  try {
    const hash = window.location.hash.slice(1); // Remove the #
    if (!hash) return null;

    return decompressCode(hash);
  } catch {
    // Invalid hash, return null
    return null;
  }
}

/**
 * Copy share URL to clipboard
 */
export async function copyShareURL(code: string): Promise<void> {
  const compressed = compressCode(code);
  const url = new URL(window.location.href);
  url.hash = compressed;

  await navigator.clipboard.writeText(url.toString());
}
