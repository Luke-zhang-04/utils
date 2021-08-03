"use strict";
/**
 * Object related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.pick = void 0;
/**
 * Picks values from an object and creates a new object
 *
 * @example
 *
 * ```ts
 * pick({a: 1, b: 2, c: 3}, "a", "b") // {a: 1, b: 2}
 * ```
 *
 * @typeParam T - Type of the object to pick items from
 * @typeParam K - Type of the keys used to pick out items
 * @param obj - Object to pick keys from
 * @param keys - Keys to pick
 * @returns Object from picked values
 */
const pick = (obj, ...keys) => {
    const newObj = {};
    for (const key of keys) {
        if (key in obj) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};
exports.pick = pick;
/**
 * Omits values from an object and creates a new object
 *
 * @example
 *
 * ```ts
 * omit({a: 1, b: 2, c: 3}, "a", "b") // {c: 3}
 * ```
 *
 * @typeParam T - Type of the object to omit items from
 * @typeParam K - Type of the keys used to omit items
 * @param obj - Object to omit keys from
 * @param keys - Keys to omit
 * @returns Object from omitted values
 */
const omit = (obj, ...keys) => {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (!keys.includes(key)) {
            newObj[key] = value;
        }
    }
    return newObj;
};
exports.omit = omit;
//# sourceMappingURL=object.js.map