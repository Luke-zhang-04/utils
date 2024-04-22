/**
 * Math related utils
 *
 * @module
 */
/**
 * Recursive implementation of Euclid's GCD algorithm
 *
 * @example
 *
 * ```ts
 * baseGcd(10, 100) // 10
 * baseGcd(128, 64) // 64
 * ```
 *
 * @param first - First number to get GCD for
 * @param second - Second number to get GCD for
 * @returns Gcd of first and second
 */
export declare const baseGcd: (first: number, second: number) => number;
/**
 * Computes the GCD using array reduce and Euclid's GCD algorithm
 *
 * @example
 *
 * ```ts
 * gcd(10, 20, 30) // 10
 * gcd(13924, 1249, 123, 3) // 1
 * ```
 *
 * @param numbers - All the numbers to get the GCD for - must include at least 2 numbers
 * @returns The gcd of all the numbers
 */
export declare const gcd: (numbers_0: number, numbers_1: number, ...numbers_2: number[]) => number;
/**
 * Checks if a number is prime
 *
 * @example
 *
 * ```ts
 * isPrime(2) // true
 * isPrime(10) // false
 * isPrime(31) // true
 * ```
 *
 * @param num - Number to check
 * @returns If `num` is prime or not
 */
export declare const isPrime: (num: number) => boolean;
/**
 * Generates all prime numbers up to `max` using the Sieve of Eratosthenes
 *
 * @example
 *
 * ```ts
 * Array.from(getPrimesUpTo(30)) // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
 * Array.from(getPrimseUpTo(10)) // [2, 3, 5, 7]
 * Array.from(getPrimseUpTo(7)) // [2, 3, 5]
 * ```
 *
 * @param max - Prime number to go up to
 * @returns Generator of each prime number
 */
export declare function getPrimesUpTo(max: number): Generator<number>;
/**
 * Round `num` to `n` decimal place
 *
 * @example
 *
 * ```ts
 * round(123.456, 2) // 123.46
 * round(123.456, 1) // 123.5
 * round(123.456, -2) // 100
 * ```
 *
 * @param num - Number to round
 * @param precision - Decimal place to round to
 * @returns Rounded number
 */
export declare const round: (num: number, precision?: number) => number;
/**
 * Floors `num` to `n` decimal place
 *
 * @example
 *
 * ```ts
 * floor(123.456, 2) // 123.45
 * floor(123.456, 1) // 123.4
 * floor(123.456, -2) // 100
 * ```
 *
 * @param num - Number to floor
 * @param precision - Decimal place to floor to
 * @returns Floored number
 */
export declare const floor: (num: number, precision?: number) => number;
/**
 * Ceils `num` to `n` decimal place
 *
 * @example
 *
 * ```ts
 * ceil(123.456, 2) // 123.46
 * ceil(123.456, 1) // 123.5
 * ceil(123.456, -2) // 100
 * ```
 *
 * @param num - Number to ceil
 * @param precision - Decimal place to ceil to
 * @returns Ceiled number
 */
export declare const ceil: (num: number, precision?: number) => number;
/**
 * Truncate `num` to `n` decimal place
 *
 * @example
 *
 * ```ts
 * trunc(123.456, 2) // 123.46
 * trunc(123.456, 1) // 123.5
 * trunc(123.456, -2) // 100
 * ```
 *
 * @param num - Number to truncate
 * @param precision - Decimal place to truncate to
 * @returns Truncated number
 */
export declare const trunc: (num: number, precision?: number) => number;
/**
 * Keeps a number between an upper and lower bound
 *
 * @example
 *
 * ```ts
 * const num = 5
 *
 * between(0, num, 10) // 5
 * between(-1, num, 3) // 3
 * between(10, num, 30) // 10
 * ```
 *
 * @param lower - Lower bound (inclusive)
 * @param value - Value to bound
 * @param upper - Upper bound (inclusive)
 * @returns Bound number
 */
export declare const between: (lower: number, value: number, upper: number) => number;
