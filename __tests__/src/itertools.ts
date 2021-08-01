/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as itertools from "../../lib/itertools"
import {isEqualArray} from "../../lib/deepEqual"

function* generator1(): Generator<string> {
    yield "a"
    yield "b"
}

function* generator2(): Generator<number> {
    yield 1
    yield 2
    yield 3
}

describe("itertools", () => {
    describe("zip", () => {
        it.each([
            [generator1(), generator2()],
            [generator1(), [1, 2, 3]],
            [["a", "b"], generator2()],
            [
                ["a", "b"],
                [1, 2, 3],
            ],
        ])("should zip iterables", (iterable1, iterable2) => {
            const iterator = itertools.zip(iterable1, iterable2)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            // @ts-expect-error
            result[0]?.[2]

            expect(
                isEqualArray(result, [
                    ["a", 1],
                    ["b", 2],
                ]),
            ).toBe(true)
        })

        it("should zip iterables", () => {
            const iterator = itertools.zip(generator1(), generator2(), ["a", "b"], [1, 2, 3])

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            // @ts-expect-error
            result[0]?.[4]
            result[0]?.[3]

            expect(
                isEqualArray(result, [
                    ["a", 1, "a", 1],
                    ["b", 2, "b", 2],
                ]),
            ).toBe(true)
        })
    })

    describe("chain", () => {
        it.each([
            [generator1(), generator2()],
            [generator1(), [1, 2, 3]],
            [["a", "b"], generator2()],
            [
                ["a", "b"],
                [1, 2, 3],
            ],
        ])("should chain iterables", (iterable1, iterable2) => {
            const iterator = itertools.chain(iterable1, iterable2)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            let _test: string | number = result[0]!

            _test

            expect(isEqualArray(result, ["a", "b", 1, 2, 3])).toBe(true)
        })

        it("should chain iterables", () => {
            const iterator = itertools.chain(generator1(), generator2(), ["a", "b"], [1, 2, 3])

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            let _test: string | number = result[0]!

            _test

            expect(isEqualArray(result, ["a", "b", 1, 2, 3, "a", "b", 1, 2, 3])).toBe(true)
        })
    })

    describe("accumulate", () => {
        it.each<[...Parameters<typeof itertools["accumulate"]>, number[]]>([
            [[1, 2, 3, 4, 5], undefined, undefined, [1, 3, 6, 10, 15]],
            [[1, 2, 3, 4, 5], (prev, cur) => prev + cur + 1, undefined, [1, 4, 8, 13, 18]],
            [[1, 2, 3, 4, 5], "+", undefined, [1, 3, 6, 10, 15]],
            [[1, 2, 3, 4, 5], "-", undefined, [1, -1, -4, -7, -12]],
            [[1, 2, 3, 4, 5], "*", undefined, [1, 2, 6, 24, 120]],
            [[100, 10, 5, 2], "/", undefined, [100, 10, 2, 1]],
            [[100, 12, 10, 2], "%", undefined, [100, 4, 2, 0]],
            [[2, 2, 3], "**", undefined, [2, 4, 256]],
            [[1, 2, 3, 4, 5], undefined, 10, [10, 11, 13, 16, 20, 25]],
        ])("should accumulate iterables", (iterable, operator, initial, expected) => {
            const iterator = itertools.accumulate(iterable, operator, initial)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected))
        })
    })
})
