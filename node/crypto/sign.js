/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import { bufferToString } from "./helper";
import crypto from "crypto";
import { hmacHash } from "./hmacHash";
export async function encodeAndSign(data, algo, secretKey, 
// istanbul ignore next
enc = "hex", shouldSalt = true) {
    const salt = shouldSalt
        ? await new Promise((resolve, reject) => crypto.randomBytes(64, (err, buffer) => 
        // istanbul ignore next
        err ? reject(err) : resolve(buffer)))
        : Buffer.from("");
    const bufferData = typeof data === "string" ? Buffer.from(data, "utf-8") : data;
    const hash = hmacHash(Buffer.concat([salt, bufferData]), algo, secretKey, "raw");
    const result = Buffer.concat([salt, hash, bufferData]);
    return bufferToString(result, enc);
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=sign.js.map