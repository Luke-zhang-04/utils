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
import type { EncryptionAlgorithms } from "./types";
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. Note that bytes does not equal characters. Different encodings will have different
 *   bytes per character. Currently, only hex keys are supported.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyEnc - Encoding for `secretKey`
 * @returns Encrypted contents as a buffer
 */
export declare function encrypt(contents: string, algo: EncryptionAlgorithms, secretKey: string, enc: "raw", keyEnc?: BufferEncoding): Promise<Buffer>;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. Note that bytes does not equal characters. Different encodings will have different
 *   bytes per character. Currently, only hex keys are supported.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyEnc - Encoding for `secretKey`
 * @returns Encrypted contents as a buffer
 */
export declare function encrypt(contents: string, algo: string, secretKey: string, enc: "raw", keyEnc?: BufferEncoding): Promise<Buffer>;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. Note that bytes does not equal characters. Different encodings will have different
 *   bytes per character. Currently, only hex keys are supported.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyEnc - Encoding for `secretKey`
 * @returns Encrypted string
 */
export declare function encrypt(contents: string, algo: EncryptionAlgorithms, secretKey: string, enc?: BufferEncoding, keyEnc?: BufferEncoding): Promise<string>;
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. Note that bytes does not equal characters. Different encodings will have different
 *   bytes per character. Currently, only hex keys are supported.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @param keyEnc - Encoding for `secretKey`
 * @returns Encrypted string
 */
export declare function encrypt(contents: string, algo: string, secretKey: string, enc?: BufferEncoding, keyEnc?: BufferEncoding): Promise<string>;
export default encrypt;
