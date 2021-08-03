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
 * @typeParam T - Type of the object to pick items from
 * @typeParam K - Type of the keys used to pick out items
 * @param obj - Object to pick keys from
 * @param keys - Keys to pick
 * @returns Object from picked values
 */
export declare const pick: <T extends {
    [key: string]: unknown;
}, K extends (keyof T)[]>(obj: T, ...keys: K) => Pick<T, K[number]>;
/**
 * Omits values from an object and creates a new object
 *
 * @example
 *
 * ```ts
 * omit({a: 1, b: 2, c: 3}, "a", "b") // {c: 3}
 * ```
 *
 * @typeParam T - Type of the object to omit items from
 * @typeParam K - Type of the keys used to omit items
 * @param obj - Object to omit keys from
 * @param keys - Keys to omit
 * @returns Object from omitted values
 */
export declare const omit: <T extends {
    [key: string]: unknown;
}, K extends (keyof T)[]>(obj: T, ...keys: K) => Omit<T, K[number]>;
