/**
 * Array related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
/**
 * Splits an array into chunks
 *
 * @example
 *
 * ```ts
 * arrayToChunks([1, 2, 3, 4, 5, 5]) // [[1, 2, 3], [4, 5, 6]]
 * arrayToChunks([1, 2, 3, 4, 5, 5], 2) // [[1, 2], [3, 4], [5, 6]]
 * ```
 *
 * @typeParam T - Type of items in the array
 * @param array - Array to split
 * @param chunkSize - Size of array chunks
 * @returns Array of each chunk in the form of arrays
 */
export declare const arrayToChunks: <T>(array: T[], chunkSize?: number) => T[][];
/**
 * Counts items in array that match the predicate
 *
 * @example
 *
 * ```ts
 * const array = [true, true, true, false, false, false, false]
 * count(array, (val) => val) // 3
 * count(array, (val) => !val) // 4
 * count(array, (val) => !val, 2) // 2
 * ```
 *
 * @typeParam T - Type of value in the array
 * @param array - Array to count items from
 * @param predicate- Function to determine if item matches predicate
 * @param max - Max number of items to count
 * @returns Number of counted items
 */
export declare const count: <T>(array: T[], predicate: (value: T) => unknown, max?: number | undefined) => number;
/**
 * Callback type for the filterMap function
 */
declare type FilterMapCallback<T, K> = (value: T, index: number) => {
    shouldInclude: false;
    value?: any;
} | {
    shouldInclude: true;
    value: K;
};
/**
 * Map and filter in one loop
 *
 * @example
 *
 * ```ts
 * const array = [true, true, true, false, false, false, false]
 *
 * filterMap(array, (val, index) => ({
 *     shouldInclude: val,
 *     value: index,
 * })) // [0, 1, 2]
 *
 * filterMap(array, (val, index) => ({
 *     shouldInclude: !val,
 *     value: index,
 * })) // [3, 4, 5, 6]
 * ```
 *
 * @typeParam T - Type of original values in the array
 * @typeParam K - Typeof the new, filtered and mapped values
 * @param array - Array to filter and map
 * @param callbackFn - Callback to call on every item, which should return an object that indicates
 *   whether or not the value should be shouldIncluded, and what the new value is
 * @returns Array of each item that goes through callbackFn
 */
export declare const filterMap: <T, K>(array: T[], callbackFn: FilterMapCallback<T, K>) => K[];
export { filter } from "./itertools";
/**
 * Shuffles an array in-place and returns the array
 *
 * @param array - Array to shuffle
 * @param cycles - Number of shuffle cycles to go through
 * @returns Reference to array
 */
export declare const shuffle: <T>(array: T[], cycles?: number) => T[];
