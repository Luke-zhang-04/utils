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
async function decrypt(encryptedData, algo, secretKey, enc = "hex", keyEnc) {
    const bData = enc === "raw" ? encryptedData : Buffer.from(encryptedData, enc);
    if (algo.endsWith("gcm")) {
        /* eslint-disable @typescript-eslint/no-magic-numbers */
        const salt = bData.slice(0, 64);
        const iv = bData.slice(64, 80);
        const tag = bData.slice(80, 96);
        const encryptedText = bData.slice(96);
        /* eslint-enable @typescript-eslint/no-magic-numbers */
        const key = await pbkdf2_1.deriveKey(secretKey, salt, 
        // istanbul ignore next
        keyEnc ? Buffer.from(secretKey, keyEnc).length : undefined, "sha512");
        const decipher = crypto_1.default.createDecipheriv(algo, key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    }
    const iv = bData.slice(0, 16);
    const encryptedText = bData.slice(16);
    const decipher = crypto_1.default.createDecipheriv(algo, Buffer.from(secretKey, keyEnc), iv);
    const deciphered = decipher.update(encryptedText);
    const decrypted = Buffer.concat([deciphered, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
exports.default = decrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
