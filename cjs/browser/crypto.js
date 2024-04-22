"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing SubtleCrypto API
 *
 * @module
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacHash = exports.hash = void 0;
/// <reference types="typescript/lib/lib.dom.d.ts"/>
const encoding = __importStar(require("./encoding.js"));
/**
 * Hashes data with a SHA algorithm
 *
 * @param data - Data to hash
 * @param algo - Hash algorithm. The only available algorithms are those provided by the
 *   `SubtleCrypto` API
 * @param enc - Hash digest encoding types. Only hex and base64 are supported
 * @returns String of hashed data
 */
const hash = async (data, algo = "SHA-256", enc = "hex") => {
    const encodedData = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest(algo, encodedData);
    const bytes = new Uint8Array(hashBuffer);
    if (enc === "hex") {
        return encoding.toHex(bytes);
    }
    return encoding.toBase64(bytes);
};
exports.hash = hash;
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
const hmacHash = async (data, secret, algo = "SHA-256", enc = "hex") => {
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
exports.hmacHash = hmacHash;
//# sourceMappingURL=crypto.js.map