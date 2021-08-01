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
        it("should zip iterables", () => {
            const iterator = itertools.zip<string | number, [Iterable<string>, Iterable<number>]>(
                generator1(),
                generator2(),
            )

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            // @ts-expect-error
            result[0]?.[3]

            expect(result).toBeInstanceOf(Array)
            expect(
                isEqualArray(result, [
                    ["a", 1],
                    ["b", 2],
                ]),
            ).toBe(true)
        })

        it("should zip arrays", () => {
            const iterator = itertools.zip(["a", "b"], [1, 2, 3])

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            // @ts-expect-error
            result[0]?.[3]

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
