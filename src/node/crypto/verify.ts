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
import {hmacHash} from "./hmacHash"

const getHashLengthFromAlgo = (algo: HashAlgorithms): number => {
    if (algo === "sha1") {
        return 20
    } else if (/^sha3-/.test(algo)) {
        // Ignore optional chains
        // istanbul ignore next
        const length = Number(algo.match(/sha3-(?<length>[0-9]{3})/u)?.groups?.length)

        // istanbul ignore if
        if (isNaN(length)) {
            throw new Error(`could not infer hash length from algorithm ${algo}`)
        }

        return length / 8
    }

    // Ignore optional chains
    // istanbul ignore next
    const length = Number(algo.match(/sha(?<length>[0-9]{3})/u)?.groups?.length)

    // istanbul ignore if
    if (isNaN(length)) {
        throw new Error(`could not infer hash length from algorithm ${algo}`)
    }

    return length / 8
}

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Decodes and verifies data from `encodeAndSign` by decoding `encodedData` into it's original form
 * and making sure it hasn't been tampered with.
 *
 * @remarks
 * This is not a replacement for standard signing. This is meant for an integrity check generated
 * via a hash to be bundled together into a single piece of data instead of having a seperate hash
 * @param encodedData - Data to decode and verify
 * @param algo - Algorithm to use for verification
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for `encodedData`
 * @returns Buffer of decoded contents
 * @throws Error if the data cannot be verified, i.e the data has been tampered with and the hashes
 *   don't match
 */
export function decodeAndVerify(
    encodedData: Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc: "raw",
): string

/**
 * Decodes and verifies data from `encodeAndSign` by decoding `encodedData` into it's original form
 * and making sure it hasn't been tampered with.
 *
 * @remarks
 * This is not a replacement for standard signing. This is meant for an integrity check generated
 * via a hash to be bundled together into a single piece of data instead of having a seperate hash
 * @param encodedData - Data to decode and verify
 * @param algo - Algorithm to use for verification
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for `encodedData`
 * @returns Buffer of decoded contents
 * @throws Error if the data cannot be verified, i.e the data has been tampered with and the hashes
 *   don't match
 */
export function decodeAndVerify(
    encodedData: string,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding,
): string

export function decodeAndVerify(
    encodedData: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding | "raw",
): string {
    const hashLen = getHashLengthFromAlgo(algo)
    const bData = enc === "raw" ? (encodedData as Buffer) : Buffer.from(encodedData as string, enc)

    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const salt = bData.slice(0, 64)
    const hash = bData.slice(64, 64 + hashLen)
    const data = bData.slice(64 + hashLen)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
    const newHash = hmacHash(Buffer.concat([salt, data]), algo, secretKey, "raw")

    if (hash.compare(newHash) !== 0) {
        throw new Error("data failed integrity check")
    }

    return data.toString()
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
