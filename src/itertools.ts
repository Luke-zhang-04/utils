/**
 * Iterator related utils, inspired by the [Python itertools
 * library](https://docs.python.org/3/library/itertools.html)
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import type {IterableValue, Tuple} from "./types"

/**
 * Creates a generator of the n'th element of *each* iterable, such that `n < length of smallest iterable`
 *
 * Based on [Python's `zip` function](https://docs.python.org/3/library/functions.html#zip)
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

/**
 * Chains `iterables` together into one iterable, from the first iterable until it is exhausted,
 * then proceeds to the next iterable, until all of the iterables are exhausted. Used for treating
 * consecutive sequences as a single sequence.
 *
 * Based on [Python's `itertools.chain`
 * function](https://docs.python.org/3/library/itertools.html#itertools.chain)
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
 * Array.from(chain(generator1(), generator2())) // ["a", "b", 1, 2, 3]
 * Array.from(chain(generator1(), generator2(), [4, 5, 6])) // ["a", "b", 1, 2, 3, 4, 5, 6]
 * ```
 *
 * @param iterables - Array of iterables to chain together
 * @returns Generator of the chained iterables
 */
export function* chain<T, K extends Iterable<T>[] = Iterable<T>[]>(
    ...iterables: K
): Generator<IterableValue<IterableValue<K>>, void, void> {
    for (let index = 0; index < iterables.length; index++) {
        const iterable = iterables[index]!

        for (const value of iterable) {
            yield value
        }
    }
}

type Operators = ((prev: number, current: number) => number) | "+" | "-" | "*" | "/" | "%" | "**"

/**
 * Make an iterator that returns accumulated sums, or accumulated results of other binary functions
 * (specified via the optional func argument).
 *
 * Based on [Python's `itertools.accumulate`
 * function](https://docs.python.org/3/library/itertools.html#itertools.accumulate)
 *
 * @example
 *
 * ```ts
 * Array.from(accumulate([1, 2, 3, 4, 5])) // [1, 3, 6, 10, 15]
 * Array.from(accumulate([1, 2, 3, 4, 5], undefined, 100)) // [100, 101, 103, 106, 110, 115]
 * Array.from(accumulate([1, 2, 3, 4, 5], (prev, current) => prev * current)) // [1, 2, 6, 24, 120]
 * Array.from(accumulate([1, 2, 3, 4, 5], "*") // [1, 2, 6, 24, 120]
 * ```
 *
 * @param iterable - Iterable to accumulate values of
 * @param operator - Optional function that specifies the way items should be accumulated, or an
 *   arithmetic operator in string form to apply
 * @param initial - Initial value to accumulate from, which is yielded once at the beginning if defined
 * @returns - Generator of each item of `iterable`, each item accumulated from the previous values
 */
export function* accumulate<K extends Iterable<number> = Iterable<number>>(
    iterable: K,
    operator: Operators = "+",
    initial?: number,
): Generator<number, void, void> {
    let val: number | undefined = initial

    if (initial !== undefined) {
        yield initial
    }

    for (const item of iterable) {
        if (val === undefined) {
            val = item
        } else {
            switch (operator) {
                case "+":
                    val += item
                    break
                case "-":
                    val -= item
                    break
                case "*":
                    val *= item
                    break
                case "/":
                    val /= item
                    break
                case "%":
                    val %= item
                    break
                case "**":
                    val **= item
                    break
                default:
                    val = operator(val, item)
                    break
            }
        }

        yield val
    }
}
