"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyLengthFromAlgo = void 0;
const bitsPerByte = 8;
// istanbul ignore next
const getKeyLengthFromAlgo = (algo) => {
    var _a, _b;
    const length = (_b = (_a = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length;
    return length === undefined ? undefined : Number(length) / bitsPerByte;
};
exports.getKeyLengthFromAlgo = getKeyLengthFromAlgo;
//# sourceMappingURL=helper.js.map