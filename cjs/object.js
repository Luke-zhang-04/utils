"use strict";
/**
 * Object related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.entries = exports.objectEntries = exports.omit = exports.pick = void 0;
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
/**
 * Better `Object.entries`, which is faster, returns an iterator instead of an array, and is typed better
 *
 * @example
 *
 * ```ts
 * Array.from(objectEntries({a: 1, b: 2})) // [["a", 1], ["b", 2]]
 * ```
 *
 * @param obj - Object to get entries for
 * @returns Generator producing the key and value of each item
 */
function* objectEntries(obj) {
    for (const key in obj) {
        // istanbul ignore else
        /* eslint-disable-next-line no-prototype-builtins */
        if (obj.hasOwnProperty(key)) {
            yield [key, obj[key]];
        }
    }
    return;
}
exports.objectEntries = objectEntries;
exports.entries = objectEntries;
//# sourceMappingURL=object.js.map