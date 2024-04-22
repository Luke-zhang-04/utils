"use strict";
/**
 * Pseudo-random related utils
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.choice = exports.uniform = exports.randint = void 0;
/**
 * Generates a pseudo-random integer N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random integer between `min` and `max`
 */
const randint = (min, max) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min) + _min);
};
exports.randint = randint;
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
const choice = (arr) => arr[(0, exports.randint)(0, arr.length)];
exports.choice = choice;
//# sourceMappingURL=random.js.map