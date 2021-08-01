/**
 * Iterator related utils, inspired by the Python itertools library
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import type {Tuple} from "./types"

/**
 * Creates a generator of the n'th element of *each* array, such that `n < length of smallest array`
 *
 * @example
 *
 * ```ts
 * Array.from(zip(["a", "b"], [1, 2, 3])) // [["a", 1], ["b", 2]]
 * ```
 *
 * @param arrays - Array of arrays to zip together
 * @returns Generator of the n'th element of each array, such that `n < length of smallest array`
 */
export function zip<T, K extends T[][] = T[][]>(
    ...arrays: K
): Generator<Tuple<K[number][number], K["length"]>, void, void>

/**
 * Creates a generator of the n'th element of *each* iterable, such that `n < length of smallest iterable`
 *
 * **Note**: the return type cannot be inferred. Define the generic for a type value other than `unknown`
 *
 * @example
 *
 * ```ts
 * function* generator1(): Generator<string> {
 *     yield "a"
 *     yield "b"
 * }
 *
 * function* generator2(): Generator<number> {
 *     yield 1
 *     yield 2
 *     yield 3
 * }
 *
 * Array.from(
 *     zip<string | number, [Iterable<string>, Iterable<number>]>(generator1(), generator2()),
 * ) // [["a", 1], ["b", 2]]
 * ```
 *
 * @param iterables - Array of iterables to zip together
 * @returns Generator of the n'th element of each iterable, such that `n < length of smallest iterable`
 */
export function zip<T, K extends Iterable<T>[] = Iterable<T>[]>(
    ...iterables: K
): Generator<Tuple<T, K["length"]>, void, void>

/**
 * Creates a generator of the n'th element of *each* iterable, such that `n < length of smallest iterable`
 *
 * **Note**: For iterables that are not arrays, the return type cannot be inferred. Define the
 * generic for a type value other than `unknown`
 *
 * @example
 *
 * ```ts
 * function* generator1(): Generator<string> {
 *     yield "a"
 *     yield "b"
 * }
 *
 * function* generator2(): Generator<number> {
 *     yield 1
 *     yield 2
 *     yield 3
 * }
 *
 * Array.from(
 *     zip<string | number, [Iterable<string>, Iterable<number>]>(generator1(), generator2()),
 * ) // [["a", 1], ["b", 2]]
 *
 * Array.from(zip(["a", "b"], [1, 2, 3])) // [["a", 1], ["b", 2]]
 * ```
 *
 * @param iterables - Array of iterables to zip together
 * @returns Generator of the n'th element of each iterable, such that `n < length of smallest iterable`
 */
export function* zip<T, K extends T[][] | Iterable<T>[] = T[][] | Iterable<T>[]>(
    ...iterables: K
): Generator<
    Tuple<K[number] extends Array<any> ? K[number][number] : T, K["length"]>,
    void,
    void
> {
    const iterators = iterables.map((iterator) => iterator[Symbol.iterator]())

    while (true) {
        const results = iterators.map((iter) => iter.next())

        if (results.some((result) => result.done)) {
            return
        } else {
            yield results.map((result) => result.value) as Tuple<
                K[number] extends Array<T> ? K[number][number] : T,
                K["length"]
            >
        }
    }
}
