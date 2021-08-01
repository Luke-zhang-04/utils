/**
 * Typeguard related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
/**
 * Check if object like (`typeof object` and not null)
 *
 * @example
 *
 * ```ts
 * isErrorLike({}) // True
 * isErrorLike(/regex/) // True
 * isErrorLike(new Date()) // True
 * isErrorLike("string") // False
 *
 * // Works as a typguard
 * const something = {} as unknown
 *
 * if (isObject(something)) {
 *     // No Typescript error
 *     console.log(something.property)
 * }
 *
 * if (typeof something === "object" && something !== null) {
 *     // Property 'property' does not exist on type 'object'. ts(2339)
 *     console.log(something.property)
 * }
 * ```
 *
 * @param obj - Object to check
 * @returns If object is error-like
 */
export declare const isObject: (obj: unknown) => obj is {
    [key: string]: unknown;
};
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
export declare const isErrorLike: (obj: unknown) => obj is {
    name: string;
    message: string;
};
