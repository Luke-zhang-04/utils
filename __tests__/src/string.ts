import * as string from "../../lib/string"

describe("string", () => {
    describe("capitalizeFirst", () => {
        it.each([
            ["", ""],
            ["word", "Word"],
            ["word word", "Word word"],
            ["WORD", "WORD"],
            ["Word", "Word"],
        ])("should capitalize first letter of %s", (testCase, expected) => {
            expect(string.capitalizeFirst(testCase)).toBe(expected)
        })
    })

    describe("toTitleCase", () => {
        it.each([
            ["", ""],
            ["word", "Word"],
            ["word word", "Word Word"],
            ["WORD WORD WORD", "Word Word Word"],
            ["Word Word", "Word Word"],
            ["word Word WORD", "Word Word Word"],
        ])("should capitalize first letter of %s", (testCase, expected) => {
            expect(string.toTitleCase(testCase)).toBe(expected)
        })
    })
})
