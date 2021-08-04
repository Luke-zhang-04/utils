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

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Hashes contents with algorithm, salts them with `secretKey` and HMAC, and output a buffer of the
 * hashed contents
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param secretKey - Secret key for hashing
 * @param format - Format; `base64` or `hex`
 * @returns Hashed contents as a buffer
 */
export function hmacHash(contents: string, algo: string, secretKey: string, enc: "raw"): Buffer

/**
 * Hashes contents with algorithm, salts them with `secretKey` and HMAC, and output a buffer of the
 * hashed contents
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param secretKey - Secret key for hashing
 * @param format - Format; `base64` or `hex`
 * @returns Hashed contents as a buffer
 */
export function hmacHash(
    contents: string,
    algo: HashAlgorithms,
    secretKey: string,
    enc: "raw",
): Buffer

/**
 * Hashes contents with algorithm, salts them with secretKey and HMAC, and outputs them based on `enc`
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param secretKey - Secret key for hashing
 * @param enc - Encoding of the output
 * @returns Hashed contents
 */
export function hmacHash(
    contents: string,
    algo: string,
    secretKey: string,
    enc?: BufferEncoding,
): string

/**
 * Hashes contents with algorithm, salts them with secretKey and HMAC, and outputs them based on `enc`
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param secretKey - Secret key for hashing
 * @param enc - Encoding of the output
 * @returns Hashed contents
 */
export function hmacHash(
    contents: string,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding,
): string

export function hmacHash(
    contents: string,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "raw" = "hex",
): Buffer | string {
    const buffer = crypto.createHmac(algo, secretKey).update(contents).digest()

    return enc === "raw" ? buffer : buffer.toString(enc)
}

export default hmacHash

/* eslint-enable prefer-arrow/prefer-arrow-functions */
