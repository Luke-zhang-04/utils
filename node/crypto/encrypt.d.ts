/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @module
 */
/// <reference types="node" />
import type { EncryptionAlgorithms } from "./types.js";
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. In this case, the key
 *   length can be inferred, and is optional. The key length is dependent on the algorithm of
 *   choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted contents as a buffer
 */
export declare function encrypt(contents: string, algo: EncryptionAlgorithms, secretKey: string, enc: "raw", keyLength?: number): Promise<Buffer>;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted contents as a buffer
 */
export declare function encrypt(contents: string, algo: string, secretKey: string, enc: "raw", keyLength: number): Promise<Buffer>;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. In this case, the key
 *   length can be inferred, and is optional. The key length is dependent on the algorithm of
 *   choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted string
 */
export declare function encrypt(contents: string, algo: EncryptionAlgorithms, secretKey: string, enc?: BufferEncoding, keyLength?: number): Promise<string>;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption.
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyLength - The length of the key used for encryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Encrypted string
 */
export declare function encrypt(contents: string, algo: string, secretKey: string, enc: BufferEncoding | undefined, keyLength: number): Promise<string>;
export default encrypt;
