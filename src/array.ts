/**
 * Array related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

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
 * @template T - Type of items in the array
 * @param array - Array to split
 * @param chunkSize - Size of array chunks
 * @returns Array of each chunk in the form of arrays
 */
export const arrayToChunks = <T>(array: T[], chunkSize = 3): T[][] => {
    const resultArray: T[][] = []

    for (let index = 0; index < array.length; index += chunkSize) {
        resultArray.push(array.slice(index, index + chunkSize))
    }

    return resultArray
}

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
export const count = <T>(array: T[], predicate: (value: T) => unknown, max = Infinity): number => {
    let total = 0

    for (let index = 0; index < array.length && total < max; index++) {
        const item = array[index]!

        if (predicate(item)) {
            total++
        }
    }

    return total
}

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
 * @returns Array of each item that isn't filtered and within the limit
 */
export const filter = <T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => unknown,
    maxSize = Infinity,
): T[] => {
    let total = 0
    const processedArray: T[] = []

    for (let index = 0; index < array.length && total < maxSize; index++) {
        const item = array[index]!

        if (predicate(item, index, array)) {
            total++

            processedArray.push(item)
        }
    }

    return processedArray
}

/**
 * Callback type for the filterMap function
 */
type FilterMapCallback<T, K> = (
    value: T,
    index: number,
) =>
    | {
          shouldInclude: false
          value?: any
      }
    | {
          shouldInclude: true
          value: K
      }

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
 * @returns Array of each item that goes through callbackFn
 */
export const filterMap = <T, K>(array: T[], callbackFn: FilterMapCallback<T, K>): K[] => {
    const processedArray: K[] = []

    for (let index = 0; index < array.length; index++) {
        const item = array[index]!
        const result = callbackFn(item, index)

        if (result.shouldInclude) {
            processedArray.push(result.value)
        }
    }

    return processedArray
}
