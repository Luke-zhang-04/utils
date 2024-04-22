/**
 * Regex related utils
 *
 * @module
 */
/* eslint-disable no-useless-escape, no-irregular-whitespace */
/**
 * Escapes string for use in regular expressions
 *
 * @example
 *
 * ```ts
 * const string = "**string**"
 *
 * new RegExp(string) // Uncaught SyntaxError: Invalid regular expression: /**string**​/: Nothing to repeat
 *
 * new RegExp(escapeRegex(string)) // OK
 * ```
 *
 * @param str - String to escape regex characters
 * @returns String with values escaped for regex
 */
export const escapeRegex = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/gu, "\\$&");
//# sourceMappingURL=regex.js.map