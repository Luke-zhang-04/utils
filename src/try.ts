/**
 * Try-catch related utils
 *
 * @module
 */

type InlineTry = {
    /**
     * Tries to execute `func` and discards any error that occurs
     *
     * @example
     *
     * ```ts
     * inlineTry(() => {
     *     throw new Error("Error!")
     * }, false) // undefined
     * inlineTry(() => 1, false) // 1
     * ```
     *
     * @typeParam T - Type of data that will be returned by the callback
     * @param func - Callback function
     * @param shouldKeepError - If error should be returned
     * @returns Return value of func, or undefined if an error occured
     */
    <T>(func: () => T, shouldKeepError: false): T | undefined

    /**
     * Tries to execute `func` and returns any error that occurs
     *
     * @example
     *
     * ```ts
     * inlineTry(() => {
     *     throw new Error("Error!")
     * }) // Error: Error!
     * inlineTry(() => 1, true) // 1
     * ```
     *
     * @typeParam T - Type of data that will be returned by the callback
     * @param func - Callback function
     * @param shouldKeepError - If error should be returned
     * @returns Return value of func, or the thrown Error if an error occured
     */
    <T>(func: () => T, shouldKeepError?: true): T | Error
}

/**
 * Tries to execute `func` and returns or discards any error that occurs
 *
 * @example
 *
 * ```ts
 * inlineTry(() => {
 *     throw new Error("Error!")
 * }) // Error: Error!
 * inlineTry(() => {
 *     throw new Error("Error!")
 * }, false) // undefined
 * inlineTry(() => 1, true) // 1
 * inlineTry(() => 1, false) // 1
 * ```
 *
 * @typeParam T - Type of data that will be returned by the callback
 * @param func - Callback function
 * @param shouldKeepError - If error should be returned
 * @returns Return value of func. If an error is thrown, return it if `shouldKeepError` is true,
 *   else discard it
 */
export const inlineTry: InlineTry = <T>(
    func: () => T,
    shouldKeepError = true,
): T | Error | undefined => {
    try {
        return func()
    } catch (err: unknown) {
        if (shouldKeepError) {
            return err instanceof Error ? err : new Error(String(err))
        }

        return
    }
}

type InlineTryPromise = {
    /**
     * Tries to execute and await `func` and discards any error that occurs
     *
     * @example
     *
     * ```ts
     * await inlineTryPromise(async () => {
     *     await Promise.resolve()
     *     throw new Error("Error!")
     * }, false) // undefined
     * await inlineTryPromise(async () => await Promise.resolve(1), false) // 1
     * ```
     *
     * @typeParam T - Type of data that will be returned by the callback
     * @param func - Callback function
     * @param shouldKeepError - If error should be returned
     * @returns Return value of func, or undefined if an error occured
     */
    <T>(func: () => Promise<T>, shouldKeepError: false): Promise<T | undefined>

    /**
     * Tries to execute and await `func` and returns any error that occurs
     *
     * @example
     *
     * ```ts
     * await inlineTryPromise(async () => {
     *     await Promise.resolve()
     *     throw new Error("Error!")
     * }) // Error: Error!
     * await inlineTryPromise(async () => await Promise.resolve(1), true) // 1
     * ```
     *
     * @typeParam T - Type of data that will be returned by the callback
     * @param func - Callback function
     * @param shouldKeepError - If error should be returned
     * @returns Return value of func, or the thrown Error if an error occured
     */
    <T>(func: () => Promise<T>, shouldKeepError?: true): Promise<T | Error>
}

/**
 * Tries to execute and await `func` and returns or discards any error that occurs
 *
 * @example
 *
 * ```ts
 * await inlineTryPromise(async () => {
 *     await Promise.resolve()
 *     throw new Error("Error!")
 * }, true) // Error: Error!
 * await inlineTryPromise(async () => {
 *     await Promise.resolve()
 *     throw new Error("Error!")
 * }, false) // undefined
 * await inlineTryPromise(async () => await Promise.resolve(1), false) // 1
 * await inlineTryPromise(async () => await Promise.resolve(1), true) // 1
 * ```
 *
 * @typeParam T - Type of data that will be returned by the callback
 * @param func - Callback function
 * @param shouldKeepError - If error should be returned
 * @returns Return value of func. If an error is thrown, return it if `shouldKeepError` is true,
 *   else discard it
 */
export const inlineTryPromise: InlineTryPromise = async <T>(
    func: () => Promise<T>,
    shouldKeepError = true,
): Promise<T | Error | undefined> => {
    try {
        return await func()
    } catch (err: unknown) {
        if (shouldKeepError) {
            return err instanceof Error ? err : new Error(String(err))
        }

        return
    }
}
