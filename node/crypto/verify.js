/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import { hmacHash } from "./hmacHash";
import { stringToBuffer } from "./helper";
const getHashLengthFromAlgo = (algo) => {
    var _a, _b, _c, _d;
    if (algo === "sha1") {
        const sha1Length = 20;
        return sha1Length;
    }
    else if (/^sha3-/u.test(algo)) {
        // Ignore optional chains
        // istanbul ignore next
        const length = Number((_b = (_a = algo.match(/sha3-(?<length>[0-9]{3})/u)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length);
        // istanbul ignore if
        if (isNaN(length)) {
            throw new Error(`could not infer hash length from algorithm ${algo}`);
        }
        return length / 8;
    }
    // Ignore optional chains
    // istanbul ignore next
    const length = Number((_d = (_c = algo.match(/sha(?<length>[0-9]{3})/u)) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d.length);
    // istanbul ignore if
    if (isNaN(length)) {
        throw new Error(`could not infer hash length from algorithm ${algo}`);
    }
    return length / 8;
};
export function decodeAndVerify(encodedData, algo, secretKey, 
// istanbul ignore next
enc = "hex", isSalted = true) {
    const hashLen = getHashLengthFromAlgo(algo);
    const bData = stringToBuffer(encodedData, enc);
    const saltLength = isSalted ? 64 : 0;
    const salt = bData.slice(0, saltLength);
    const hash = bData.slice(saltLength, saltLength + hashLen);
    const data = bData.slice(saltLength + hashLen);
    const newHash = hmacHash(Buffer.concat([salt, data]), algo, secretKey, "raw");
    if (hash.compare(newHash) !== 0) {
        throw new Error("data failed integrity check");
    }
    return data.toString();
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=verify.js.map