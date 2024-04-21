/**
 * String related utils
 *
 * @module
 */

/**
 * Capitalizes the first letter of a string
 *
 * @example
 *
 * ```ts
 * capitalizeFirst("hello") // "Hello"
 * capitalizeFist("WORLD") // "WORLD"
 * capitalizeFirst("hello world!") // "Hello world!"
 * ```
 *
 * @param str - String to apply capitalization to
 * @returns String with first letter capitalized
 */
export const capitalizeFirst = (str: string): string =>
    (str[0]?.toUpperCase() ?? "") + str.slice(1)

/**
 * Converts a string to title case, i.e the first letter of each "word" is capitalized, and the
 * rest converted to lowercase
 *
 * @example
 *
 * ```ts
 * toTitleCase("hello world!") // "Hello World"
 * toTitleCase("This is a Title") // "This Is A Title"
 * ```
 *
 * @param str - String to apply capitalizations to
 * @returns String in title case
 */
export const toTitleCase = (str: string): string =>
    str.replace(/\w\S*/gu, (text) => text[0]!.toUpperCase() + text.slice(1).toLowerCase())

const defaultHyphenThreshold = 0.75

/* eslint-disable max-statements */
/**
 * Splits text by maximum line length
 *
 * @param text - Text to split
 * @param lengthThreshold - Max line length, non-strict (string length will be up to and including
 *   the value of `threshold`)
 * @param hyphenThreshold - Percentage of line filled before a word should not be hyphenated. This
 *   allows long words to be hyphenated when neccesary, while shorter words will create a new line.
 *   A value of `0` will always prefer creating a new line instead of hyphenating, unless a word is
 *   longer than the set `threshold` (then it will be hyphenated as many times as needed). A value
 *   of `1` will always hyphenate words if they do not fit perfectly. A value between (1, +infty)
 *   will be interpreted as a length, rather than percentage. I should probably write a more
 *   detailed spec as to how this thing behaves.
 * @param delimiter - String or Regex for splitting text
 * @returns Array of lines wrapped to threshold
 */
export const createWrappedText = (
    text: string,
    lengthThreshold: number,
    // istanbul ignore next
    hyphenThreshold = defaultHyphenThreshold,
    // istanbul ignore next
    delimiter: string | RegExp = " ",
): string[] => {
    const words = text.split(delimiter)
    const hyphenLength =
        hyphenThreshold > 1 ? hyphenThreshold : Math.floor(lengthThreshold * hyphenThreshold)
    let line: string | null = null
    const result: string[] = []

    for (let index = 0; index < words.length; index++) {
        const word = words[index]!
        const lineLength: number = line?.length ?? 0

        if (
            (lineLength === 0 && word.length <= lengthThreshold) ||
            lineLength + word.length < lengthThreshold
        ) {
            // Word can fit
            line = (line ?? "") + (lineLength > 0 && word.length > 0 ? ` ${word}` : word)
        } else if (word.length > lengthThreshold) {
            // Word is too large to fit into a line
            if (line !== null) {
                result.push(line)
            }
            line = null
            result.push(`${word.slice(0, lengthThreshold - 1)}-`)
            words[index] = word.slice(lengthThreshold - 1)
            index-- // Go back and run again
        } else if (lineLength < hyphenLength && lengthThreshold - lineLength - 2 > 0) {
            // Word is to be hyphenated
            const hyphenated = word.slice(0, lengthThreshold - lineLength - 2)

            result.push(`${line} ${hyphenated}-`)
            line = word.slice(lengthThreshold - lineLength - 2)
        } else {
            // Push previous line, create a new line
            result.push(line!) // Line shouldn't be null here. If it is, there is an error in the above logic.
            line = word
        }
    }

    if (line) {
        result.push(line)
    }

    return result
}
/* eslint-enable max-statements */
