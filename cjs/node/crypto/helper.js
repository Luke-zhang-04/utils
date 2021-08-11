"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 * @internal
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToString = exports.stringToBuffer = exports.escapeBase64 = exports.unescapeBase64 = exports.getKeyLengthFromAlgo = void 0;
const bitsPerByte = 8;
// istanbul ignore next
const getKeyLengthFromAlgo = (algo) => {
    var _a, _b;
    const length = (_b = (_a = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length;
    return length === undefined ? undefined : Number(length) / bitsPerByte;
};
exports.getKeyLengthFromAlgo = getKeyLengthFromAlgo;
/* eslint-disable */
const unescapeBase64 = (str) => (str + "===".slice((str.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/");
exports.unescapeBase64 = unescapeBase64;
const escapeBase64 = (str) => str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
exports.escapeBase64 = escapeBase64;
function stringToBuffer(data, enc) {
    if (enc === "raw") {
        return data;
    }
    else if (enc === "base64url") {
        return Buffer.from(exports.unescapeBase64(data), "base64");
    }
    return Buffer.from(data, enc);
}
exports.stringToBuffer = stringToBuffer;
function bufferToString(data, enc) {
    if (enc === "raw") {
        return data;
    }
    else if (enc === "base64url") {
        return exports.escapeBase64(data.toString("base64"));
    }
    return data.toString(enc);
}
exports.bufferToString = bufferToString;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=helper.js.map