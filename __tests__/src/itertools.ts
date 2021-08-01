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
        ])("should zip iterables", (iterator1, iterator2) => {
            const iterator = itertools.zip(iterator1, iterator2)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            // @ts-expect-error
            result[0]?.[2]

            expect(result).toBeInstanceOf(Array)
            expect(
                isEqualArray(result, [
                    ["a", 1],
                    ["b", 2],
                ]),
            ).toBe(true)
        })
    })
})
