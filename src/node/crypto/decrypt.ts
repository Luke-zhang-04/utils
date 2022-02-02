/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import {getKeyLengthFromAlgo, stringToBuffer} from "./helper"
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
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption. In this case, the key length can
 *   be inferred, and is optional. The key length is dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: Buffer,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc: "raw",
    keyLength?: number,
): Promise<string>

/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Buffer to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: Buffer,
    algo: string,
    secretKey: string,
    enc: "raw",
    keyLength: number,
): Promise<string>

/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption. In this case, the key length can
 *   be inferred, and is optional. The key length is dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: string,
    algo: EncryptionAlgorithms,
    secretKey: string,
    enc?: BufferEncoding | "base64url",
    keyLength?: number,
): Promise<string>

/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export function decrypt(
    encryptedData: string,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "base64url" | undefined,
    keyLength: number,
): Promise<string>

export async function decrypt(
    encryptedData: string | Buffer,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "base64url" | "raw" = "hex",
    keyLength?: number,
): Promise<string> {
    const _keyLength = keyLength ?? getKeyLengthFromAlgo(algo)

    if (_keyLength === undefined) {
        throw new TypeError(`Could not infer key length from algorithm ${algo}. Please specify.`)
    }

    const bData = stringToBuffer(encryptedData, enc)

    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const salt = bData.slice(0, 64)
    const iv = bData.slice(64, 80)
    const key = await deriveKey(
        secretKey,
        salt,
        // istanbul ignore next
        _keyLength,
        "sha512",
    )

    if (algo.endsWith("gcm")) {
        const tag = bData.slice(80, 96)
        const encryptedText = bData.slice(96)
        const decipher = crypto.createDecipheriv(algo as crypto.CipherGCMTypes, key, iv)

        decipher.setAuthTag(tag)

        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])

        return decrypted.toString()
    }

    const encryptedText = bData.slice(80)
    /* eslint-enable @typescript-eslint/no-magic-numbers */

    const decipher = crypto.createDecipheriv(algo, key, iv)
    const deciphered = decipher.update(encryptedText)
    const decrypted = Buffer.concat([deciphered, decipher.final()])

    return decrypted.toString()
}

export default decrypt

/* eslint-enable prefer-arrow/prefer-arrow-functions */
