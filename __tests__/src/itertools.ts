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
})
