/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import {Crypto} from "@peculiar/webcrypto"
import {JSDOM} from "jsdom"
import fetch from "node-fetch"

const crypto = new Crypto()
const dom = new JSDOM("<!DOCTYPE html><html></html>")

;(dom.window as {[key: string]: unknown}).crypto = crypto

// Register crypto object
global.crypto = crypto

// Register fetch
;(global as unknown as {[key: string]: unknown}).fetch = fetch

// Register window object
;(global as unknown as {[key: string]: unknown}).window = dom.window

// Register abort controller
;(global as unknown as {[key: string]: unknown}).AbortController = dom.window.AbortController
