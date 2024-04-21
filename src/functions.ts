/**
 * Function related utils
 *
 * @module
 */

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
export const runIfDefined = <T, R>(value: T | undefined, func: (param: T) => R): R | undefined =>
    value === undefined ? undefined : func(value)
