/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as object from "../../lib/object"
import {isEqualArray} from "../../lib"

describe("object", () => {
    const testObject = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
    }

    describe("pick", () => {
        it("should pick keys a, b, c", () => {
            const newObj = object.pick(testObject, "a", "b", "c")

            expect(newObj.a).toBe(0)
            expect(newObj.b).toBe(1)
            expect(newObj.c).toBe(2)
            expect(Object.keys(newObj)).toHaveLength(3)
            // @ts-expect-error
            expect(newObj.d).toBeUndefined()
        })

        it("should pick nothing", () => {
            // @ts-expect-error
            const newObj = object.pick(testObject, "")

            expect(Object.keys(newObj)).toHaveLength(0)
        })
    })

    describe("omit", () => {
        it("should omit keys a, b, c", () => {
            const newObj = object.omit(testObject, "a", "b", "c")

            expect(newObj.d).toBe(3)
            expect(newObj.e).toBe(4)
            expect(newObj.f).toBe(5)
            expect(Object.keys(newObj)).toHaveLength(3)
            // @ts-expect-error
            expect(newObj.a).toBeUndefined()
        })

        it("should omit nothing", () => {
            // @ts-expect-error
            const newObj = object.omit(testObject, "")

            expect(Object.keys(newObj)).toHaveLength(6)
        })
    })

    describe("objectEntries", () => {
        it.each([
            [{} as {[key: string]: string}, [] as [string, string][]],
            [
                {a: 1, b: 2, c: 3, d: 4},
                [
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                    ["d", 4],
                ],
            ],
            [
                {a: 1, b: 2, c: 3},
                [
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                ],
            ],
        ])("should return object entries", (obj, expected) => {
            const iterator: Generator<
                [string, string] | ["a", number] | ["b", number] | ["c", number],
                void,
                void
            > = object.entries(obj)

            expect(typeof iterator[Symbol.iterator]).toBe("function")

            const result = Array.from(iterator)

            expect(isEqualArray(result.sort(), expected.sort())).toBe(true)
        })
    })
})
