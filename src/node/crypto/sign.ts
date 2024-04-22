/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */

import type {JWTHashAlgorithms} from "./types.js"
import crypto from "crypto"
import {hmacHash} from "./hmacHash.js"

/* eslint-disable prefer-arrow/prefer-arrow-functions */

const cryptoHeaderMap = {
    sha256: "HS256",
    sha384: "HS384",
    sha512: "HS512",
}

/**
 * Provides a convenient way to assign a one-way signature to a piece of data. This is a partial
 * implementation of the [JWT spec](https://datatracker.ietf.org/doc/html/rfc7519), and is not
 * meant for authentication (you would want an asymmetric hash and dedicated JWT library). An
 * example use case for this is generating short-lived URLs.
 *
 * @param data - Data to sign and encode
 * @param algo - Algorithm to use for signing
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for the final data
 * @param shouldSalt - If a random salt should be added to the hash and data. By default, the name
 *   of the field is `slt`. A string may be passed to change this name.
 * @returns Buffer of signed contents and their signature
 */
export function encodeAndSign(
    data: {[key: string]: unknown},
    algo: JWTHashAlgorithms,
    secretKey: string,
    enc: "raw",
    shouldSalt?: boolean | string,
): Promise<[header: Buffer, body: Buffer, hash: Buffer]>

/**
 * Provides a convenient way to assign a one-way signature to a piece of data. This is a partial
 * implementation of the JWT spec, and is not meant for authentication (you would want an
 * asymmetric hash and dedicated JWT library). An example use case for this is generating
 * short-lived URLs.
 *
 * @param data - Data to sign and encode
 * @param algo - Algorithm to use for signing
 * @param secretKey - Key to use for HMAC-`algo`
 * @param enc - Encoding for the final data
 * @param shouldSalt - If a random salt should be added to the hash and data. By default, the name
 *   of the field is `slt`. A string may be passed to change this name.
 * @returns String of signed contents and their signature, encoded with `enc`
 */
export function encodeAndSign(
    data: {[key: string]: unknown},
    algo: JWTHashAlgorithms,
    secretKey: string,
    enc?: "base64url" | undefined,
    shouldSalt?: boolean | string,
): Promise<string>

export async function encodeAndSign(
    data: {[key: string]: unknown},
    algo: JWTHashAlgorithms,
    secretKey: string,
    // istanbul ignore next
    enc: "base64url" | "raw" = "base64url",
    shouldSalt: boolean | string = true,
): Promise<[header: Buffer, body: Buffer, hash: Buffer] | string> {
    const salt = shouldSalt
        ? await new Promise<Buffer>((resolve, reject) =>
              crypto.randomBytes(64, (err, buffer) =>
                  // istanbul ignore next
                  err ? reject(err) : resolve(buffer),
              ),
          )
        : Buffer.from("")
    const header = Buffer.from(
        JSON.stringify({
            typ: "JWT",
            alg: cryptoHeaderMap[algo],
        }),
    )
    const saltField = typeof shouldSalt === "string" && shouldSalt ? shouldSalt : "slt"
    const payload = Buffer.from(
        JSON.stringify(shouldSalt ? {[saltField]: salt.toString("utf16le"), ...data} : data),
    )
    const base64urlHeader = header.toString("base64url")
    const base64urlPayload = payload.toString("base64url")
    const hash = hmacHash(`${base64urlHeader}.${base64urlPayload}`, algo, secretKey, "raw")

    return enc === "raw"
        ? [header, payload, hash]
        : `${base64urlHeader}.${base64urlPayload}.${hash.toString("base64url")}`
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
