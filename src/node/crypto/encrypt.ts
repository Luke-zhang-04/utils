/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import {bufferToString, getKeyLengthFromAlgo} from "./helper.js"
import type {EncryptionAlgorithms} from "./types.js"
import crypto from "crypto"
import {deriveKey} from "./pbkdf2.js"

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. In this case, the key
 *   length can be inferred, and is optional. The key length is dependent on the algorithm of
 *   choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted contents as a buffer
 */
export function encrypt(
    contents: string,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc: "raw",
    keyLength?: number,
): Promise<Buffer>

/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted contents as a buffer
 */
export function encrypt(
    contents: string,
    algo: string,
    secretKey: string,
    enc: "raw",
    keyLength: number,
): Promise<Buffer>

/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. In this case, the key
 *   length can be inferred, and is optional. The key length is dependent on the algorithm of
 *   choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted string
 */
export function encrypt(
    contents: string,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc?: BufferEncoding | "base64url",
    keyLength?: number,
): Promise<string>

/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted string
 */
export function encrypt(
    contents: string,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "base64url" | undefined,
    keyLength: number,
): Promise<string>

export async function encrypt(
    contents: string,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "base64url" | "raw" = "hex",
    keyLength?: number,
): Promise<Buffer | string> {
    const _keyLength = keyLength ?? getKeyLengthFromAlgo(algo)

    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`)
    }

    const iv = await new Promise<Buffer>((resolve, reject) =>
        crypto.randomBytes(16, (err, buffer) =>
            // istanbul ignore next
            err ? reject(err) : resolve(buffer),
        ),
    )
    const salt = await new Promise<Buffer>((resolve, reject) =>
        crypto.randomBytes(64, (err, buffer) =>
            // istanbul ignore next
            err ? reject(err) : resolve(buffer),
        ),
    )
    const key = await deriveKey(
        secretKey,
        salt,
        // istanbul ignore next
        _keyLength,
        "sha512",
    )

    if (algo.endsWith("gcm")) {
        const cipher = crypto.createCipheriv(algo as crypto.CipherGCMTypes, key, iv, {
            authTagLength: 16,
        })
        const ciphered = cipher.update(contents)
        const encrypted = Buffer.concat([ciphered, cipher.final()])
        const tag = cipher.getAuthTag()
        const resultBuffer = Buffer.concat([salt, iv, tag, encrypted])

        return bufferToString(resultBuffer, enc)
    }

    const cipher = crypto.createCipheriv(algo, key, iv)
    const ciphered = cipher.update(contents)
    const encrypted = Buffer.concat([ciphered, cipher.final()])
    const resultBuffer = Buffer.concat([salt, iv, encrypted])

    return bufferToString(resultBuffer, enc)
}

export default encrypt

/* eslint-enable prefer-arrow/prefer-arrow-functions */
