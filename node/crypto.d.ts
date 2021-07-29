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
import crypto from "crypto";
declare type HashAlgorithms = "sha1" | "sha256" | "sha3-224" | "sha3-256" | "sha3-384" | "sha3-512" | "sha384" | "sha512";
declare type HashFunction = {
    (contents: string, algo: string, format?: crypto.BinaryToTextEncoding): string;
    (contents: string, algo: HashAlgorithms, format?: crypto.BinaryToTextEncoding): string;
};
/**
 * Hashes contents with algorithm and outputs them in either hex or base64 form
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param format - Format; `base64` or `hex`
 * @returns Hashed contents
 */
export declare const hash: HashFunction;
declare type HmacHashFunction = {
    (contents: string, algo: string, secretKey: string, format?: crypto.BinaryToTextEncoding): string;
    (contents: string, algo: HashAlgorithms, secretKey: string, format?: crypto.BinaryToTextEncoding): string;
};
/**
 * Hashes contents with algorithm, salts them with secretKey and HMAC, and outputs them in either
 * hex or base64 form
 *
 * @param contents - What to hash
 * @param algo - Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -digest-algorithms` will
 *   display the available digest algorithms.
 * @param secretKey - Secret key for hashing
 * @param format - Format; `base64` or `hex`
 * @returns Hashed contents
 */
export declare const hmacHash: HmacHashFunction;
declare type EncryptionAlgorithms = "aes-128-cbc" | "aes-128-ctr" | "aes-128-gcm" | "aes-192-cbc" | "aes-192-ctr" | "aes-192-gcm" | "aes-256-cbc" | "aes-256-ctr" | "aes-256-gcm";
declare type EncryptionFunction = {
    (contents: string, algo: EncryptionAlgorithms, secretKey: string, enc?: BufferEncoding): Promise<string>;
    (contents: string, algo: string, secretKey: string, enc?: BufferEncoding): Promise<string>;
};
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
/**
 * Encrypts contents with algorithm, key, and initialization vector (iv)
 *
 * @param contents - What to encrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for encryption. The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @returns Encrypted string
 */
export declare const encrypt: EncryptionFunction;
declare type DecryptionFunction = {
    (encryptedData: string, algo: EncryptionAlgorithms, secretKey: string, enc?: BufferEncoding): Promise<string>;
    (encryptedData: string, algo: string, secretKey: string, enc?: BufferEncoding): Promise<string>;
};
/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - String to decrypt
 * @param algo- Algorithm identifier. The algorithm is dependent on the available algorithms
 *   supported by the version of OpenSSL on the platform. `openssl list -cipher-algorithms ` will
 *   display the available cipher algorithms.
 * @param secretKey - Secret key for decryption - The key length is dependent on the algorithm of
 *   choice. The key length in bytes (characters) is equal to the key length in bits divided by the
 *   number of bits in a byte (8)
 *
 *   - AES-128 - 16 bytes
 *   - AES-192 - 24 bytes
 *   - AES-256 - 32 bytes
 *
 * @param enc - Encoding for the final data, including the initialization vector and data
 * @returns Object with the decrypted data in string form
 */
export declare const decrypt: DecryptionFunction;
export {};
