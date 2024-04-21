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
 * Hashes contents with algorithm and outputs them as a buffer
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output
 * @returns Hashed contents as a buffer
 */
export function hash(contents: crypto.BinaryLike, algo: string, enc: "raw"): Buffer

/**
 * Hashes contents with algorithm and outputs them as a buffer
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output
 * @returns Hashed contents as a buffer
 */
export function hash(contents: crypto.BinaryLike, algo: HashAlgorithms, enc: "raw"): Buffer

/**
 * Hashes contents with algorithm and outputs them based on `enc`
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output, default hex
 * @returns Hashed contents encoded with `enc`
 */
export function hash(
    contents: crypto.BinaryLike,
    algo: string | HashAlgorithms,
    enc?: BufferEncoding | "base64url",
): string

/**
 * Hashes contents with algorithm and outputs them based on `enc`
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output, default hex
 * @returns Hashed contents encoded with `enc`
 */
export function hash(
    contents: crypto.BinaryLike,
    algo: HashAlgorithms,
    enc?: BufferEncoding | "base64url",
): string

export function hash(
    contents: crypto.BinaryLike,
    algo: string,
    enc: BufferEncoding | "base64url" | "raw" = "hex",
): Buffer | string {
    return bufferToString(crypto.createHash(algo).update(contents).digest(), enc)
}

export default hash

/* eslint-enable prefer-arrow/prefer-arrow-functions */
