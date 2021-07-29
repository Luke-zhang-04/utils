/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

/**
 * Checks if val1 and val2 are equal. Works like lodash isEqual, and is just as fast.
 *
 * BEFORE YOU USE THIS: think to yourself, "Do I need this?" If there's another way, it's problably
 * faster. Deep equality checking is a very constly operation and should be used sparingly
 *
 * @param val1 - Value to check for equality
 * @param val2 - Value to compare against val1
 * @param maxDepth - Max recursion depth to crawl an object. After max depth is reached, the two
 *   values are simply compared with `===`. By default, it is set to Infinity. It may be a good
 *   idea to set this value to prevent a catastrophe.
 * @param maxLength - Max length of an array to crawl. If max length is reached, two arrays will
 *   simply be compared with `===`. By default, it is set to Infinity. It may be a good idea to set
 *   this value to prevent a catastrophe.
 * @returns If val1 is deeply equal to val2
 */
export const isEqual = (
    val1: unknown,
    val2: unknown,
    maxDepth = Infinity,
    maxLength = Infinity,
): boolean => {
    if (maxDepth === 0) {
        // If maxDepth reached, just run ===
        return val1 === val2
    } else if (val1 === val2) {
        return true
    } else if (typeof val1 !== typeof val2) {
        // If they aren't the same type, return false
        return false
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
        return isEqualArray(val1, val2, maxDepth, maxLength)
    } else if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null
    ) {
        return isEqualObject(val1, val2, maxDepth, maxLength)
    }

    return false
}

/**
 * Checks if obj1 and obj2 are equal, given that they are both arrays
 *
 * @param obj1 - Object to check for equality
 * @param obj2 - Object to compare against val1
 * @param maxDepth - Max recursion depth to crawl an object. After max depth is reached, the two
 *   values are simply compared with `===`. By default, it is set to Infinity. It may be a good
 *   idea to set this value to prevent a catastrophe.
 * @param maxLength - Max length of an array to crawl. If max length is reached, two arrays will
 *   simply be compared with `===`. By default, it is set to Infinity. It may be a good idea to set
 *   this value to prevent a catastrophe.
 * @returns If obj1 is deeply equal to obj2
 */
export const isEqualObject = (
    obj1: object,
    obj2: object,
    // istanbul ignore next
    maxDepth = Infinity,
    // istanbul ignore next
    maxLength = Infinity,
): boolean => {
    for (const key in obj2) {
        if (!(key in obj1)) {
            return false
        }
    }

    for (const key in obj1) {
        // Go through and test each value
        type Obj = {[key: string]: unknown}

        if (!isEqual((obj1 as Obj)[key], (obj2 as Obj)[key], maxDepth - 1, maxLength)) {
            return false
        }
    }

    return true
}

/**
 * Checks if arr1 and arr2 are equal, given that they are both arrays
 *
 * @param arr1 - Array to check for equality
 * @param arr2 - Array to compare against val1
 * @param maxDepth - Max recursion depth to crawl an object. After max depth is reached, the two
 *   values are simply compared with `===`. By default, it is set to Infinity. It may be a good
 *   idea to set this value to prevent a catastrophe.
 * @param maxLength - Max length of an array to crawl. If max length is reached, two arrays will
 *   simply be compared with `===`. By default, it is set to Infinity. It may be a good idea to set
 *   this value to prevent a catastrophe.
 * @returns If arr1 is deeply equal to arr2
 */
export const isEqualArray = (
    obj1: unknown[],
    obj2: unknown[],
    // istanbul ignore next
    maxDepth = Infinity,
    // istanbul ignore next
    maxLength = Infinity,
): boolean => {
    if (obj1.length !== obj2.length) {
        // If arrays have different lengths
        return false
    } else if (obj1.length > maxLength || obj2.length > maxLength) {
        // If array is too big
        return obj1 === obj2
    }

    for (let index = 0; index < obj1.length; index++) {
        // Go through each item
        if (!isEqual(obj1[index], obj2[index], maxDepth - 1, maxLength)) {
            // Test if two array items are equal
            return false
        }
    }

    return true
}
