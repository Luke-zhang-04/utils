"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAndVerify = exports.encodeAndSign = exports.deriveKey = exports.hmacHash = exports.hash = exports.encrypt = exports.decrypt = void 0;
var decrypt_1 = require("./decrypt");
Object.defineProperty(exports, "decrypt", { enumerable: true, get: function () { return decrypt_1.decrypt; } });
var encrypt_1 = require("./encrypt");
Object.defineProperty(exports, "encrypt", { enumerable: true, get: function () { return encrypt_1.encrypt; } });
var hash_1 = require("./hash");
Object.defineProperty(exports, "hash", { enumerable: true, get: function () { return hash_1.hash; } });
var hmacHash_1 = require("./hmacHash");
Object.defineProperty(exports, "hmacHash", { enumerable: true, get: function () { return hmacHash_1.hmacHash; } });
var pbkdf2_1 = require("./pbkdf2");
Object.defineProperty(exports, "deriveKey", { enumerable: true, get: function () { return pbkdf2_1.deriveKey; } });
var sign_1 = require("./sign");
Object.defineProperty(exports, "encodeAndSign", { enumerable: true, get: function () { return sign_1.encodeAndSign; } });
var verify_1 = require("./verify");
Object.defineProperty(exports, "decodeAndVerify", { enumerable: true, get: function () { return verify_1.decodeAndVerify; } });
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map