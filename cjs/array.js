"use strict";
/**
 * Array related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMap = exports.filter = exports.count = exports.arrayToChunks = void 0;
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
 * Array.from(arrayToChunks([1, 2, 3, 4, 5, 5])) // [[1, 2, 3], [4, 5, 6]]
 * Array.from(arrayToChunks([1, 2, 3, 4, 5, 5], 2)) // [[1, 2], [3, 4], [5, 6]]
 * ```
 *
 * @template T - Type of items in the array
 * @param array - Array to split
 * @param chunkSize - Size of array chunks
 * @returns Generator of each chunk
 */
const arrayToChunks = (array, chunkSize = 3) => {
    const resultArray = [];
    for (let index = 0; index < array.length; index += chunkSize) {
        resultArray.push(array.slice(index, index + chunkSize));
    }
    return resultArray;
};
exports.arrayToChunks = arrayToChunks;
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
const count = (array, predicate, max = Infinity) => {
    let total = 0;
    for (let index = 0; index < array.length && total < max; index++) {
        const item = array[index];
        if (predicate(item)) {
            total++;
        }
    }
    return total;
};
exports.count = count;
/**
 * Array.filter equivalent with size limit
 *
 * @example
 *
 * ```ts
 * const array = [true, true, true, false, false, false, false]
 * filter(array, (val) => val) // [true, true, true]
 * filter(array, (val) => val, 2) // [true, true]
 * ```
 *
 * @template T - Type of values in the array
 * @param array - Array to filter
 * @param predicate - Function to determine if item is filtered out or not
 * @param maxSize - Max number of items in filter; stop after this number is reached
 * @returns Generator of each item that isn't filtered and within the limit
 */
const filter = (array, predicate, maxSize = Infinity) => {
    let total = 0;
    const processedArray = [];
    for (let index = 0; index < array.length && total < maxSize; index++) {
        const item = array[index];
        if (predicate(item, index, array)) {
            total++;
            processedArray.push(item);
        }
    }
    return processedArray;
};
exports.filter = filter;
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
 * @template T - Type of original values in the array
 * @template K - Typeof the new, filtered and mapped values
 * @param array - Array to filter and map
 * @param callbackFn - Callback to call on every item, which should return an object that indicates
 *   whether or not the value should be shouldIncluded, and what the new value is
 * @returns Generator of each item that goes through callbackFn
 */
const filterMap = (array, callbackFn) => {
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
exports.filterMap = filterMap;
//# sourceMappingURL=array.js.map