"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @internal
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToString = exports.stringToBuffer = exports.getKeyLengthFromAlgo = void 0;
const bitsPerByte = 8;
// istanbul ignore next
const getKeyLengthFromAlgo = (algo) => {
    const length = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)?.groups?.length;
    return length === undefined ? undefined : Number(length) / bitsPerByte;
};
exports.getKeyLengthFromAlgo = getKeyLengthFromAlgo;
function stringToBuffer(data, enc) {
    if (enc === "raw") {
        return data;
    }
    return Buffer.from(data, enc);
}
exports.stringToBuffer = stringToBuffer;
function bufferToString(data, enc) {
    if (enc === "raw") {
        return data;
    }
    return data.toString(enc);
}
exports.bufferToString = bufferToString;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=helper.js.map