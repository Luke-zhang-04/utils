"use strict";
/**
 * Pseudo-random related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.choice = exports.uniform = exports.randInt = void 0;
/**
 * Generates a pseudo-random integer N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random integer between `min` and `max`
 */
const randInt = (min, max) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min) + _min);
};
exports.randInt = randInt;
/**
 * Generates a pseudo-random floating point number N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random floating point number between `min` and `max`
 */
const uniform = (min, max) => Math.random() * (max - min) + min;
exports.uniform = uniform;
/**
 * Return a random element from the non-empty array `arr`
 *
 * @param arr - Array to pick items from
 * @returns Random item chosen from arr
 */
const choice = (arr) => arr[exports.randInt(0, arr.length)];
exports.choice = choice;
//# sourceMappingURL=random.js.map