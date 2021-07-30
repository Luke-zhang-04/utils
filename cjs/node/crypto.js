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
exports.decrypt = exports.encrypt = exports.deriveKey = exports.hmacHash = exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Random number
const iterations = 2000;
/**
 * Hashes contents with algorithm and outputs them in either hex or base64 form
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param format - Format; `base64` or `hex`
 * @returns Hashed contents
 */
const hash = (contents, algo, format = "hex") => crypto_1.default.createHash(algo).update(contents).digest(format);
exports.hash = hash;
/**
 * Hashes contents with algorithm, salts them with secretKey and HMAC, and outputs them in either
 * hex or base64 form
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param secretKey - Secret key for hashing
 * @param format - Format; `base64` or `hex`
 * @returns Hashed contents
 */
const hmacHash = (contents, algo, secretKey, format = "hex") => crypto_1.default.createHmac(algo, secretKey).update(contents).digest(format);
exports.hmacHash = hmacHash;
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
const deriveKey = async (secretKey, salt, 
// istanbul ignore next
algorithm = "sha256") => await new Promise((resolve, reject) => {
    crypto_1.default.pbkdf2(secretKey, salt, iterations, secretKey.length, algorithm, (err, derivedKey) => 
    // istanbul ignore next
    err ? reject(err) : resolve(derivedKey));
});
exports.deriveKey = deriveKey;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @returns Encrypted string
 */
const encrypt = async (contents, algo, secretKey, enc = "hex") => {
    const iv = crypto_1.default.randomBytes(16);
    if (algo.endsWith("gcm")) {
        const salt = crypto_1.default.randomBytes(64);
        const key = await exports.deriveKey(secretKey, salt, "sha512");
        const cipher = crypto_1.default.createCipheriv(algo, key, iv);
        const ciphered = cipher.update(contents);
        const encrypted = Buffer.concat([ciphered, cipher.final()]);
        const tag = cipher.getAuthTag();
        return Buffer.concat([salt, iv, tag, encrypted]).toString(enc);
    }
    const cipher = crypto_1.default.createCipheriv(algo, Buffer.from(secretKey), iv);
    const ciphered = cipher.update(contents);
    const encrypted = Buffer.concat([ciphered, cipher.final()]);
    return Buffer.concat([iv, encrypted]).toString(enc);
};
exports.encrypt = encrypt;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption - The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @returns Object with the decrypted data in string form
 */
const decrypt = async (encryptedData, algo, secretKey, enc = "hex") => {
    const bData = Buffer.from(encryptedData, enc);
    if (algo.endsWith("gcm")) {
        const salt = bData.slice(0, 64);
        const iv = bData.slice(64, 80);
        const tag = bData.slice(80, 96);
        const encryptedText = bData.slice(96);
        const key = await exports.deriveKey(secretKey, salt, "sha512");
        const decipher = crypto_1.default.createDecipheriv(algo, key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    }
    const iv = bData.slice(0, 16);
    const encryptedText = bData.slice(16);
    const decipher = crypto_1.default.createDecipheriv(algo, Buffer.from(secretKey), iv);
    const deciphered = decipher.update(encryptedText);
    const decrypted = Buffer.concat([deciphered, decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.js.map