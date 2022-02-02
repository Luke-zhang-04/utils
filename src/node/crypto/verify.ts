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
import {stringToBuffer} from "./helper"

const getHashLengthFromAlgo = (algo: HashAlgorithms): number => {
    if (algo === "sha1") {
        const sha1Length = 20

        return sha1Length
    } else if (algo.startsWith("sha3-")) {
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
 * @param encodedData - Data to decode and verify
 * @param algo - Algorithm to use for verification
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for `encodedData`
 * @param isSalted - If a salt was used to hash the data
 * @returns Buffer of decoded contents
 * @throws Error if the data cannot be verified, i.e the data has been tampered with and the hashes
 *   don't match
 */
export function decodeAndVerify(
    encodedData: Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc: "raw",
    isSalted?: boolean,
): string

/**
 * Decodes and verifies data from `encodeAndSign` by decoding `encodedData` into it's original form
 * and making sure it hasn't been tampered with.
 *
 * @param encodedData - Data to decode and verify
 * @param algo - Algorithm to use for verification
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for `encodedData`
 * @param isSalted - If a salt was used to hash the data
 * @returns Buffer of decoded contents
 * @throws Error if the data cannot be verified, i.e the data has been tampered with and the hashes
 *   don't match
 */
export function decodeAndVerify(
    encodedData: string,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding | "base64url",
    isSalted?: boolean,
): string

export function decodeAndVerify(
    encodedData: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    // istanbul ignore next
    enc: BufferEncoding | "base64url" | "raw" = "hex",
    isSalted = true,
): string {
    const hashLen = getHashLengthFromAlgo(algo)
    const bData = stringToBuffer(encodedData, enc)
    const saltLength = isSalted ? 64 : 0

    const salt = bData.slice(0, saltLength)
    const hash = bData.slice(saltLength, saltLength + hashLen)
    const data = bData.slice(saltLength + hashLen)

    const newHash = hmacHash(Buffer.concat([salt, data]), algo, secretKey, "raw")

    if (hash.compare(newHash) !== 0) {
        throw new Error("data failed integrity check")
    }

    return data.toString()
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
