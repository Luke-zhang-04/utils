import {runIfDefined} from "../../src/functions"

describe("functions", () => {
    describe("runIfDefined", () => {
        const testFunction = (value: string): string => `+${value}`

        test("should not run if value is undefined", () => {
            const value = runIfDefined(undefined, testFunction)

            expect(value).toBeUndefined()
        })

        test("should run if value is defined", () => {
            const value = runIfDefined("string", testFunction)

            expect(value).toBe("+string")
        })
    })
})
