/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import * as typeguards from "../../lib/typeGuards"

describe("typeguards", () => {
    describe("isErrorLike", () => {
        it.each<{}>([[{name: "name", message: "Error!"}], [new Error("Error!")]])(
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

        it.each<{}>([[{}], [{name: "error", message: undefined}], [0], [""]])(
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
