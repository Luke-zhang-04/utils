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
export declare const randint: (min: number, max: number) => number;
/**
 * Generates a pseudo-random floating point number N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random floating point number between `min` and `max`
 */
export declare const uniform: (min: number, max: number) => number;
/**
 * Return a random element from the non-empty array `arr`
 *
 * @param arr - Array to pick items from
 * @returns Random item chosen from arr
 */
export declare const choice: <T>(arr: T[]) => T;
