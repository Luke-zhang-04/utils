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
exports.encrypt = void 0;
const helper_js_1 = require("./helper.js");
const crypto_1 = __importDefault(require("crypto"));
const pbkdf2_js_1 = require("./pbkdf2.js");
async function encrypt(contents, algo, secretKey, enc = "hex", keyLength) {
    const _keyLength = keyLength ?? (0, helper_js_1.getKeyLengthFromAlgo)(algo);
    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`);
    }
    const iv = await new Promise((resolve, reject) => crypto_1.default.randomBytes(16, (err, buffer) => 
    // istanbul ignore next
    err ? reject(err) : resolve(buffer)));
    const salt = await new Promise((resolve, reject) => crypto_1.default.randomBytes(64, (err, buffer) => 
    // istanbul ignore next
    err ? reject(err) : resolve(buffer)));
    const key = await (0, pbkdf2_js_1.deriveKey)(secretKey, salt, 
    // istanbul ignore next
    _keyLength, "sha512");
    if (algo.endsWith("gcm")) {
        const cipher = crypto_1.default.createCipheriv(algo, key, iv, {
            authTagLength: 16,
        });
        const ciphered = cipher.update(contents);
        const encrypted = Buffer.concat([ciphered, cipher.final()]);
        const tag = cipher.getAuthTag();
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted]);
        return (0, helper_js_1.bufferToString)(resultBuffer, enc);
    }
    const cipher = crypto_1.default.createCipheriv(algo, key, iv);
    const ciphered = cipher.update(contents);
    const encrypted = Buffer.concat([ciphered, cipher.final()]);
    const resultBuffer = Buffer.concat([salt, iv, encrypted]);
    return (0, helper_js_1.bufferToString)(resultBuffer, enc);
}
exports.encrypt = encrypt;
exports.default = encrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=encrypt.js.map