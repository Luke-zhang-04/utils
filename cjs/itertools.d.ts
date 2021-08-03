/**
 * Iterator related utils, inspired by the [Python itertools
 * library](https://docs.python.org/3/library/itertools.html)
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import type { IterableValue } from "./types";
/**
 * Takes a tuple of iterators `K`, and returns a tuple of the iterator return types from `K`
 */
declare type GetIteratorTupleValues<T extends Iterable<unknown>[]> = {
    [K in keyof T]: IterableValue<T[K] extends Iterable<unknown> ? T[K] : never>;
};
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
export declare function zip<T extends Iterable<unknown>[] = Iterable<unknown>[]>(...iterables: T): Generator<GetIteratorTupleValues<T>, void, void>;
/**
 * Chains `iterables` together into one iterable, from the first iterable until it is exhausted,
 * then proceeds to the next iterable, until all of the iterables are exhausted.
 *
 * @remarks
 * Used for treating consecutive sequences as a single sequence.
 *
 * Based on [Python's `itertools.chain`
 * function](https://docs.python.org/3/library/itertools.html#itertools.chain)
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
export declare function chain<T, K extends Iterable<T>[] = Iterable<T>[]>(...iterables: K): Generator<IterableValue<IterableValue<K>>, void, void>;
declare type Operators = ((prev: number, current: number) => number) | "+" | "-" | "*" | "/" | "%" | "**";
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
export declare function accumulate<K extends Iterable<number> = Iterable<number>>(iterable: K, operator?: Operators, initial?: number): Generator<number, void, void>;
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
export declare function repeat<T>(item: T, times?: number | undefined): Generator<T, void, void>;
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
export declare function cycle<T, K extends Iterable<T> = Iterable<T>>(iterable: K): Generator<IterableValue<K>, void, void>;
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
export declare function increment(start?: number, step?: number): Generator<number, void, void>;
/**
 * Make an iterator that filters elements from `data` returning only those that have a
 * corresponding element in `selectors` that is truthy. Stops when either the `data` or `selectors`
 * iterables has been exhausted.
 *
 * Based on [Pythons `itertools.compress`
 * function](https://docs.python.org/3/library/itertools.html#itertools.compress)
 *
 * @example
 *
 * ```ts
 * Array.from(compress("abcdef", [1, 0, 1, 0, 1, 1])) // ["a", "c", "e", "f"]
 * Array.from(compress([1, 2, 3, 4, 5, 6], [true, false, true, false])) // [1, 3]
 * ```
 *
 * @param data - Iterable data to "compress"
 * @param selectors - Selectors which dictate if a value of `data` should be included
 */
export declare function compress<T>(data: Iterable<T>, selectors: Iterable<unknown>): Generator<T, void, void>;
/**
 * Make an iterator that drops elements from `iterable` as long as the predicate is `true`;
 * afterwards, returns every element
 *
 * Based on [Python's `itertools.dropwhile`
 * function](https://docs.python.org/3/library/itertools.html#itertools.dropwhile)
 *
 * @remarks
 * The iterator does not produce *any* output until the predicate first becomes false, so it may
 * have a lengthy start-up time.
 * @example
 *
 * ```ts
 * Array.from(dropWhile([1, 4, 6, 4, 1], (val) => val < 5)) // [6, 4, 1]
 * Array.from(dropWhile("abcdefg", (val) => val !== "d")) // ["d", "e", "f", "g"]
 * ```
 *
 * @param iterable - Iterable to get and drop items from
 * @param predicate - Function that determines from which values to include
 * @returns Generator of each item after the predicate is fulfulled
 */
export declare function dropWhile<T>(iterable: Iterable<T>, predicate: (val: T) => boolean): Generator<T>;
/**
 * Make an iterator that returns elements from `iterable` as long as the predicate is `true`, and
 * stops after it returns `false`
 *
 * Based on [Python's `itertools.takewhile`
 * function](https://docs.python.org/3/library/itertools.html#itertools.takewhile)
 *
 * @example
 *
 * ```ts
 * Array.from(takeWhile([1, 4, 6, 4, 1], (val) => val < 5)) // [1, 4]
 * Array.from(takeWhile("abcdefg", (val) => val !== "d")) // ["a", "b", "c"]
 * ```
 *
 * @param iterable - Iterable to get and take items from
 * @param predicate - Function that determines from which values to include
 * @returns Generator of each item until `predicate` returns `false`
 */
export declare function takeWhile<T>(iterable: Iterable<T>, predicate: (val: T) => boolean): Generator<T>;
/**
 * Array.entries equivalent with support for iterables
 *
 * Based on [Python's enumerate](https://docs.python.org/3/library/functions.html#enumerate)
 *
 * @example
 *
 * ```ts
 * const seasons = ["Spring", "Summer", "Fall", "Winter"]
 *
 * Array.from(enumerate(seasons)) // [[0, 'Spring'], [1, 'Summer'], [2, 'Fall'], [3, 'Winter']]
 * Array.from(enumerate(seasons, 1)) // [[1, 'Spring'], [2, 'Summer'], [3, 'Fall'], [4, 'Winter']]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @param iterable - Iterable to enumerate
 * @returns Iterable with a tuple containing the index and value of the iterable item
 */
