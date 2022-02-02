/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
/// <reference types="node" />
import type { HashAlgorithms } from "./types";
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
export declare function encodeAndSign(data: string | Buffer, algo: HashAlgorithms, secretKey: string, enc: "raw", shouldSalt?: boolean): Promise<Buffer>;
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
export declare function encodeAndSign(data: string | Buffer, algo: HashAlgorithms, secretKey: string, enc?: BufferEncoding | "base64url", shouldSalt?: boolean): Promise<string>;
