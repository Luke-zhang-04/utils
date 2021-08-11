/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 * @internal
 */
const bitsPerByte = 8;
// istanbul ignore next
export const getKeyLengthFromAlgo = (algo) => {
    var _a, _b;
    const length = (_b = (_a = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length;
    return length === undefined ? undefined : Number(length) / bitsPerByte;
};
/* eslint-disable */
export const unescapeBase64 = (str) => (str + "===".slice((str.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/");
export const escapeBase64 = (str) => str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
export function stringToBuffer(data, enc) {
    if (enc === "raw") {
        return data;
    }
    else if (enc === "base64url") {
        return Buffer.from(unescapeBase64(data), "base64");
    }
    return Buffer.from(data, enc);
}
export function bufferToString(data, enc) {
    if (enc === "raw") {
        return data;
    }
    else if (enc === "base64url") {
        return escapeBase64(data.toString("base64"));
    }
    return data.toString(enc);
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=helper.js.map