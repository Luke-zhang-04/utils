/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as array from "../../lib/array"

describe("array", () => {
    describe("arrayToChunks", () => {
        const testArray = new Array(300).fill(undefined).map((_, index) => index)

        it.each([[1], [undefined], [5], [10]])(
            "should split array into chunks of %s",
            (chunkSize) => {
                const newArray = Array.from(array.arrayToChunks(testArray, chunkSize))
                const _chunkSize = chunkSize ?? 3

                expect(newArray[0]).toHaveLength(_chunkSize)
                expect(newArray).toHaveLength(testArray.length / _chunkSize)
                expect(newArray[0]?.[newArray[0].length - 1]).toBe(_chunkSize - 1)
            },
        )
    })

    describe("count", () => {
        it.each([[1], [3], [5], [10]])("should count %d trues", (trueCount) => {
            const testArray = new Array(trueCount * 2)
                .fill(undefined)
                .map((_, index) => index % 2 == 0)
            const testArrayTrueCount = array.count(testArray, (value) => value)

            expect(testArrayTrueCount).toBe(trueCount)
        })

        describe("with max", () => {
            const testArray = new Array(300).fill(undefined).map((_, index) => index)

            it.each([[1], [10], [50], [100]])(
                "should count up to 10 numbers below %d",
                (threshold) => {
                    const testArrayTrueCount = array.count(
                        testArray,
                        (value) => value < threshold,
                        10,
                    )

                    expect(testArrayTrueCount).toBe(Math.min(threshold, 10))
                },
            )
        })
    })

    describe("filter", () => {
        it.each([[1], [10], [100], [undefined]])(
            "should an array of booleans up to %s",
            (filterMax) => {
                const testArray = new Array(300).fill(undefined).map((_, index) => index % 2 == 0)
                const testArrayTrueCount = array.count(testArray, (value) => value)
                const newArray = Array.from(array.filter(testArray, (value) => value, filterMax))

                expect(newArray).toHaveLength(Math.min(testArrayTrueCount, filterMax ?? Infinity))
            },
        )

        it.each([[1], [10], [100], [undefined]])(
            "should an array of booleans up to %s",
            (filterMax) => {
                const testArray = new Array(300).fill(undefined).map((_, index) => index)
                const maxFilterValue = 50

                const newArray = Array.from(
                    array.filter(testArray, (value) => value < maxFilterValue, filterMax),
                )

                expect(newArray).toHaveLength(Math.min(maxFilterValue, filterMax ?? Infinity))
            },
        )
    })

    describe("filterMap", () => {
        const testArray = new Array(300).fill(undefined).map((_, index) => index % 2 == 0)
        const testArrayTrueCount = array.count(testArray, (value) => value)

        it("should filter and map array", () => {
            const newArray = Array.from(
                array.filterMap(testArray, (value, index) => ({
                    shouldInclude: value,
                    value: index,
                })),
            )

            expect(newArray).toHaveLength(testArrayTrueCount)
            expect(newArray[0]).toBe(0)
        })
    })
})
