/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as typeguards from "../../lib/typeGuards"

describe("typeguards", () => {
    describe("isObject", () => {
        it.each<unknown>([[{}], new Date(), new String(), new Number(), /regex/u])(
            "should be object",
            (object) => {
                const isObject = typeguards.isObject(object)

                expect(isObject).toBe(true)

                if (typeguards.isObject(object)) {
                    expect(typeof object).toBe("object")

                    object.toString
                } else {
                    // @ts-expect-error
                    object.toString
                }
            },
        )

        it.each<unknown>([[5], ["string"], [true], [null], [undefined], [NaN]])(
            "should not be object",
            (object) => {
                const isObject = typeguards.isObject(object)

                expect(isObject).toBe(false)

                if (!typeguards.isObject(object)) {
                    // @ts-expect-error
                    object?.toString

                    if (object !== null) {
                        expect(typeof object).not.toBe("object")
                    }
                } else {
                    object.toString
                }
            },
        )
    })

    describe("isErrorLike", () => {
        it.each<unknown>([[{name: "name", message: "Error!"}], [new Error("Error!")]])(
            "should be error like",
            (error) => {
                const isErrorLike = typeguards.isErrorLike(error)

                expect(isErrorLike).toBe(true)

                if (typeguards.isErrorLike(error)) {
                    expect(error.message).toBe("Error!")
                    expect(error.name).toBeTruthy()
                } else {
                    // @ts-expect-error
                    error.message
                    // @ts-expect-error
                    error.name
                }
            },
        )

        it.each<unknown>([[{}], [{name: "error", message: undefined}], [0], [""]])(
            "should not be error like",
            (error) => {
                const isErrorLike = typeguards.isErrorLike(error)

                expect(isErrorLike).toBe(false)

                if (!typeguards.isErrorLike(error)) {
                    // @ts-expect-error
                    error.message
                    // @ts-expect-error
                    error.name
                } else {
                    error.message
                    error.name
                }
            },
        )
    })
})
