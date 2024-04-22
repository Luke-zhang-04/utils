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
export declare function encodeAndSign(data: {
    [key: string]: unknown;
}, algo: JWTHashAlgorithms, secretKey: string, enc: "raw", shouldSalt?: boolean | string): Promise<[header: Buffer, body: Buffer, hash: Buffer]>;
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
export declare function encodeAndSign(data: {
    [key: string]: unknown;
}, algo: JWTHashAlgorithms, secretKey: string, enc?: "base64url" | undefined, shouldSalt?: boolean | string): Promise<string>;
