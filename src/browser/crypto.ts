/**
 * Basic cryptography functions that wrap the SubtleCrypto API for use in the browser
 *
 * This wrapper only provides basic functionalty (but is enough for most use cases)
 */

/// <reference types="typescript/lib/lib.dom"/>

export const urlEncodeBase64 = (input: string) => {
    const chars = {"+": "-", "/": "_", "=": ""}

    return input.replace(/[+/=]/gu, (char) => chars[char as keyof typeof chars])
}

/**
 * Hashes data with a SHA algorithm
 *
 * @example
 *
 * ```ts
 * hash("hello!")
 * hash("hello!", "SHA-384", "base64")
 * hash("hello!", "SHA-512", "hex")
 * ```
 *
 * @param data - Data to hash
 * @param algo - Hash algorithm. The only available algorithms are those provided by the `SubtleCrypto` API
 * @param enc - Hash digest encoding types. Only hex and base64 are supported
 * @returns String of hashed data
 */
export const hash = async (
    data: unknown,
    algo: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512" = "SHA-256",
    enc: "hex" | "base64" = "hex",
): Promise<string> => {
    const encodedData = new TextEncoder().encode(JSON.stringify(data))
    const hashBuffer = await crypto.subtle.digest(algo, encodedData)
    const bytes = new Uint8Array(hashBuffer)

    if (enc === "hex") {
        return Array.from(bytes)
            .map((bite) => bite.toString(16).padStart(2, "0"))
            .join("") // Hex string
    }

    return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)))
}

/**
 * Salts and hashes data with HMAC and a SHA algorithm
 *
 * @example
 *
 * ```ts
 * hmacHash("hello!", "secret")
 * hmacHash("hello!", "secret", "SHA-384", "base64")
 * hmacHash("hello!", "secret", "SHA-512", "hex")
 * ```
 *
 * @param data - Data to hash
 * @param secret - Secret to salt the data with
 * @param algo - Hash algorithm. The only available algorithms are those provided by the `SubtleCrypto` API
 * @param enc - Hash digest encoding types. Only hex and base64 are supported
 * @returns String of hashed data
 */
export const hmacHash = async (
    data: unknown,
    secret: string,
    algo: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512" = "SHA-256",
    enc: "hex" | "base64" = "hex",
): Promise<string> => {
    const textEncoder = new TextEncoder()
    const encodedSecret = textEncoder.encode(secret)
    const encodedData = textEncoder.encode(JSON.stringify(data))
    const key = await crypto.subtle.importKey(
        "raw",
        encodedSecret,
        {name: "HMAC", hash: algo},
        false,
        ["sign", "verify"],
    )
    const hashBuffer = await crypto.subtle.sign("HMAC", key, encodedData)
    const bytes = new Uint8Array(hashBuffer)

    if (enc === "hex") {
        return Array.from(bytes)
            .map((bite) => bite.toString(16).padStart(2, "0"))
            .join("") // Hex string
    }

    return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)))
}
