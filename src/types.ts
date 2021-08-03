/**
 * Tuple of type `T` with `L` values in it
 *
 * @example
 *
 * ```ts
 * type MyTuple = Tuple<string, 3> // [string, string, string]
 * ```
 *
 * @typeParam T - Type that the tuple will contain
 * @typeParam L - Length of tuple
 */
export type Tuple<T, L extends number> = L extends L
    ? number extends L
        ? T[]
        : TupleOf<T, L, []>
    : never

type TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
    ? R
    : TupleOf<T, N, [T, ...R]>

/**
 * Extracts the value of an iterable
 *
 * @typeParam T - Iterable to extract value frome
 */
export type IterableValue<T extends Iterable<any>> = Exclude<
    ReturnType<ReturnType<T[typeof Symbol.iterator]>["next"]>,
    IteratorReturnResult<any>
>["value"]
