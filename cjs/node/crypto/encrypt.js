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
const helper_1 = require("./helper");
async function encrypt(contents, algo, secretKey, enc = "hex", keyLength) {
    const _keyLength = keyLength !== null && keyLength !== void 0 ? keyLength : helper_1.getKeyLengthFromAlgo(algo);
    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`);
    }
    const iv = crypto_1.default.randomBytes(16);
    const salt = crypto_1.default.randomBytes(64);
    const key = await pbkdf2_1.deriveKey(secretKey, salt, 
    // istanbul ignore next
    _keyLength, "sha512");
    if (/gcm$/iu.test(algo)) {
        const cipher = crypto_1.default.createCipheriv(algo, key, iv, {
            authTagLength: 16,
        });
        const ciphered = cipher.update(contents);
        const encrypted = Buffer.concat([ciphered, cipher.final()]);
        const tag = cipher.getAuthTag();
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted]);
        return enc === "raw" ? resultBuffer : resultBuffer.toString(enc);
    }
    const cipher = crypto_1.default.createCipheriv(algo, key, iv);
    const ciphered = cipher.update(contents);
    const encrypted = Buffer.concat([ciphered, cipher.final()]);
    const resultBuffer = Buffer.concat([salt, iv, encrypted]);
    return enc === "raw" ? resultBuffer : resultBuffer.toString(enc);
}
exports.encrypt = encrypt;
exports.default = encrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=encrypt.js.map