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
exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const pbkdf2_1 = require("./pbkdf2");
async function encrypt(contents, algo, secretKey, enc = "hex", keyEnc) {
    const iv = crypto_1.default.randomBytes(16);
    if (algo.endsWith("gcm")) {
        const salt = crypto_1.default.randomBytes(64);
        const key = await pbkdf2_1.deriveKey(secretKey, salt, 
        // istanbul ignore next
        keyEnc ? Buffer.from(secretKey, keyEnc).length : undefined, "sha512");
        const cipher = crypto_1.default.createCipheriv(algo, key, iv, {
            authTagLength: 16,
        });
        const ciphered = cipher.update(contents);
        const encrypted = Buffer.concat([ciphered, cipher.final()]);
        const tag = cipher.getAuthTag();
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted]);
        return enc === "raw" ? resultBuffer : resultBuffer.toString(enc);
    }
    const cipher = crypto_1.default.createCipheriv(algo, Buffer.from(secretKey, keyEnc), iv);
    const ciphered = cipher.update(contents);
    const encrypted = Buffer.concat([ciphered, cipher.final()]);
    const resultBuffer = Buffer.concat([iv, encrypted]);
    return enc === "raw" ? resultBuffer : resultBuffer.toString(enc);
}
exports.encrypt = encrypt;
exports.default = encrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=encrypt.js.map