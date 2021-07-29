/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import {isEqual} from "../../lib/deepEqual"

describe("deepEqual", () => {
    it.each([
        [1, 1],
        [
            [0, 1, 2, 3, 4, 5],
            [0, 1, 2, 3, 4, 5],
        ],
        [
            {a: 1, b: 1, c: 1},
            {a: 1, b: 1, c: 1},
        ],
        [{a: [0, 1, 2, 3, 4, 5]}, {a: [0, 1, 2, 3, 4, 5]}],
        [
            {
                a: [0, 1, 2, 3, 4, 5],
                b: {
                    a: "string",
                },
            },
            {
                a: [0, 1, 2, 3, 4, 5],
                b: {
                    a: "string",
                },
            },
        ],
    ])("should return equal", (val1, val2) => {
        const valuesAreEqual = isEqual(val1, val2)
        expect(valuesAreEqual).toBe(true)
    })
    it.each([
        [1, 2],
        ["1", 2],
        [
            [0, 1, 2, 3, 4, 5],
            [0, 1, 2, 3, 4],
        ],
        [
            {a: 1, b: 1},
            {a: 1, b: 1, c: 1},
        ],
        [{a: [0, 1, 2, 3, 4, 5]}, {a: [1, 0, 2, 3, 4, 5]}],
        [
            {
                a: [0, 1, 2, 3, 4, 5],
                b: {
                    a: "string",
                },
            },
            {
                a: [0, 1, 2, 3, 4, 5],
                b: {
                    a: "something else",
                },
            },
        ],
    ])("should return not equal", (val1, val2) => {
        const valuesAreEqual = isEqual(val1, val2)
        expect(valuesAreEqual).toBe(false)
    })
    describe("limits", () => {
        it("should return false after hitting depth limit", () => {
            const valuesAreEqual = isEqual({a: {a: {a: {a: 0}}}}, {a: {a: {a: {a: 0}}}}, 3)
            expect(valuesAreEqual).toBe(false)
        })
        it("should return true without hitting depth limit", () => {
            const valuesAreEqual = isEqual({a: {a: {a: {a: 0}}}}, {a: {a: {a: {a: 0}}}}, 4)
            expect(valuesAreEqual).toBe(true)
        })
        it("should return false after hitting length limit", () => {
            const valuesAreEqual = isEqual([1, 2, 3, 4], [1, 2, 3, 4], undefined, 3)
            expect(valuesAreEqual).toBe(false)
        })
        it("should return true without hitting length limit", () => {
            const valuesAreEqual = isEqual([1, 2, 3, 4], [1, 2, 3, 4], undefined, 4)
            expect(valuesAreEqual).toBe(true)
        })
    })
})
