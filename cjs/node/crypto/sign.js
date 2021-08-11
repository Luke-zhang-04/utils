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
exports.encodeAndSign = void 0;
const helper_1 = require("./helper");
const crypto_1 = __importDefault(require("crypto"));
const hmacHash_1 = require("./hmacHash");
async function encodeAndSign(data, algo, secretKey, 
// istanbul ignore next
enc = "hex", shouldSalt = true) {
    const salt = shouldSalt
        ? await new Promise((resolve, reject) => crypto_1.default.randomBytes(64, (err, buffer) => 
        // istanbul ignore next
        err ? reject(err) : resolve(buffer)))
        : Buffer.from("");
    const bufferData = typeof data === "string" ? Buffer.from(data, "utf-8") : data;
    const hash = hmacHash_1.hmacHash(Buffer.concat([salt, bufferData]), algo, secretKey, "raw");
    const result = Buffer.concat([salt, hash, bufferData]);
    return helper_1.bufferToString(result, enc);
}
exports.encodeAndSign = encodeAndSign;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=sign.js.map