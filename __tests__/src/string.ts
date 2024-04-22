/// <reference path="./jest.d.ts" />

import "./matchers/toBeEqualArray"
import * as string from "../../src/string"

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

    describe("createWrappedText", () => {
        it.each([
            ["", [], 100],
            ["abcdabcdabcde", ["abcd-", "abcd-", "abcde"], 5],
            [
                "abcdabcdabcd abcdabcdabcde",
                ["abcd-", "abcd-", "abcd", "abcd-", "abcd-", "abcde"],
                5,
            ],
            [" a b c de f g h i j ", ["a b c", "de f g", "h i j"], 6],
            [
                "The missile knows where it is at all times.",
                ["The", "missile", "knows", "where it", "is at all", "times."],
                10,
            ],
            [
                "It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is - whichever is greater - it obtains a difference or deviation.",
                [
                    "It knows this",
                    "because it",
                    "knows where it",
                    "isn't. By",
                    "subtracting",
                    "where it is",
                    "from where it",
                    "isn't, or where",
                    "it isn't from",
                    "where it is -",
                    "whichever is",
                    "greater - it",
                    "obtains a",
                    "difference or",
                    "deviation.",
                ],
                15,
            ],
            [
                "It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is - whichever is greater - it obtains a difference or deviation.",
                [
                    "It knows this",
                    "because it knows",
                    "where it isn't.",
                    "By subtracting",
                    "where it is from",
                    "where it isn't,",
                    "or where it",
                    "isn't from where",
                    "it is -",
                    "whichever is",
                    "greater - it",
                    "obtains a",
                    "difference or",
                    "deviation.",
                ],
                16,
            ],
            [
                "The guidance subsystem uses deviation to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position that it wasn't, it now is.",
                [
                    "The guidance subsystem uses",
                    "deviation to generate corrective",
                    "commands to drive the missile",
                    "from a position where it is to a",
                    "position where it isn't, and",
                    "arriving at a position that it",
                    "wasn't, it now is.",
                ],
                32,
            ],
        ])('should wrap text with no hyphen "%s"', (testCase, expected, length) => {
            expect(string.createWrappedText(testCase, length, 0)).toBeEqualArray(expected)
        })

        it.each([
            ["", [], 100],
            ["abcdabcdabcde", ["abcd-", "abcd-", "abcde"], 5],
            [
                "abcdabcdabcd abcdabcdabcde",
                ["abcd-", "abcd-", "abcd", "abcd-", "abcd-", "abcde"],
                5,
            ],
            [" a b c de f g h i j ", ["a b c", "de f g", "h i j"], 6],
            [
                "The missile knows where it is at all times.",
                ["The missi-", "le knows", "where it", "is at all", "times."],
                10,
            ],
            [
                "It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is - whichever is greater - it obtains a difference or deviation.",
                [
                    "It knows this",
                    "because it kno-",
                    "ws where it is-",
                    "n't. By subtra-",
                    "cting where it",
                    "is from where",
                    "it isn't, or w-",
                    "here it isn't",
                    "from where it",
                    "is - whichever",
                    "is greater - it",
                    "obtains a diff-",
                    "erence or devi-",
                    "ation.",
                ],
                15,
            ],
            [
                "It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is - whichever is greater - it obtains a difference or deviation.",
                [
                    "It knows this b-",
                    "ecause it knows",
                    "where it isn't.",
                    "By subtracting",
                    "where it is from",
                    "where it isn't,",
                    "or where it isn-",
                    "'t from where it",
                    "is - whichever",
                    "is greater - it",
                    "obtains a diffe-",
                    "rence or deviat-",
                    "ion.",
                ],
                16,
            ],
            [
                "The guidance subsystem uses deviation to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position that it wasn't, it now is.",
                [
                    "The guidance subsystem uses dev-",
                    "iation to generate corrective c-",
                    "ommands to drive the missile fr-",
                    "om a position where it is to a",
                    "position where it isn't, and ar-",
                    "riving at a position that it wa-",
                    "sn't, it now is.",
                ],
                32,
            ],
        ])('should wrap text with no hyphen "%s"', (testCase, expected, length) => {
            expect(string.createWrappedText(testCase, length, 1)).toBeEqualArray(expected)
        })

        // TODO: turn these into snapshots
        it.each([
            ["", [], 100],
            [
                "The missile knows where it is at all times.",
                ["The missi-", "le knows", "where it", "is at all", "times."],
                10,
            ],
            ["abcdabcdabcde", ["abcd-", "abcd-", "abcde"], 5],
            [
                "abcdabcdabcd abcdabcdabcde",
                ["abcd-", "abcd-", "abcd", "abcd-", "abcd-", "abcde"],
                5,
            ],
            [" a b c de f g h i j ", ["a b c", "de f g", "h i j"], 6],
            [
                "It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is - whichever is greater - it obtains a difference or deviation.",
                [
                    "It knows this",
                    "because it kno-",
                    "ws where it",
                    "isn't. By subt-",
                    "racting where",
                    "it is from whe-",
                    "re it isn't, or",
                    "where it isn't",
                    "from where it",
                    "is - whichever",
                    "is greater - it",
                    "obtains a diff-",
                    "erence or devi-",
                    "ation.",
                ],
                15,
            ],
            [
                "It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is - whichever is greater - it obtains a difference or deviation.",
                [
                    "It knows this",
                    "because it knows",
                    "where it isn't.",
                    "By subtracting",
                    "where it is from",
                    "where it isn't,",
                    "or where it isn-",
                    "'t from where it",
                    "is - whichever",
                    "is greater - it",
                    "obtains a diffe-",
                    "rence or deviat-",
                    "ion.",
                ],
                16,
            ],
            [
                "The guidance subsystem uses deviation to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position that it wasn't, it now is.",
                [
                    "The guidance subsystem uses",
                    "deviation to generate corrective",
                    "commands to drive the missile",
                    "from a position where it is to a",
                    "position where it isn't, and",
                    "arriving at a position that it",
                    "wasn't, it now is.",
                ],
                32,
            ],
        ])('should wrap text with hyphen at 75% "%s"', (testCase, expected, length) => {
            expect(string.createWrappedText(testCase, length, 0.75)).toBeEqualArray(expected)
        })

        it("should wrap text with hyphen at 28 chars", () => {
            const [value, expected] = [
                "The guidance subsystem uses deviation to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position that it wasn't, it now is.",
                [
                    "The guidance subsystem uses dev-",
                    "iation to generate corrective",
                    "commands to drive the missile",
                    "from a position where it is to a",
                    "position where it isn't, and",
                    "arriving at a position that it",
                    "wasn't, it now is.",
                ],
            ]

            expect(string.createWrappedText(value, 32, 28)).toBeEqualArray(expected)
        })
    })
})
