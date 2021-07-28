import crypto from "crypto"

type HashAlgorithms =
    | "sha1"
    | "sha256"
    | "sha3-224"
    | "sha3-256"
    | "sha3-384"
    | "sha3-512"
    | "sha384"
    | "sha512"

// Overload algorithm parameter to allow for autocomplete while allowing different algorithms
type HashFunction = {
    (contents: string, algo: string, format?: crypto.BinaryToTextEncoding): string
    (contents: string, algo: HashAlgorithms, format?: crypto.BinaryToTextEncoding): string
}

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
export const hash: HashFunction = (contents, algo, format = "hex") =>
    crypto.createHash(algo).update(contents).digest(format)

type HmacHashFunction = {
    (
        contents: string,
        algo: string,
        secretKey: string,
        format?: crypto.BinaryToTextEncoding,
    ): string
    (
        contents: string,
        algo: HashAlgorithms,
        secretKey: string,
        format?: crypto.BinaryToTextEncoding,
    ): string
}

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
export const hmacHash: HmacHashFunction = (contents, algo, secretKey, format = "hex") =>
    crypto.createHmac(algo, secretKey).update(contents).digest(format)

type EncryptionAlgorithms =
    | "aes-128-cbc"
    | "aes-128-ctr"
    | "id-aes128-gcm"
    | "aes-192-cbc"
    | "aes-192-ctr"
    | "id-aes192-gcm"
    | "aes-256-cbc"
    | "aes-256-ctr"
    | "id-aes256-gcm"

type EncryptedData = {
    /**
     * Initialization vector; required for decryption
     */
    iv: string
    /**
     * Encrypted data in string form
     */
    encryptedData: string
}

// Overload algorithm parameter to allow for autocomplete while allowing different algorithms
type EncryptionFunction = {
    (
        contents: string,
        algo: EncryptionAlgorithms,
        secretKey: string,
        enc?: BufferEncoding,
    ): EncryptedData
    (contents: string, algo: string, secretKey: string, enc?: BufferEncoding): EncryptedData
}

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
 * @returns Object with the initialization vector and encrypted data, encoded according to param enc
 */
export const encrypt: EncryptionFunction = (contents, algo, secretKey, enc = "hex") => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algo, Buffer.from(secretKey), iv)
    const ciphered = cipher.update(contents)
    const encrypted = Buffer.concat([ciphered, cipher.final()])

    return {
        iv: iv.toString(enc),
        encryptedData: encrypted.toString(enc),
    }
}

// Overload algorithm parameter to allow for autocomplete while allowing different algorithms
type DecryptionFunction = {
    (
        encryptedData: EncryptedData,
        algo: EncryptionAlgorithms,
        secretKey: string,
        enc?: BufferEncoding,
        ivEnc?: BufferEncoding,
    ): string
    (
        encryptedData: EncryptedData,
        algo: string,
        secretKey: string,
        enc?: BufferEncoding,
        ivEnc?: BufferEncoding,
    ): string
}

/**
 * Decrypts encryptedData with an initialization vector, algorithm, and secretKey
 *
 * @param encryptedData - Object with `iv` (initialization vector) and the encrypted data in string form
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
 * @param ivEnc - If the initialization vector was created with a different encoding, change it
 *   here. This isn't usually needed
 * @returns Object with the decrypted data in string form
 */
export const decrypt: DecryptionFunction = (
    encryptedData,
    algo,
    secretKey,
    enc = "hex",
    ivEnc?,
) => {
    // istanbul ignore next
    const _ivEnc = ivEnc ?? enc
    const iv = Buffer.from(encryptedData.iv, _ivEnc)
    const encryptedText = Buffer.from(encryptedData.encryptedData, enc)
    const decipher = crypto.createDecipheriv(algo, Buffer.from(secretKey), iv)
    const deciphered = decipher.update(encryptedText)
    const decrypted = Buffer.concat([deciphered, decipher.final()])

    return decrypted.toString()
}
