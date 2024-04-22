import {debounce, runIfDefined} from "../../src/functions"

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

    describe("debounce", () => {
        const wait = (amt: number) => new Promise((resolve) => setTimeout(resolve, amt))

        let amt = 0
        const testFunction = (inc: number) => (amt += inc)

        test("should call function immediately with 0 timeout", async () => {
            amt = 0

            debounce(() => testFunction(1), 0)()
            debounce(() => testFunction(2), 0)()
            debounce(() => testFunction(3), 0)()

            await wait(0)
            expect(amt).toEqual(6)
        })

        test("should cancel", async () => {
            amt = 0

            const one = debounce(() => testFunction(1), 10)
            const two = debounce(() => testFunction(2), 20)
            const three = debounce(() => testFunction(3), 30)

            one()
            one()
            one()
            two()
            two()
            three()

            await wait(30)
            expect(amt).toEqual(6)

            amt = 0

            one()
            two()
            three()

            await wait(20)
            expect(amt).toEqual(3)

            one()
            two()
            three()

            await wait(30)

            expect(amt).toEqual(9)
        })
    })
})
