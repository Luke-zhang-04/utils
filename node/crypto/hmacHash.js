/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
import { bufferToString } from "./helper.js";
import crypto from "crypto";
export function hmacHash(contents, algo, secretKey, enc = "hex") {
    return bufferToString(crypto.createHmac(algo, secretKey).update(contents).digest(), enc);
}
export default hmacHash;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=hmacHash.js.map