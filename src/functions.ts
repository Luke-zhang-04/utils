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
export const debounce = <Args extends unknown[]>(
    func: (...args: Args) => void,
    ms: number,
): ((...args: Args) => void) => {
    let timeout: ReturnType<typeof setTimeout> | undefined = undefined

    return (...args: Args) => {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
        }, ms)
    }
}
