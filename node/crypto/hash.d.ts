/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
/// <reference types="node" />
/// <reference types="node" />
import type { HashAlgorithms } from "./types.js";
import crypto from "crypto";
/**
 * Hashes contents with algorithm and outputs them as a buffer
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output
 * @returns Hashed contents as a buffer
 */
export declare function hash(contents: crypto.BinaryLike, algo: string, enc: "raw"): Buffer;
/**
 * Hashes contents with algorithm and outputs them as a buffer
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output
 * @returns Hashed contents as a buffer
 */
export declare function hash(contents: crypto.BinaryLike, algo: HashAlgorithms, enc: "raw"): Buffer;
/**
 * Hashes contents with algorithm and outputs them based on `enc`
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output, default hex
 * @returns Hashed contents encoded with `enc`
 */
export declare function hash(contents: crypto.BinaryLike, algo: string | HashAlgorithms, enc?: BufferEncoding): string;
/**
 * Hashes contents with algorithm and outputs them based on `enc`
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output, default hex
 * @returns Hashed contents encoded with `enc`
 */
export declare function hash(contents: crypto.BinaryLike, algo: HashAlgorithms, enc?: BufferEncoding): string;
export default hash;
