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
 * Provides an asynchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
 *
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param salt - Random salt for key. The salt should be as unique as possible. It is recommended
 *   that a salt is random and at least 16 bytes long.
 * @param algorithm - Digest algorithm
 * @returns Derived secret key
 */
export declare const deriveKey: (secretKey: string, salt: Buffer, algorithm?: HashAlgorithms) => Promise<Buffer>;
export default deriveKey;
