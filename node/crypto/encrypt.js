/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import crypto from "crypto";
import { deriveKey } from "./pbkdf2";
export async function encrypt(contents, algo, secretKey, enc = "hex") {
    const iv = crypto.randomBytes(16);
    if (algo.endsWith("gcm")) {
        const salt = crypto.randomBytes(64);
        const key = await deriveKey(secretKey, salt, "sha512");
        const cipher = crypto.createCipheriv(algo, key, iv);
        const ciphered = cipher.update(contents);
        const encrypted = Buffer.concat([ciphered, cipher.final()]);
        const tag = cipher.getAuthTag();
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted]);
        return enc === "raw" ? resultBuffer : resultBuffer.toString(enc);
    }
    const cipher = crypto.createCipheriv(algo, Buffer.from(secretKey), iv);
    const ciphered = cipher.update(contents);
    const encrypted = Buffer.concat([ciphered, cipher.final()]);
    const resultBuffer = Buffer.concat([iv, encrypted]);
    return enc === "raw" ? resultBuffer : resultBuffer.toString(enc);
}
export default encrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=encrypt.js.map