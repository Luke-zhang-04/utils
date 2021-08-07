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
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Buffer to decrypt
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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: Buffer, algo: EncryptionAlgorithms, secretKey: string, enc: "raw", keyEnc?: BufferEncoding): Promise<string>;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Buffer to decrypt
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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: Buffer, algo: string, secretKey: string, enc: "raw", keyEnc?: BufferEncoding): Promise<string>;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: string, algo: EncryptionAlgorithms, secretKey: string, enc?: BufferEncoding, keyEnc?: BufferEncoding): Promise<string>;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
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
 * @param enc - Encoding of the encrypted data
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: string, algo: string, secretKey: string, enc?: BufferEncoding, keyEnc?: BufferEncoding): Promise<string>;
export default decrypt;
