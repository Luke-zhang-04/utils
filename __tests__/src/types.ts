/**
 * Test suite for utility functions
 *
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import * as types from "../../lib/types"

let var1: types.Tuple<number, 3> = [1, 2, 3]

// @ts-expect-error
var1 = [1]
// @ts-expect-error
var1 = [1, 2]
// @ts-expect-error
var1 = [1, 2, 3, 4]

const var1a: [number, number, number] = var1

var1a

let var2: types.IterableValue<number[]> = 3

// @ts-expect-error
var2 = ""

const var2a: number = var2

var2a

let var3: types.MaybePromise<number> = 3

var3 = Promise.resolve(3)
// @ts-expect-error
var3 = ""
// @ts-expect-error
var3 = Promise.resolve("")

const var3a: Promise<number> | number = var3
// @ts-expect-error
const var3b: Promise<number> = var3
// @ts-expect-error
const var3c: number = var3

var3a
