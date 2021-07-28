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
    str.replace(/\w\S*/gu, (text) => (text[0]?.toUpperCase() ?? "") + text.slice(1).toLowerCase())
