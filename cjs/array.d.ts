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
 * Array.from(arrayToChunks([1, 2, 3, 4, 5, 5])) // [[1, 2, 3], [4, 5, 6]]
 * Array.from(arrayToChunks([1, 2, 3, 4, 5, 5], 2)) // [[1, 2], [3, 4], [5, 6]]
 * ```
 *
 * @template T - Type of items in the array
 * @param array - Array to split
 * @param chunkSize - Size of array chunks
 * @returns Generator of each chunk
 */
export declare function arrayToChunks<T>(array: T[], chunkSize?: number): Generator<T[], void, void>;
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
 * @template T - Type of value in the array
 * @param array - Array to count items from
 * @param predicate- Function to determine if item matches predicate
 * @param max - Max number of items to count
 * @returns Number of counted items
 */
export declare const count: <T>(array: T[], predicate: (value: T) => unknown, max?: number) => number;
/**
 * Array.filter equivalent with size limit
 *
 * @example
 *
 * ```ts
 * const array = [true, true, true, false, false, false, false]
 * Array.from(filter(array, (val) => val)) // [true, true, true]
 * Array.from(filter(array, (val) => val, 2)) // [true, true]
 * ```
 *
 * @template T - Type of values in the array
 * @param array - Array to filter
 * @param predicate - Function to determine if item is filtered out or not
 * @param maxSize - Max number of items in filter; stop after this number is reached
 * @returns Generator of each item that isn't filtered and within the limit
 */
export declare function filter<T>(array: T[], predicate: (value: T, index: number, array: T[]) => unknown, maxSize?: number): Generator<T, void, void>;
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
 * Array.from(
 *     filterMap(array, (val, index) => ({
 *         shouldInclude: val,
 *         value: index,
 *     })),
 * ) // [0, 1, 2]
 * Array.from(
 *     filterMap(array, (val, index) => ({
 *         shouldInclude: !val,
 *         value: index,
 *     })),
 * ) // [3, 4, 5, 6]
 * ```
 *
 * @template T - Type of original values in the array
 * @template K - Typeof the new, filtered and mapped values
 * @param array - Array to filter and map
 * @param callbackFn - Callback to call on every item, which should return an object that indicates
 *   whether or not the value should be shouldIncluded, and what the new value is
 * @returns Generator of each item that goes through callbackFn
 */
export declare function filterMap<T, K>(array: T[], callbackFn: FilterMapCallback<T, K>): Generator<K, void, void>;
export {};
