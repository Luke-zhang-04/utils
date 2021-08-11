/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as crypto from "../../../lib/node/crypto"
import {inlineTry} from "../../../lib"
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
            it.each<Parameters<typeof crypto.hash>[2][]>([["hex"], ["base64"], ["base64url"]])(
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

            it(`should hash with ${algo} and no encoding`, async () => {
                const hash1 = crypto.hash(data, algo, "raw")
                const hash2 = crypto.hash(data, algo, "raw")
                const hash3 = crypto.hash("abc", algo, "raw")

                // Hashes should be deterministic
                expect(Buffer.compare(hash1, hash2)).toBe(0)

                // Hashes should be uniqute
                expect(Buffer.compare(hash1, hash3)).not.toBe(0)
            })
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
            ["sha3-256"],
        ])("hash with HMAC %s", (algo) => {
            it.each<Parameters<typeof crypto.hash>[2][]>([["hex"], ["base64"], ["base64url"]])(
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

            it(`should hash with HMAC ${algo} and no encoding`, async () => {
                const hash1 = crypto.hmacHash(data, algo, key1, "raw")
                const hash2 = crypto.hmacHash(data, algo, key1, "raw")
                const hash3 = crypto.hmacHash("abc", algo, key1, "raw")
                const hash4 = crypto.hmacHash(data, algo, key2, "raw")

                // Hashes should be deterministic
                expect(Buffer.compare(hash1, hash2)).toBe(0)

                // Hashes should be uniqute
                expect(Buffer.compare(hash1, hash3)).not.toBe(0)

                // Hashes should be different for each key
                expect(Buffer.compare(hash1, hash4)).not.toBe(0)
            })
        })
    })

    describe("encryption and decryption", () => {
        describe.each<[algo: crypto.EncryptionAlgorithms, keyLength: number]>([
            ["aes-128-cbc", 128 / 8],
            ["aes-128-ctr", 128 / 8],
            ["aes-128-gcm", 128 / 8],
            ["aes-192-cbc", 192 / 8],
            ["aes-192-ctr", 192 / 8],
            ["aes-192-gcm", 192 / 8],
            ["aes-256-cbc", 256 / 8],
            ["aes-256-ctr", 256 / 8],
            ["aes-256-gcm", 256 / 8],
        ])("encrypt and decrypt with %s", (algo, keyLength) => {
            it.each<Parameters<typeof crypto.encrypt>[3]>(["hex", "base64", "binary"])(
                `should encrypt and decrypt with ${algo} using %s encoding`,
                async (enc) => {
                    const key = nodeCrypto.randomBytes(keyLength).toString(enc)
                    const badKey = nodeCrypto.randomBytes(keyLength).toString(enc)
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

            it(`should encrypt and decrypt with ${algo} using no encoding`, async () => {
                const key = nodeCrypto.randomBytes(keyLength).toString("hex")
                const badKey = nodeCrypto.randomBytes(keyLength).toString("hex")
                const data = nodeCrypto.randomBytes(256).toString("base64")
                const encrypted = await crypto.encrypt(data, algo, key, "raw")
                const decrypted = await crypto.decrypt(encrypted, algo, key, "raw")

                // If given a bad key, the decrypt function will throw an error, or return deformed data
                let errorOrBadData: string | Error

                try {
                    errorOrBadData = await crypto.decrypt(encrypted, algo, badKey, "raw")
                } catch (err: unknown) {
                    errorOrBadData = err instanceof Error ? err : new Error(String(err))
                }

                if (typeof errorOrBadData === "string") {
                    expect(errorOrBadData).not.toBe(data)
                } else {
                    expect(errorOrBadData).toBeInstanceOf(Error)
                }

                expect(decrypted).toBe(data)
            })
        })

        describe("encrypt and decrypt with id-aes256-gcm", () => {
            const algo = "id-aes256-gcm"
            const enc = "hex"

            it("should throw error if no length given", async () => {
                const keyLength = 256 / 8
                const key = nodeCrypto.randomBytes(keyLength).toString("base64")
                const data = nodeCrypto.randomBytes(256).toString("base64")
                let error: Error | undefined

                try {
                    await crypto.encrypt(
                        data,
                        // @ts-expect-error
                        algo,
                        key,
                        enc === "hex" ? undefined : enc,
                    )
                } catch (err) {
                    error = err
                }

                expect(error).toBeInstanceOf(TypeError)
                expect(error?.message).toContain("Could not infer key length")

                try {
                    // @ts-expect-error
                    await crypto.decrypt(data, algo, key, enc === "hex" ? undefined : enc)
                } catch (err) {
                    error = err
                }

                expect(error).toBeInstanceOf(TypeError)
                expect(error?.message).toContain("Could not infer key length")
            })

            it("should encrypt other algorithms", async () => {
                const keyLength = 256 / 8
                const key = nodeCrypto.randomBytes(keyLength).toString("base64")
                const badKey = nodeCrypto.randomBytes(keyLength).toString("base64")
                const data = nodeCrypto.randomBytes(256).toString("base64")
                const encrypted = await crypto.encrypt(
                    data,
                    algo,
                    key,
                    enc === "hex" ? undefined : enc,
                    keyLength,
                )
                const decrypted = await crypto.decrypt(
                    encrypted,
                    algo,
                    key,
                    enc === "hex" ? undefined : enc,
                    keyLength,
                )

                // If given a bad key, the decrypt function will throw an error, or return deformed data
                let errorOrBadData: string | Error

                try {
                    errorOrBadData = await crypto.decrypt(encrypted, algo, badKey, enc, keyLength)
                } catch (err: unknown) {
                    errorOrBadData = err instanceof Error ? err : new Error(String(err))
                }

                if (typeof errorOrBadData === "string") {
                    expect(errorOrBadData).not.toBe(data)
                } else {
                    expect(errorOrBadData).toBeInstanceOf(Error)
                }

                expect(decrypted).toBe(data)
            })
        })
    })

    describe("sign", () => {
        const data = Date.now().toString()
        const key1 = "key1"
        const key2 = "key2"

        describe.each<Parameters<typeof crypto.hash>[1][]>([
            ["sha1"],
            ["sha256"],
            ["sha384"],
            ["sha512"],
            ["sha3-256"],
        ])("hash with HMAC %s", (algo) => {
            it.each<[Parameters<typeof crypto.hash>[2], boolean]>([
                ["hex", true],
                ["base64", true],
                ["base64url", true],
                ["hex", false],
                ["base64", false],
                ["base64url", false],
            ])(
                `should hash with HMAC ${algo} and %s encoding with salt as %b`,
                async (enc, shouldSalt) => {
                    const encodedData = await crypto.encodeAndSign(
                        data,
                        algo,
                        key1,
                        enc,
                        shouldSalt,
                    )
                    const decodedData = crypto.decodeAndVerify(
                        encodedData,
                        algo,
                        key1,
                        enc,
                        shouldSalt,
                    )
                    const rejectedData = inlineTry(
                        () => crypto.decodeAndVerify(encodedData, algo, key2, enc, shouldSalt),
                        false,
                    )
                    const rejectedData2 = inlineTry(
                        () =>
                            crypto.decodeAndVerify(
                                "A" + encodedData.slice(1),
                                algo,
                                key2,
                                enc,
                                shouldSalt,
                            ),
                        false,
                    )

                    expect(decodedData).toBe(data)
                    expect(rejectedData).toBeUndefined()
                    expect(rejectedData2).toBeUndefined()
                },
            )

            it(`should hash with HMAC ${algo} and no encoding`, async () => {
                const encodedData = await crypto.encodeAndSign(
                    Buffer.from(data, "utf-8"),
                    algo,
                    key1,
                    "raw",
                )
                const decodedData = crypto.decodeAndVerify(encodedData, algo, key1, "raw")
                const rejectedData = inlineTry(
                    () => crypto.decodeAndVerify(encodedData, algo, key2, "raw"),
                    false,
                )
                const rejectedData2 = inlineTry(
                    () =>
                        crypto.decodeAndVerify(
                            Buffer.concat([Buffer.from("A"), encodedData]).slice(1),
                            algo,
                            key2,
                            "raw",
                        ),
                    false,
                )

                expect(decodedData).toBe(data)
                expect(rejectedData).toBeUndefined()
                expect(rejectedData2).toBeUndefined()
            })
        })
    })
})
