/**
 * Cryptography related utils
 *
 * Wraps the existing SubtleCrypto API
 *
 * @module
 */
/// <reference types="typescript/lib/lib.dom.d.ts"/>
import * as encoding from "./encoding.js";
/**
 * Hashes data with a SHA algorithm
 *
 * @param data - Data to hash
 * @param algo - Hash algorithm. The only available algorithms are those provided by the
 *   `SubtleCrypto` API
 * @param enc - Hash digest encoding types. Only hex and base64 are supported
 * @returns String of hashed data
 */
export const hash = async (data, algo = "SHA-256", enc = "hex") => {
    const encodedData = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest(algo, encodedData);
    const bytes = new Uint8Array(hashBuffer);
    if (enc === "hex") {
        return encoding.toHex(bytes);
    }
    return encoding.toBase64(bytes);
};
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
export const hmacHash = async (data, secret, algo = "SHA-256", enc = "hex") => {
    const textEncoder = new TextEncoder();
    const encodedSecret = textEncoder.encode(secret);
    const encodedData = textEncoder.encode(data);
    const key = await crypto.subtle.importKey("raw", encodedSecret, { name: "HMAC", hash: algo }, false, ["sign", "verify"]);
    const hashBuffer = await crypto.subtle.sign("HMAC", key, encodedData);
    const bytes = new Uint8Array(hashBuffer);
    if (enc === "hex") {
        return encoding.toHex(bytes);
    }
    return encoding.toBase64(bytes);
};
//# sourceMappingURL=crypto.js.map