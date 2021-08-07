"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
function hmacHash(contents, algo, secretKey, enc = "hex") {
    const buffer = crypto_1.default.createHmac(algo, secretKey).update(contents).digest();
    return enc === "raw" ? buffer : buffer.toString(enc);
}
exports.hmacHash = hmacHash;
exports.default = hmacHash;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
