/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @internal
 */
const bitsPerByte = 8;
// istanbul ignore next
export const getKeyLengthFromAlgo = (algo) => {
    const length = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)?.groups?.length;
    return length === undefined ? undefined : Number(length) / bitsPerByte;
};
export function stringToBuffer(data, enc) {
    if (enc === "raw") {
        return data;
    }
    return Buffer.from(data, enc);
}
export function bufferToString(data, enc) {
    if (enc === "raw") {
        return data;
    }
    return data.toString(enc);
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=helper.js.map