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
export declare const toBase64: (bytes: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array) => string;
/**
 * Converts a byte array to a hex string
 *
 * @param bytes - Converts byte array to a hex string
 * @returns String with hex encoding
 */
export declare const toHex: (bytes: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array) => string;
