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
export declare function decodeAndVerify(encodedData: Buffer, algo: HashAlgorithms, secretKey: string, enc: "raw", isSalted?: boolean): string;
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
export declare function decodeAndVerify(encodedData: string, algo: HashAlgorithms, secretKey: string, enc?: BufferEncoding | "base64url", isSalted?: boolean): string;
