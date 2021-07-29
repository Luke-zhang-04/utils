/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as crypto from "../../../lib/node/crypto"
import nodeCrypto from "crypto"

describe("crypto", () => {
    describe("hash", () => {
        const data = Date.now().toString()

        describe.each<Parameters<typeof crypto.hash>[1][]>([
            ["sha1"],
            ["sha256"],
            ["sha384"],
            ["sha512"],
        ])("hash with %s", (algo) => {
            it.each<Parameters<typeof crypto.hash>[2][]>([["hex"], ["base64"]])(
                `should hash with ${algo} and %s encoding`,
                async (enc) => {
                    const hash1 = crypto.hash(data, algo, enc === "hex" ? undefined : enc)
                    const hash2 = crypto.hash(data, algo, enc === "hex" ? undefined : enc)
                    const hash3 = crypto.hash("abc", algo, enc === "hex" ? undefined : enc)

                    // Hashes should be deterministic
                    expect(hash1).toBe(hash2)

                    // Hashes should be uniqute
                    expect(hash1).not.toBe(hash3)
                },
            )
        })
    })

    describe("HMAC hash", () => {
        const data = Date.now().toString()
        const key1 = "key1"
        const key2 = "key2"

        describe.each<Parameters<typeof crypto.hash>[1][]>([
            ["sha1"],
            ["sha256"],
            ["sha384"],
            ["sha512"],
        ])("hash with HMAC %s", (algo) => {
            it.each<Parameters<typeof crypto.hash>[2][]>([["hex"], ["base64"]])(
                `should hash with HMAC ${algo} and %s encoding`,
                async (enc) => {
                    const hash1 = crypto.hmacHash(
                        data,
                        algo,
                        key1,
                        enc === "hex" ? undefined : enc,
                    )
                    const hash2 = crypto.hmacHash(
                        data,
                        algo,
                        key1,
                        enc === "hex" ? undefined : enc,
                    )
                    const hash3 = crypto.hmacHash(
                        "abc",
                        algo,
                        key1,
                        enc === "hex" ? undefined : enc,
                    )
                    const hash4 = crypto.hmacHash(
                        data,
                        algo,
                        key2,
                        enc === "hex" ? undefined : enc,
                    )

                    // Hashes should be deterministic
                    expect(hash1).toBe(hash2)

                    // Hashes should be uniqute
                    expect(hash1).not.toBe(hash3)

                    // Hashes should be different for each key
                    expect(hash1).not.toBe(hash4)
                },
            )
        })
    })

    describe("encryption and decryption", () => {
        describe.each<[algo: Parameters<typeof crypto.encrypt>[1], keyLength: number]>([
            ["aes-128-cbc", 16],
            ["aes-128-ctr", 16],
            ["aes-128-gcm", 16],
            ["aes-192-cbc", 24],
            ["aes-192-ctr", 24],
            ["aes-192-gcm", 24],
            ["aes-256-cbc", 32],
            ["aes-256-ctr", 32],
            ["aes-256-gcm", 32],
        ])("encrypt and decrypt with %s", (algo, keyLength) => {
            it.each<Parameters<typeof crypto.encrypt>[3]>(["hex", "base64"])(
                `should encrypt and decrypt with ${algo} using %s encoding`,
                async (enc) => {
                    const key = nodeCrypto
                        .randomBytes(keyLength)
                        .toString("hex")
                        .slice(0, keyLength)
                    const badKey = nodeCrypto
                        .randomBytes(keyLength)
                        .toString("hex")
                        .slice(0, keyLength)
                    const data = nodeCrypto.randomBytes(256).toString("base64")
                    const encrypted = await crypto.encrypt(
                        data,
                        algo,
                        key,
                        enc === "hex" ? undefined : enc,
                    )
                    const decrypted = await crypto.decrypt(
                        encrypted,
                        algo,
                        key,
                        enc === "hex" ? undefined : enc,
                    )

                    // If given a bad key, the decrypt function will throw an error, or return deformed data
                    let errorOrBadData: string | Error

                    try {
                        errorOrBadData = await crypto.decrypt(encrypted, algo, badKey, enc)
                    } catch (err: unknown) {
                        errorOrBadData = err instanceof Error ? err : new Error(String(err))
                    }

                    if (typeof errorOrBadData === "string") {
                        expect(errorOrBadData).not.toBe(data)
                    } else {
                        expect(errorOrBadData).toBeInstanceOf(Error)
                    }

                    expect(decrypted).toBe(data)
                },
            )
        })
    })
})
