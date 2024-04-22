"use strict";
/**
 * Function related utils
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.runIfDefined = void 0;
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
/**
 * Delay the execution of a function, and reset said delay if the function is called again within
 * the delay window.
 *
 * @example
 *
 * ```ts
 * window.addEventListener(
 *     "resize",
 *     debounce((event) => console.log(event), 100),
 * )
 * ```
 *
 * @param func - Function to debounce
 * @param ms - Time to wait
 * @returns Debounced function
 */
const debounce = (func, ms) => {
    let timeout = undefined;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, ms);
    };
};
exports.debounce = debounce;
//# sourceMappingURL=functions.js.map