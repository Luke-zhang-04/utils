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
exports.encodeAndSign = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hmacHash_js_1 = require("./hmacHash.js");
/* eslint-disable prefer-arrow/prefer-arrow-functions */
const cryptoHeaderMap = {
    sha256: "HS256",
    sha384: "HS384",
    sha512: "HS512",
};
async function encodeAndSign(data, algo, secretKey, 
// istanbul ignore next
enc = "base64url", shouldSalt = true) {
    const salt = shouldSalt
        ? await new Promise((resolve, reject) => crypto_1.default.randomBytes(64, (err, buffer) => 
        // istanbul ignore next
        err ? reject(err) : resolve(buffer)))
        : Buffer.from("");
    const header = Buffer.from(JSON.stringify({
        typ: "JWT",
        alg: cryptoHeaderMap[algo],
    }));
    const saltField = typeof shouldSalt === "string" && shouldSalt ? shouldSalt : "slt";
    const payload = Buffer.from(JSON.stringify(shouldSalt ? { [saltField]: salt.toString("utf16le"), ...data } : data));
    const base64urlHeader = header.toString("base64url");
    const base64urlPayload = payload.toString("base64url");
    const hash = (0, hmacHash_js_1.hmacHash)(`${base64urlHeader}.${base64urlPayload}`, algo, secretKey, "raw");
    return enc === "raw"
        ? [header, payload, hash]
        : `${base64urlHeader}.${base64urlPayload}.${hash.toString("base64url")}`;
}
exports.encodeAndSign = encodeAndSign;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=sign.js.map