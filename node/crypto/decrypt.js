/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import { getKeyLengthFromAlgo, stringToBuffer } from "./helper";
import crypto from "crypto";
import { deriveKey } from "./pbkdf2";
export async function decrypt(encryptedData, algo, secretKey, enc = "hex", keyLength) {
    const _keyLength = keyLength !== null && keyLength !== void 0 ? keyLength : getKeyLengthFromAlgo(algo);
    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`);
    }
    const bData = stringToBuffer(encryptedData, enc);
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const key = await deriveKey(secretKey, salt, 
    // istanbul ignore next
    _keyLength, "sha512");
    if (algo.endsWith("gcm")) {
        const tag = bData.slice(80, 96);
        const encryptedText = bData.slice(96);
        const decipher = crypto.createDecipheriv(algo, key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    }
    const encryptedText = bData.slice(80);
    /* eslint-enable @typescript-eslint/no-magic-numbers */
    const decipher = crypto.createDecipheriv(algo, key, iv);
    const deciphered = decipher.update(encryptedText);
    const decrypted = Buffer.concat([deciphered, decipher.final()]);
    return decrypted.toString();
}
export default decrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=decrypt.js.map