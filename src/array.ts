/**
 * Utility functions
 *
 * Many of these functions are somewhat trivial to write with native methods, but come with certain
 * performance implications
 *
 * 0BSD License
 */

/**
 * Splits an array into chunks
 *
 * @template T - Type of items in the array
 * @param array - Array to split
 * @param chunkSize - Size of array chunks
 * @returns Generator of each chunk
 */
export function* arrayToChunks<T>(array: T[], chunkSize = 3): Generator<T[], void, void> {
    for (let index = 0; index < array.length; index += chunkSize) {
        yield array.slice(index, index + chunkSize)
    }
}

/**
 * Counts items in array that match the predicate
 *
 * @param array - Array to count items from
 * @param predicate- Function to determine if item matches predicate
 * @param max - Max number of items to count
 * @returns Number of counted items
 */
export const count = <T>(
    array: T[],
    predicate: (value: T) => unknown,
    max = Infinity,
): number => {
    let total = 0

    for (const item of array) {
        if (predicate(item)) {
            total++
        }

        if (total >= max) {
            return total
        }
    }

    return total
}

/**
 * Array.filter equivalent with size limit
 *
 * @template T - Type of values in the array
 * @param array - Array to filter
 * @param predicate - Function to determine if item is filtered out or not
 * @param maxSize - Max number of items in filter; stop after this number is reached
 * @returns Generator of each item that isn't filtered and within the limit
 */
export function* filter<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => unknown,
    maxSize = Infinity,
): Generator<T, void, void> {
    let total = 0

    for (const [index, item] of array.entries()) {
        if (predicate(item, index, array)) {
            total++

            yield item
        }

        if (total >= maxSize) {
            return
        }
    }
}

/**
 * Callback type for the filterMap function
 */
type FilterMapCallback<T, K> = (
    value: T,
    index: number,
) =>
    | {
          include: false
          newValue?: any
      }
    | {
          include: true
          newValue: K
      }

/**
 * Map and filter in one loop
 *
 * @template T - Type of original values in the array
 * @template K - Typeof the new, filtered and mapped values
 * @param array - Array to filter and map
 * @param callbackFn - Callback to call on every item, which should return an object that indicates
 *   whether or not the value should be included, and what the new value is
 * @returns Generator of each item that goes through callbackFn
 */
export function* filterMap<T, K>(
    array: T[],
    callbackFn: FilterMapCallback<T, K>,
): Generator<K, void, void> {
    for (const [index, item] of array.entries()) {
        const result = callbackFn(item, index)

        if (result.include) {
            yield result.newValue
        }
    }
}
