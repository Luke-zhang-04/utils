/**
 * Iterator related utils, inspired by the [Python itertools
 * library](https://docs.python.org/3/library/itertools.html)
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
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
export function* zip(...iterables) {
    const iterators = iterables.map((iterator) => iterator[Symbol.iterator]());
    while (true) {
        const results = iterators.map((iter) => iter.next());
        if (results.some((result) => result.done)) {
            return;
        }
        yield results.map((result) => result.value);
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
export function* chain(...iterables) {
    for (let index = 0; index < iterables.length; index++) {
        const iterable = iterables[index];
        for (const value of iterable) {
            yield value;
        }
    }
}
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
export function* accumulate(iterable, operator = "+", initial) {
    let val = initial;
    if (initial !== undefined) {
        yield initial;
    }
    for (const item of iterable) {
        if (val === undefined) {
            val = item;
        }
        else {
            switch (operator) {
                case "+":
                    val += item;
                    break;
                case "-":
                    val -= item;
                    break;
                case "*":
                    val *= item;
                    break;
                case "/":
                    val /= item;
                    break;
                case "%":
                    val %= item;
                    break;
                case "**":
                    val **= item;
                    break;
                default:
                    val = operator(val, item);
                    break;
            }
        }
        yield val;
    }
}
/**
 * Make an iterator that yields `item` over and over again. Runs indefinitely unless the `times`
 * argument is specified.
 *
 * Based on [Pythons `itertools.repeat`
 * function](https://docs.python.org/3/library/itertools.html#itertools.repeat)
 *
 * @example
 *
 * ```ts
 * Array.from(repeat(10, 3)) // [10, 10, 10]
 * Array.from(zip([1, 2, 3], repeat(10))) // [[1, 10], [2, 10], [3, 10]]
 * ```
 *
 * @param item - Item to repeat
 * @param times - Number of times to repeat `item`, or `undefined` for indefinite repeat
 * @returns Generator of `item` until `times` is reached
 */
export function* repeat(item, times) {
    if (times === undefined) {
        while (true) {
            yield item;
        }
    }
    else {
        for (let amt = 0; amt < times; amt++) {
            yield item;
        }
    }
}
/**
 * Make an iterator returning elements from the iterable and saving a copy of each. When the
 * iterable is exhausted, return elements from the saved copy. Repeats indefinitely.
 *
 * Based on [Python's `itertools.cycle`
 * function](https://docs.python.org/3/library/itertools.html#itertools.cycle)
 *
 * @example
 *
 * ```ts
 * Array.from(zip([1, 2, 3], cycle("abc"))) // [[1, "a"], [2, "b"], [3, "c"]]
 * Array.from(cycle([1, 2, 3])) // [1, 2, 3, 1, 2, 3, 1, 2, 3 ...(forever)]
 * ```
 *
 * @param iterable - Iterable to cycle through
 * @returns Generator of the elements of `iterable`
 */
export function* cycle(iterable) {
    const saved = [];
    for (const item of iterable) {
        saved.push(item);
        yield item;
    }
    while (true) {
        for (let index = 0; index < saved.length; index++) {
            yield saved[index];
        }
    }
}
/**
 * Make an iterator that returns evenly spaced values `step` apart starting with number `start`
 *
 * Based on [Python's `itertools.count`
 * function](https://docs.python.org/3/library/itertools.html#itertools.count)
 *
 * @example
 *
 * ```ts
 * Array.from(zip([1, 2, 3], increment())) // [[1, 1], [2, 2], [3, 3]]
 * Array.from(increment()) // [0, 1, 2, 3, 4, ...(forever)]
 * Array.from(increment(10, 2)) // [10, 12, 14, 16, ...(forever)]
 * ```
 *
 * @param start - Start number
 * @param step - Amount to increment
 * @returns Generator of evenly spaced values `step` apart starting with number `start`
 */
export function* increment(start = 0, step = 1) {
    let current = start;
    yield current;
    while (true) {
        current += step;
        yield current;
    }
}
//# sourceMappingURL=itertools.js.map