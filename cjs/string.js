"use strict";
/**
 * String related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTitleCase = exports.capitalizeFirst = void 0;
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
const capitalizeFirst = (str) => { var _a, _b; return ((_b = (_a = str[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : "") + str.slice(1); };
exports.capitalizeFirst = capitalizeFirst;
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
const toTitleCase = (str) => str.replace(/\w\S*/gu, (text) => text[0].toUpperCase() + text.slice(1).toLowerCase());
exports.toTitleCase = toTitleCase;
