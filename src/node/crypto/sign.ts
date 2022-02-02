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
import {bufferToString} from "./helper"
import crypto from "crypto"
import {hmacHash} from "./hmacHash"

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Provides a convenient way to prepend a one-way signature to a piece of data. The hash for `data`
 * is first generated with HMAC and `algo`, and then the hash and `data` are put into a single
 * buffer and returned, essentially creating a glorified JTW.
 *
 * @param data - Data to sign and encode
 * @param algo - Algorithm to use for signing
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for the final data
 * @param shouldSalt - If a random salt should be added to the hash and data
 * @returns Buffer of signed contents and their signature
 */
export function encodeAndSign(
    data: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc: "raw",
    shouldSalt?: boolean,
): Promise<Buffer>

/**
 * Provides a convenient way to prepend a one-way signature to a piece of data. The hash for `data`
 * is first generated with HMAC and `algo`, and then the hash and `data` are put into a single
 * buffer and returned, essentially creating a glorified JTW.
 *
 * @param data - Data to sign and encode
 * @param algo - Algorithm to use for signing
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for the final data
 * @param shouldSalt - If a random salt should be added to the hash and data
 * @returns String of signed contents and their signature, encoded with `enc`
 */
export function encodeAndSign(
    data: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    enc?: BufferEncoding | "base64url",
    shouldSalt?: boolean,
): Promise<string>

export async function encodeAndSign(
    data: string | Buffer,
    algo: HashAlgorithms,
    secretKey: string,
    // istanbul ignore next
    enc: BufferEncoding | "base64url" | "raw" = "hex",
    shouldSalt = true,
): Promise<Buffer | string> {
    const salt = shouldSalt
        ? await new Promise<Buffer>((resolve, reject) =>
              crypto.randomBytes(64, (err, buffer) =>
                  // istanbul ignore next
                  err ? reject(err) : resolve(buffer),
              ),
          )
        : Buffer.from("")
    const bufferData = typeof data === "string" ? Buffer.from(data, "utf-8") : data
    const hash = hmacHash(Buffer.concat([salt, bufferData]), algo, secretKey, "raw")
    const result = Buffer.concat([salt, hash, bufferData])

    return bufferToString(result, enc)
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
