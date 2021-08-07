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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveKeySync = exports.deriveKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const iterations = 2000;
/**
 * Provides an asynchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
 *
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param salt - Random salt for key. The salt should be as unique as possible. It is recommended
 *   that a salt is random and at least 16 bytes long.
 * @param algorithm - Digest algorithm
 * @returns Derived secret key
 */
const deriveKey = async (secretKey, salt, keyLength, 
// istanbul ignore next
algorithm = "sha256") => await new Promise((resolve, reject) => {
    crypto_1.default.pbkdf2(secretKey, salt, iterations, 
    // istanbul ignore next
    keyLength !== null && keyLength !== void 0 ? keyLength : secretKey.length, algorithm, (err, derivedKey) => 
    // istanbul ignore next
    err ? reject(err) : resolve(derivedKey));
});
exports.deriveKey = deriveKey;
// istanbul ignore next
/**
 * Provides an synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
 *
 * @remarks
 * Synchronous operations block the main thread and may cause performance issues in larger applications
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param salt - Random salt for key. The salt should be as unique as possible. It is recommended
 *   that a salt is random and at least 16 bytes long.
 * @param algorithm - Digest algorithm
 * @returns Derived secret key
 */
const deriveKeySync = (secretKey, salt, 
// istanbul ignore next
algorithm = "sha256") => crypto_1.default.pbkdf2Sync(secretKey, salt, iterations, secretKey.length, algorithm);
exports.deriveKeySync = deriveKeySync;
exports.default = exports.deriveKey;
//# sourceMappingURL=pbkdf2.js.map