/**
 * Utils that check for deep equality
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
/**
 * Checks if val1 and val2 are equal. Works like lodash isEqual, and is just as fast.
 *
 * @remarks
 * BEFORE YOU USE THIS: think to yourself, "Do I need this?" If there's another way, it's problably
 * faster. Deep equality checking is a very costly operation and should be used sparingly
 * @param val1 - Value to check for equality
 * @param val2 - Value to compare against val1
 * @param maxDepth - Max recursion depth to crawl an object. After max depth is reached, the two
 *   values are simply compared with `===`. If undefined, it will be treated as `Infinity`. It may
 *   be a good idea to set this value to prevent a catastrophe.
 * @param maxLength - Max length of an array to crawl. If max length is reached, two arrays will
 *   simply be compared with `===`. If undefined, it will be treated as `Infinity`. It may be a
 *   good idea to set this value to prevent a catastrophe.
 * @returns If val1 is deeply equal to val2
 */
export declare const isEqual: (val1: unknown, val2: unknown, maxDepth?: number | undefined, maxLength?: number | undefined) => boolean;
/**
 * Checks if obj1 and obj2 are equal, given that they are both arrays
 *
 * @param obj1 - Object to check for equality
 * @param obj2 - Object to compare against val1
 * @param maxDepth - Max recursion depth to crawl an object. After max depth is reached, the two
 *   values are simply compared with `===`. If undefined, it will be treated as `Infinity`. It may
 *   be a good idea to set this value to prevent a catastrophe.
 * @param maxLength - Max length of an array to crawl. If max length is reached, two arrays will
 *   simply be compared with `===`. If undefined, it will be treated as `Infinity`. It may be a
 *   good idea to set this value to prevent a catastrophe.
 * @returns If obj1 is deeply equal to obj2
 */
export declare const isEqualObject: (obj1: object, obj2: object, maxDepth?: number | undefined, maxLength?: number | undefined) => boolean;
/**
 * Checks if arr1 and arr2 are equal, given that they are both arrays
 *
 * @param arr1 - Array to check for equality
 * @param arr2 - Array to compare against val1
 * @param maxDepth - Max recursion depth to crawl an object. After max depth is reached, the two
 *   values are simply compared with `===`. If undefined, it will be treated as `Infinity`. It may
 *   be a good idea to set this value to prevent a catastrophe.
 * @param maxLength - Max length of an array to crawl. If max length is reached, two arrays will
 *   simply be compared with `===`. If undefined, it will be treated as `Infinity`. It may be a
 *   good idea to set this value to prevent a catastrophe.
 * @returns If arr1 is deeply equal to arr2
 */
export declare const isEqualArray: (obj1: unknown[], obj2: unknown[], maxDepth?: number | undefined, maxLength?: number | undefined) => boolean;
