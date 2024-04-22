/**
 * Pseudo-random related utils
 *
 * @module
 */
/**
 * Generates a pseudo-random integer N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random integer between `min` and `max`
 */
export const randint = (min, max) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min) + _min);
};
/**
 * Generates a pseudo-random floating point number N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random floating point number between `min` and `max`
 */
export const uniform = (min, max) => Math.random() * (max - min) + min;
/**
 * Return a random element from the non-empty array `arr`
 *
 * @param arr - Array to pick items from
 * @returns Random item chosen from arr
 */
export const choice = (arr) => arr[randint(0, arr.length)];
//# sourceMappingURL=random.js.map