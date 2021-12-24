/**
 * Pseudo-random related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

/**
 * Generates a pseudo-random integer N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random integer between `min` and `max`
 */
export const randint = (min: number, max: number): number => {
    const _min = Math.ceil(min)
    const _max = Math.floor(max)

    return Math.floor(Math.random() * (_max - _min) + _min)
}

/**
 * Generates a pseudo-random floating point number N, such that `min <= N < max`
 *
 * @param min - Smallest random integer possible
 * @param max - Largest random integer possible, non-inclusive
 * @returns Random floating point number between `min` and `max`
 */
export const uniform = (min: number, max: number): number => Math.random() * (max - min) + min

/**
 * Return a random element from the non-empty array `arr`
 *
 * @param arr - Array to pick items from
 * @returns Random item chosen from arr
 */
export const choice = <T>(arr: T[]): T => arr[randint(0, arr.length)]!
