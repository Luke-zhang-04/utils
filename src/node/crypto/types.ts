export type HashAlgorithms =
    | "sha1"
    | "sha256"
    | "sha384"
    | "sha512"
    | "sha3-224"
    | "sha3-256"
    | "sha3-384"
    | "sha3-512"

export type JWTHashAlgorithms = "sha256" | "sha384" | "sha512"

type AesLengths = "128" | "192" | "256"
type AesModes = "cbc" | "ctr" | "gcm"

export type EncryptionAlgorithms = `aes-${AesLengths}-${AesModes}`
