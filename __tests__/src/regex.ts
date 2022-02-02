/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import {escapeRegex} from "../../src"

describe("regex", () => {
    describe("escapeRegex", () => {
        test.each([
            ["**string**", "hello **string** world!"],
            ["^caret", "24 ^caret"],
            ["no errors (", "this string has no errors ("],
            ["{", "brackets {}"],
        ])("should escape regex", (input, testString) => {
            const regex = new RegExp(escapeRegex(input))

            expect(testString).toMatch(regex)
        })
    })
})
