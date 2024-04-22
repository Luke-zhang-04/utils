import * as math from "../../src/math"

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

    describe("round", () => {
        it.each([
            [1.5, undefined, 2],
            [1.12, 1, 1.1],
            [4.7463, 2, 4.75],
            [1193, -1, 1190],
            [193, -2, 200],
        ])("should round %f to %i decimal places", (num, precision, expected) => {
            expect(math.round(num, precision)).toBe(expected)
        })
    })

    describe("floor", () => {
        it.each([
            [1.5, undefined, 1],
            [1.12, 1, 1.1],
            [4.7463, 2, 4.74],
            [1193, -1, 1190],
            [193, -2, 100],
        ])("should round %f to %i decimal places", (num, precision, expected) => {
            expect(math.floor(num, precision)).toBe(expected)
        })
    })

    describe("ceil", () => {
        it.each([
            [1.5, undefined, 2],
            [1.12, 1, 1.2],
            [4.7463, 2, 4.75],
            [1193, -1, 1200],
            [193, -2, 200],
        ])("should round %f to %i decimal places", (num, precision, expected) => {
            expect(math.ceil(num, precision)).toBe(expected)
        })
    })

    describe("trunc", () => {
        it.each([
            [1.5, undefined, 1],
            [1.12, 1, 1.1],
            [4.7463, 2, 4.74],
            [1193, -1, 1190],
            [193, -2, 100],
        ])("should round %f to %i decimal places", (num, precision, expected) => {
            expect(math.trunc(num, precision)).toBe(expected)
        })
    })

    describe("between", () => {
        it("should not change number within bound", () => {
            for (let i = 0; i <= 5; i++) {
                expect(math.between(0, i, 5)).toBe(i)
            }
        })

        it("should set lower bound", () => {
            expect(math.between(5, 4.999999, 10)).toBe(5)

            for (let i = 0; i <= 5; i++) {
                expect(math.between(5, i, 10)).toBe(5)
            }
        })

        it("should set upper bound", () => {
            expect(math.between(0, 5.000001, 5)).toBe(5)

            for (let i = 5; i <= 10; i++) {
                expect(math.between(0, i, 5)).toBe(5)
            }
        })
    })
})