export declare const enumerate: <T>(iterable: Iterable<T>, start?: number) => Iterable<[index: number, value: T]>;
/**
 * Array.filter equivalent with size limit and support for iterables
 *
 * @example
 *
 * ```ts
 * const array = [true, true, true, false, false, false, false]
 * Array.from(filter(array, (val) => val)) // [true, true, true]
 * Array.from(filter(array, (val) => val, 2)) // [true, true]
 * Array.from(filter("abcdefg", (val) => val !== "a", 3)) // ["b", "c", "d"]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @param iterable - Iterable to filter
 * @param predicate - Function to determine if item is filtered out or not
 * @param maxSize - Max number of items in filter; stop after this number is reached
 * @returns Generator of each item that isn't filtered and within the limit
 */
export declare function filter<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => unknown, maxSize?: number): Generator<T, void, void>;
export { filter as ifilter };
/**
 * Array.map equivalent with support for iterables
 *
 * @example
 *
 * ```ts
 * const array = [1, 2, 3, 4, 5, 6]
 * Array.from(map(array, (val) => val % 2 === 0)) // [false, true, false, true, false, true]
 * Array.from(map(array, (val) => val - 1)) // [0, 1, 2, 3, 4, 5]
 * Array.from(map("abc", (val: string) => val + "a")) // ["aa", "ba", "ca"]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @typeParam K - Type of the transformer function's return
 * @param iterable - Iterable with items to map
 * @param transformer - Function to transform each item in iterable
 * @returns Generator of each item, passed through the `transformer` function
 */
export declare function map<T, K>(iterable: Iterable<T>, transformer: (val: T, index: number) => K): Generator<K, void, void>;
export { map as imap };
/**
 * Array.reduce equivalent with support for iterables
 *
 * @example
 *
 * ```ts
 * const array = [1, 2, 3, 4, 5, 6]
 * reduce([], (val: number) => val + 1) // Uncaught TypeError: Reduce of empty array with no initial value
 * reduce(array, (prev, current) => prev + current) // 15
 * reduce(array, (prev, current) => prev + current, 10) // 25
 * reduce("abcdef", (prev, current) => (current === "c" ? prev : prev + current)) // "abdef"
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @typeParam K - Type of the transformer function's return
 * @param iterable - Iterable with items to map
 * @param transformer - Function to transform each item in iterable
 * @returns Generator of each item, passed through the `transformer` function
 */
export declare const reduce: <T>(iterable: Iterable<T>, reducer: (accumulated: T, currentValue: T, index: number) => T, defaultValue?: T | undefined) => T;
export { reduce as ireduce };
/**
 * Make an iterator that returns all the elements from `iterable` consecutively
 *
 * Based on [Python's `itertools.islice`
 * function](https://docs.python.org/3/library/itertools.html#itertools.islice)
 *
 * @example
 *
 * ```ts
 * Array.from(islice("abcdefg")) // ["a", "b", "c", "d", "e", "f", "g"]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @param iterable - Iterable to get elements from
 * @returns Generator of each element of iterable
 */
export declare function islice<T>(iterable: Iterable<T>): Generator<T, void, void>;
/**
 * Make an iterator that returns the elements from `iterable` consecutively, from 0 - `end`
 *
 * @remarks
 * Sliced iterable is non-inclusive of `end`, where `end` is a non-negative number
 *
 * Based on [Python's `itertools.islice`
 * function](https://docs.python.org/3/library/itertools.html#itertools.islice)
 * @example
 *
 * ```ts
 * Array.from(islice("abcdefg", 2)) // ["a", "b"]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @param iterable - Iterable to get elements from
 * @param end - The index at which to stop slicing the iterable, non-inclusive
 * @returns Generator of the elements from `iterable` sliced from 0 to `end`
 */
export declare function islice<T>(iterable: Iterable<T>, end: number): Generator<T, void, void>;
/**
 * Make an iterator that returns the elements from `iterable` consecutively, from `start` - `end`,
 *
 * @remarks
 * Slice is non-inclusive of `end`, where `start` and `end` are non-negative numbers. If `end` is
 * null, slice from `start` to the end of the iterator
 *
 * Based on [Python's `itertools.islice`
 * function](https://docs.python.org/3/library/itertools.html#itertools.islice)
 * @example
 *
 * ```ts
 * Array.from(islice("abcdefg", 2, 4)) // ["c", "d"]
 * Array.from(islice("abcdefg", 2, null)) // ["c", "d", "e", "f", "g"]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @param iterable - Iterable to get elements from
 * @param start - The index at which to start slicing the iterable
 * @param end - The index at which to stop slicing the iterable, non-inclusive
 * @returns Generator of the elements from `iterable` sliced from 0 to `end`
 */
export declare function islice<T>(iterable: Iterable<T>, start: number, end: number | null): Generator<T, void, void>;
/**
 * Make an iterator that returns the elements from `iterable` for every `step`th element, from
 * `start` - `end`
 *
 * @remarks
 * Slice is non-inclusive of `end`, where `start`, `end`, and `step` are non-negative numbers. If
 * `end` is null, slice from `start` to the end of the iterator
 *
 * Based on [Python's `itertools.islice`
 * function](https://docs.python.org/3/library/itertools.html#itertools.islice)
 * @example
 *
 * ```ts
 * Array.from(islice("abcdefg", 0, null, 2)) // ["a", "c", "e", "g"]
 * Array.from(islice("abcdefg", 0, 4, 2)) // ["a", "c"]
 * ```
 *
 * @typeParam T - Type of the iterable's items
 * @param iterable - Iterable to get elements from
 * @param start - The index at which to start slicing the iterable
 * @param end - The index at which to stop slicing the iterable, non-inclusive
 * @param step - The increment at which to slice items
 * @returns Generator of the elements from `iterable` sliced from 0 to `end`
 */
export declare function islice<T>(iterable: Iterable<T>, start: number, end: number | null, step: number): Generator<T, void, void>;
