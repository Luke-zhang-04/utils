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
export declare const capitalizeFirst: (str: string) => string;
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
export declare const toTitleCase: (str: string) => string;
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
export declare const createWrappedText: (text: string, lengthThreshold: number, hyphenThreshold?: number, delimiter?: string | RegExp) => string[];
