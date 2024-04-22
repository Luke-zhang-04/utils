"use strict";
/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const helper_js_1 = require("./helper.js");
const crypto_1 = __importDefault(require("crypto"));
function hash(contents, algo, enc = "hex") {
    return (0, helper_js_1.bufferToString)(crypto_1.default.createHash(algo).update(contents).digest(), enc);
}
exports.hash = hash;
exports.default = hash;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=hash.js.map