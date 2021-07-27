/**
 * Utility functions
 *
 * 0BSD License
 */

/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Tries to execute `func` and discards any error that occurs
 *
 * @template T - Type of data that will be returned by the callback
 * @param func - Callback function
 * @param shouldKeepError - If error should be returned
 * @returns Return value of func, or undefined if an error occured
 */
export function inlineTry<T>(func: () => T, shouldKeepError: false): T | undefined

/**
 * Tries to execute `func` and discards any error that occurs
 *
 * @template T - Type of data that will be returned by the callback
 * @param func - Callback function
 * @param shouldKeepError - If error should be returned
 * @returns Return value of func, or the thrown Error if an error occured
 */
export function inlineTry<T>(func: () => T, shouldKeepError?: true): T | Error

export function inlineTry<T>(func: () => T, shouldKeepError = true): T | Error | undefined {
    try {
        return func()
    } catch (err: unknown) {
        if (shouldKeepError) {
            return err instanceof Error ? err : new Error(String(err))
        }

        return
    }
}

/**
 * Tries to execute and await `func` and discards any error that occurs
 *
 * @template T - Type of data that will be returned by the callback
 * @param func - Callback function
 * @param shouldKeepError - If error should be returned
 * @returns Return value of func, or undefined if an error occured
 */
export async function inlineTryPromise<T>(
    func: () => Promise<T>,
    shouldKeepError: false,
): Promise<T | undefined>

/**
 * Tries to execute and await `func` and discards any error that occurs
 *
 * @template T - Type of data that will be returned by the callback
 * @param func - Callback function
 * @param shouldKeepError - If error should be returned
 * @returns Return value of func, or the thrown Error if an error occured
 */
export async function inlineTryPromise<T>(
    func: () => Promise<T>,
    shouldKeepError?: true,
): Promise<T | Error>

export async function inlineTryPromise<T>(
    func: () => Promise<T>,
    shouldKeepError = true,
): Promise<T | Error | undefined> {
    try {
        return await func()
    } catch (err: unknown) {
        if (shouldKeepError) {
            return err instanceof Error ? err : new Error(String(err))
        }

        return
    }
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */
