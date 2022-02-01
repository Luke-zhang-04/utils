import * as random from "../../src/random"

describe("random", () => {
    describe("randint", () => {
        it.each([
            [0, 10],
            [0, 1],
            [10, 11],
        ])("should generate random integer between %i and %i", (min, max) => {
            const randint = random.randint(min, max)

            expect(randint).toBeLessThan(max)
            expect(randint).toBeGreaterThanOrEqual(min)
            expect(Number.isInteger(randint)).toBe(true)
        })
    })

    describe("uniform", () => {
        it.each([
            [0, 10],
            [0, 1],
            [10, 11],
        ])("should generate random float between %i and %i", (min, max) => {
            const randint = random.uniform(min, max)

            expect(randint).toBeLessThan(max)
            expect(randint).toBeGreaterThanOrEqual(min)
            expect(Number.isInteger(randint)).toBe(false)
        })
    })

    describe("choice", () => {
        it.each([
            [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
            [["a", "b", "c", "d", "e", "f"]],
            [[1, "a", 2, "b"]],
        ])("should pick a random item from the array", (arr) => {
            const choice = random.choice(arr)

            expect(arr).toContain(choice)
        })
    })
})
