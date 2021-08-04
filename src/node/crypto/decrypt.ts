/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import type {EncryptionAlgorithms} from "./types"
import crypto from "crypto"
import {deriveKey} from "./pbkdf2"

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Buffer to decrypt
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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: Buffer,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc: "raw",
): Promise<string>

/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Buffer to decrypt
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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: Buffer,
    algo: string,
    secretKey: string,
    enc: "raw",
): Promise<string>

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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: string,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc?: BufferEncoding,
): Promise<string>

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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: string,
    algo: string,
    secretKey: string,
    enc?: BufferEncoding,
): Promise<string>

export async function decrypt(
    encryptedData: string | Buffer,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "raw" = "hex",
): Promise<string> {
    const bData =
        enc === "raw" ? (encryptedData as Buffer) : Buffer.from(encryptedData as string, enc)

    if (algo.endsWith("gcm")) {
        /* eslint-disable @typescript-eslint/no-magic-numbers */
        const salt = bData.slice(0, 64)
        const iv = bData.slice(64, 80)
        const tag = bData.slice(80, 96)
        const encryptedText = bData.slice(96)
        /* eslint-enable @typescript-eslint/no-magic-numbers */

        const key = await deriveKey(secretKey, salt, "sha512")
        const decipher = crypto.createDecipheriv(algo as crypto.CipherGCMTypes, key, iv)

        decipher.setAuthTag(tag)

        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])

        return decrypted.toString()
    }

    const iv = bData.slice(0, 16)
    const encryptedText = bData.slice(16)

    const decipher = crypto.createDecipheriv(algo, Buffer.from(secretKey), iv)
    const deciphered = decipher.update(encryptedText)
    const decrypted = Buffer.concat([deciphered, decipher.final()])

    return decrypted.toString()
}

export default decrypt

/* eslint-enable prefer-arrow/prefer-arrow-functions */
