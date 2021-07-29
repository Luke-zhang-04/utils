/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as math from "../../lib/math"

describe("math", () => {
    describe("gcd", () => {
        it.each<{numbers: [number, number, ...number[]]; expectedGcd: number}>([
            {numbers: [10, 100, 1000, 10_000], expectedGcd: 10},
            {numbers: [93, 123, 34, 32], expectedGcd: 1},
            {numbers: [32, 64, 128, 256], expectedGcd: 32},
            {numbers: [256, 128, 64, 2], expectedGcd: 2},
        ])("should get GCD of $expectedGcd", ({numbers, expectedGcd}) => {
            const result = math.gcd(...numbers)

            expect(result).toBe(expectedGcd)
        })
    })

    describe("isPrime", () => {
        it.each([[2], [3], [5], [7], [11], [13], [17], [19], [23]])(
            "should return not prime",
            (num) => {
                const result = math.isPrime(num)

                expect(result).toBe(true)
            },
        )

        it.each([[4], [6], [8], [9], [12], [18], [20], [24], [25]])(
            "should return not prime",
            (num) => {
                const result = math.isPrime(num)

                expect(result).toBe(false)
            },
        )
    })

    describe("getPrimesUpTo", () => {
        it.each([[2], [3], [5], [7], [11], [13], [17], [19], [23], [29], [31]])(
            "should generate primes up to and including %i",
            (max) => {
                const primes = Array.from(math.getPrimesUpTo(max + 1))

                expect(primes[primes.length - 1]).toBe(max)

                for (const prime of primes) {
                    expect(math.isPrime(prime)).toBe(true)
                }
            },
        )
    })
})
