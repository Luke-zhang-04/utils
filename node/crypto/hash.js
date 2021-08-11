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
export function hash(contents, algo, enc = "hex") {
    return bufferToString(crypto.createHash(algo).update(contents).digest(), enc);
}
export default hash;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=hash.js.map