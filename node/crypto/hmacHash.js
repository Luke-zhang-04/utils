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
export function hmacHash(contents, algo, secretKey, enc = "hex") {
    return bufferToString(crypto.createHmac(algo, secretKey).update(contents).digest(), enc);
}
export default hmacHash;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=hmacHash.js.map