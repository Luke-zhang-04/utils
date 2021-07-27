/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import {inlineTry, inlineTryPromise} from "../../lib/try"

describe("try", () => {
    describe("inlineTry", () => {
        it.each([[0], [10], ["a"], [undefined]])("should return value %p", (val) => {
            const res = inlineTry(() => val)

            expect(res).toBe(val)
        })

        it.each([[new Error("Error!")], [10], ["Error!"]])(
            "should return thrown variable as error",
            (value) => {
                const res = inlineTry(() => {
                    throw value
                })

                expect(res).toBeInstanceOf(Error)
                expect(res.message).toBe(value instanceof Error ? value.message : value.toString())
            },
        )

        it("should discard error", () => {
            const res = inlineTry(() => {
                throw new Error("Error!")
            }, false)

            expect(res).toBeUndefined()
        })
    })

    describe("inlineTryPromise", () => {
        it.each([[0], [10], ["a"], [undefined]])("should return value %p", async (val) => {
            const res = await inlineTryPromise(async () => await Promise.resolve(val))

            expect(res).toBe(val)
        })

        it.each([[new Error("Error!")], [10], ["Error!"]])(
            "should return thrown variable as error",
            async (value) => {
                const res = await inlineTryPromise(async () => {
                    await Promise.resolve()

                    throw value
                })

                expect(res).toBeInstanceOf(Error)
                expect(res.message).toBe(value instanceof Error ? value.message : value.toString())
            },
        )

        it("should discard error", async () => {
            const res = await inlineTryPromise(async () => {
                await Promise.resolve()

                throw new Error("Error!")
            }, false)

            expect(res).toBeUndefined()
        })
    })
})
