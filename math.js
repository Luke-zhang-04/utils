/**
 * Math related utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
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
export const baseGcd = (first, second) => {
    const max = first > second ? first : second;
    const min = first < second ? first : second;
    const remainder = max % min;
    return remainder === 0 ? min : baseGcd(min, remainder);
};
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
export const gcd = (...numbers) => numbers.slice(2).reduce(baseGcd, baseGcd(numbers[0], numbers[1]));
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
export const isPrime = (num) => {
    const limit = Math.sqrt(num);
    for (let test = 2; test <= limit; test++) {
        if (num % test === 0) {
            return false;
        }
    }
    return num > 1;
};
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
export function* getPrimesUpTo(max) {
    const sieve = new Array(max).fill(true);
    for (let index = 2; index < Math.floor(Math.sqrt(max)) + 1; index++) {
        if (sieve[index]) {
            const indexSquared = index ** 2;
            let increment = 0;
            while (indexSquared + index * increment < max) {
                sieve[indexSquared + index * increment] = false;
                increment++;
            }
        }
    }
    for (let index = 2; index < sieve.length; index++) {
        if (sieve[index]) {
            yield index;
        }
    }
}
const runMathFunction = (num, precision, func) => {
    const coefficient = 10 ** precision;
    return func(num * coefficient) / coefficient;
};
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
export const round = (num, precision = 0) => runMathFunction(num, precision, Math.round);
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
export const floor = (num, precision = 0) => runMathFunction(num, precision, Math.floor);
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
export const ceil = (num, precision = 0) => runMathFunction(num, precision, Math.ceil);
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
export const trunc = (num, precision = 0) => runMathFunction(num, precision, Math.trunc);
//# sourceMappingURL=math.js.map