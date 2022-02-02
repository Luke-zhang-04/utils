"use strict";
/**
 * Function related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIfDefined = void 0;
/**
 * Passes `value` into `func` if defined, otherwise skips it
 *
 * @example
 *
 * ```ts
 * let myValue: string | undefined = undefined
 *
 * runIfDefined(myValue, myFunc) // No-op
 * // Same as
 * // myValue === undefined ? undefined : myFunc(myValue)
 *
 * myValue = "string"
 *
 * runIfDefined(myValue, myFunc) // Runs myFunc with myValue
 * ```
 *
 * @typeParam T - Parameter type
 * @typeParam R - Function return type
 * @param value - Value to pass into function
 * @param func - Function to call if value is defined
 * @returns Undefined if `value` is undefined, else function result
 */
const runIfDefined = (value, func) => value === undefined ? undefined : func(value);
exports.runIfDefined = runIfDefined;
//# sourceMappingURL=functions.js.map