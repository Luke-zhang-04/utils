/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as crypto from "../../../lib/browser/crypto"

describe("crypto", () => {
    describe("hash", () => {
        const data = Date.now()

        describe.each<Parameters<typeof crypto.hash>[1][]>([
            ["SHA-1"],
            ["SHA-256"],
            ["SHA-384"],
            ["SHA-512"],
            [undefined],
        ])("hash with %s", (algo) => {
            it.each<Parameters<typeof crypto.hash>[2][]>([[undefined], ["base64"]])(
                `should hash with ${algo} and %s encoding`,
                async (enc) => {
                    const hash1 = await crypto.hash(data, algo, enc)
                    const hash2 = await crypto.hash(data, algo, enc)
                    const hash3 = await crypto.hash("abc", algo, enc)

                    // Hashes should be deterministic
                    expect(hash1).toBe(hash2)

                    // Hashes should be uniqute
                    expect(hash1).not.toBe(hash3)
                },
            )
        })
    })

    describe("HMAC hash", () => {
        const data = Date.now()
        const key1 = "key1"
        const key2 = "key2"

        describe.each<Parameters<typeof crypto.hash>[1][]>([
            ["SHA-1"],
            ["SHA-256"],
            ["SHA-384"],
            ["SHA-512"],
            [undefined],
        ])("hash with HMAC %s", (algo) => {
            it.each<Parameters<typeof crypto.hash>[2][]>([[undefined], ["base64"]])(
                `should hash with HMAC ${algo} and %s encoding`,
                async (enc) => {
                    const hash1 = await crypto.hmacHash(data, key1, algo, enc)
                    const hash2 = await crypto.hmacHash(data, key1, algo, enc)
                    const hash3 = await crypto.hmacHash("abc", key1, algo, enc)
                    const hash4 = await crypto.hmacHash(data, key2, algo, enc)

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
})
