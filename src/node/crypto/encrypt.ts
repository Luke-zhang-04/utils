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
 * @returns Encrypted contents as a buffer
 */
export function encrypt(
    contents: string,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc: "raw",
): Promise<Buffer>

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
 * @returns Encrypted contents as a buffer
 */
export function encrypt(
    contents: string,
    algo: string,
    secretKey: string,
    enc: "raw",
): Promise<Buffer>

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
export function encrypt(
    contents: string,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc?: BufferEncoding,
): Promise<string>

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
export function encrypt(
    contents: string,
    algo: string,
    secretKey: string,
    enc?: BufferEncoding,
): Promise<string>

export async function encrypt(
    contents: string,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "raw" = "hex",
): Promise<Buffer | string> {
    const iv = crypto.randomBytes(16)

    if (algo.endsWith("gcm")) {
        const salt = crypto.randomBytes(64)
        const key = await deriveKey(secretKey, salt, "sha512")
        const cipher = crypto.createCipheriv(algo as crypto.CipherGCMTypes, key, iv)
        const ciphered = cipher.update(contents)
        const encrypted = Buffer.concat([ciphered, cipher.final()])
        const tag = cipher.getAuthTag()
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted])

        return enc === "raw" ? resultBuffer : resultBuffer.toString(enc)
    }

    const cipher = crypto.createCipheriv(algo, Buffer.from(secretKey), iv)
    const ciphered = cipher.update(contents)
    const encrypted = Buffer.concat([ciphered, cipher.final()])
    const resultBuffer = Buffer.concat([iv, encrypted])

    return enc === "raw" ? resultBuffer : resultBuffer.toString(enc)
}

export default encrypt

/* eslint-enable prefer-arrow/prefer-arrow-functions */
