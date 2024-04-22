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
export type Tuple<T, L extends number> = L extends L ? number extends L ? T[] : TupleOf<T, L, []> : never;
type TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : TupleOf<T, N, [T, ...R]>;
/**
 * Extracts the value of an iterable
 *
 * @typeParam T - Iterable to extract value frome
 */
export type IterableValue<T extends Iterable<any>> = Exclude<ReturnType<ReturnType<T[typeof Symbol.iterator]>["next"]>, IteratorReturnResult<any>>["value"];
/**
 * Takes type param `T` and creates a type that's either `Promise<T>` or `T`
 *
 * @example
 *
 * ```ts
 * const myVar: MaybePromise<number> = 3
 * const myVar: MaybePromise<number> = Promise.resolve(3)
 * ```
 */
export type MaybePromise<T> = Promise<T> | T;
/** Make all properties in `T` optional and nullable */
export type PartialNullable<T> = {
    [P in keyof T]?: T[P] | undefined | null;
};
/** Evaluates to `true` if all properties in `T` are optional, `false` otherwise */
export type IsAllPartial<T> = Partial<T> extends T ? true : false;
/** Evaluates to `true` if all properties in `T` are optional AND nullable, `false` otherwise */
export type IsAllPartialNullable<T> = PartialNullable<T> extends T ? true : false;
export {};
