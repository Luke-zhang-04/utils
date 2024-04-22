"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing SubtleCrypto API
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = exports.toBase64 = void 0;
/**
 * Converts a byte array to a base64 string
 *
 * @param bytes - Converts byte array to a base64 string
 * @returns String with base64 encoding, not URL safe
 */
const toBase64 = (bytes) => window.btoa(String.fromCharCode(...bytes));
exports.toBase64 = toBase64;
/**
 * Converts a byte array to a hex string
 *
 * @param bytes - Converts byte array to a hex string
 * @returns String with hex encoding
 */
const toHex = (bytes) => Array.from(bytes)
    .map((bite) => bite.toString(16).padStart(2, "0"))
    .join("");
exports.toHex = toHex;
//# sourceMappingURL=encoding.js.map