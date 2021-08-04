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
export function hash(contents, algo, enc = "hex") {
    const buffer = crypto.createHash(algo).update(contents).digest();
    return enc === "raw" ? buffer : buffer.toString(enc);
}
export default hash;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=hash.js.map