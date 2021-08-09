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
import {hmacHash} from "./hmacHash"

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Provides a convenient way to do some basic signing with HMAC hashing. The hash for `data` is
 * first generated with HMAC and `algo`, and then the hash and `data` are put into a single buffer
 * and returned
 *
 * @remarks
 * This is not a replacement for standard signing. This is meant for an integrity check generated
 * via a hash to be bundled together into a single piece of data instead of having a seperate hash
 * @param data - Data to sign and encode
 * @param algo - Algorithm to use for signing
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for the final data
 * @returns Buffer of signed contents and their signature
 */
export function encodeAndSign(
    data: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc: "raw",
): Promise<Buffer>

/**
 * Provides a convenient way to do some basic signing with HMAC hashing. The hash for `data` is
 * first generated with HMAC and `algo`, and then the hash and `data` are put into a single buffer
 * and returned
 *
 * @remarks
 * This is not a replacement for standard signing. This is meant for an integrity check generated
 * via a hash to be bundled together into a single piece of data instead of having a seperate hash
 * @param data - Data to sign and encode
 * @param algo - Algorithm to use for signing
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for the final data
 * @returns String of signed contents and their signature, encoded with `enc`
 */
export function encodeAndSign(
    data: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding,
): Promise<string>

export async function encodeAndSign(
    data: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding | "raw",
): Promise<Buffer | string> {
    const salt = await new Promise<Buffer>((resolve, reject) =>
        crypto.randomBytes(64, (err, buffer) =>
            // istanbul ignore next
            err ? reject(err) : resolve(buffer),
        ),
    )
    const bufferData = typeof data === "string" ? Buffer.from(data, "utf-8") : data
    const hash = hmacHash(Buffer.concat([salt, bufferData]), algo, secretKey, "raw")
    const result = Buffer.concat([salt, hash, bufferData])

    return enc === "raw" ? result : result.toString(enc)
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
