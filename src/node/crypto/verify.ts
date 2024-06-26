/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */

import type {JWTHashAlgorithms} from "./types.js"
import {hmacHash} from "./hmacHash.js"

/* eslint-disable prefer-arrow/prefer-arrow-functions */

const headerCryptoMap = {
    HS256: "sha256",
    HS384: "sha384",
    HS512: "sha512",
}

/**
 * Decodes and verifies data from `encodeAndSign` by decoding `encodedData` into it's original form
 * and making sure it hasn't been tampered with. Data should've been signed according to the [JWT
 * spec](https://datatracker.ietf.org/doc/html/rfc7519), but note that this is only a partial
 * implementation. Only `HS256`, `HS384`, and `HS512` are supported hash algorithms.
 *
 * @param encodedData - Data to decode and verify
 * @param algo - Algorithm to use for verification
 * @param secretKey - Key to use for HMAC-`algo`
 * @returns Buffer of decoded contents
 * @throws Error if the data cannot be verified, i.e the data has been tampered with and the hashes
 *   don't match
 */
export function decodeAndVerify(
    encodedData: string | [header: Buffer, payload: Buffer, hash: Buffer],
    algo: JWTHashAlgorithms,
    secretKey: string,
): {[key: string]: unknown} {
    const [header, payload, hash] =
        typeof encodedData === "string" ? encodedData.split(".") : encodedData

    if (!header || !payload || !hash) {
        throw new Error("Malformed JWT")
    }

    const base64urlHeader = typeof header === "string" ? header : header.toString("base64url")
    const base64urlPayload = typeof payload === "string" ? payload : payload.toString("base64url")
    const bufferHeader = typeof header === "string" ? Buffer.from(header, "base64url") : header

    const headerData = JSON.parse(bufferHeader.toString("utf8"))

    // istanbul ignore next
    if (
        headerData.typ !== "JWT" ||
        !headerData.alg ||
        !(headerData.alg in headerCryptoMap) ||
        Object.keys(headerData).length !== 2
    ) {
        throw new Error("Malformed JWT")
    }
    const newHash = hmacHash(`${base64urlHeader}.${base64urlPayload}`, algo, secretKey, "raw")

    if (
        (typeof hash === "string" ? Buffer.from(hash, "base64url") : hash).compare(newHash) !== 0
    ) {
        throw new Error("data failed integrity check")
    }

    const bufferPayload = typeof payload === "string" ? Buffer.from(payload, "base64url") : payload

    return JSON.parse(bufferPayload.toString("utf8"))
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
