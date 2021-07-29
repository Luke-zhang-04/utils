"use strict";
/**
 * Typeguard related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorLike = void 0;
/**
 * Check if error like (i.e has the name and message properties, both of which are strings)
 *
 * @example
 *
 * ```ts
 * isErrorLike(new Error()) // True
 * isErrorLike({name: "Error!", message: "This is an error", other: 0}) // True
 * isErrorLike({}) // False
 * isErrorLike({name: "Error", message: null}) // False
 *
 * // Works as a typguard
 * const something = {name: "Error", message: "This is an error"} as unknown
 *
 * if (isErrorLike(something)) {
 *     console.log(something.name) // No Typescript error
 * }
 * ```
 *
 * @param obj - Object to check
 * @returns If object is error-like
 */
const isErrorLike = (obj) => typeof obj === "object" &&
    obj !== null &&
    typeof obj.message === "string" &&
    typeof obj.name === "string";
exports.isErrorLike = isErrorLike;
//# sourceMappingURL=typeGuards.js.map