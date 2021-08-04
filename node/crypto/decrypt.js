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
export async function decrypt(encryptedData, algo, secretKey, enc = "hex") {
    const bData = enc === "raw" ? encryptedData : Buffer.from(encryptedData, enc);
    if (algo.endsWith("gcm")) {
        /* eslint-disable @typescript-eslint/no-magic-numbers */
        const salt = bData.slice(0, 64);
        const iv = bData.slice(64, 80);
        const tag = bData.slice(80, 96);
        const encryptedText = bData.slice(96);
        /* eslint-enable @typescript-eslint/no-magic-numbers */
        const key = await deriveKey(secretKey, salt, "sha512");
        const decipher = crypto.createDecipheriv(algo, key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    }
    const iv = bData.slice(0, 16);
    const encryptedText = bData.slice(16);
    const decipher = crypto.createDecipheriv(algo, Buffer.from(secretKey), iv);
    const deciphered = decipher.update(encryptedText);
    const decrypted = Buffer.concat([deciphered, decipher.final()]);
    return decrypted.toString();
}
export default decrypt;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=decrypt.js.map