"use strict";
/**
 * Try-catch related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineTryPromise = exports.inlineTry = void 0;
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
const inlineTry = (func, shouldKeepError = true) => {
    try {
        return func();
    }
    catch (err) {
        if (shouldKeepError) {
            return err instanceof Error ? err : new Error(String(err));
        }
        return;
    }
};
exports.inlineTry = inlineTry;
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
const inlineTryPromise = async (func, shouldKeepError = true) => {
    try {
        return await func();
    }
    catch (err) {
        if (shouldKeepError) {
            return err instanceof Error ? err : new Error(String(err));
        }
        return;
    }
};
exports.inlineTryPromise = inlineTryPromise;
//# sourceMappingURL=try.js.map