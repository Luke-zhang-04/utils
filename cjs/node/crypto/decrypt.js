"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
const helper_js_1 = require("./helper.js");
const crypto_1 = __importDefault(require("crypto"));
const pbkdf2_js_1 = require("./pbkdf2.js");
async function decrypt(encryptedData, algo, secretKey, enc = "hex", keyLength) {
    const _keyLength = keyLength ?? (0, helper_js_1.getKeyLengthFromAlgo)(algo);
    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`);
    }
    const bData = (0, helper_js_1.stringToBuffer)(encryptedData, enc);
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const key = await (0, pbkdf2_js_1.deriveKey)(secretKey, salt, 
    // istanbul ignore next
    _keyLength, "sha512");
    if (algo.endsWith("gcm")) {
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