"use strict";
/**
 * Regex related utils
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegex = void 0;
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
const escapeRegex = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/gu, "\\$&");
exports.escapeRegex = escapeRegex;
//# sourceMappingURL=regex.js.map