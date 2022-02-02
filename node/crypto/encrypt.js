/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import { bufferToString, getKeyLengthFromAlgo } from "./helper";
import crypto from "crypto";
import { deriveKey } from "./pbkdf2";
export async function encrypt(contents, algo, secretKey, enc = "hex", keyLength) {
    const _keyLength = keyLength !== null && keyLength !== void 0 ? keyLength : getKeyLengthFromAlgo(algo);
    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`);
    }
    const iv = await new Promise((resolve, reject) => crypto.randomBytes(16, (err, buffer) => 
    // istanbul ignore next
    err ? reject(err) : resolve(buffer)));
    const salt = await new Promise((resolve, reject) => crypto.randomBytes(64, (err, buffer) => 
    // istanbul ignore next
    err ? reject(err) : resolve(buffer)));
    const key = await deriveKey(secretKey, salt, 
    // istanbul ignore next
    _keyLength, "sha512");
    if (algo.endsWith("gcm")) {
        const cipher = crypto.createCipheriv(algo, key, iv, {
            authTagLength: 16,
        });
        const ciphered = cipher.update(contents);
        const encrypted = Buffer.concat([ciphered, cipher.final()]);
        const tag = cipher.getAuthTag();
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted]);
        return bufferToString(resultBuffer, enc);
    }
    const cipher = crypto.createCipheriv(algo, key, iv);
    const ciphered = cipher.update(contents);
    const encrypted = Buffer.concat([ciphered, cipher.final()]);
    const resultBuffer = Buffer.concat([salt, iv, encrypted]);
    return bufferToString(resultBuffer, enc);
}
export default encrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=encrypt.js.map