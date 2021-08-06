/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import type {HashAlgorithms} from "./types"
import crypto from "crypto"

const iterations = 2000

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
export const deriveKey = async (
    secretKey: string,
    salt: Buffer,
    keyLength?: number,
    // istanbul ignore next
    algorithm: HashAlgorithms = "sha256",
): Promise<Buffer> =>
    await new Promise<Buffer>((resolve, reject) => {
        crypto.pbkdf2(
            secretKey,
            salt,
            iterations,
            // istanbul ignore next
            keyLength ?? secretKey.length,
            algorithm,
            (err, derivedKey) =>
                // istanbul ignore next
                err ? reject(err) : resolve(derivedKey),
        )
    })

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
export const deriveKeySync = (
    secretKey: string,
    salt: Buffer,
    // istanbul ignore next
    algorithm: HashAlgorithms = "sha256",
): Buffer => crypto.pbkdf2Sync(secretKey, salt, iterations, secretKey.length, algorithm)

export default deriveKey
