/**
 * String related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
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
