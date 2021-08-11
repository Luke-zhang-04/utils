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
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption. In this case, the key length can
 *   be inferred, and is optional. The key length is dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: Buffer, algo: EncryptionAlgorithms, secretKey: string, enc: "raw", keyLength?: number): Promise<string>;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Buffer to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: Buffer, algo: string, secretKey: string, enc: "raw", keyLength: number): Promise<string>;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption. In this case, the key length can
 *   be inferred, and is optional. The key length is dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: string, algo: EncryptionAlgorithms, secretKey: string, enc?: BufferEncoding | "base64url", keyLength?: number): Promise<string>;
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption.
 * @param enc - Encoding for the final data.
 * @param keyLength - The length of the key used for decryption in **bytes**. The key length is
 *   dependent on the algorithm of choice.
 *
 *   - AES-128 - 128 bits - 16 bytes
 *   - AES-192 - 192 bits - 24 bytes
 *   - AES-256 - 256 bits - 32 bytes
 *
 * @returns Object with the decrypted data in string form
 */
export declare function decrypt(encryptedData: string, algo: string, secretKey: string, enc: BufferEncoding | "base64url" | undefined, keyLength: number): Promise<string>;
export default decrypt;
