/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */

import type {HashAlgorithms} from "./types.js"
import {bufferToString} from "./helper.js"
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
export function hmacHash(
    contents: crypto.BinaryLike,
    algo: string,
    secretKey: string,
    enc: "raw",
): Buffer

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
    contents: crypto.BinaryLike,
    algo: HashAlgorithms,
    secretKey: string,
    enc: "raw",
): Buffer

/**
 * Hashes contents with algorithm, salts them with secretKey and HMAC, and outputs them based on
 * `enc`
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
    contents: crypto.BinaryLike,
    algo: string,
    secretKey: string,
    enc?: BufferEncoding,
): string

/**
 * Hashes contents with algorithm, salts them with secretKey and HMAC, and outputs them based on
 * `enc`
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
    contents: crypto.BinaryLike,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding,
): string

export function hmacHash(
    contents: crypto.BinaryLike,
    algo: string,
    secretKey: string,
    enc: BufferEncoding | "raw" = "hex",
): Buffer | string {
    return bufferToString(crypto.createHmac(algo, secretKey).update(contents).digest(), enc)
}

export default hmacHash

/* eslint-enable prefer-arrow/prefer-arrow-functions */
