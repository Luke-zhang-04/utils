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
    enc?: BufferEncoding,
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
    enc?: BufferEncoding,
): string

export function hash(
    contents: crypto.BinaryLike,
    algo: string,
    enc: BufferEncoding | "raw" = "hex",
): Buffer | string {
    const buffer = crypto.createHash(algo).update(contents).digest()

    return enc === "raw" ? buffer : buffer.toString(enc)
}

export default hash

/* eslint-enable prefer-arrow/prefer-arrow-functions */
