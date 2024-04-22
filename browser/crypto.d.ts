/**
 * Cryptography related utils
 *
 * Wraps the existing SubtleCrypto API
 *
 * @module
 */
/**
 * Hashes data with a SHA algorithm
 *
 * @param data - Data to hash
 * @param algo - Hash algorithm. The only available algorithms are those provided by the
 *   `SubtleCrypto` API
 * @param enc - Hash digest encoding types. Only hex and base64 are supported
 * @returns String of hashed data
 */
export declare const hash: (data: string, algo?: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512", enc?: "hex" | "base64") => Promise<string>;
/**
 * Salts and hashes data with HMAC and a SHA algorithm
 *
 * @param data - Data to hash
 * @param secret - Secret to salt the data with
 * @param algo - Hash algorithm. The only available algorithms are those provided by the
 *   `SubtleCrypto` API
 * @param enc - Hash digest encoding types. Only hex and base64 are supported
 * @returns String of hashed data
 */
export declare const hmacHash: (data: string, secret: string, algo?: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512", enc?: "hex" | "base64") => Promise<string>;
