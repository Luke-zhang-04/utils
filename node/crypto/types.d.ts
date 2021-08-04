export declare type HashAlgorithms = "sha1" | "sha256" | "sha3-224" | "sha3-256" | "sha3-384" | "sha3-512" | "sha384" | "sha512";
declare type AesLengths = "128" | "192" | "256";
declare type AesModes = "cbc" | "ctr" | "gcm";
export declare type EncryptionAlgorithms = `aes-${AesLengths}-${AesModes}`;
export {};
