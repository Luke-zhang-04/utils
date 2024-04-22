/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
/// <reference types="node" />
import type { JWTHashAlgorithms } from "./types.js";
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
export declare function decodeAndVerify(encodedData: string | [header: Buffer, payload: Buffer, hash: Buffer], algo: JWTHashAlgorithms, secretKey: string): {
    [key: string]: unknown;
};
