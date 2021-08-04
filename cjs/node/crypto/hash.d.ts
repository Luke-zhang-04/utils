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
 * Hashes contents with algorithm and outputs them as a buffer
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param enc - Encoding of the output
 * @returns Hashed contents as a buffer
 */
export declare function hash(contents: string, algo: string, enc: "raw"): Buffer;
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
export declare function hash(contents: string, algo: HashAlgorithms, enc: "raw"): Buffer;
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
export declare function hash(contents: string, algo: string | HashAlgorithms, enc?: BufferEncoding): string;
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
export declare function hash(contents: string, algo: HashAlgorithms, enc?: BufferEncoding): string;
export default hash;
