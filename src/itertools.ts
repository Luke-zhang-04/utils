/**
 * Iterator related utils, inspired by the Python itertools library
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import type {IterableValue, Tuple} from "./types"

/**
 * Creates a generator of the n'th element of *each* iterable, such that `n < length of smallest iterable`
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
 * Array.from(zip(generator1(), generator2())) // [["a", 1], ["b", 2]]
 * Array.from(zip(["a", "b"], [1, 2, 3])) // [["a", 1], ["b", 2]]
 * ```
 *
 * @param iterables - Array of iterables to zip together
 * @returns Generator of the n'th element of each iterable, such that `n < length of smallest iterable`
 */
export function* zip<T, K extends Iterable<T>[] = Iterable<T>[]>(
    ...iterables: K
): Generator<Tuple<IterableValue<K[number]>, K["length"]>, void, void> {
    const iterators = iterables.map((iterator) => iterator[Symbol.iterator]())

    while (true) {
        const results = iterators.map((iter) => iter.next())

        if (results.some((result) => result.done)) {
            return
        } else {
            yield results.map((result) => result.value) as Tuple<
                IterableValue<K[number]>,
                K["length"]
            >
        }
    }
}
