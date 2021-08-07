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
exports.decrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const pbkdf2_1 = require("./pbkdf2");
const helper_1 = require("./helper");
async function decrypt(encryptedData, algo, secretKey, enc = "hex", keyLength) {
    const _keyLength = keyLength !== null && keyLength !== void 0 ? keyLength : helper_1.getKeyLengthFromAlgo(algo);
    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`);
    }
    const bData = enc === "raw" ? encryptedData : Buffer.from(encryptedData, enc);
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const key = await pbkdf2_1.deriveKey(secretKey, salt, 
    // istanbul ignore next
    _keyLength, "sha512");
    if (/gcm$/iu.test(algo)) {
        const tag = bData.slice(80, 96);
        const encryptedText = bData.slice(96);
        const decipher = crypto_1.default.createDecipheriv(algo, key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    }
    const encryptedText = bData.slice(80);
    /* eslint-enable @typescript-eslint/no-magic-numbers */
    const decipher = crypto_1.default.createDecipheriv(algo, key, iv);
    const deciphered = decipher.update(encryptedText);
    const decrypted = Buffer.concat([deciphered, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
exports.default = decrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=decrypt.js.map