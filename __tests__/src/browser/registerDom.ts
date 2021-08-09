/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import {Crypto} from "@peculiar/webcrypto"
import {JSDOM} from "jsdom"

const crypto = new Crypto()
const dom = new JSDOM("<!DOCTYPE html><html></html>")

;(dom.window as {[key: string]: unknown}).crypto = crypto

// Register crypto object
global.crypto = crypto
;(global as unknown as {[key: string]: unknown}).window = dom.window
