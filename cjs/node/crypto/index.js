"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAndVerify = exports.encodeAndSign = exports.deriveKey = exports.hmacHash = exports.hash = exports.encrypt = exports.decrypt = void 0;
var decrypt_js_1 = require("./decrypt.js");
Object.defineProperty(exports, "decrypt", { enumerable: true, get: function () { return decrypt_js_1.decrypt; } });
var encrypt_js_1 = require("./encrypt.js");
Object.defineProperty(exports, "encrypt", { enumerable: true, get: function () { return encrypt_js_1.encrypt; } });
var hash_js_1 = require("./hash.js");
Object.defineProperty(exports, "hash", { enumerable: true, get: function () { return hash_js_1.hash; } });
var hmacHash_js_1 = require("./hmacHash.js");
Object.defineProperty(exports, "hmacHash", { enumerable: true, get: function () { return hmacHash_js_1.hmacHash; } });
var pbkdf2_js_1 = require("./pbkdf2.js");
Object.defineProperty(exports, "deriveKey", { enumerable: true, get: function () { return pbkdf2_js_1.deriveKey; } });
var sign_js_1 = require("./sign.js");
Object.defineProperty(exports, "encodeAndSign", { enumerable: true, get: function () { return sign_js_1.encodeAndSign; } });
var verify_js_1 = require("./verify.js");
Object.defineProperty(exports, "decodeAndVerify", { enumerable: true, get: function () { return verify_js_1.decodeAndVerify; } });
__exportStar(require("./types.js"), exports);
//# sourceMappingURL=index.js.map