/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as array from "../../src/array"
import * as itertools from "../../src/itertools"
import {inlineTry} from "../../src/try"
import {isEqualArray} from "../../src/deepEqual"

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

            const _test: string | number = result[0]!

            _test

            expect(isEqualArray(result, ["a", "b", 1, 2, 3])).toBe(true)
        })

        it("should chain iterables", () => {
            const iterator = itertools.chain(generator1(), generator2(), ["a", "b"], [1, 2, 3])

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            const _test: string | number = result[0]!

            _test

            expect(isEqualArray(result, ["a", "b", 1, 2, 3, "a", "b", 1, 2, 3])).toBe(true)
        })
    })

    describe("accumulate", () => {
        it.each<[...Parameters<(typeof itertools)["accumulate"]>, number[]]>([
            [[1, 2, 3, 4, 5], undefined, undefined, [1, 3, 6, 10, 15]],
            [[1, 2, 3, 4, 5], (prev, cur) => prev + cur + 1, undefined, [1, 4, 8, 13, 19]],
            [[1, 2, 3, 4, 5], "+", undefined, [1, 3, 6, 10, 15]],
            [[1, 2, 3, 4, 5], "-", undefined, [1, -1, -4, -8, -13]],
            [[1, 2, 3, 4, 5], "*", undefined, [1, 2, 6, 24, 120]],
            [[100, 10, 5, 2], "/", undefined, [100, 10, 2, 1]],
            [[100, 12, 10, 2], "%", undefined, [100, 4, 4, 0]],
            [[2, 2, 3], "**", undefined, [2, 4, 64]],
            [[1, 2, 3, 4, 5], undefined, 10, [10, 11, 13, 16, 20, 25]],
        ])("should accumulate iterables", (iterable, operator, initial, expected) => {
            const iterator = itertools.accumulate(iterable, operator, initial)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })

    describe("repeat", () => {
        it.each([
            [10, 20, new Array(20).fill(10)],
            ["str", 10, new Array(10).fill("str")],
        ])("should repeat item", (item, times, expected) => {
            const iterator = itertools.repeat(item, times)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })

        it("should repeat indefinetly", () => {
            const iterator = itertools.zip(generator2(), itertools.repeat("item"))

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(
                isEqualArray(result, [
                    [1, "item"],
                    [2, "item"],
                    [3, "item"],
                ]),
            ).toBe(true)
        })
    })

    describe("cycle", () => {
        it.each([
            [
                itertools.repeat(10, 5),
                ["a", "b", "c"],
                [
                    [10, "a"],
                    [10, "b"],
                    [10, "c"],
                    [10, "a"],
                    [10, "b"],
                ],
            ],
            [
                [1, 2, 3, 4],
                generator1(),
                [
                    [1, "a"],
                    [2, "b"],
                    [3, "a"],
                    [4, "b"],
                ],
            ],
        ])("should cycle through iterator", (iterable1, iterable2, expected) => {
            const iterator = itertools.zip(iterable1, itertools.cycle(iterable2))

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })

    describe("increment", () => {
        it.each([
            [
                itertools.repeat(10, 5),
                [],
                [
                    [10, 0],
                    [10, 1],
                    [10, 2],
                    [10, 3],
                    [10, 4],
                ],
            ],
            [
                [1, 2, 3, 4],
                [10, -1],
                [
                    [1, 10],
                    [2, 9],
                    [3, 8],
                    [4, 7],
                ],
            ],
        ])("should create incremental values", (iterable1, incrementArgs, expected) => {
            const iterator = itertools.zip(iterable1, itertools.increment(...incrementArgs))

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })

    describe("compress", () => {
        it.each<[Iterable<number | string>, Iterable<unknown>, any[]]>([
            ["abcdef", [1, 0, 1, 0, 1, 1], ["a", "c", "e", "f"]],
            [
                [1, 2, 3, 4, 5, 6],
                [true, false, true, false],
                [1, 3],
            ],
            [generator1(), [], []],
            [generator2(), [true, true, true, true], [1, 2, 3]],
        ])("should compress data", (data, selectors, expected) => {
            const iterator = itertools.compress(data, selectors)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            const _test: (number | string)[] = result

            _test

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })

    describe("dropWhile", () => {
        it.each([
            [[1, 4, 6, 4, 1], (val: number) => val < 5, [6, 4, 1]],
            [generator2(), (val: number) => val !== 2, [2, 3]],
        ])("should drop data until predicate is true", (iterable, predicate, expected) => {
            const iterator = itertools.dropWhile(iterable, predicate)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })

        it("should drop data until predicate is true", () => {
            const iterator = itertools.dropWhile("abcdefg", (val: string) => val !== "d")

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, ["d", "e", "f", "g"])).toBe(true)
        })
    })

    describe("takeWhile", () => {
        it.each([
            [[1, 4, 6, 4, 1], (val: number) => val < 5, [1, 4]],
            [generator2(), (val: number) => val !== 3, [1, 2]],
        ])("should take data as long predicate is true", (iterable, predicate, expected) => {
            const iterator = itertools.takeWhile(iterable, predicate)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })

        it("should take data as long predicate is true", () => {
            const iterator = itertools.takeWhile("abcdefg", (val: string) => val !== "d")

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, ["a", "b", "c"])).toBe(true)
        })
    })

    describe("enumerate", () => {
        it.each<[[Iterable<unknown>, number?], unknown[][]]>([
            [
                ["abc", undefined],
                [
                    [0, "a"],
                    [1, "b"],
                    [2, "c"],
                ],
            ],
            [
                [[1, 2, 3, 4], 1],
                [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 4],
                ],
            ],
            [
                [generator2(), 10],
                [
                    [10, 1],
                    [11, 2],
                    [12, 3],
                ],
            ],
        ])("should enumerate items", (args, expected) => {
            const iterator = itertools.enumerate(...args)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })

    describe("filter", () => {
        it.each([[1], [10], [100], [undefined]])(
            "should an array of booleans up to %s",
            (filterMax) => {
                const testArray = new Array(300).fill(undefined).map((_, index) => index % 2 == 0)
                const testArrayTrueCount = array.count(testArray, (value) => value)
                const newIterator = itertools.filter(testArray, (value) => value, filterMax)

                expect(typeof newIterator[Symbol.iterator]).toBe("function")

                const newArray = Array.from(newIterator)

                expect(newArray).toHaveLength(Math.min(testArrayTrueCount, filterMax ?? Infinity))
            },
        )

        it.each([[1], [10], [100], [undefined]])(
            "should an array of booleans up to %s",
            (filterMax) => {
                const testArray = new Array(300).fill(undefined).map((_, index) => index)
                const maxFilterValue = 50
                const newIterator = itertools.filter(
                    testArray,
                    (value) => value < maxFilterValue,
                    filterMax,
                )

                expect(typeof newIterator[Symbol.iterator]).toBe("function")

                const newArray = Array.from(newIterator)

                expect(newArray).toHaveLength(Math.min(maxFilterValue, filterMax ?? Infinity))
            },
        )
    })

    describe("map", () => {
        it.each([
            ["abc", (val: string): string => `${val}a`, ["aa", "ba", "ca"]],
            [generator1(), (val: string): string => `${val}a`, ["aa", "ba"]],
            [["a", "b"], (val: string): string => `${val}a`, ["aa", "ba"]],
        ])("should map iterable", (iterable, transformer, expected) => {
            const iterator = itertools.map(iterable, transformer)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })

        it.each([
            [generator2(), (val: number) => val - 1, [0, 1, 2]],
            [[1, 2, 3], (val: number) => val + 10, [11, 12, 13]],
        ])("should map iterable", (iterable, transformer, expected) => {
            const iterator = itertools.map(iterable, transformer)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })

    describe("reduce", () => {
        it.each([
            [generator2(), (prev: number, current: number) => prev + current, undefined, 6],
            [[1, 2, 3, 4, 5], (prev: number, current: number) => prev + current, 10, 25],
            [[], (prev: number, current: number) => prev + current, 10, 10],
        ])("should reduce iterable", (iterable, reducer, initial, expected) => {
            const value = itertools.reduce(iterable, reducer, initial)

            expect(value).toBe(expected)
        })

        it("should reduce iterable", () => {
            const value = itertools.reduce("abcdef", (prev: string, current: string) =>
                current === "c" ? prev : prev + current,
            )

            expect(value).toBe("abdef")
        })

        it("should throw error on empty array with no initial value", () => {
            const result = inlineTry(() =>
                itertools.reduce([], (prev: number, current: number) => prev + current),
            )

            expect(result).toBeInstanceOf(TypeError)
        })
    })

    describe("islice", () => {
        it.each([
            [
                ["abcdefg", undefined, undefined, undefined],
                ["a", "b", "c", "d", "e", "f", "g"],
            ],
            [
                ["abcdefg", 2, undefined, undefined],
                ["a", "b"],
            ],
            [
                ["abcdefg", 2, 4, undefined],
                ["c", "d"],
            ],
            [
                ["abcdefg", 2, null, undefined],
                ["c", "d", "e", "f", "g"],
            ],
            [
                [["a", "b", "c", "d", "e", "f", "g"], 0, null, 2],
                ["a", "c", "e", "g"],
            ],
            [
                [[1, 2, 3, 4, 5, 6, 7], 0, 4, 2],
                [1, 3],
            ],
        ])("should slice iterable", (args, expected) => {
            const iterator = itertools.islice(...(args as Parameters<typeof itertools.islice>))

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result, expected)).toBe(true)
        })
    })
})
