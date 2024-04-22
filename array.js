/**
 * Array related utils
 *
 * @module
 */
import { randint } from "./random.js";
/*
Notes:
    - The use of for-loops using indexes is encouraged because of the performance gain involved
    - Don't use iterators or generators. Just use arrays - they're faster.
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
export const arrayToChunks = (array, chunkSize = 3) => {
    const resultArray = [];
    for (let index = 0; index < array.length; index += chunkSize) {
        resultArray.push(array.slice(index, index + chunkSize));
    }
    return resultArray;
};
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
export const count = (array, predicate, max) => {
    let total = 0;
    for (let index = 0; index < array.length && (max === undefined || total < max); index++) {
        const item = array[index];
        if (predicate(item)) {
            total++;
        }
    }
    return total;
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
export const filterMap = (array, callbackFn) => {
    const processedArray = [];
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        const result = callbackFn(item, index);
        if (result.shouldInclude) {
            processedArray.push(result.value);
        }
    }
    return processedArray;
};
export { filter } from "./itertools.js";
/**
 * Shuffles an array in-place and returns the array
 *
 * @param array - Array to shuffle
 * @param cycles - Number of shuffle cycles to go through
 * @returns Reference to array
 */
export const shuffle = (array, cycles = 1) => {
    for (let _ = 0; _ < cycles; _++) {
        for (let index = array.length - 1; index > 0; index--) {
            const randonIndex = randint(0, index + 1);
            const temp = array[index];
            array[index] = array[randonIndex];
            array[randonIndex] = temp;
        }
    }
    return array;
};
//# sourceMappingURL=array.js.map