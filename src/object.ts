/**
 * Object related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

/**
 * Picks values from an object and creates a new object
 *
 * @example
 *
 * ```ts
 * pick({a: 1, b: 2, c: 3}, "a", "b") // {a: 1, b: 2}
 * ```
 *
 * @template T - Type of the object to pick items from
 * @template K - Type of the keys used to pick out items
 * @param obj - Object to pick keys from
 * @param keys - Keys to pick
 * @returns Object from picked values
 */
export const pick = <T extends {[key: string]: unknown}, K extends (keyof T)[]>(
    obj: T,
    ...keys: K
): Pick<T, typeof keys[number]> => {
    const newObj = {} as Pick<T, K[number]>

    for (const key of keys) {
        if (key in obj) {
            newObj[key] = obj[key]
        }
    }

    return newObj
}

/**
 * Omits values from an object and creates a new object
 *
 * @example
 *
 * ```ts
 * omit({a: 1, b: 2, c: 3}, "a", "b") // {c: 3}
 * ```
 *
 * @template T - Type of the object to omit items from
 * @template K - Type of the keys used to omit items
 * @param obj - Object to omit keys from
 * @param keys - Keys to omit
 * @returns Object from omitted values
 */
export const omit = <T extends {[key: string]: unknown}, K extends (keyof T)[]>(
    obj: T,
    ...keys: K
): Omit<T, typeof keys[number]> => {
    const newObj = {} as Pick<T, K[number]>

    for (const [key, value] of Object.entries(obj)) {
        if (!keys.includes(key)) {
            newObj[key as K[number]] = value as T[K[number]]
        }
    }

    return newObj
}
