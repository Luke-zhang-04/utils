/**
 * Cryptography related utils
 *
 * Wraps the existing SubtleCrypto API
 *
 * @module
 */
/**
 * Converts a byte array to a base64 string
 *
 * @param bytes - Converts byte array to a base64 string
 * @returns String with base64 encoding, not URL safe
 */
export const toBase64 = (bytes) => window.btoa(String.fromCharCode(...bytes));
/**
 * Converts a byte array to a hex string
 *
 * @param bytes - Converts byte array to a hex string
 * @returns String with hex encoding
 */
export const toHex = (bytes) => Array.from(bytes)
    .map((bite) => bite.toString(16).padStart(2, "0"))
    .join("");
//# sourceMappingURL=encoding.js.map