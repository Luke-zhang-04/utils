/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import crypto from "crypto";
const defaultIterations = 2000;
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
export const deriveKey = async (secretKey, salt, keyLength, 
// istanbul ignore next
algorithm = "sha256", iterations = defaultIterations) => await new Promise((resolve, reject) => {
    crypto.pbkdf2(secretKey, salt, iterations, 
    // istanbul ignore next
    keyLength !== null && keyLength !== void 0 ? keyLength : secretKey.length, algorithm, (err, derivedKey) => 
    // istanbul ignore next
    err ? reject(err) : resolve(derivedKey));
});
// istanbul ignore next
/**
 * Provides an synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
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
export const deriveKeySync = (secretKey, salt, keyLength, algorithm = "sha256", iterations = defaultIterations) => crypto.pbkdf2Sync(secretKey, salt, iterations, keyLength !== null && keyLength !== void 0 ? keyLength : secretKey.length, algorithm);
export default deriveKey;
//# sourceMappingURL=pbkdf2.js.map